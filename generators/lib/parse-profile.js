// parse-profile.js — reads identity fields out of profile/fact-base.md.
// This is the ONLY place identity is ever read from, and it's read fresh on every render
// — never cached, never hardcoded. See docx-engine.js's header comment for why this
// matters (JOBS-ADR-003 D8).

const fs = require("fs");
const path = require("path");

function findRepoRoot(startDir) {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, "profile"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("Could not find a profile/ directory above " + startDir +
    " — run this from inside a job-search-os instance.");
}

function readIdentity(repoRoot) {
  const factBasePath = path.join(repoRoot, "profile", "fact-base.md");
  if (!fs.existsSync(factBasePath)) {
    throw new Error(
      "profile/fact-base.md not found. Run /onboard first — the generators read your " +
      "name and contact info from there; nothing is hardcoded in this codebase."
    );
  }
  const text = fs.readFileSync(factBasePath, "utf8");

  const field = (label) => {
    const m = text.match(new RegExp("^-\\s*" + label + ":\\s*(.+)$", "im"));
    const v = m ? m[1].trim() : "";
    return (!v || v.toUpperCase() === "UNKNOWN") ? "" : v;
  };

  const identity = {
    name: field("Name"),
    phone: field("Phone"),
    email: field("Email"),
    linkedin: field("LinkedIn"),
    location: field("Location"),
  };

  if (!identity.name) {
    throw new Error(
      "profile/fact-base.md has no Name set under ## Contact. Fill that in before " +
      "generating a document — a document with no name on it isn't useful."
    );
  }

  return identity;
}

module.exports = { readIdentity, findRepoRoot };
