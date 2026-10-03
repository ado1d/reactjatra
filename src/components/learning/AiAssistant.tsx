"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Bot,
  Check,
  Copy,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useLang, UI } from "@/lib/i18n";
import { useHashRoute } from "@/lib/router";
import { getDay } from "@/content";
import { fixAiMarkdown } from "@/lib/markdown-fix";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "rj-ai-chat";
const SIZE_KEY = "rj-ai-chat-size";

/* Chat panel resizing constraints (px) */
type ResizeMode = "top" | "left" | "corner";
const MIN_W = 320;
const MIN_H = 360;

/** Clamp a width against the viewport (12px margin each side). */
const clampW = (w: number) =>
  Math.min(Math.max(w, MIN_W), Math.max(window.innerWidth - 24, MIN_W));
/** Clamp a height against the viewport (panel sits above the FAB). */
const clampH = (h: number) =>
  Math.min(Math.max(h, MIN_H), Math.max(window.innerHeight - 128, MIN_H));

const SUGGESTIONS: { en: string[]; bn: string[] } = {
  en: [
    "What is a React component?",
    "Explain useState with a simple example",
    "Why do lists need keys in React?",
    "How does useEffect cleanup work?",
  ],
  bn: [
    "রিয়্যাক্ট কম্পোনেন্ট আসলে কী?",
    "useState একটি সহজ উদাহরণ দিয়ে বুঝিয়ে দিন",
    "লিস্টে key কেন দরকার?",
    "useEffect এর cleanup কীভাবে কাজ করে?",
  ],
};

/** Derive a human-readable context string from the current route. */
function useTopicContext(lang: "en" | "bn"): string | undefined {
  const { segments } = useHashRoute();
  return useMemo(() => {
    const first = segments[0] ?? "home";
    if (first === "learn" && segments[1]) {
      const day = getDay(segments[1]);
      if (day) {
        return `Day ${day.day} lesson — ${day.title[lang]} (${day.subtitle[lang]})`;
      }
    }
    switch (first) {
      case "learn":
        return lang === "bn" ? "কোর্স ওভারভিউ (সব দিনের তালিকা)" : "course overview (list of all days)";
      case "playground":
        return lang === "bn" ? "কোড প্ল্যাকগ্রাউন্ড" : "the code playground";
      case "interview":
        return lang === "bn" ? "ইন্টারভিউ প্রশ্ন" : "the interview questions section";
      case "cheatsheet":
        return lang === "bn" ? "চিট শিট" : "the cheat sheet";
      case "extras":
        return lang === "bn"
          ? "৭ দিনের বাইরের অতিরিক্ত বিষয়"
          : "the extra topics beyond the 7 days";
      default:
        return undefined;
    }
  }, [segments, lang]);
}

/* ── Markdown rendering with code highlight + copy ── */

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => <>{children}</>,
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const text = String(children).replace(/\n$/, "");
            const isBlock = Boolean(match) || text.includes("\n");
            if (isBlock) {
              return <MiniCodeBlock code={text} language={match?.[1] || "jsx"} />;
            }
            return (
              <code
                dir="ltr"
                className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[0.8em] text-cyan-300"
                {...props}
              >
                {children}
              </code>
            );
          },
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-1 pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-1 pl-5">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-100">{children}</strong>
          ),
          h1: ({ children }) => (
            <h3 className="mb-1 mt-2 text-base font-bold text-slate-100">{children}</h3>
          ),
          h2: ({ children }) => (
            <h3 className="mb-1 mt-2 text-base font-bold text-slate-100">{children}</h3>
          ),
          h3: ({ children }) => (
            <h4 className="mb-1 mt-2 text-sm font-bold text-slate-100">{children}</h4>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-2 border-l-2 border-cyan-500/60 pl-3 text-slate-300">
              {children}
            </blockquote>
          ),
          /* GFM tables — styled for the dark chat panel, scrollable when wide */
          table: ({ children }) => (
            <div className="my-2.5 overflow-x-auto rounded-lg border border-slate-700/60 bg-slate-800/30">
              <table className="w-full min-w-max border-collapse text-left text-xs leading-snug">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800/70">{children}</thead>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-slate-700/50 last:border-b-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="whitespace-nowrap px-2.5 py-2 font-semibold text-cyan-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-2.5 py-2 align-top text-slate-300">{children}</td>
          ),
        }}
      >
        {fixAiMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}

function MiniCodeBlock({ code, language }: { code: string; language: string }) {
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

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-slate-700/60 bg-[#0d1117]" dir="ltr">
      <div className="flex items-center gap-2 border-b border-slate-700/50 bg-[#161b22] px-3 py-1.5">
        <span className="rounded bg-slate-700/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
          {language}
        </span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="ml-auto flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language === "txt" ? "markdown" : language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "10px 12px",
          background: "transparent",
          fontSize: "0.75rem",
          lineHeight: 1.55,
        }}
        codeTagProps={{
          style: { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/* ── One chat bubble ── */

function MessageBubble({
  message,
  streaming,
}: {
  message: ChatMessage;
  streaming?: boolean;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-gradient-to-br from-cyan-500 to-teal-500 px-4 py-2.5 text-sm text-white shadow-lg shadow-cyan-500/10">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 shadow-md shadow-cyan-500/20">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="min-w-0 max-w-[92%] rounded-2xl rounded-tl-md border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-slate-200">
        <MarkdownContent content={message.content} />
        {streaming && (
          <span className="ml-0.5 inline-block h-4 w-2 animate-pulse rounded-[2px] bg-cyan-400 align-middle" />
        )}
      </div>
    </div>
  );
}

/* ── Main component ── */

export function AiAssistant() {
  const { lang } = useLang();
  const topic = useTopicContext(lang);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);

  /* resizable panel state (null size = responsive CSS default) */
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [maximized, setMaximized] = useState(false);
  const [dragging, setDragging] = useState<ResizeMode | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<{ w: number; h: number } | null>(null);

  /* load persisted conversation + panel size (post-hydration) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) {
          setMessages(parsed.filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          ));
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    try {
      const rawSize = localStorage.getItem(SIZE_KEY);
      if (rawSize) {
        const parsed = JSON.parse(rawSize) as { w?: unknown; h?: unknown };
        if (typeof parsed.w === "number" && typeof parsed.h === "number") {
          setSize({ w: clampW(parsed.w), h: clampH(parsed.h) });
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  /* persist on change */
  useEffect(() => {
    try {
      if (messages.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* storage full / unavailable */
    }
  }, [messages]);

  /* auto-scroll to newest message while streaming/typing */
  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    }
  }, []);

  useEffect(() => {
    if (open) scrollToBottom(false);
  }, [open, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /* focus input when opening */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* track desktop breakpoint — controls which resize handles & styles apply */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* keep a ref of the latest size so pointerup can persist it */
  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  /* re-clamp stored size when the viewport shrinks (rotate / window resize) */
  useEffect(() => {
    const onResize = () => {
      setSize((s) => {
        if (!s) return s;
        const w = clampW(s.w);
        const h = clampH(s.h);
        if (w === s.w && h === s.h) return s;
        return { w, h };
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* global cursor + text-selection lock while dragging a resize handle */
  useEffect(() => {
    if (!dragging) return;
    const cursor =
      dragging === "top" ? "ns-resize" : dragging === "left" ? "ew-resize" : "nwse-resize";
    document.body.style.cursor = cursor;
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [dragging]);

  /* ── send a message ── */
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;

      const userMsg: ChatMessage = { role: "user", content: trimmed.slice(0, 2000) };
      const history = [...messages, userMsg];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setError(null);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            lang,
            topic,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let msg = UI.aiError[lang];
          try {
            const data = await res.json();
            if (data?.error) msg = data.error;
          } catch {
            /* non-JSON error body */
          }
          throw new Error(msg);
        }

        setProvider(res.headers.get("X-AI-Provider"));

        const reader = res.body?.getReader();
        if (!reader) throw new Error(UI.aiError[lang]);

        const decoder = new TextDecoder();
        let acc = "";
        let lastPaint = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const now = performance.now();
          if (now - lastPaint > 40) {
            lastPaint = now;
            const snapshot = acc;
            setMessages((prev) => {
              const next = [...prev];
              if (next.length && next[next.length - 1].role === "assistant") {
                next[next.length - 1] = { role: "assistant", content: snapshot };
              }
              return next;
            });
          }
        }
        const finalText = acc + decoder.decode();
        if (!finalText.trim()) throw new Error(UI.aiError[lang]);
        setMessages((prev) => {
          const next = [...prev];
          if (next.length && next[next.length - 1].role === "assistant") {
            next[next.length - 1] = { role: "assistant", content: finalText };
          }
          return next;
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          // user stopped generation — keep whatever was streamed
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant" && !last.content.trim()) {
              next.pop(); // nothing streamed — remove empty bubble
            }
            return next.length ? next : prev;
          });
        } else {
          setError((err as Error).message || UI.aiError[lang]);
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant" && !last.content.trim()) {
              next.pop();
            }
            return next.length ? next : prev;
          });
        }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, lang, messages, topic]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setProvider(null);
  }, []);

  const onKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  /* auto-resize textarea */
  const onInputChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  /* ── panel resizing ── */

  /** Double-click any handle to go back to the responsive default size. */
  const resetSize = useCallback(() => {
    setSize(null);
    try {
      localStorage.removeItem(SIZE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  /* last pointerdown per handle — used for manual double-click detection
     (preventDefault on pointerdown suppresses the native dblclick event) */
  const lastDownRef = useRef<{
    t: number;
    x: number;
    y: number;
    mode: ResizeMode;
  } | null>(null);

  /** Begin dragging a resize handle. Works for mouse + touch via Pointer Events. */
  const startResize = useCallback(
    (mode: ResizeMode) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (maximized) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const el = panelRef.current;
      if (!el) return;

      /* quick second tap on the same handle → reset to default size */
      const now = performance.now();
      const last = lastDownRef.current;
      if (
        last &&
        last.mode === mode &&
        now - last.t < 400 &&
        Math.hypot(e.clientX - last.x, e.clientY - last.y) < 12
      ) {
        lastDownRef.current = null;
        resetSize();
        return;
      }
      lastDownRef.current = { t: now, x: e.clientX, y: e.clientY, mode };

      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const startX = e.clientX;
      const startY = e.clientY;
      const startW = rect.width;
      const startH = rect.height;
      setDragging(mode);

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        // panel is anchored bottom-right, so dragging left/up grows it
        const w = mode === "top" ? clampW(startW) : clampW(startW - dx);
        const h = mode === "left" ? clampH(startH) : clampH(startH - dy);
        setSize({ w, h });
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        setDragging(null);
        try {
          if (sizeRef.current) {
            localStorage.setItem(SIZE_KEY, JSON.stringify(sizeRef.current));
          }
        } catch {
          /* storage unavailable */
        }
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [maximized, resetSize]
  );

  /* inline size only once the user has resized (CSS classes are the default) */
  const panelStyle = useMemo(() => {
    if (maximized || !size) return undefined;
    const h = clampH(size.h);
    return isDesktop ? { width: clampW(size.w), height: h } : { height: h };
  }, [size, isDesktop, maximized]);

  const suggestions = SUGGESTIONS[lang];
  const isBengali = lang === "bn";

  return (
    <>
      {/* Floating action button */}
      <motion.button
        type="button"
        aria-label={UI.aiAsk[lang]}
        onClick={() => {
          setOpen(true);
          setEverOpened(true);
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-xl shadow-cyan-500/30",
          "transition-shadow hover:shadow-cyan-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        )}
      >
        {!everOpened && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-400/60 [animation-duration:2.2s]" />
        )}
        <Sparkles className="h-6 w-6" />
        <span
          className={cn(
            "absolute -top-1 -left-1 flex h-5 items-center rounded-full bg-slate-950 px-2 text-[10px] font-semibold tracking-wide text-cyan-300 shadow ring-1 ring-cyan-500/50",
            isBengali && "font-bengali"
          )}
        >
          {UI.aiAsk[lang]}
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={UI.aiTutorName[lang]}
            ref={panelRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={panelStyle}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl",
              maximized
                ? "inset-2 sm:inset-4"
                : "inset-x-3 bottom-3 h-[72dvh] sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[410px]",
              dragging && "select-none"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 shadow-md shadow-cyan-500/25">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-sm font-bold text-slate-100", isBengali && "font-bengali")}>
                  {UI.aiTutorName[lang]} · ReactJatra
                </p>
                <p className={cn("truncate text-xs text-slate-400", isBengali && "font-bengali")}>
                  {UI.aiTutorRole[lang]}
                </p>
              </div>
              {provider && (
                <span className="hidden items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] font-medium text-cyan-300 sm:flex">
                  <Zap className="h-3 w-3" />
                  {provider === "groq" ? "Groq" : "AI"}
                </span>
              )}
              <button
                onClick={() => setMaximized((m) => !m)}
                aria-label={maximized ? UI.aiRestore[lang] : UI.aiMaximize[lang]}
                title={maximized ? UI.aiRestore[lang] : UI.aiMaximize[lang]}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-300"
              >
                {maximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={clearChat}
                aria-label={UI.aiClear[lang]}
                title={UI.aiClear[lang]}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label={UI.aiClose[lang]}
                title={UI.aiClose[lang]}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className={cn(
                "flex-1 space-y-4 overflow-y-auto px-4 py-4",
                maximized && "mx-auto w-full max-w-3xl"
              )}
            >
              {messages.length === 0 && !busy && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 shadow-md shadow-cyan-500/20">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className={cn("rounded-2xl rounded-tl-md border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-sm leading-relaxed text-slate-200", isBengali && "font-bengali")}>
                      {UI.aiWelcome[lang]}
                    </div>
                  </div>
                  <div>
                    <p className={cn("mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500", isBengali && "font-bengali")}>
                      {UI.aiSuggestions[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className={cn(
                            "rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-200 transition-all",
                            "hover:border-cyan-400/60 hover:bg-cyan-500/20 hover:text-cyan-100",
                            isBengali && "font-bengali"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <MessageBubble
                  key={i}
                  message={m}
                  streaming={busy && i === messages.length - 1 && m.role === "assistant"}
                />
              ))}

              {busy && messages[messages.length - 1]?.content === "" && (
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-700/60 bg-slate-800/60 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                    <span className={cn("ml-1 text-xs text-slate-400", isBengali && "font-bengali")}>
                      {UI.aiThinking[lang]}…
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center">
                  <p className={cn("text-xs text-rose-300", isBengali && "font-bengali")}>{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      const lastUser = [...messages].reverse().find((m) => m.role === "user");
                      if (lastUser) send(lastUser.content);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-medium text-rose-200 transition-colors hover:bg-rose-500/30",
                      isBengali && "font-bengali"
                    )}
                  >
                    <RotateCcw className="h-3 w-3" />
                    {UI.aiRetry[lang]}
                  </button>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-slate-800 bg-slate-900/80 p-3">
              <div
                className={cn(
                  "flex items-end gap-2",
                  maximized && "mx-auto w-full max-w-3xl"
                )}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={onInputChanged}
                  onKeyDown={onKeydown}
                  rows={1}
                  placeholder={UI.aiPlaceholder[lang]}
                  disabled={busy}
                  className={cn(
                    "flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-sm text-slate-100",
                    "placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/60",
                    "disabled:opacity-50",
                    isBengali && "font-bengali"
                  )}
                />
                {busy ? (
                  <button
                    onClick={stop}
                    aria-label={UI.aiStop[lang]}
                    title={UI.aiStop[lang]}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-slate-200 transition-colors hover:bg-slate-600"
                  >
                    <Square className="h-4 w-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim()}
                    aria-label={UI.aiSend[lang]}
                    title={UI.aiSend[lang]}
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-500/25",
                      "transition-all hover:shadow-cyan-400/40 disabled:opacity-40 disabled:shadow-none"
                    )}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p
                className={cn(
                  "mt-2 text-center text-[10px] text-slate-500",
                  isBengali && "font-bengali",
                  maximized && "mx-auto max-w-3xl"
                )}
              >
                {UI.aiDisclaimer[lang]} · {UI.aiPoweredBy[lang]}
              </p>
            </div>

            {/* Resize handles (hidden while maximized) */}
            {!maximized && (
              <>
                {/* Top edge — height (all screens) */}
                <div
                  role="separator"
                  aria-label={UI.aiResizeHint[lang]}
                  title={UI.aiResizeHint[lang]}
                  onPointerDown={startResize("top")}
                  onDoubleClick={resetSize}
                  className="group absolute left-4 right-4 top-0 z-20 flex h-2.5 cursor-ns-resize touch-none items-start justify-center"
                >
                  <span className="mt-0.5 h-[3px] w-10 rounded-full bg-slate-600/80 transition-colors group-hover:bg-cyan-400" />
                </div>
                {/* Left edge — width (desktop) */}
                <div
                  role="separator"
                  aria-label={UI.aiResizeHint[lang]}
                  title={UI.aiResizeHint[lang]}
                  onPointerDown={startResize("left")}
                  onDoubleClick={resetSize}
                  className="group absolute bottom-10 left-0 top-10 z-20 hidden w-2.5 cursor-ew-resize touch-none items-center justify-center sm:flex"
                >
                  <span className="h-9 w-[3px] rounded-full bg-slate-600/0 transition-colors group-hover:bg-cyan-400" />
                </div>
                {/* Top-left corner — both (desktop) */}
                <div
                  role="separator"
                  aria-label={UI.aiResizeHint[lang]}
                  title={UI.aiResizeHint[lang]}
                  onPointerDown={startResize("corner")}
                  onDoubleClick={resetSize}
                  className="group absolute left-0 top-0 z-20 hidden h-6 w-6 cursor-nwse-resize touch-none items-start justify-start sm:flex"
                >
                  <svg
                    className="ml-1 mt-1 text-slate-500 transition-colors group-hover:text-cyan-400"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    aria-hidden="true"
                  >
                    <line x1="7.5" y1="1.5" x2="1.5" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="7.5" y1="5" x2="5" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
