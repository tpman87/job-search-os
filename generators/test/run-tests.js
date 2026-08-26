#!/usr/bin/env node
// Regression tests for the docx generators. Run with `node test/run-tests.js` from inside
// generators/, or via .github/workflows/ci.yml.
//
// Uses ONLY the synthetic fixtures in test/fixtures/ — never real data (JOBS-ADR-004 D15:
// CI fixtures must be synthetic, never adapted from a real resume, since fixture folders
// are where review attention is lowest).
//
// Golden-output checks compare EXTRACTED TEXT, never raw .docx/ZIP bytes — a `docx` point
// release can reorder internal XML with zero visible change in Word, and a byte-diff would
// make that indistinguishable from a real generator regression. If a future `docx` bump
// changes rendered TEXT content, re-read the diff before trusting it and update the
// expected strings below — don't just re-baseline blindly.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const JSZip = require("jszip");

const GEN_DIR = path.dirname(__dirname);
const FIXTURES = path.join(__dirname, "fixtures");

let failures = 0;

function check(label, fn) {
  try {
    fn();
    console.log("ok - " + label);
  } catch (err) {
    failures++;
    console.log("NOT OK - " + label + ": " + err.message);
  }
}

async function checkAsync(label, fn) {
  try {
    await fn();
    console.log("ok - " + label);
  } catch (err) {
    failures++;
    console.log("NOT OK - " + label + ": " + err.message);
  }
}

function run(script, args) {
  return execFileSync("node", [path.join(GEN_DIR, script), ...args], { encoding: "utf8" });
}

// Returns the caught error (with .status/.stderr) on failure, or null if the command
// unexpectedly succeeded.
function runExpectFailure(script, args) {
  try {
    execFileSync("node", [path.join(GEN_DIR, script), ...args], { encoding: "utf8", stdio: "pipe" });
    return null;
  } catch (err) {
    return err;
  }
}

async function extractDocxPart(docxPath, partPath) {
  const buf = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(buf);
  const entry = zip.file(partPath);
  return entry ? entry.async("string") : "";
}

async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "jso-gentest-"));
  const workRoot = path.join(tmp, "instance");
  fs.mkdirSync(path.join(workRoot, "profile"), { recursive: true });
  fs.mkdirSync(path.join(workRoot, "work"), { recursive: true });
  fs.copyFileSync(
    path.join(FIXTURES, "profile", "fact-base.md"),
    path.join(workRoot, "profile", "fact-base.md")
  );
  fs.copyFileSync(path.join(FIXTURES, "resume-source.md"), path.join(workRoot, "work", "resume.md"));
  fs.copyFileSync(path.join(FIXTURES, "letter-source.md"), path.join(workRoot, "work", "letter.md"));
  fs.writeFileSync(path.join(workRoot, "work", "notmd.txt"), "not a markdown source\n");

  const resumeSrc = path.join(workRoot, "work", "resume.md");
  const resumeOut = path.join(workRoot, "work", "resume.docx");
  const letterSrc = path.join(workRoot, "work", "letter.md");
  const letterOut = path.join(workRoot, "work", "letter.docx");
  const notmd = path.join(workRoot, "work", "notmd.txt");

  check("generate-resume produces a .docx", () => {
    run("generate-resume.js", [resumeSrc]);
    if (!fs.existsSync(resumeOut)) throw new Error("output .docx was not created");
  });

  await checkAsync("resume .docx contains the fixture content (extracted text, not raw bytes)", async () => {
    const xml = await extractDocxPart(resumeOut, "word/document.xml");
    const text = xml.replace(/<[^>]+>/g, " ");
    // The resume header renders the name uppercase by design (docx-engine.js header()) —
    // the cover letter does not, which is why that check below expects mixed case.
    for (const expected of ["Acme Testing Co", "Test Subtitle", "Fixture Engineer", "PAT TESTWORTHY"]) {
      if (!text.includes(expected)) {
        throw new Error(`expected "${expected}" in rendered text, not found`);
      }
    }
  });

  await checkAsync("resume .docx metadata carries no local path or real OS username", async () => {
    const core = await extractDocxPart(resumeOut, "docProps/core.xml");
    const home = os.homedir();
    if (home && core.includes(home)) {
      throw new Error("docProps/core.xml contains the local home directory path");
    }
    const osUser = os.userInfo().username;
    if (osUser && core.includes(osUser)) {
      throw new Error("docProps/core.xml contains the machine's real OS username");
    }
  });

  check("generate-resume refuses a non-.md source and leaves it byte-identical", () => {
    const before = fs.readFileSync(notmd);
    const err = runExpectFailure("generate-resume.js", [notmd]);
    if (!err) throw new Error("expected a non-zero exit, the command succeeded");
    const after = fs.readFileSync(notmd);
    if (!before.equals(after)) {
      throw new Error("the source file's content changed — the overwrite regression is back");
    }
  });

  check("generate-resume refuses when the output path equals the source path", () => {
    const err = runExpectFailure("generate-resume.js", [resumeSrc, resumeSrc]);
    if (!err) throw new Error("expected a non-zero exit, the command succeeded");
  });

  check("generate-cover-letter produces a .docx", () => {
    run("generate-cover-letter.js", [letterSrc]);
    if (!fs.existsSync(letterOut)) throw new Error("output .docx was not created");
  });

  await checkAsync("letter .docx contains the fixture content", async () => {
    const xml = await extractDocxPart(letterOut, "word/document.xml");
    const text = xml.replace(/<[^>]+>/g, " ");
    for (const expected of ["Dear Hiring Team", "fixture paragraph", "Pat Testworthy"]) {
      if (!text.includes(expected)) {
        throw new Error(`expected "${expected}" in rendered text, not found`);
      }
    }
  });

  check("generate-cover-letter refuses a non-.md source and leaves it byte-identical", () => {
    const before = fs.readFileSync(notmd);
    const err = runExpectFailure("generate-cover-letter.js", [notmd]);
    if (!err) throw new Error("expected a non-zero exit, the command succeeded");
    const after = fs.readFileSync(notmd);
    if (!before.equals(after)) {
      throw new Error("the source file's content changed — the overwrite regression is back");
    }
  });

  check("generate-cover-letter refuses when the output path equals the source path", () => {
    const err = runExpectFailure("generate-cover-letter.js", [letterSrc, letterSrc]);
    if (!err) throw new Error("expected a non-zero exit, the command succeeded");
  });

  fs.rmSync(tmp, { recursive: true, force: true });

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll generator regression checks passed.");
}

main().catch((err) => {
  console.error("Test runner crashed: " + (err && err.stack || err));
  process.exit(1);
});
