"use client";

import React from "react";
import {
  Rocket,
  Palette,
  Blocks,
  Bug,
  FolderTree,
  Server,
  Braces,
  Sparkles,
} from "lucide-react";
import { extraTopics } from "@/content";
import { useLang, UI } from "@/lib/i18n";
import { CodeBlock } from "./CodeBlock";
import { Playground } from "./Playground";

const ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  palette: Palette,
  blocks: Blocks,
  bug: Bug,
  folder: FolderTree,
  server: Server,
  types: Braces,
  sparkles: Sparkles,
};

export function ExtrasView() {
  const { t, lang } = useLang();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <Rocket className="h-7 w-7 text-violet-400" />
          {UI.extras[lang]}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          {lang === "bn"
            ? "৭ দিনের প্ল্যানে যা বাদ ছিল কিন্তু বাস্তব জগতে (আর ইন্টারভিউয়ে) দেখা যাবে — প্রতিটি টপিক কেন শিখবেন তার সাথে।"
            : "What the 7-day plan left out but the real world (and interviews) will show you — each with a reason to learn it."}
        </p>
      </header>

      <div className="space-y-8">
        {extraTopics.map((topic) => {
          const Icon = ICONS[topic.icon] ?? Rocket;
          return (
            <section
              key={topic.id}
              className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-950/15 to-slate-900/40 p-5 sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10">
                  <Icon className="h-5 w-5 text-violet-300" />
                </span>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  {t(topic.title)}
                </h2>
              </div>

              <p className="mb-4 rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 text-[13px] italic leading-relaxed text-violet-200/90">
                {t(topic.why)}
              </p>

              <div className="space-y-3">
                {topic.body.map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.85] text-slate-300">
                    {t(para)}
                  </p>
                ))}

                {topic.code?.map((block, i) => (
                  <CodeBlock
                    key={i}
                    code={block.code}
                    title={block.title}
                    language={block.language}
                  />
                ))}

                {topic.live && (
                  <Playground
                    code={topic.live.code}
                    title={topic.live.title || `${topic.id}.jsx`}
                    height={320}
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
