/* Test fixAiMarkdown against the user's real broken AI output + edge cases. */
import { fixAiMarkdown } from "../src/lib/markdown-fix";

let pass = 0;
let fail = 0;

function check(name: string, input: string, expect: string) {
  const got = fixAiMarkdown(input);
  if (got === expect) {
    pass++;
    console.log(`  ok — ${name}`);
  } else {
    fail++;
    console.log(`  FAIL — ${name}`);
    console.log(`    input:    ${JSON.stringify(input)}`);
    console.log(`    expected: ${JSON.stringify(expect)}`);
    console.log(`    got:      ${JSON.stringify(got)}`);
  }
}

console.log("1. User's exact reported case (collapsed table with <br> in cell):");
const userCase =
  "| ধরন | সিনট্যাক্স | ব্যবহার | |------|-----------|----------| | Named export | export const foo = …; <br> export function bar() {} | একাধিক আইটেম একসাথে এক্সপোর্ট করতে। | | Default export | export default function App() {} | ফাইল থেকে একটি প্রধান আইটেম এক্সপোর্ট করতে। |";
const userFixed = fixAiMarkdown(userCase);
console.log(userFixed);
const lines = userFixed.split("\n");
if (
  lines.length === 4 &&
  lines[0].startsWith("| ধরন | সিনট্যাক্স | ব্যবহার |") &&
  lines[1] === "| --- | --- | --- |" &&
  !userFixed.includes("<br")
) {
  pass++;
  console.log("  ok — rebuilt as 4-line table (header/sep/2 rows), <br> stripped\n");
} else {
  fail++;
  console.log(`  FAIL — got ${lines.length} lines\n`);
}

console.log("2. Proper table passes through untouched:");
check(
  "proper table",
  "| a | b |\n| --- | --- |\n| 1 | 2 |",
  "| a | b |\n| --- | --- |\n| 1 | 2 |"
);

console.log("3. Prefix text merged before the table:");
const p = fixAiMarkdown(
  "১. Export (বহির্গত করা)\n| ধরন | ব্যবহার | |---|---| | Named | একাধিক | | Default | একটি |"
);
console.log(p);
if (p.startsWith("১. Export (বহির্গত করা)\n| ধরন | ব্যবহার |\n| --- | --- |")) {
  pass++;
  console.log("  ok — prefix kept on its own line\n");
} else {
  fail++;
  console.log("  FAIL\n");
}

console.log("4. Collapsed on one line WITH the heading merged (no newline):");
const merged = fixAiMarkdown(
  "১. Export (বহির্গত করা) | ধরন | ব্যবহার | |---|---| | Named | একাধিক |"
);
console.log(merged);
if (merged.includes("(বহির্গত করা)\n| ধরন |")) {
  pass++;
  console.log("  ok — merged heading split off\n");
} else {
  fail++;
  console.log("  FAIL\n");
}

console.log("5. <br> outside tables becomes hard break:");
check("br -> hard break", "line one<br>line two", "line one  \nline two");
check("br/ variant", "a<br/>b", "a  \nb");
check("br with space variant", "a<br />b", "a  \nb");

console.log("6. Code blocks untouched:");
check(
  "fenced code protected",
  "```\n| a | b |\n|---|---|\n| 1 | 2 |\n```",
  "```\n| a | b |\n|---|---|\n| 1 | 2 |\n```"
);
check(
  "br inside code block kept",
  "example:\n```html\na<br>b\n```",
  "example:\n```html\na<br>b\n```"
);

console.log("7. Non-table lines untouched:");
check("plain text", "hello world", "hello world");
check("inline code with pipes", "use `a | b` here", "use `a | b` here");
check(
  "prose mentioning separator syntax",
  "write |---|---| as the separator row",
  "write |---|---| as the separator row"
);

console.log("8. No-gap collapsed rows (shared pipes):");
const nogap = fixAiMarkdown("| a | b ||---|---|| 1 | 2 || 3 | 4 |");
console.log(nogap);
const ng = nogap.split("\n");
if (ng.length === 4 && ng[2] === "| 1 | 2 |" && ng[3] === "| 3 | 4 |") {
  pass++;
  console.log("  ok\n");
} else {
  fail++;
  console.log("  FAIL\n");
}

console.log("9. Colon-aligned separators:");
const col = fixAiMarkdown("| left | right | |:---|---:| | a | b |");
console.log(col);
if (col.split("\n").length === 3) {
  pass++;
  console.log("  ok\n");
} else {
  fail++;
  console.log("  FAIL\n");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
