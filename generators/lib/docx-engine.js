// docx-engine.js — reusable, content-free document builders.
//
// Per JOBS-ADR-003 D8: this file must never hardcode a name, phone, email, or LinkedIn
// URL. That was a real defect in the tool this repo was built from — a shared header()
// function had a person's contact block written directly inside it, so every generated
// document (and every future person tailoring this codebase) carried someone else's
// identity unless they remembered to hand-edit compiled code. Here, identity is always a
// parameter, read from profile/fact-base.md at render time by the calling script — never
// literal in this file.

const { Document, Paragraph, TextRun, AlignmentType, BorderStyle,
  TabStopType, TabStopPosition, LevelFormat } = require("docx");

const NAVY = "1F3864", GRAY = "595959";

// identity = { name, subtitle, location, phone, email, linkedin }
function header(identity) {
  const contactLine = [identity.location, identity.phone, identity.email, identity.linkedin]
    .filter(Boolean).join("  ·  ");
  return [
    new Paragraph({ spacing: { after: 20 },
      children: [new TextRun({ text: (identity.name || "").toUpperCase(), bold: true, size: 40, color: NAVY })] }),
    ...(identity.subtitle ? [new Paragraph({ spacing: { after: 40 },
      children: [new TextRun({ text: identity.subtitle, size: 21, color: GRAY })] })] : []),
    ...(contactLine ? [new Paragraph({ spacing: { after: 60 },
      children: [new TextRun({ text: contactLine, size: 18, color: GRAY })] })] : []),
  ];
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 200, after: 70 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 1 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: NAVY })],
  });
}

function para(text, after = 40) {
  return new Paragraph({ spacing: { after }, children: [new TextRun({ text, size: 19 })] });
}

function roleLine(title, dates) {
  return new Paragraph({
    spacing: { before: 120, after: 20 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, bold: true, size: 21 }),
      new TextRun({ text: dates ? "\t" + dates : "", size: 19, color: GRAY }),
    ],
  });
}

function companyLine(name, meta) {
  return new Paragraph({
    spacing: { before: 140, after: 0 },
    children: [
      new TextRun({ text: name, bold: true, size: 21, color: NAVY }),
      ...(meta ? [new TextRun({ text: "  —  " + meta, italics: true, size: 18, color: GRAY })] : []),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "b", level: 0 },
    spacing: { after: 20 },
    children: [new TextRun({ text, size: 19 })],
  });
}

function boldLeadBullet(leadText, rest) {
  return new Paragraph({
    numbering: { reference: "b", level: 0 },
    spacing: { after: 20 },
    children: [
      new TextRun({ text: leadText, bold: true, size: 19 }),
      new TextRun({ text: rest, size: 19 }),
    ],
  });
}

function buildDocument(children) {
  return new Document({
    styles: { default: { document: { run: { font: "Arial", size: 19 } } } },
    numbering: {
      config: [{
        reference: "b",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { run: { color: NAVY }, paragraph: { indent: { left: 360, hanging: 200 } } },
        }],
      }],
    },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
      children,
    }],
  });
}

// letterhead is the cover-letter analog of header() — same rule: identity is a parameter.
function letterhead(identity) {
  const contactLine = [identity.location, identity.phone, identity.email, identity.linkedin]
    .filter(Boolean).join("  ·  ");
  return [
    new Paragraph({ spacing: { after: 20 },
      children: [new TextRun({ text: identity.name || "", bold: true, size: 24 })] }),
    ...(contactLine ? [new Paragraph({ spacing: { after: 200 },
      children: [new TextRun({ text: contactLine, size: 18, color: GRAY })] })] : []),
  ];
}

function letterBody(text) {
  return new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text, size: 21 })] });
}

module.exports = {
  header, sectionHeading, para, roleLine, companyLine, bullet, boldLeadBullet,
  buildDocument, letterhead, letterBody, NAVY, GRAY,
};
