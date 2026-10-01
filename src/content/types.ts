export interface Localized {
  en: string;
  bn: string;
}

export interface CodeExample {
  code: string;
  title?: string;
  language?: string; // jsx | js | ts | bash | css | json | txt
}

export interface LessonSection {
  id: string;
  title: Localized;
  /** paragraphs of explanation */
  body: Localized[];
  /** static highlighted code blocks */
  code?: CodeExample[];
  /** runnable react-live playground (editable) */
  live?: CodeExample;
  /** highlight callouts */
  tips?: { kind: "tip" | "warn" | "note"; text: Localized }[];
}

export interface Exercise {
  id: string;
  title: Localized;
  task: Localized;
  /** react-live compatible starter code ending with render(<App />) */
  starter: string;
  /** react-live compatible solution */
  solution: string;
  hints?: Localized[];
  /** difficulty 1-3 */
  level?: 1 | 2 | 3;
}

export interface Project {
  title: Localized;
  brief: Localized;
  requirements: Localized[];
  /** full working solution shown in a collapsible playground */
  solution?: string;
}

export interface Day {
  id: string; // "day-0" ... "day-7"
  day: number;
  title: Localized;
  subtitle: Localized;
  tagline: Localized; // short card description
  hours: Localized;
  icon: string; // lucide icon key, mapped in component
  goals: Localized[];
  sections: LessonSection[];
  exercises: Exercise[];
  project: Project;
}

export type InterviewCategory = "core" | "hooks" | "intermediate" | "coding";

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  question: Localized;
  answer: Localized[];
  code?: CodeExample[];
}

export interface CheatSection {
  id: string;
  title: Localized;
  items: {
    title: Localized;
    code: string;
    note?: Localized;
  }[];
}

export interface ExtraTopic {
  id: string;
  icon: string;
  title: Localized;
  why: Localized;
  body: Localized[];
  code?: CodeExample[];
  live?: CodeExample;
}

export const CATEGORY_LABELS: Record<InterviewCategory, Localized> = {
  core: { en: "Core React", bn: "বেসিক রিয়্যাক্ট" },
  hooks: { en: "Hooks", bn: "হুকস" },
  intermediate: { en: "Intermediate", bn: "মধ্যম স্তর" },
  coding: { en: "Coding Rounds", bn: "কোডিং রাউন্ড" },
};
