"use client";

import React, { useMemo, useState } from "react";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from "react-live";
import * as ReactModule from "react";
import { Play, RotateCcw, Sparkles } from "lucide-react";
import { useLang, UI } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* Full React export surface available to playground code.
   NOTE: keys become function parameters inside react-live's eval,
   so they MUST be non-reserved identifiers (filter out `default`, etc.). */
const RESERVED = new Set([
  "default", "class", "function", "var", "let", "const", "new", "return",
  "if", "else", "for", "while", "do", "switch", "case", "break", "continue",
  "typeof", "instanceof", "in", "of", "this", "super", "extends", "delete",
  "void", "yield", "await", "enum", "implements", "interface", "package",
  "private", "protected", "public", "static", "import", "export", "null",
  "true", "false", "with", "debugger", "throw", "try", "catch", "finally",
  "arguments", "eval",
]);

const reactScope: Record<string, unknown> = {};
for (const [key, value] of Object.entries(ReactModule)) {
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) && !RESERVED.has(key)) {
    reactScope[key] = value;
  }
}
reactScope.require = (name: string) => {
  if (name === "react") return ReactModule;
  throw new Error(
    `Module "${name}" is not available in this playground — only 'react' can be imported.`
  );
};

/** Remove single-line import statements; hooks come from scope instead */
function stripImports(code: string): string {
  return code
    .split("\n")
    .filter((line) => !/^\s*import\s.+?;?\s*$/.test(line))
    .join("\n")
    .trim();
}

/* Editor theme (prism-react-renderer format) */
const editorTheme = {
  plain: {
    color: "#e2e8f0",
    backgroundColor: "transparent",
    fontFamily:
      "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: "13px",
  },
  styles: [
    { types: ["comment", "prolog", "cdata"], style: { color: "#7d8590", fontStyle: "italic" } },
    { types: ["punctuation", "operator"], style: { color: "#94a3b8" } },
    { types: ["keyword", "control"], style: { color: "#c084fc" } },
    { types: ["builtin", "class-name", "maybe-class-name"], style: { color: "#4dd0e1" } },
    { types: ["function"], style: { color: "#82aaff" } },
    { types: ["string", "char", "attr-value"], style: { color: "#c3e88d" } },
    { types: ["number", "boolean"], style: { color: "#f78c6c" } },
    { types: ["tag"], style: { color: "#f07178" } },
    { types: ["attr-name"], style: { color: "#ffcb6b" } },
    { types: ["variable", "constant"], style: { color: "#e2e8f0" } },
    { types: ["selector"], style: { color: "#f07178" } },
  ] as unknown as never,
};

interface PlaygroundProps {
  code: string;
  title?: string;
  className?: string;
  initialCollapsed?: boolean;
  /** compact height (embedded in lessons) vs tall (free playground) */
  height?: number;
}

export function Playground({
  code,
  title,
  className,
  initialCollapsed = false,
  height = 300,
}: PlaygroundProps) {
  const { lang } = useLang();
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [liveCode, setLiveCode] = useState(code);
  const [resetKey, setResetKey] = useState(0);

  // executed code = editor code minus imports (hooks come from scope)
  const runCode = useMemo(() => stripImports(liveCode), [liveCode]);

  function reset() {
    setLiveCode(code);
    setResetKey((k) => k + 1);
  }

  return (
    <LiveProvider
      code={runCode}
      scope={reactScope}
      noInline
      theme={editorTheme as never}
    >
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-cyan-500/30 bg-[#0d1117] shadow-lg shadow-cyan-950/20",
        className
      )}
      dir="ltr"
    >
      {/* header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/60 to-slate-900 px-3 py-2">
        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
        <span className="font-mono text-xs text-cyan-200">
          {title || "playground.jsx"}
        </span>
        <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300">
          {UI.tryIt[lang]}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={reset}
            title={UI.reset[lang]}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-200"
          >
            <RotateCcw className="h-3 w-3" />
            {UI.reset[lang]}
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-700/60"
          >
            <Play className="h-3 w-3" />
            {collapsed ? UI.tryIt[lang] : UI.hidePreview[lang]}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="grid md:grid-cols-2">
            {/* editor */}
            <div className="border-b border-slate-700/50 md:border-b-0 md:border-r">
              <div className="flex items-center gap-1.5 border-b border-slate-800 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                <span className="ml-2 font-mono text-[10px] text-slate-500">
                  {UI.runnableHint[lang]}
                </span>
              </div>
              <div
                className="overflow-auto bg-[#0d1117] py-2 text-[13px] [&_textarea]:outline-none"
                style={{ height }}
              >
                <LiveEditor
                  key={resetKey}
                  code={liveCode}
                  theme={editorTheme}
                  onChange={(newCode) => setLiveCode(newCode)}
                  style={{
                    backgroundColor: "transparent",
                    fontSize: 13,
                    minHeight: "100%",
                    fontFamily:
                      "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                  padding={12}
                  tabSize={2}
                />
              </div>
            </div>

            {/* preview */}
            <div className="relative flex flex-col bg-slate-100">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                  preview
                </span>
              </div>
              <div
                className="flex flex-1 items-start justify-center overflow-auto p-4 [&>*]:max-w-full"
                style={{ height }}
              >
                <LivePreview />
              </div>
            </div>
          </div>

          <LiveError
            style={{
              backgroundColor: "#450a0a",
              color: "#fecaca",
              padding: "10px 14px",
              fontSize: 12,
              fontFamily: "var(--font-geist-mono), monospace",
              whiteSpace: "pre-wrap",
              margin: 0,
            }}
          />
        </>
      )}
    </div>
    </LiveProvider>
  );
}
