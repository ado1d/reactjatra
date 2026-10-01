"use client";

import React from "react";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { days } from "@/content";
import { useLang, UI } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { DAY_ICONS } from "./LessonView";
import { cn } from "@/lib/utils";

export function LearnView() {
  const { t, lang } = useLang();
  const { completed, isDone } = useProgress();
  const pct = Math.round((completed.length / days.length) * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {lang === "bn" ? "৭ দিনের কারিকুলাম" : "The 7-Day Curriculum"}
          <span className="ml-2 text-base font-medium text-slate-400">
            (+ Day 0)
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          {lang === "bn"
            ? "দিনে ~২ ঘণ্টা শেখা, ~৩ ঘণ্টা বানানো, ~৩০ মিনিট ইন্টারভিউ প্রস্তুতি। প্রতিটি দিন শেষে প্রজেক্ট আছে — দেখে নয়, নিজে হাতে বানান।"
            : "About 2 hrs learning, 3 hrs building, 30 min interview prep per day. Every day ends with a project — build it yourself, don't just watch."}
        </p>

        {/* progress */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-sm font-semibold text-cyan-300">
            {completed.length}/{days.length}
          </span>
        </div>
      </header>

      {/* day cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {days.map((day) => {
          const Icon = DAY_ICONS[day.icon] ?? ArrowRight;
          const done = isDone(day.id);
          return (
            <a
              key={day.id}
              href={`#/learn/${day.id}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl",
                done
                  ? "border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 to-slate-900/60"
                  : day.day === 0
                    ? "border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900/60"
                    : "border-slate-700/70 bg-gradient-to-br from-slate-900/70 to-slate-900/40 hover:border-cyan-500/40"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                    done
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        day.day === 0
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-cyan-500/15 text-cyan-300"
                      )}
                    >
                      {day.day === 0
                        ? lang === "bn"
                          ? "প্রস্তুতি"
                          : "prep"
                        : `day ${day.day}`}
                    </span>
                    {done && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {UI.markedDone[lang]}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-semibold leading-snug text-white">
                    {t(day.title)}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-400">
                    {t(day.tagline)}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t(day.hours)}
                    </span>
                    <span className="ml-auto flex items-center gap-1 font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                      {lang === "bn" ? "শুরু করুন" : "Start"}{" "}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
