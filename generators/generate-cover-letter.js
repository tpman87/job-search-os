#!/usr/bin/env node
// generate-cover-letter.js — renders a cover-letter-source markdown file to .docx.
//
// Usage: node generate-cover-letter.js <path-to-source.md> [output.docx]
//
// SOURCE FORMAT:
//
//   GREETING: Dear Hiring Team,
//
//   First paragraph.
//
//   Second paragraph.
//
//   CLOSING: Sincerely,
//
// Identity is read fresh from profile/fact-base.md — never hardcoded here.

const fs = require("fs");
const path = require("path");
const { Packer, Paragraph, TextRun } = require("docx");
const { letterhead, letterBody, buildDocument } = require("./lib/docx-engine");
const { readIdentity, findRepoRoot } = require("./lib/parse-profile");

function parseSource(text) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  let greeting = "Dear Hiring Team,";
  let closing = "Sincerely,";
  const paragraphs = [];

  for (const block of blocks) {
    if (block.startsWith("GREETING:")) {
      greeting = block.slice("GREETING:".length).trim();
    } else if (block.startsWith("CLOSING:")) {
      closing = block.slice("CLOSING:".length).trim();
    } else {
      paragraphs.push(block.replace(/\s+/g, " "));
    }
  }

  return { greeting, closing, paragraphs };
}

function main() {
  const [, , srcArg, outArg] = process.argv;
  if (!srcArg) {
    console.error("Usage: node generate-cover-letter.js <source.md> [output.docx]");
    process.exit(1);
  }

  const srcPath = path.resolve(srcArg);
  if (!fs.existsSync(srcPath)) {
    console.error("Source file not found: " + srcPath);
    process.exit(1);
  }

  const repoRoot = findRepoRoot(path.dirname(srcPath));
  const identity = readIdentity(repoRoot);

  const sourceText = fs.readFileSync(srcPath, "utf8");
  const { greeting, closing, paragraphs } = parseSource(sourceText);

  const children = [
    ...letterhead(identity),
    new Paragraph({ spacing: { before: 120, after: 160 },
      children: [new TextRun({ text: greeting, size: 21 })] }),
    ...paragraphs.map((p) => letterBody(p)),
    new Paragraph({ spacing: { before: 200 },
      children: [new TextRun({ text: closing, size: 21 })] }),
    new Paragraph({ spacing: { before: 400 },
      children: [new TextRun({ text: identity.name, size: 21 })] }),
  ];

  const doc = buildDocument(children);
  const outPath = path.resolve(outArg || srcPath.replace(/\.md$/, ".docx"));

  Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync(outPath, buf);
    console.log("Wrote " + outPath);
  }).catch((err) => {
    console.error("Failed to render document: " + err.message);
    process.exit(1);
  });
}

main();
