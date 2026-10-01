"use client";

import React from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Code2,
  Languages,
  MessageSquareQuote,
  Sparkles,
  Trophy,
  Zap,
  Rocket,
  GraduationCap,
} from "lucide-react";
import { days } from "@/content";
import { useLang, UI } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";

function ReactAtom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="5" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="32" cy="32" rx="28" ry="12" />
        <ellipse cx="32" cy="32" rx="28" ry="12" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="28" ry="12" transform="rotate(120 32 32)" />
      </g>
    </svg>
  );
}

const FEATURES = [
  {
    icon: Languages,
    title: { en: "English + বাংলা", bn: "বাংলা + English" },
    desc: {
      en: "Every lesson, exercise, and interview answer in both languages — one tap to switch.",
      bn: "প্রতিটি লেসন, অনুশীলন ও ইন্টারভিউ উত্তর দুই ভাষাতেই — এক ট্যাপে বদলান।",
    },
  },
  {
    icon: Code2,
    title: { en: "Live Playground", bn: "লাইভ প্লেগ্রাউন্ড" },
    desc: {
      en: "30+ editable examples that run in your browser. Change the code, see results instantly — no setup.",
      bn: "৩০+ এডিটেবল উদাহরণ, ব্রাউজারেই চলে। কোড বদলান, সাথে সাথে ফলাফল দেখুন — কোনো সেটআপ নেই।",
    },
  },
  {
    icon: BookOpenCheck,
    title: { en: "Beginner Friendly", bn: "শুরু থেকেই সহজ" },
    desc: {
      en: "Day 0 covers the JavaScript you need first. Every concept explained with the why, not just the how.",
      bn: "দিন ০-তেই দরকারি জাভাস্ক্রিপ্ট। প্রতিটি কনসেপ্টের 'কীভাবে'র সাথে 'কেন'-ও ব্যাখ্যা করা।",
    },
  },
  {
    icon: Trophy,
    title: { en: "Projects + Interview Prep", bn: "প্রজেক্ট + ইন্টারভিউ প্রস্তুতি" },
    desc: {
      en: "A project every day, a full capstone on Day 7, and 20+ interview questions with model answers.",
      bn: "প্রতিদিন একটি প্রজেক্ট, দিন ৭-এ ক্যাপস্টোন, আর ২০+ ইন্টারভিউ প্রশ্ন মডেল উত্তরসহ।",
    },
  },
];

export function HomeView() {
  const { t, lang } = useLang();
  const { completed } = useProgress();
  const nextDay =
    days.find((d) => !completed.includes(d.id)) ?? days[days.length - 1];

  return (
    <div>
      {/* ===== hero ===== */}
      <section className="relative overflow-hidden">
        {/* bg decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
          <ReactAtom className="absolute -right-10 top-8 h-56 w-56 text-cyan-500/10" />
          <ReactAtom className="absolute -left-16 bottom-0 h-48 w-48 text-violet-500/10" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            {lang === "bn"
              ? "সম্পূর্ণ ফ্রি · ব্রাউজারেই সব"
              : "100% free · everything runs in your browser"}
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            {lang === "bn" ? (
              <>
                ৭ দিনে শিখুন <span className="text-cyan-400">React</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  শূন্য থেকে ক্যাপস্টোন
                </span>
              </>
            ) : (
              <>
                Learn <span className="text-cyan-400">React</span> in 7 Days
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  zero to capstone
                </span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {lang === "bn"
              ? "JS রিভিশন থেকে শুরু করে hooks, API fetching, routing, performance, আর ইন্টারভিউ প্রস্তুতি — সবকিছু এক জায়গায়, বাংলা ও ইংরেজি দুই ভাষায়, লাইভ প্লেগ্রাউন্ডসহ।"
              : "From a JavaScript refresher to hooks, data fetching, routing, performance, and interview prep — everything in one place, in English & Bengali, with a live playground built in."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`#/learn/${nextDay.id}`}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40"
            >
              <Zap className="h-4 w-4" />
              {completed.length > 0 ? UI.continueLearning[lang] : UI.startLearning[lang]}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#/playground"
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
            >
              <Code2 className="h-4 w-4" />
              {UI.playground[lang]}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-cyan-500" />
              {lang === "bn" ? "৮টি দিন (JS প্রস্তুতি + ৭ দিন)" : "8 days (JS prep + 7 days)"}
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-violet-400" />
              {lang === "bn" ? "৩০+ লাইভ উদাহরণ" : "30+ live examples"}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquareQuote className="h-4 w-4 text-emerald-400" />
              {lang === "bn" ? "২০+ ইন্টারভিউ প্রশ্ন" : "20+ interview questions"}
            </span>
          </div>
        </div>
      </section>

      {/* ===== features ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title.en}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-5 transition-colors hover:border-cyan-500/30"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                <f.icon className="h-5 w-5 text-cyan-400" />
              </span>
              <h3 className="font-semibold text-white">{t(f.title)}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                {t(f.desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== roadmap strip ===== */}
      <section className="border-y border-slate-800/80 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {lang === "bn" ? "আপনার লার্নিং পথ" : "Your learning path"}
            </h2>
            <a
              href="#/learn"
              className="flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300"
            >
              {UI.learn[lang]} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {days.map((day) => (
              <a
                key={day.id}
                href={`#/learn/${day.id}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-950/40 p-3.5 transition-all hover:border-cyan-500/40 hover:bg-slate-900/70"
              >
                <span
                  className={
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold " +
                    (day.day === 0
                      ? "bg-amber-500/15 text-amber-300"
                      : "bg-cyan-500/15 text-cyan-300")
                  }
                >
                  {day.day === 0 ? "JS" : day.day}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-slate-200 group-hover:text-white">
                    {t(day.title).replace(/^(Day \d+|দিন \d+)\s*[—-]\s*/, "")}
                  </div>
                  <div className="truncate text-[11px] text-slate-500">
                    {t(day.hours)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <Rocket className="mx-auto mb-4 h-10 w-10 text-violet-400" />
        <h2 className="text-2xl font-bold text-white">
          {lang === "bn"
            ? "রেডি? চলুন শুরু করি।"
            : "Ready? Let's build."}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
          {lang === "bn"
            ? "টিউটোরিয়াল দেখা বাদ দিন — এখানে প্রতিটি উদাহরণ নিজে হাতে চালিয়ে শিখুন। দিন ১-ই আজ।"
            : "No more passive watching — every example here is meant to be broken and rebuilt by you. Day 1 starts today."}
        </p>
        <a
          href="#/learn/day-0"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40"
        >
          {lang === "bn" ? "দিন ০ থেকে শুরু করুন" : "Start with Day 0"}
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
