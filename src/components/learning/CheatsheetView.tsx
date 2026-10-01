"use client";

import React from "react";
import { ScrollText } from "lucide-react";
import { cheatSections } from "@/content";
import { useLang, UI } from "@/lib/i18n";
import { CodeBlock } from "./CodeBlock";

export function CheatsheetView() {
  const { t, lang } = useLang();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <ScrollText className="h-7 w-7 text-amber-400" />
          {UI.cheatsheet[lang]}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          {lang === "bn"
            ? "দ্রুত রেফারেন্স — প্রজেক্ট বানানোর সময় বা ইন্টারভিউয়ের আগের মুহূর্তে চোখ বুলিয়ে নিন।"
            : "Quick reference — scan it while building or in the final minutes before an interview."}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {cheatSections.map((section) => (
          <section
            key={section.id}
            className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4 sm:p-5"
          >
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {t(section.title)}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i}>
                  <div className="mb-1 text-xs font-semibold text-slate-400">
                    {t(item.title)}
                  </div>
                  <CodeBlock
                    code={item.code}
                    language="jsx"
                    title={`#${i + 1}`}
                  />
                  {item.note && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {t(item.note)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
