"use client";

import React, { useState } from "react";
import { Code2, Dumbbell, Timer } from "lucide-react";
import { days } from "@/content";
import type { Exercise } from "@/content/types";
import { useLang, UI } from "@/lib/i18n";
import { Playground } from "./Playground";
import { ExerciseCard } from "./ExerciseCard";
import { cn } from "@/lib/utils";

/* ─────────── free playground starter (exported for testing) ─────────── */
export const FREE_STARTER = `import { useState } from "react";

// 🎉 Welcome to the React playground!
// Everything from "react" is available — just start coding.
// Try: make the button reset the counter to 0.

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Click me!
      </button>
    </div>
  );
}

render(<App />);`;

/* ─────────── timed interview coding challenges ─────────── */
export const codingChallenges: Exercise[] = [
  {
    id: "ch-counter",
    level: 1,
    title: { en: "Challenge 1 — Counter (2 min)", bn: "চ্যালেঞ্জ ১ — কাউন্টার (২ মিনিট)" },
    task: {
      en: "Classic interview opener. Build a counter with +1, -1 and Reset. Stretch: add a +2 button and make it actually add two (the batching trap!).",
      bn: "ইন্টারভিউয়ের ক্লাসিক শুরু। +1, -1 ও Reset সহ কাউন্টার বানান। চ্যালেঞ্জ: একটা +2 বাটন যোগ করুন যা সত্যিই দুই যোগ করে (batching ফাঁদ!)।",
    },
    starter: `import { useState } from "react";

function Counter() {
  // TODO: state + buttons (+1, -1, reset, +2)
  return <div>...</div>;
}

render(<Counter />);`,
    solution: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c - 1)}>−1</button>{" "}
      <button onClick={() => setCount(c => c + 1)}>+1</button>{" "}
      <button onClick={() => setCount(c => c + 1)}>+2</button>{" "}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

render(<Counter />);`,
    hints: [
      { en: "Use functional updates setCount(c => c + 1) so +2 works when chained.", bn: "+2 চেইনে কাজ করাতে functional update setCount(c => c + 1) ব্যবহার করুন।" },
    ],
  },
  {
    id: "ch-todo",
    level: 2,
    title: { en: "Challenge 2 — Todo list (10 min)", bn: "চ্যালেঞ্জ ২ — Todo লিস্ট (১০ মিনিট)" },
    task: {
      en: "The most-asked coding round. Add todos via input + Enter, toggle done on click, delete button per row, and show 'N items left'.",
      bn: "সবচেয়ে বেশি চাওয়া কোডিং রাউন্ড। ইনপুট + Enter-এ যোগ, ক্লিকে done টগল, প্রতি সারিতে ডিলিট বাটন, আর 'N items left' দেখান।",
    },
    starter: `import { useState } from "react";

function TodoApp() {
  // TODO: todos state, text state, add/toggle/remove
  return <div>...</div>;
}

render(<TodoApp />);`,
    solution: `import { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Practice interviews", done: false },
  ]);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setTodos(t => [...t, { id: Date.now(), text, done: false }]);
    setText("");
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && add()}
        placeholder="New todo... (Enter)"
        style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #d1d5db" }}
      />
      <div style={{ marginTop: 10 }}>
        {todos.map(t => (
          <div key={t.id} style={{ display: "flex", gap: 6, padding: "4px 0" }}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() =>
                setTodos(prev =>
                  prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x)
                )
              }
            />
            <span
              onClick={() =>
                setTodos(prev =>
                  prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x)
                )
              }
              style={{
                flex: 1,
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "#9ca3af" : "inherit",
                cursor: "pointer",
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => setTodos(prev => prev.filter(x => x.id !== t.id))}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >🗑️</button>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        {todos.filter(t => !t.done).length} items left
      </p>
    </div>
  );
}

render(<TodoApp />);`,
  },
  {
    id: "ch-debounce",
    level: 3,
    title: { en: "Challenge 3 — Debounced search (15 min)", bn: "চ্যালেঞ্জ ৩ — Debounced সার্চ (১৫ মিনিট)" },
    task: {
      en: "Search box that waits 500ms after typing stops before 'searching'. Show the debounced value live, and a spinner during the delay.",
      bn: "এমন সার্চ বক্স যা টাইপ থামার ৫০০ms পরে 'সার্চ' করে। Debounced ভ্যালু লাইভ দেখান, আর বিলম্বে spinner দেখান।",
    },
    starter: `import { useState, useEffect } from "react";

function Search() {
  const [query, setQuery] = useState("");
  // TODO: debouncedQuery with useEffect + setTimeout + cleanup

  return <div>...</div>;
}

render(<Search />);`,
    solution: `import { useState, useEffect } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (query === debounced) { setWaiting(false); return; }
    setWaiting(true);
    const id = setTimeout(() => {
      setDebounced(query);
      setWaiting(false);
    }, 500);
    return () => clearTimeout(id);   // ← resets on every keystroke
  }, [query, debounced]);

  return (
    <div style={{ maxWidth: 320 }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type quickly..."
        style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #d1d5db" }}
      />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        {waiting && <span style={{ color: "#f59e0b" }}>⏳ debouncing…</span>}
        {!waiting && (debounced
          ? \`🔍 searching for "\${debounced}"\`
          : "waiting for input…")}
      </p>
    </div>
  );
}

render(<Search />);`,
    hints: [
      { en: "The cleanup (clearTimeout) IS the debounce mechanism — every keystroke resets the timer.", bn: "Cleanup (clearTimeout) নিজেই debounce কৌশল — প্রতি কী-প্রেস টাইমার রিসেট করে।" },
    ],
  },
  {
    id: "ch-fetch",
    level: 2,
    title: { en: "Challenge 4 — Fetch with all states (10 min)", bn: "চ্যালেঞ্জ ৪ — সব state সহ fetch (১০ মিনিট)" },
    task: {
      en: "Fetch a random joke from https://api.chucknorris.io/jokes/random on button click. Handle loading, error, and success — and add a refresh button.",
      bn: "বাটন ক্লিকে https://api.chucknorris.io/jokes/random থেকে জোক ফেচ করুন। Loading, error ও success হ্যান্ডল করুন — সাথে refresh বাটন।",
    },
    starter: `import { useState, useEffect } from "react";

function Joke() {
  // TODO: joke, loading, error states
  // TODO: fetch on mount AND on refresh
  return <div>...</div>;
}

render(<Joke />);`,
    solution: `import { useState, useEffect } from "react";

function Joke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const c = new AbortController();
    setLoading(true);
    setError(null);
    fetch("https://api.chucknorris.io/jokes/random", { signal: c.signal })
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(d => setJoke(d.value))
      .catch(e => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));
    return () => c.abort();
  }, [refresh]);

  return (
    <div style={{ maxWidth: 340 }}>
      {loading && <p>⏳ Loading…</p>}
      {error && <p style={{ color: "#ef4444" }}>❌ {error}</p>}
      {!loading && !error && (
        <blockquote style={{ borderLeft: "3px solid #9ca3af", paddingLeft: 10, fontStyle: "italic" }}>
          "{joke}"
        </blockquote>
      )}
      <button onClick={() => setRefresh(r => r + 1)} disabled={loading}>
        {loading ? "Loading…" : "🔄 New joke"}
      </button>
    </div>
  );
}

render(<Joke />);`,
  },
  {
    id: "ch-accordion",
    level: 2,
    title: { en: "Challenge 5 — Accordion (8 min)", bn: "চ্যালেঞ্জ ৫ — অ্যাকর্ডিয়ন (৮ মিনিট)" },
    task: {
      en: "FAQ accordion: clicking a question opens its answer; clicking it again closes; opening one closes others (single-open mode).",
      bn: "FAQ অ্যাকর্ডিয়ন: প্রশ্নে ক্লিক করলে উত্তর খোলে; আবার ক্লিকে বন্ধ; একটা খুললে অন্যগুলো বন্ধ (single-open)।",
    },
    starter: `import { useState } from "react";

const FAQS = [
  { q: "What is React?", a: "A JavaScript library for building UIs." },
  { q: "What is a component?", a: "A reusable piece of UI." },
  { q: "What is state?", a: "A component's changing memory." },
];

function Accordion() {
  // TODO: openIndex state + toggle logic
  return <div>...</div>;
}

render(<Accordion />);`,
    solution: `import { useState } from "react";

const FAQS = [
  { q: "What is React?", a: "A JavaScript library for building user interfaces." },
  { q: "What is a component?", a: "A reusable, independent piece of UI." },
  { q: "What is state?", a: "A component's own changing data that re-renders the UI." },
];

function Accordion() {
  const [open, setOpen] = useState(0);   // first one open initially

  return (
    <div style={{ maxWidth: 340 }}>
      {FAQS.map((f, i) => (
        <div key={i} style={{
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          marginBottom: 6,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", textAlign: "left", padding: 10,
              background: open === i ? "#f1f5f9" : "white",
              border: "none", cursor: "pointer", fontWeight: 600,
              fontSize: 14,
            }}
          >
            {f.q} <span style={{ float: "right" }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p style={{ padding: "8px 12px", margin: 0, fontSize: 13, color: "#4b5563" }}>
              {f.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

render(<Accordion />);`,
  },
  {
    id: "ch-stars",
    level: 2,
    title: { en: "Challenge 6 — Star rating (8 min)", bn: "চ্যালেঞ্জ ৬ — স্টার রেটিং (৮ মিনিট)" },
    task: {
      en: "5 stars: hovering previews the rating, clicking locks it in, and stars up to the (hovered || selected) value are filled gold.",
      bn: "৫ স্টার: hover করলে প্রিভিউ, ক্লিকে নির্বাচন, আর (hovered || selected) পর্যন্ত স্টার সোনালি ভরাট হবে।",
    },
    starter: `import { useState } from "react";

function Stars() {
  // TODO: selected + hovered state
  return <div>...</div>;
}

render(<Stars />);`,
    solution: `import { useState } from "react";

function Stars() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);
  const active = hovered || selected;

  return (
    <div style={{ textAlign: "center" }}>
      <div onMouseLeave={() => setHovered(0)} style={{ fontSize: 40, cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map(n => (
          <span
            key={n}
            onMouseEnter={() => setHovered(n)}
            onClick={() => setSelected(n)}
            style={{
              color: n <= active ? "#f59e0b" : "#d1d5db",
              transition: "color 0.15s",
            }}
          >
            ★
          </span>
        ))}
      </div>
      <p style={{ color: "#6b7280" }}>
        {selected ? \`You rated: \${selected}/5\` : "Hover and click!"}
      </p>
    </div>
  );
}

render(<Stars />);`,
  },
  {
    id: "ch-modal",
    level: 3,
    title: { en: "Challenge 7 — Modal (10 min)", bn: "চ্যালেঞ্জ ৭ — Modal (১০ মিনিট)" },
    task: {
      en: "Open a modal on button click. Close on: backdrop click, the × button, and the Escape key (keyboard listener with cleanup!).",
      bn: "বাটন ক্লিকে modal খুলুন। বন্ধ হবে: backdrop ক্লিক, × বাটন, আর Escape কী-তে (cleanup সহ keyboard listener!)।",
    },
    starter: `import { useState, useEffect } from "react";

function Modal({ open, onClose }) {
  // TODO: Escape key listener with cleanup
  return null; // TODO: backdrop + dialog
}

function App() {
  // TODO: open state + trigger button
  return <div>...</div>;
}

render(<App />);`,
    solution: `import { useState, useEffect } from "react";

function Modal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.5)",
        display: "grid", placeItems: "center", zIndex: 10,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 12, padding: 20,
          minWidth: 260, maxWidth: 320, textAlign: "center",
        }}
      >
        <button
          onClick={onClose}
          style={{ float: "right", border: "none", background: "none", cursor: "pointer", fontSize: 16 }}
        >
          ✕
        </button>
        <h3 style={{ marginTop: 0 }}>👋 I'm a modal!</h3>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Close me with the ✕, the dark backdrop, or press Escape.
        </p>
        <button onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        Hello
      </Modal>
    </div>
  );
}

render(<App />);`,
    hints: [
      { en: "The Escape listener should only exist while the modal is open — guard with if (!open) return.", bn: "Escape listener শুধু modal খোলা থাকতেই থাকবে — if (!open) return দিয়ে আগলান।" },
    ],
  },
];

export function PlaygroundView() {
  const { lang } = useLang();
  const [tab, setTab] = useState<"free" | "challenges" | "exercises">("free");

  const allExercises = days.flatMap((d) => d.exercises);

  const tabs = [
    {
      id: "free" as const,
      label: UI.freePlay[lang],
      icon: Code2,
      count: undefined as number | undefined,
    },
    {
      id: "challenges" as const,
      label: UI.challenges[lang],
      icon: Timer,
      count: codingChallenges.length,
    },
    {
      id: "exercises" as const,
      label: UI.exercises[lang],
      icon: Dumbbell,
      count: allExercises.length,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {UI.playground[lang]}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          {lang === "bn"
            ? "নিজে হাতে না লিখলে শেখা হয় না। ফ্রি এডিটরে যা খুশি বানান, বা টাইমড চ্যালেঞ্জ ও সব দিনের অনুশীলন সমাধান করুন।"
            : "You don't learn by reading — you learn by typing. Use the free editor, or take the timed interview challenges and lesson exercises."}
        </p>
      </header>

      {/* tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
              tab === tb.id
                ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-300"
                : "border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            )}
          >
            <tb.icon className="h-4 w-4" />
            {tb.label}
            {tb.count !== undefined && (
              <span className="rounded-full bg-slate-700/70 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                {tb.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* free playground */}
      {tab === "free" && (
        <Playground code={FREE_STARTER} title="playground.jsx" height={420} />
      )}

      {/* timed challenges */}
      {tab === "challenges" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 text-sm text-violet-200">
            ⏱ {lang === "bn"
              ? "এগুলো আসল ইন্টারভিউ কোডিং রাউন্ডের মতো — প্রতিটির পাশে লক্ষ্য সময় দেওয়া। ঘড়ি ধরে চেষ্টা করুন, তারপর সমাধান মেলান।"
              : "These mirror real interview coding rounds — target time next to each title. Set a timer, attempt honestly, then compare with the solution."}
          </div>
          {codingChallenges.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}
        </div>
      )}

      {/* all lesson exercises */}
      {tab === "exercises" && (
        <div className="space-y-5">
          {allExercises.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
