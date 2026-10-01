"use client";

import React, { useState } from "react";
import {
  Home,
  GraduationCap,
  Code2,
  MessageSquareQuote,
  ScrollText,
  Rocket,
  Languages,
  Menu,
  X,
} from "lucide-react";
import { useLang, UI } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { id: "home", href: "#/", en: "Home", bn: "হোম", icon: Home },
  { id: "learn", href: "#/learn", en: "Learn", bn: "শেখা", icon: GraduationCap },
  { id: "playground", href: "#/playground", en: "Playground", bn: "প্র্যাকটিস", icon: Code2 },
  { id: "interview", href: "#/interview", en: "Interview", bn: "ইন্টারভিউ", icon: MessageSquareQuote },
  { id: "cheatsheet", href: "#/cheatsheet", en: "Cheat Sheet", bn: "চিট শিট", icon: ScrollText },
  { id: "extras", href: "#/extras", en: "Beyond 7 Days", bn: "বাইরে", icon: Rocket },
] as const;

/** Logo mark: React atom */
function AtomLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="5" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.85">
        <ellipse cx="32" cy="32" rx="28" ry="12" />
        <ellipse cx="32" cy="32" rx="28" ry="12" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="28" ry="12" transform="rotate(120 32 32)" />
      </g>
    </svg>
  );
}

export function Navbar({ active }: { active: string }) {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        {/* logo */}
        <a href="#/" className="flex items-center gap-2.5" aria-label="ReactJatra home">
          <AtomLogo className="h-8 w-8 text-cyan-400" />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-white">
              React<span className="text-cyan-400">Jatra</span>
            </div>
            <div className="hidden text-[10px] font-medium text-slate-400 sm:block">
              {UI.tagline[lang]}
            </div>
          </div>
        </a>

        {/* desktop nav */}
        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
                active === item.id
                  ? "bg-cyan-500/15 text-cyan-300"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {lang === "bn" ? item.bn : item.en}
            </a>
          ))}

          {/* language toggle */}
          <button
            onClick={toggle}
            className="ml-2 flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-[13px] font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {UI.language[lang]}
          </button>
        </nav>

        {/* mobile controls */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1.5 text-xs font-semibold text-cyan-300"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {UI.language[lang]}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <nav
          className="border-t border-slate-800 bg-slate-950/95 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium",
                  active === item.id
                    ? "bg-cyan-500/15 text-cyan-300"
                    : "text-slate-300 hover:bg-slate-800"
                )}
              >
                <item.icon className="h-4 w-4" />
                {lang === "bn" ? item.bn : item.en}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
