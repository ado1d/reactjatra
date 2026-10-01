import type { Day } from "./types";
import { day0 } from "./days/day0";
import { day1 } from "./days/day1";
import { day2 } from "./days/day2";
import { day3 } from "./days/day3";
import { day4 } from "./days/day4";
import { day5 } from "./days/day5";
import { day6 } from "./days/day6";
import { day7 } from "./days/day7";

export const days: Day[] = [day0, day1, day2, day3, day4, day5, day6, day7];

export const getDay = (id: string) => days.find((d) => d.id === id);

export * from "./types";
export { interviewQuestions } from "./interview";
export { cheatSections } from "./cheatsheet";
export { extraTopics } from "./extras";
