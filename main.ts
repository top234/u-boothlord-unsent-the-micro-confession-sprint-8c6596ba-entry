import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// The unsent message, exactly as typed: a To: line naming who it was
// meant for, and the one line that stayed in drafts.
const TO_LINE = "To: Mum";
const MESSAGE =
  "I told you I threw Dad's letters away after the funeral. " +
  "They're in a shoebox under my bed, and I read the one about " +
  "the lake every year on his birthday.";

const MAX_TOTAL = 260;
const MAX_MESSAGE = 200;

function buildEntry(): string {
  // The judge's brief caps the message line at 200 characters and the
  // whole entry at 260; enforce both so a future wording edit can never
  // silently produce an invalid entry.
  if (MESSAGE.length > MAX_MESSAGE) {
    throw new Error(`message too long: ${MESSAGE.length} > ${MAX_MESSAGE}`);
  }
  const entry = `${TO_LINE}\n${MESSAGE}`;
  if (entry.length > MAX_TOTAL) {
    throw new Error(`entry too long: ${entry.length} > ${MAX_TOTAL}`);
  }
  return entry;
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), buildEntry(), "utf8");
