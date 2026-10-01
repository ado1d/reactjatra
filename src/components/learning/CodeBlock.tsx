"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  className?: string;
  maxHeight?: number;
}

export function CodeBlock({
  code,
  title,
  language = "jsx",
  className,
  maxHeight,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  const langLabel = language === "txt" ? "text" : language;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1117] shadow-lg shadow-black/20",
        className
      )}
      dir="ltr"
    >
      {/* header */}
      <div className="flex items-center gap-2 border-b border-slate-700/50 bg-[#161b22] px-3 py-2">
        <FileCode2 className="h-3.5 w-3.5 text-cyan-400" />
        <span className="truncate font-mono text-xs text-slate-300">
          {title || "snippet"}
        </span>
        <span className="ml-1 rounded bg-slate-700/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
          {langLabel}
        </span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-200"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* code */}
      <SyntaxHighlighter
        language={language === "txt" ? "markdown" : language}
        style={vscDarkPlus}
        showLineNumbers={code.split("\n").length > 6}
        customStyle={{
          margin: 0,
          padding: "14px 12px",
          background: "transparent",
          fontSize: "0.8rem",
          lineHeight: 1.6,
        }}
        codeTagProps={{
          style: { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" },
        }}
        {...(maxHeight ? { wrapLongLines: false } : {})}
      >
        {code.trimEnd()}
      </SyntaxHighlighter>
    </div>
  );
}
