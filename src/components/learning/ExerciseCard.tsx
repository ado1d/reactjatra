"use client";

import React, { useState } from "react";
import { Dumbbell, Lightbulb, CheckCircle2, ChevronDown } from "lucide-react";
import type { Exercise } from "@/content/types";
import { useLang, UI } from "@/lib/i18n";
import { Playground } from "./Playground";
import { cn } from "@/lib/utils";

export function ExerciseCard({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  const { t, lang } = useLang();
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="rounded-xl border border-violet-500/25 bg-gradient-to-b from-violet-950/20 to-transparent p-4 sm:p-5">
      {/* header */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
          <Dumbbell className="h-4 w-4" />
        </span>
        <h4 className="text-base font-semibold text-slate-100">
          {t(exercise.title)}
        </h4>
        <span className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: exercise.level ?? 1 }).map((_, i) => (
            <span key={i} className="text-xs text-amber-400">●</span>
          ))}
        </span>
      </div>

      {/* task */}
      <p className="mb-4 text-sm leading-relaxed text-slate-300">
        {t(exercise.task)}
      </p>

      {/* playground — remounts when switching starter/solution */}
      <Playground
        key={showSolution ? "solution" : "starter"}
        code={showSolution ? exercise.solution : exercise.starter}
        title={`${exercise.id}.jsx`}
        height={260}
      />

      {/* controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {exercise.hints && exercise.hints.length > 0 && (
          <button
            onClick={() => setShowHints((h) => !h)}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/20"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {UI.hint[lang]}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                showHints && "rotate-180"
              )}
            />
          </button>
        )}
        <button
          onClick={() => setShowSolution((s) => !s)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
            showSolution
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
              : "border-slate-600 bg-slate-800/60 text-slate-300 hover:bg-slate-700"
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {showSolution ? UI.hideSolution[lang] : UI.showSolution[lang]}
        </button>
      </div>

      {/* hints */}
      {showHints && exercise.hints && (
        <div className="mt-3 space-y-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          {exercise.hints.map((hint, i) => (
            <p key={i} className="flex gap-2 text-xs leading-relaxed text-amber-200/90">
              <span className="shrink-0 font-mono">💡</span>
              {t(hint)}
            </p>
          ))}
        </div>
      )}

      <p className="mt-2 text-[11px] text-slate-500">
        {showSolution
          ? lang === "bn"
            ? "সমাধান এডিটরে লোড হয়েছে — নিজে বদলে পরীক্ষা করুন!"
            : "Solution loaded into the editor — edit and experiment!"
          : lang === "bn"
            ? "এডিটরে লিখুন, ফলাফল সাথে সাথে দেখুন।"
            : "Write in the editor and see results instantly."}
      </p>
    </div>
  );
}
