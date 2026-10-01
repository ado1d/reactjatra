"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, MessageSquareQuote, Search } from "lucide-react";
import {
  interviewQuestions,
  CATEGORY_LABELS,
  type InterviewCategory,
} from "@/content";
import { useLang, UI } from "@/lib/i18n";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

const CATEGORIES: (InterviewCategory | "all")[] = [
  "all",
  "core",
  "hooks",
  "intermediate",
  "coding",
];

export function InterviewView() {
  const { t, lang } = useLang();
  const [category, setCategory] = useState<InterviewCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return interviewQuestions.filter((q2) => {
      if (category !== "all" && q2.category !== category) return false;
      if (!q) return true;
      return (
        q2.question.en.toLowerCase().includes(q) ||
        q2.question.bn.includes(query.trim())
      );
    });
  }, [category, query]);

  function toggle(id: string) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <MessageSquareQuote className="h-7 w-7 text-emerald-400" />
          {UI.interview[lang]}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          {lang === "bn"
            ? "প্রতিটি প্রশ্ন জোরে জোরে উত্তর দিন — পড়া মুখস্থ করা নয়, বলতে পারা গুরুত্বপূর্ণ। সেরা উত্তরের ছাঁদ: সংজ্ঞা → কেন দরকার → ছোট কোড → একটা সতর্কতা।"
            : "Answer each question OUT LOUD — reading is not recalling. Best answers follow: definition → why it exists → tiny code → one gotcha."}
        </p>
      </header>

      {/* search + filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={UI.search[lang]}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                category === c
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                  : "border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200"
              )}
            >
              {c === "all" ? UI.all[lang] : t(CATEGORY_LABELS[c])}
            </button>
          ))}
        </div>
      </div>

      {/* questions */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center text-sm text-slate-400">
            {UI.noResults[lang]}
          </p>
        )}
        {filtered.map((q) => {
          const open = openIds.includes(q.id);
          return (
            <div
              key={q.id}
              className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/50"
            >
              <button
                onClick={() => toggle(q.id)}
                className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-slate-800/40"
                aria-expanded={open}
              >
                <span
                  className={cn(
                    "mt-0.5 shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase",
                    q.category === "core" && "bg-cyan-500/15 text-cyan-300",
                    q.category === "hooks" && "bg-violet-500/15 text-violet-300",
                    q.category === "intermediate" &&
                      "bg-amber-500/15 text-amber-300",
                    q.category === "coding" && "bg-rose-500/15 text-rose-300"
                  )}
                >
                  {t(CATEGORY_LABELS[q.category])}
                </span>
                <span className="flex-1 text-[15px] font-semibold leading-snug text-slate-100">
                  {t(q.question)}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform",
                    open && "rotate-180 text-emerald-400"
                  )}
                />
              </button>

              {open && (
                <div className="border-t border-slate-700/60 bg-slate-950/40 p-4 sm:p-5">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                    {UI.answer[lang]}
                  </div>
                  <div className="space-y-3">
                    {q.answer.map((para, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-slate-300"
                      >
                        {t(para)}
                      </p>
                    ))}
                    {q.code?.map((block, i) => (
                      <CodeBlock
                        key={i}
                        code={block.code}
                        title={block.title}
                        language={block.language}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
