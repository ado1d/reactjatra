"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export type Lang = "en" | "bn";

export interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Pick localized value */
  t: (v: { en: string; bn: string }) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "rj-lang";
const CHANGE_EVENT = "rj-lang-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

function getServerSnapshot(): Lang {
  return "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
    document.documentElement.lang = l === "bn" ? "bn" : "en";
  }, []);

  const toggle = useCallback(() => {
    setLang(getSnapshot() === "en" ? "bn" : "en");
  }, [setLang]);

  const t = useCallback(
    (v: { en: string; bn: string }) => (lang === "bn" ? v.bn : v.en),
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      <div lang={lang} className={lang === "bn" ? "font-bengali" : ""}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

/** UI strings for chrome/navigation */
export const UI = {
  appName: { en: "ReactJatra", bn: "রিয়্যাক্টযাত্রা" },
  tagline: {
    en: "Master React in 7 Days",
    bn: "৭ দিনে রিয়্যাক্ট আয়ত্ত করুন",
  },
  home: { en: "Home", bn: "হোম" },
  learn: { en: "Learn", bn: "শেখা" },
  playground: { en: "Playground", bn: "প্র্যাকটিস গ্রাউন্ড" },
  interview: { en: "Interview", bn: "ইন্টারভিউ" },
  cheatsheet: { en: "Cheat Sheet", bn: "চিট শিট" },
  extras: { en: "Beyond 7 Days", bn: "৭ দিনের বাইরে" },
  tryIt: { en: "Try it live", bn: "নিজে চালিয়ে দেখুন" },
  hidePreview: { en: "Hide preview", bn: "প্রিভিউ লুকান" },
  showSolution: { en: "Show solution", bn: "সমাধান দেখুন" },
  hideSolution: { en: "Hide solution", bn: "সমাধান লুকান" },
  reset: { en: "Reset", bn: "রিসেট" },
  copy: { en: "Copy", bn: "কপি" },
  copied: { en: "Copied!", bn: "কপি হয়েছে!" },
  markDone: { en: "Mark day complete", bn: "দিনটি সম্পন্ন করুন" },
  markedDone: { en: "Completed", bn: "সম্পন্ন ✓" },
  progress: { en: "Your progress", bn: "আপনার অগ্রগতি" },
  nextDay: { en: "Next day", bn: "পরের দিন" },
  prevDay: { en: "Previous day", bn: "আগের দিন" },
  backToLearn: { en: "All days", bn: "সব দিন" },
  hint: { en: "Hint", bn: "হিন্ট" },
  exercise: { en: "Exercise", bn: "অনুশীলন" },
  exercises: { en: "Exercises", bn: "অনুশীলন" },
  project: { en: "Day Project", bn: "দিনের প্রজেক্ট" },
  goals: { en: "What you'll learn", bn: "যা শিখবেন" },
  topics: { en: "Topics", bn: "বিষয়সমূহ" },
  freePlay: { en: "Free Playground", bn: "ফ্রি প্ল্যাকগ্রাউন্ড" },
  challenges: { en: "Guided Challenges", bn: "গাইডেড চ্যালেঞ্জ" },
  question: { en: "Question", bn: "প্রশ্ন" },
  answer: { en: "Answer", bn: "উত্তর" },
  search: { en: "Search...", bn: "খুঁজুন..." },
  noResults: { en: "No results found", bn: "কিছু পাওয়া যায়নি" },
  all: { en: "All", bn: "সব" },
  beginner: { en: "Beginner", bn: "শুরুর স্তর" },
  minutes: { en: "min", bn: "মিনিট" },
  startLearning: { en: "Start learning", bn: "শেখা শুরু করুন" },
  continueLearning: { en: "Continue", bn: "চালিয়ে যান" },
  language: { en: "বাংলা", bn: "English" },
  runnableHint: {
    en: "Editable — change the code and see results instantly!",
    bn: "এডিটেবল — কোড বদলান, সাথে সাথে ফলাফল দেখুন!",
  },
  aiTutorName: { en: "React Saathi", bn: "রিয়্যাক্ট সাথী" },
  aiTutorRole: {
    en: "Your personal AI React tutor",
    bn: "আপনার ব্যক্তিগত এআই রিয়্যাক্ট শিক্ষক",
  },
  aiAsk: { en: "Ask AI", bn: "এআই-কে জিজ্ঞেস করুন" },
  aiWelcome: {
    en: "Hello! I'm React Saathi — your AI tutor. Ask me anything about React, JavaScript, or this course. I answer in English and বাংলা!",
    bn: "হ্যালো! আমি রিয়্যাক্ট সাথী — আপনার এআই শিক্ষক। রিয়্যাক্ট, জাভাস্ক্রিপ্ট বা এই কোর্স নিয়ে যা খুশি জিজ্ঞেস করুন। আমি ইংরেজি ও বাংলা — দুই ভাষাতেই উত্তর দিতে পারি!",
  },
  aiPlaceholder: {
    en: "Ask about React, hooks, JSX...",
    bn: "রিয়্যাক্ট, হুকস, JSX নিয়ে জিজ্ঞেস করুন...",
  },
  aiThinking: { en: "Thinking", bn: "ভাবছি" },
  aiSend: { en: "Send message", bn: "মেসেজ পাঠান" },
  aiStop: { en: "Stop generating", bn: "থামান" },
  aiClear: { en: "Clear conversation", bn: "কথোপকথন মুছে ফেলুন" },
  aiClose: { en: "Close chat", bn: "চ্যাট বন্ধ করুন" },
  aiMaximize: { en: "Expand chat", bn: "চ্যাট বড় করুন" },
  aiRestore: { en: "Restore chat size", bn: "চ্যাটের আকার ফিরিয়ে আনুন" },
  aiResizeHint: {
    en: "Drag to resize — double-click to reset",
    bn: "টেনে আকার বদলান — ডাবল-ক্লিক করলে রিসেট হবে",
  },
  aiRetry: { en: "Retry", bn: "আবার চেষ্টা করুন" },
  aiError: {
    en: "Something went wrong. Please try again.",
    bn: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।",
  },
  aiDisclaimer: {
    en: "AI can make mistakes — double-check with the lesson content.",
    bn: "এআই ভুল করতে পারে — পাঠের বিষয়বস্তুর সাথে মিলিয়ে নিন।",
  },
  aiSuggestions: {
    en: "Try asking",
    bn: "এসব জিজ্ঞেস করে দেখুন",
  },
  aiPoweredBy: { en: "Powered by Groq", bn: "Groq দ্বারা চালিত" },
} as const;
