"use client";

import React from "react";
import { useHashRoute } from "@/lib/router";
import { LangProvider, useLang, UI } from "@/lib/i18n";
import { getDay } from "@/content";
import { Navbar } from "@/components/learning/Navbar";
import { HomeView } from "@/components/learning/HomeView";
import { LearnView } from "@/components/learning/LearnView";
import { LessonView } from "@/components/learning/LessonView";
import { PlaygroundView } from "@/components/learning/PlaygroundView";
import { InterviewView } from "@/components/learning/InterviewView";
import { CheatsheetView } from "@/components/learning/CheatsheetView";
import { ExtrasView } from "@/components/learning/ExtrasView";
import { AiAssistant } from "@/components/learning/AiAssistant";

function Footer() {
  const { lang } = useLang();
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-bold text-slate-300">
            React<span className="text-cyan-400">Jatra</span>
          </span>
          <span>·</span>
          <span>{UI.tagline[lang]}</span>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-slate-600">
          {lang === "bn"
            ? "শিখুন → বানান → ডিপ্লয় করুন। নিজের গতিতে, নিজের ভাষায়।"
            : "Learn → build → ship. At your own pace, in your own language."}
        </p>
      </div>
    </footer>
  );
}

function AppInner() {
  const { segments } = useHashRoute();
  const first = segments[0] ?? "home";

  let content: React.ReactNode;
  let active = first;

  if (first === "learn") {
    const dayId = segments[1];
    const day = dayId ? getDay(dayId) : null;
    if (day) {
      content = <LessonView key={day.id} day={day} />;
    } else {
      content = <LearnView />;
    }
  } else if (first === "playground") {
    content = <PlaygroundView />;
  } else if (first === "interview") {
    content = <InterviewView />;
  } else if (first === "cheatsheet") {
    content = <CheatsheetView />;
  } else if (first === "extras") {
    content = <ExtrasView />;
  } else {
    content = <HomeView />;
    active = "home";
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(8,145,178,0.08),transparent_55%)]">
      <Navbar active={active} />
      <main className="flex-1">{content}</main>
      <Footer />
      <AiAssistant />
    </div>
  );
}

export default function Page() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
