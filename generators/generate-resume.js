#!/usr/bin/env node
// generate-resume.js — renders a resume-source markdown file to .docx.
//
// Usage: node generate-resume.js <path-to-source.md> [output.docx]
//
// SOURCE FORMAT (kept deliberately simple — this is the file /tailor writes, and the file
// you can hand-edit yourself; docx is a generated OUTPUT, never a source of truth):
//
//   SUBTITLE: <headline shown under your name>
//
//   ## SECTION NAME
//
//   ### Company Name | optional meta (e.g. dates, location)
//   ROLE: Job Title | Dates
//   - a bullet
//   - **A bold lead-in.** The rest of the bullet.
//
//   ## ANOTHER SECTION
//   - a bullet with no company/role context above it (e.g. Education, Certifications)
//
// Identity (name/phone/email/linkedin/location) is NEVER in this file — it's read fresh
// from profile/fact-base.md by lib/parse-profile.js every time this runs.

const fs = require("fs");
const path = require("path");
const { Packer } = require("docx");
const {
  header, sectionHeading, para, roleLine, companyLine, bullet, boldLeadBullet, buildDocument,
} = require("./lib/docx-engine");
const { readIdentity, findRepoRoot } = require("./lib/parse-profile");

function parseBulletRuns(line) {
  // Supports at most one **bold lead-in** at the start of a bullet; falls back to plain.
  const m = line.match(/^\*\*(.+?)\*\*(.*)$/);
  if (m) return boldLeadBullet(m[1], m[2]);
  return bullet(line);
}

function parseSource(text) {
  const lines = text.split("\n");
  let subtitle = "";
  const body = [];
  let i = 0;

  const subtitleLine = lines.find((l) => l.startsWith("SUBTITLE:"));
  if (subtitleLine) subtitle = subtitleLine.slice("SUBTITLE:".length).trim();

  for (; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    if (line.startsWith("SUBTITLE:")) continue;
    if (!line.trim()) continue;

    if (line.startsWith("## ")) {
      body.push(sectionHeading(line.slice(3).trim()));
    } else if (line.startsWith("### ")) {
      const rest = line.slice(4).trim();
      const [name, meta] = rest.split("|").map((s) => s && s.trim());
      body.push(companyLine(name, meta));
    } else if (line.startsWith("ROLE:")) {
      const rest = line.slice("ROLE:".length).trim();
      const [title, dates] = rest.split("|").map((s) => s && s.trim());
      body.push(roleLine(title, dates));
    } else if (line.trim().startsWith("- ")) {
      body.push(parseBulletRuns(line.trim().slice(2)));
    } else {
      body.push(para(line.trim()));
    }
  }

  return { subtitle, body };
}

function main() {
  const [, , srcArg, outArg] = process.argv;
  if (!srcArg) {
    console.error("Usage: node generate-resume.js <source.md> [output.docx]");
    process.exit(1);
  }

  const srcPath = path.resolve(srcArg);
  if (!fs.existsSync(srcPath)) {
    console.error("Source file not found: " + srcPath);
    process.exit(1);
  }
  if (path.extname(srcPath).toLowerCase() !== ".md") {
    console.error("Refusing to run: source must be a .md file, got " + srcPath + ".");
    console.error("(A non-.md source has no .docx-derived output path, which previously");
    console.error(" caused the output to silently overwrite the source file itself.)");
    process.exit(1);
  }

  const repoRoot = findRepoRoot(path.dirname(srcPath));
  const identity = readIdentity(repoRoot);

  const sourceText = fs.readFileSync(srcPath, "utf8");
  const { subtitle, body } = parseSource(sourceText);

  const doc = buildDocument([
    ...header({ ...identity, subtitle }),
    ...body,
  ]);

  const outPath = path.resolve(outArg || srcPath.replace(/\.md$/i, ".docx"));
  if (outPath === srcPath) {
    console.error("Refusing to run: output path resolved to the same file as the source (" +
      outPath + "). Pass an explicit output path as the second argument.");
    process.exit(1);
  }

  Packer.toBuffer(doc).then((buf) => {
    // Write atomically: a crash or interrupted write must never leave a truncated or
    // half-written .docx in place of a previous good one.
    const tmpPath = outPath + ".tmp-" + process.pid;
    fs.writeFileSync(tmpPath, buf);
    fs.renameSync(tmpPath, outPath);
    console.log("Wrote " + outPath);
  }).catch((err) => {
    console.error("Failed to render document: " + err.message);
    process.exit(1);
  });
}

main();
