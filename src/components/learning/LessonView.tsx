"use client";

import React from "react";
import {
  Atom,
  Braces,
  Database,
  CloudDownload,
  Anchor,
  Route,
  Gauge,
  Trophy,
  Target,
  Clock,
  ListChecks,
  Hammer,
  Info,
  AlertTriangle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FolderKanban,
} from "lucide-react";
import type { Day } from "@/content/types";
import { days } from "@/content";
import { useLang, UI } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { CodeBlock } from "./CodeBlock";
import { Playground } from "./Playground";
import { ExerciseCard } from "./ExerciseCard";
import { cn } from "@/lib/utils";

export const DAY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  javascript: Braces,
  atom: Atom,
  database: Database,
  cloud: CloudDownload,
  hooks: Anchor,
  route: Route,
  gauge: Gauge,
  trophy: Trophy,
};

function TipCallout({
  kind,
  children,
}: {
  kind: "tip" | "warn" | "note";
  children: React.ReactNode;
}) {
  const styles = {
    tip: {
      icon: Lightbulb,
      cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
      iconCls: "text-emerald-400",
    },
    warn: {
      icon: AlertTriangle,
      cls: "border-rose-500/30 bg-rose-500/10 text-rose-200",
      iconCls: "text-rose-400",
    },
    note: {
      icon: Info,
      cls: "border-sky-500/30 bg-sky-500/10 text-sky-200",
      iconCls: "text-sky-400",
    },
  }[kind];
  const Icon = styles.icon;
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-3.5 text-sm leading-relaxed",
        styles.cls
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", styles.iconCls)} />
      <div>{children}</div>
    </div>
  );
}

export function LessonView({ day }: { day: Day }) {
  const { t, lang } = useLang();
  const { isDone, toggle } = useProgress();
  const Icon = DAY_ICONS[day.icon] ?? Atom;
  const done = isDone(day.id);

  const idx = days.findIndex((d) => d.id === day.id);
  const prev = idx > 0 ? days[idx - 1] : null;
  const next = idx < days.length - 1 ? days[idx + 1] : null;

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* ===== header ===== */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
            <Icon className="h-6 w-6 text-cyan-400" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t(day.title)}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {t(day.hours)}
              </span>
              <span>·</span>
              <span>{day.sections.length} {lang === "bn" ? "টি সেকশন" : "sections"}</span>
              <span>·</span>
              <span>{day.exercises.length} {lang === "bn" ? "টি অনুশীলন" : "exercises"}</span>
            </p>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
          {t(day.subtitle)}
        </p>

        {/* goals */}
        <div className="mt-5 rounded-xl border border-slate-700/70 bg-slate-900/50 p-4">
          <h2 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-cyan-300">
            <Target className="h-4 w-4" /> {UI.goals[lang]}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {day.goals.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-300">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                {t(g)}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ===== sections ===== */}
      <div className="space-y-10">
        {day.sections.map((section, si) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2
              id={section.id}
              className="mb-4 flex items-center gap-2.5 text-lg font-bold text-white sm:text-xl"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 font-mono text-xs text-cyan-400">
                {si + 1}
              </span>
              {t(section.title)}
            </h2>

            <div className="space-y-4">
              {section.body.map((para, i) => (
                <p key={i} className="text-[15px] leading-[1.85] text-slate-300">
                  {t(para)}
                </p>
              ))}

              {section.tips?.map((tip, i) => (
                <TipCallout key={i} kind={tip.kind}>
                  {t(tip.text)}
                </TipCallout>
              ))}

              {section.code?.map((block, i) => (
                <CodeBlock
                  key={i}
                  code={block.code}
                  title={block.title}
                  language={block.language}
                />
              ))}

              {section.live && (
                <Playground
                  code={section.live.code}
                  title={section.live.title || `${section.id}.jsx`}
                  height={320}
                />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* ===== exercises ===== */}
      <section className="mt-12" aria-labelledby="exercises">
        <h2
          id="exercises"
          className="mb-4 flex items-center gap-2.5 text-lg font-bold text-white sm:text-xl"
        >
          <ListChecks className="h-5 w-5 text-violet-400" />
          {UI.exercises[lang]}
        </h2>
        <div className="space-y-5">
          {day.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}
        </div>
      </section>

      {/* ===== project ===== */}
      <section
        className="mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900/30 p-5 sm:p-6"
        aria-labelledby="project"
      >
        <h2
          id="project"
          className="mb-3 flex items-center gap-2.5 text-lg font-bold text-emerald-300 sm:text-xl"
        >
          <Hammer className="h-5 w-5" /> {UI.project[lang]}
        </h2>
        <h3 className="mb-2 font-semibold text-white">{t(day.project.title)}</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">
          {t(day.project.brief)}
        </p>
        <div className="mb-4 rounded-xl border border-slate-700/70 bg-slate-950/40 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
            <FolderKanban className="h-3.5 w-3.5" />
            {lang === "bn" ? "চাহিদা তালিকা" : "Requirements"}
          </h4>
          <ul className="space-y-1.5">
            {day.project.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 text-emerald-400">✓</span>
                {t(r)}
              </li>
            ))}
          </ul>
        </div>
        {day.project.solution && (
          <details className="group">
            <summary className="cursor-pointer list-none">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25">
                {lang === "bn" ? "📦 সম্পূর্ণ সমাধান দেখুন" : "📦 View full solution"}
              </span>
            </summary>
            <div className="mt-4">
              <Playground
                code={day.project.solution}
                title="solution.jsx"
                height={380}
                initialCollapsed
              />
            </div>
          </details>
        )}
      </section>

      {/* ===== footer nav ===== */}
      <footer className="mt-12 border-t border-slate-800 pt-6">
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => toggle(day.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all",
              done
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300"
            )}
          >
            <CheckCircle2 className="h-4 w-4" />
            {done ? UI.markedDone[lang] : UI.markDone[lang]}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {prev ? (
            <a
              href={`#/learn/${prev.id}`}
              className="group flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-900/50 p-4 transition-colors hover:border-cyan-500/40"
            >
              <ChevronLeft className="h-5 w-5 text-slate-500 transition-transform group-hover:-translate-x-0.5 group-hover:text-cyan-400" />
              <div>
                <div className="text-[11px] uppercase tracking-wide text-slate-500">
                  {UI.prevDay[lang]}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {t(prev.title)}
                </div>
              </div>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a
              href={`#/learn/${next.id}`}
              className="group flex items-center justify-end gap-3 rounded-xl border border-slate-700/70 bg-slate-900/50 p-4 text-right transition-colors hover:border-cyan-500/40"
            >
              <div>
                <div className="text-[11px] uppercase tracking-wide text-slate-500">
                  {UI.nextDay[lang]}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {t(next.title)}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400" />
            </a>
          ) : (
            <a
              href="#/interview"
              className="group flex items-center justify-end gap-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-4 text-right transition-colors hover:bg-cyan-500/20"
            >
              <div>
                <div className="text-[11px] uppercase tracking-wide text-cyan-500">
                  {lang === "bn" ? "পরবর্তী ধাপ" : "Up next"}
                </div>
                <div className="text-sm font-semibold text-cyan-200">
                  {UI.interview[lang]} →
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-cyan-400 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}
