/**
 * Fixes common AI-markdown formatting problems before react-markdown renders them.
 *
 *  1. Collapsed tables — the model sometimes emits an entire GFM table on a
 *     single line (all rows joined together). react-markdown cannot parse
 *     that, so the user sees a wall of pipes and dashes. We detect the
 *     `|---|---|` separator run embedded inside a line and rebuild the table
 *     with proper newlines.
 *
 *  2. Literal <br> tags — react-markdown does not render raw HTML, so a
 *     literal "<br>" shows up as visible text. Outside tables we convert it
 *     to a hard line break; inside table cells (where newlines are illegal)
 *     we convert it to a space.
 *
 * Everything is conservative: if a line doesn't clearly look like a broken
 * table, it is returned unchanged.
 */

const BR_RE = /<br\s*\/?>/gi;

/** A token between two pipes that is purely a column separator, e.g. "---", ":--", "----:". */
const SEP_CELL_RE = /^\s*:?-{2,}:?\s*$/;

/** Clean one table cell: strip <br>, collapse whitespace. */
function cleanCell(token: string): string {
  return token.replace(BR_RE, " ").replace(/\s+/g, " ").trim();
}

/**
 * Rebuild a collapsed single-line table.
 * Returns the fixed markdown, or null when the line doesn't look like a
 * collapsed table (caller keeps the original line).
 */
function fixCollapsedTableLine(line: string): string | null {
  const tokens = line.split("|");

  /* Locate the longest run of separator cells ("---", ":----:", …) */
  let sepStart = -1;
  let sepLen = 0;
  for (let i = 0; i < tokens.length; i++) {
    if (SEP_CELL_RE.test(tokens[i])) {
      let j = i;
      while (j < tokens.length && SEP_CELL_RE.test(tokens[j])) j++;
      if (j - i > sepLen) {
        sepStart = i;
        sepLen = j - i;
      }
      i = j - 1;
    }
  }
  if (sepLen < 2 || sepStart < 0) return null; // need a real multi-column table

  /* Header row = the `sepLen` cells right before the separator run,
     skipping one inter-row spacer ("| |" between joined rows) if present. */
  let headerEnd = sepStart;
  if (headerEnd > 0 && tokens[headerEnd - 1].trim() === "") headerEnd--;
  const headerStart = headerEnd - sepLen;
  if (headerStart < 0) return null;

  const header = tokens.slice(headerStart, headerEnd).map(cleanCell);
  if (header.some((h) => SEP_CELL_RE.test(h) || !h)) return null; // header must be real content cells

  /* Any non-table text that got merged onto the same line before the table. */
  const prefix = tokens
    .slice(0, headerStart)
    .join("|")
    .trim();

  /* Data cells after the separator run. */
  const data = tokens.slice(sepStart + sepLen);
  let start = 0;
  let end = data.length;
  if (end > start && data[start].trim() === "") start++; // leading "| |" gap
  if (end > start && data[end - 1].trim() === "") end--; // trailing pipe

  const rows: string[][] = [];
  let cur: string[] = [];
  let sawSpacer = false;
  for (let k = start; k < end; k++) {
    const tok = data[k];
    if (tok.trim() === "") {
      sawSpacer = true;
      if (cur.length) {
        rows.push(cur);
        cur = [];
      }
    } else {
      cur.push(cleanCell(tok));
    }
  }
  if (cur.length) rows.push(cur);

  /* Rows joined without any "| |" spacer: if the cell count is an exact
     multiple of the column count, chunk them into proper rows. */
  const chunked = rows.map((row) => {
    if (sawSpacer && row.length > sepLen && row.length % sepLen === 0) {
      const out: string[][] = [];
      for (let i = 0; i < row.length; i += sepLen) out.push(row.slice(i, i + sepLen));
      return out;
    }
    if (!sawSpacer && rows.length === 1 && row.length % sepLen === 0 && row.length > sepLen) {
      const out: string[][] = [];
      for (let i = 0; i < row.length; i += sepLen) out.push(row.slice(i, i + sepLen));
      return out;
    }
    return [row];
  });
  const dataRows = chunked.flat();

  /* Rebuild the table in proper multi-line GFM. */
  const sepRow = `| ${Array<string>(sepLen).fill("---").join(" | ")} |`;
  const headerRow = `| ${header.join(" | ")} |`;
  const body = dataRows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  const table = body
    ? `${headerRow}\n${sepRow}\n${body}`
    : `${headerRow}\n${sepRow}`;

  return prefix ? `${prefix}\n${table}` : table;
}

/**
 * Pre-process AI markdown for rendering:
 * - rescues collapsed one-line tables
 * - converts literal <br> tags into hard line breaks
 * Lines inside fenced code blocks are left untouched.
 */
export function fixAiMarkdown(content: string): string {
  if (!content) return content;

  const lines = content.split("\n");
  let inFence = false;

  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      if (line.includes("|") && /\|?\s*:?-{2,}:?\s*\|/.test(line)) {
        const fixed = fixCollapsedTableLine(line);
        if (fixed !== null) return fixed;
      }
      // no table fix possible — still rescue literal <br> tags
      return line.includes("<br") ? line.replace(BR_RE, "  \n") : line;
    })
    .join("\n");
}
