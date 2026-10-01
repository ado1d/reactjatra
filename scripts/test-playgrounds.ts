/**
 * Tests every playground code string in the content files with the exact
 * same transform pipeline react-live uses (sucrase: jsx+typescript+imports,
 * after stripping imports). Fails loudly on any syntax error.
 */
import { transform } from "sucrase";
import { days, extraTopics } from "../src/content";
import { codingChallenges, FREE_STARTER } from "../src/components/learning/PlaygroundView";

function stripImports(code: string): string {
  return code
    .split("\n")
    .filter((line) => !/^\s*import\s.+?;?\s*$/.test(line))
    .join("\n")
    .trim();
}

let pass = 0;
const failures: string[] = [];

function test(label: string, code: string) {
  try {
    transform(stripImports(code), {
      transforms: ["jsx", "typescript", "imports"] as never,
    });
    pass++;
  } catch (e) {
    failures.push(`${label} → ${(e as Error).message}`);
  }
}

for (const day of days) {
  for (const s of day.sections) {
    if (s.live) test(`${day.id}/${s.id}`, s.live.code);
    for (const c of s.code ?? []) {
      if ((c.language ?? "jsx") === "jsx") test(`${day.id}/${s.id}[code ${c.title}]`, c.code);
    }
  }
  for (const ex of day.exercises) {
    test(`${ex.id}/starter`, ex.starter);
    test(`${ex.id}/solution`, ex.solution);
  }
  if (day.project.solution) test(`${day.id}/project-solution`, day.project.solution);
}

for (const topic of extraTopics) {
  if (topic.live) test(`extra/${topic.id}`, topic.live.code);
}

for (const ch of codingChallenges) {
  test(`${ch.id}/starter`, ch.starter);
  test(`${ch.id}/solution`, ch.solution);
}

test("free-starter", FREE_STARTER);

console.log(`\n${pass} code samples OK`);
if (failures.length) {
  console.error(`\n❌ ${failures.length} FAILURES:`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
} else {
  console.log("✅ All playground code transforms cleanly");
}
