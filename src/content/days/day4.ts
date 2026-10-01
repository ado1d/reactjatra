import type { Day } from "../types";

export const day4: Day = {
  id: "day-4",
  day: 4,
  icon: "hooks",
  hours: { en: "2 hrs learn · 3 hrs build", bn: "২ ঘণ্টা শেখা · ৩ ঘণ্টা বানানো" },
  title: { en: "Day 4 — Advanced Hooks", bn: "দিন ৪ — অ্যাডভান্সড হুকস" },
  subtitle: {
    en: "useRef for DOM & values, useContext to kill prop drilling, useReducer for complex state, and your own custom hooks.",
    bn: "DOM ও ভ্যালুর জন্য useRef, prop drilling মারতে useContext, জটিল state-এ useReducer, আর আপনার নিজের custom hook।",
  },
  tagline: {
    en: "useRef, useContext, useReducer, custom hooks.",
    bn: "useRef, useContext, useReducer, custom hook।",
  },
  goals: [
    { en: "Use useRef for DOM access and persisting values", bn: "DOM অ্যাক্সেস ও ভ্যালু রাখতে useRef ব্যবহার করা" },
    { en: "Share state across the tree with Context", bn: "Context দিয়ে পুরো ট্রিতে state শেয়ার করা" },
    { en: "Manage complex state with useReducer", bn: "useReducer দিয়ে জটিল state ম্যানেজ করা" },
    { en: "Write reusable custom hooks (useLocalStorage, useFetch, useDebounce)", bn: "পুনর্ব্যবহারযোগ্য custom hook লেখা (useLocalStorage, useFetch, useDebounce)" },
    { en: "Know when to use which tool (decision table)", bn: "কোন টুল কখন (ডিসিশন টেবিল) জানা" },
  ],
  sections: [
    {
      id: "useref",
      title: { en: "useRef — the silent worker", bn: "useRef — চুপচাপ কাজী" },
      body: [
        {
          en: "useRef returns a box ({ current }) that survives re-renders but does NOT trigger them when changed. Two jobs: (1) grabbing DOM elements (focus an input, scroll to a node, play a video), (2) storing mutable values that changes shouldn't re-render (previous value, timer id, \"how many times did this render\").",
          bn: "useRef একটা বাক্স ({ current }) দেয় যেটা re-render উত্তরণ করে বাঁচে, কিন্তু বদলালে re-render ডাকে না। দুটো কাজ: (১) DOM এলিমেন্ট ধরা (ইনপুটে ফোকাস, নোডে স্ক্রল, ভিডিও প্লে), (২) এমন mutable ভ্যালু রাখা যেগুলোর বদলে re-render লাগে না (আগের ভ্যালু, টাইমার id, \"কতবার render হলো\")।",
        },
      ],
      code: [
        {
          title: "useref.jsx",
          language: "jsx",
          code: `import { useRef, useState, useEffect } from "react";

function Demo() {
  // 1) DOM REF — the element itself, not a copy
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();         // real DOM method!
    inputRef.current.select();
  }

  // 2) VALUE REF — survives renders, silent updates
  const renderCount = useRef(0);
  renderCount.current++;              // mutating is FINE for refs

  // 3) previous value pattern
  const [name, setName] = useState("");
  const prevName = useRef("");
  useEffect(() => {
    prevName.current = name;          // save old value after render
  }, [name]);

  return (
    <div>
      <input ref={inputRef} value={name}
             onChange={e => setName(e.target.value)} />
      <button onClick={focusInput}>Focus & select</button>
      <p>render #{renderCount.current}</p>
      <p>Previous name: {prevName.current || "—"}</p>
    </div>
  );
}`,
        },
        {
          title: "useState vs useRef — when to use which",
          language: "txt",
          code: `useState                     useRef
────────                     ──────
re-renders on change         NO re-render on change
immutable updates only       mutate .current freely
for data the UI shows        for data the UI doesn't
                             show (or DOM nodes)

RULE: if it appears in JSX → useState.
If it's for logic/DOM only → useRef.`,
        },
      ],
      live: {
        title: "Try it — focus control & render counter",
        language: "jsx",
        code: `import { useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const renders = useRef(0);
  renders.current++;

  const [text, setText] = useState("");

  return (
    <div style={{ maxWidth: 340 }}>
      <input
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something..."
        style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 6, width: "100%" }}
      />
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <button onClick={() => inputRef.current.focus()}>🎯 Focus</button>
        <button onClick={() => inputRef.current.select()}>Select all</button>
        <button onClick={() => {
          setText("");
          inputRef.current.focus();
        }}>Clear + focus</button>
      </div>
      <p style={{ color: "#6b7280", fontSize: 14 }}>
        Renders so far: {renders.current} — typing re-renders (state!),
        but the counter itself never causes one (ref!).
      </p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "usecontext",
      title: { en: "useContext — kill the prop drilling", bn: "useContext — prop drilling এর মৃত্যু" },
      body: [
        {
          en: "Prop drilling: passing props through 5 layers of components that don't use them, just so the 6th can. Context solves this — a parent provides a value ONCE, and ANY descendant consumes it directly, no matter how deep. Perfect for themes, current user, and language — data that's \"global\" to a section of your app.",
          bn: "Prop drilling: ৬ষ্ঠ component-এর দরকার বলে ৫ স্তরের মধ্য দিয়ে এমন props পাঠানো যেগুলো ওরা নিজেরা ব্যবহারই করে না। Context এটার সমাধান — parent একবার value provide করে, আর যেকোনো descendant সরাসরি সেটা consume করে, কত গভীরেই হোক না কেন। থিম, বর্তমান ইউজার, ভাষা — অ্যাপের কোনো অংশের \"গ্লোবাল\" ডেটার জন্য পারফেক্ট।",
        },
        {
          en: "Three steps: create the context, wrap the tree in the Provider with a value, call useContext(ThatContext) wherever needed. The consumer re-renders whenever the provider value changes.",
          bn: "তিন ধাপ: context বানান, Provider দিয়ে ট্রি মুড়ে ভ্যালু দিন, যেখানে দরকার useContext(সেই Context) কল করুন। Provider-এর ভ্যালু বদলালে consumer re-render হয়।",
        },
      ],
      code: [
        {
          title: "theme-context.jsx — the standard 3-step",
          language: "jsx",
          code: `import { createContext, useContext, useState } from "react";

// STEP 1 — create the context (export it!)
const ThemeContext = createContext(null);

// STEP 2 — a provider component (often kept in its own file)
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// STEP 3 — consume it ANYWHERE below the provider.
// No props needed in between components!
function Toolbar() {          // doesn't know about theme ✅
  return <ThemedButton />;
}

function ThemedButton() {     // deep child gets it directly!
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button onClick={toggle} className={theme}>
      Current: {theme}
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Toolbar />
    </ThemeProvider>
  );
}`,
        },
      ],
      live: {
        title: "Try it — dark mode via context",
        language: "jsx",
        code: `import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Deep children — no props passed through!
function Card() {
  const { dark } = useContext(ThemeContext);
  return (
    <div style={{
      background: dark ? "#1f2937" : "white",
      color: dark ? "#f9fafb" : "#111827",
      padding: 16, borderRadius: 12, margin: 8,
      border: "1px solid " + (dark ? "#374151" : "#e5e7eb"),
      transition: "all 0.3s",
    }}>
      <h3 style={{ margin: 0 }}>🎨 Theme card</h3>
      <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.7 }}>
        I'm styled by context — my ancestors never saw a prop!
      </p>
    </div>
  );
}

function ToggleButton() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <button onClick={() => setDark(d => !d)}>
      {dark ? "☀️ Switch to light" : "🌙 Switch to dark"}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: 8 }}>
        <ToggleButton />
        <Card />
      </div>
    </ThemeProvider>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "warn",
          text: {
            en: "Context is NOT a global state manager. Every consumer re-renders when the value changes — so don't put rapidly-changing data (like keystrokes) in a context that 50 components read. Keep value objects memoized (wrap the object in useMemo — Day 6) or split contexts.",
            bn: "Context কোনো গ্লোবাল state ম্যানেজার নয়। value বদলালে সব consumer re-render হয় — তাই দ্রুত বদলানো ডেটা (যেমন কী-প্রেস) এমন context-এ রাখবেন না যেটা ৫০টা component পড়ে। value অবজেক্ট memoize রাখুন (Day 6-এ useMemo) বা context ভাগ করুন।",
          },
        },
      ],
    },
    {
      id: "usereducer",
      title: { en: "useReducer — complex state, clean logic", bn: "useReducer — জটিল state, পরিষ্কার লজিক" },
      body: [
        {
          en: "When state updates depend on each other, or one action changes several fields, useState grows messy. useReducer centralizes ALL update logic in one pure function: (state, action) => newState. Components just dispatch(\"WHAT happened\") and the reducer decides \"HOW state changes\". This makes bugs easy to trace — you can log every action like a replay log.",
          bn: "State আপডেটগুলো পরস্পরনির্ভর হলে, বা এক action-এ অনেক field বদলালে, useState এলোমেলো হয়ে যায়। useReducer সব আপডেট লজিক এক pure ফাংশনে কেন্দ্রীভূত করে: (state, action) => newState। Component শুধু dispatch করে (\"কী ঘটেছে\") আর reducer ঠিক করে (\"state কীভাবে বদলাবে\")। এতে বাগ খুঁজে বের করা সহজ — প্রতিটা action রিপ্লে লগের মতো দেখতে পারেন।",
        },
      ],
      code: [
        {
          title: "cart-reducer.jsx",
          language: "jsx",
          code: `import { useReducer } from "react";

// The reducer: a PURE function — same input, same output,
// no side effects. Easy to test!
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter(i => i.id !== action.id);
    case "SET_QTY":
      return state
        .map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
        .filter(i => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function Cart() {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Components say WHAT happened; the reducer decides HOW.
  return (
    <div>
      <button onClick={() =>
        dispatch({ type: "ADD_ITEM", item: { id: 1, name: "Tea", price: 20 } })
      }>Add tea</button>

      <button onClick={() =>
        dispatch({ type: "SET_QTY", id: 1, qty: 0 })
      }>Remove all tea</button>

      <button onClick={() => dispatch({ type: "CLEAR" })}>Clear cart</button>

      <p>{items.length} items</p>
    </div>
  );
}`,
        },
        {
          title: "useState vs useReducer — the decision",
          language: "txt",
          code: `useState                          useReducer
────────                          ──────────
primitive values                  multiple related fields
1-2 update patterns               many update patterns
independent updates              updates that depend on
                                  each other / business rules
small components                  anything cart/checkout-like

Rule of thumb: when you write
setX(prev => complex logic...),
it's time for useReducer.`,
        },
      ],
      live: {
        title: "Try it — shopping cart with useReducer",
        language: "jsx",
        code: `import { useReducer } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const found = state.find(i => i.id === action.item.id);
      if (found) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "DEC":
      return state
        .map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const PRODUCTS = [
  { id: "t", name: "🍵 Tea", price: 15 },
  { id: "c", name: "☕ Coffee", price: 40 },
  { id: "b", name: "🍞 Bun", price: 10 },
];

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ maxWidth: 380 }}>
      <h3>🛍️ Menu</h3>
      {PRODUCTS.map(p => (
        <button key={p.id} onClick={() => dispatch({ type: "ADD", item: p })}>
          + {p.name} ৳{p.price}
        </button>
      ))}

      <h3>🧾 Cart {cart.length > 0 && \`(\${cart.reduce((s,i)=>s+i.qty,0)} items)\`}</h3>
      {cart.map(i => (
        <div key={i.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ flex: 1 }}>{i.name} × {i.qty}</span>
          <span>৳{i.price * i.qty}</span>
          <button onClick={() => dispatch({ type: "DEC", id: i.id })}>−</button>
        </div>
      ))}
      {cart.length === 0 && <p style={{ color: "#9ca3af" }}>Empty — add something!</p>}
      <h4>Total: ৳{total}</h4>
      {cart.length > 0 && <button onClick={() => dispatch({ type: "CLEAR" })}>Clear</button>}
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "custom-hooks",
      title: { en: "Custom Hooks — your superpower", bn: "Custom Hook — আপনার সুপারপাওয়ার" },
      body: [
        {
          en: "A custom hook is just a function whose name starts with \"use\" and that calls other hooks inside. It lets you extract and REUSE stateful logic — the same logic in many components without duplicating code. Two rules: the name must start with \"use\", and it must be called at the top level (same rules as built-in hooks). Each component using the hook gets its OWN independent state.",
          bn: "Custom hook আসলে এমন ফাংশন যার নাম \"use\" দিয়ে শুরু আর ভেতরে অন্য hook কল করে। এটা দিয়ে state-সহ লজিক বের করে পুনর্ব্যবহার করা যায় — একই লজিক অনেক component-এ, কোড নকল ছাড়াই। দুটো নিয়ম: নাম \"use\" দিয়ে শুরু হতে হবে, আর top-level-এ কল করতে হবে (built-in hook-এর মতোই)। Hook ব্যবহার করা প্রতিটা component নিজের স্বাধীন state পায়।",
        },
      ],
      code: [
        {
          title: "useLocalStorage.js — the classic example",
          language: "js",
          code: `import { useState, useEffect } from "react";

function useLocalStorage(key, initial) {
  // lazy init: read localStorage ONCE on first render
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  // persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full / private mode */
    }
  }, [key, value]);

  return [value, setValue];   // same API as useState!
}

// Usage — feels exactly like useState, but persistent:
// const [name, setName] = useLocalStorage("name", "");
// const [theme, setTheme] = useLocalStorage("theme", "light");`,
        },
        {
          title: "three more hooks you'll build today",
          language: "js",
          code: `// useDebounce — delay a fast-changing value
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// useFetch — Day 3's pattern, reusable
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true); setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("HTTP " + res.status);
        setData(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// useToggle — tiny but delightful
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(o => !o), []);
  return [on, toggle];
}`,
        },
      ],
      live: {
        title: "Try it — useLocalStorage in action",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

// THE custom hook
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

// Using it — EXACTLY like useState!
function App() {
  const [name, setName] = useLocalStorage("rj-name", "");
  const [theme, setTheme] = useLocalStorage("rj-theme", "light");
  const [visits, setVisits] = useLocalStorage("rj-visits", 0);

  useEffect(() => {
    setVisits(v => v + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dark = theme === "dark";

  return (
    <div style={{
      padding: 20, borderRadius: 12,
      background: dark ? "#111827" : "#f9fafb",
      color: dark ? "#f9fafb" : "#111827",
      maxWidth: 360,
    }}>
      <h3 style={{ marginTop: 0 }}>💾 Persistent settings</h3>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name (saved!)"
        style={{ padding: 8, borderRadius: 6, width: "100%",
          border: "1px solid #9ca3af", background: dark ? "#1f2937" : "white",
          color: "inherit" }}
      />
      <p>👋 Hello {name || "stranger"}!</p>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        Page visits (from localStorage): {visits}
      </p>
      <button onClick={() => setTheme(dark ? "light" : "dark")}>
        {dark ? "☀️ Light" : "🌙 Dark"} mode
      </button>
      <p style={{ fontSize: 12, opacity: 0.6 }}>
        ✨ Type, click, then RELOAD the page — everything survives!
      </p>
    </div>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "tip",
          text: {
            en: "The best custom hooks have the same shape as the built-ins: return what consumers need (a value, a [pair], or an object). Look at reactuse (github.com/reactuse) and the useHooks library — reading their source is a masterclass.",
            bn: "সেরা custom hook-গুলো built-in-দের মতোই আকৃতির হয়: consumer যা দরকার সেটা রিটার্ন করে (একটা ভ্যালু, একটা জোড়া, বা একটা অবজেক্ট)। reactuse (github.com/reactuse) আর useHooks লাইব্রেরি দেখুন — এদের সোর্স পড়াই মাস্টারক্লাস।",
          },
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d4-e1",
      level: 1,
      title: { en: "Exercise 1 — usePrevious hook", bn: "অনুশীলন ১ — usePrevious hook" },
      task: {
        en: "Write a custom hook usePrevious(value) that returns the value from the PREVIOUS render (null on first render). Test it with a counter — display both current and previous count.",
        bn: "একটা custom hook usePrevious(value) লিখুন যেটা আগের render-এর ভ্যালু দেয় (প্রথম render-এ null)। কাউন্টার দিয়ে টেস্ট করুন — বর্তমান ও আগের কাউন্ট দুটোই দেখান।",
      },
      starter: `import { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  // TODO: store the latest value in a ref AFTER render,
  // return what was there before
}

function App() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div>
      <h2>{count}</h2>
      <p>Previous: {String(prev)}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

render(<App />);`,
      solution: `import { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;    // runs AFTER render → lags one behind
  }, [value]);

  return ref.current;       // value from previous render
}

function App() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div>
      <h2>{count}</h2>
      <p>Previous: {String(prev)}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

render(<App />);`,
      hints: [
        { en: "Refs update AFTER render, so storing in useEffect makes the ref \"lag\" one render behind — exactly what you want.", bn: "Ref render-এর পরে আপডেট হয়, তাই useEffect-এ রাখলে ref এক render পিছিয়ে থাকে — ঠিক যেটা চাই।" },
      ],
    },
    {
      id: "d4-e2",
      level: 2,
      title: { en: "Exercise 2 — Language switcher with Context", bn: "অনুশীলন ২ — Context সহ ভাষা পরিবর্তক" },
      task: {
        en: "Build a LanguageProvider with context: { lang, setLang }. Two deep child components consume it: a Greeting (shows \"Hello\" / \"নমস্কার\" / \"Hola\" by lang) and a Switcher (buttons en/bn/es). No props should flow through the middle layer.",
        bn: "একটা LanguageProvider বানান context সহ: { lang, setLang }। দুটো গভীর child component সেটা consume করবে: Greeting (lang অনুযায়ী \"Hello\" / \"নমস্কার\" / \"Hola\" দেখায়) আর Switcher (en/bn/es বাটন)। মাঝের স্তর দিয়ে কোনো props যাবে না।",
      },
      starter: `import { createContext, useContext, useState } from "react";

// TODO: create context, provider, consumers

function Greeting() {
  // TODO: read lang from context, show the right text
  return <h2>🌍 greeting goes here…</h2>;
}

function Switcher() {
  // TODO: buttons for en / bn / es
  return <div style={{ color: "#9ca3af" }}>language buttons go here…</div>;
}

function MiddleLayer() {
  // no props allowed here!
  return <div><Greeting /> <Switcher /></div>;
}

function App() {
  // TODO: wrap MiddleLayer in the provider
  return <MiddleLayer />;
}

render(<App />);`,
      solution: `import { createContext, useContext, useState } from "react";

const LangContext = createContext(null);

const TEXTS = { en: "Hello!", bn: "নমস্কার!", es: "¡Hola!" };

function Greeting() {
  const { lang } = useContext(LangContext);
  return (
    <h2 style={{ fontFamily: lang === "bn" ? "serif" : "inherit" }}>
      {TEXTS[lang]} 👋
    </h2>
  );
}

function Switcher() {
  const { lang, setLang } = useContext(LangContext);
  return (
    <div>
      {Object.keys(TEXTS).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{ fontWeight: lang === l ? "bold" : "normal",
                   margin: 2, border: lang === l ? "2px solid #2563eb" : "1px solid #d1d5db" }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function MiddleLayer() {
  return (
    <div>
      <Greeting />
      <Switcher />
    </div>
  );
}

function App() {
  const [lang, setLang] = useState("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <MiddleLayer />
    </LangContext.Provider>
  );
}

render(<App />);`,
    },
    {
      id: "d4-e3",
      level: 3,
      title: { en: "Exercise 3 — Multi-step form with useReducer", bn: "অনুশীলন ৩ — useReducer সহ মাল্টি-স্টেপ ফর্ম" },
      task: {
        en: "Build a 3-step wizard (Name → Email → Review) with useReducer. Actions: NEXT, BACK, SET_FIELD {field, value}. Show current step, collect data, and on the review step show all data with a Submit button that resets everything.",
        bn: "useReducer দিয়ে ৩-ধাপের উইজার্ড বানান (Name → Email → Review)। Action: NEXT, BACK, SET_FIELD {field, value}। বর্তমান ধাপ দেখান, ডেটা সংগ্রহ করুন, আর Review ধাপে সব ডেটা দেখিয়ে Submit বাটন দিন যেটা সব রিসেট করে।",
      },
      starter: `import { useReducer } from "react";

// state: { step: 1|2|3, name, email }

function wizardReducer(state, action) {
  // TODO: NEXT (max 3), BACK (min 1), SET_FIELD, RESET
  switch (action.type) {
    default: return state;   // replace with your cases!
  }
}

function App() {
  // TODO: useReducer + step UI + inputs + review + submit
  return <div style={{ color: "#9ca3af" }}>🧙 wizard UI goes here…</div>;
}

render(<App />);`,
      solution: `import { useReducer } from "react";

const initial = { step: 1, name: "", email: "" };

function wizardReducer(state, action) {
  switch (action.type) {
    case "NEXT":
      return { ...state, step: Math.min(3, state.step + 1) };
    case "BACK":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initial;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(wizardReducer, initial);

  return (
    <div style={{ maxWidth: 340, border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: 6, borderRadius: 3,
            background: state.step >= s ? "#2563eb" : "#e5e7eb",
          }} />
        ))}
      </div>

      {state.step === 1 && (
        <label>
          Step 1 — Your name
          <input value={state.name} style={{ display: "block", width: "100%", padding: 8, margin: "6px 0", border: "1px solid #d1d5db", borderRadius: 6 }}
            onChange={e => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })} />
        </label>
      )}

      {state.step === 2 && (
        <label>
          Step 2 — Your email
          <input value={state.email} style={{ display: "block", width: "100%", padding: 8, margin: "6px 0", border: "1px solid #d1d5db", borderRadius: 6 }}
            onChange={e => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })} />
        </label>
      )}

      {state.step === 3 && (
        <div>
          <h4 style={{ marginTop: 0 }}>📋 Review</h4>
          <p>Name: <strong>{state.name || "—"}</strong></p>
          <p>Email: <strong>{state.email || "—"}</strong></p>
          <button onClick={() => dispatch({ type: "RESET" })}>✅ Submit & reset</button>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        {state.step > 1 && state.step < 3 && (
          <button onClick={() => dispatch({ type: "BACK" })}>← Back</button>
        )}
        {state.step < 3 && (
          <button onClick={() => dispatch({ type: "NEXT" })}>Next →</button>
        )}
      </div>

      <p style={{ fontSize: 12, color: "#9ca3af" }}>Step {state.step} of 3 — every change flows through the reducer!</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
  project: {
    title: { en: "Day 4 Project — Shopping Cart + Theme System", bn: "দিন ৪ প্রজেক্ট — শপিং কার্ট + থিম সিস্টেম" },
    brief: {
      en: "Combine everything: a product list, a cart built with Context + useReducer (add/dec/remove/clear), a dark/light theme saved with your useLocalStorage hook, and product data fetched with your useFetch hook. Structure it properly: context in one file, hooks in another, components in their own files.",
      bn: "সব একসাথে মেলান: প্রোডাক্ট লিস্ট, Context + useReducer দিয়ে কার্ট (add/dec/remove/clear), আপনার useLocalStorage hook দিয়ে সেভ হওয়া dark/light থিম, আর useFetch hook দিয়ে ফেচ করা প্রোডাক্ট ডেটা। সঠিকভাবে সাজান: context এক ফাইলে, hook আরেক ফাইলে, component নিজেদের ফাইলে।",
    },
    requirements: [
      { en: "Products from https://fakestoreapi.com/products (or a local array)", bn: "https://fakestoreapi.com/products থেকে প্রোডাক্ট (বা লোকাল অ্যারে)" },
      { en: "CartContext with useReducer: ADD, DEC, REMOVE, CLEAR", bn: "useReducer সহ CartContext: ADD, DEC, REMOVE, CLEAR" },
      { en: "Theme context + useLocalStorage persistence", bn: "Theme context + useLocalStorage persistence" },
      { en: "useFetch custom hook for products (loading/error states)", bn: "প্রোডাক্টের জন্য useFetch custom hook (loading/error state)" },
      { en: "Cart badge in header, total, and checkout button", bn: "হেডারে কার্ট ব্যাজ, মোট, আর checkout বাটন" },
    ],
    solution: `import { createContext, useContext, useReducer, useState, useEffect } from "react";

/* ---------- custom hooks ---------- */
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? JSON.parse(s) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

/* ---------- contexts ---------- */
const ThemeCtx = createContext(null);
const CartCtx = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const f = state.find(i => i.id === action.item.id);
      return f
        ? state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state, { ...action.item, qty: 1 }];
    case "DEC":
      return state
        .map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

/* ---------- components ---------- */
const PRODUCTS = [
  { id: 1, name: "Classic Tee", price: 450, emoji: "👕" },
  { id: 2, name: "Denim Cap", price: 690, emoji: "🧢" },
  { id: 3, name: "Sneakers", price: 2200, emoji: "👟" },
  { id: 4, name: "Backpack", price: 1550, emoji: "🎒" },
  { id: 5, name: "Watch", price: 1850, emoji: "⌚" },
  { id: 6, name: "Sunglasses", price: 990, emoji: "🕶️" },
];

function ProductCard({ product }) {
  const { dispatch } = useContext(CartCtx);
  const { dark } = useContext(ThemeCtx);
  return (
    <div style={{
      padding: 14, borderRadius: 12, textAlign: "center",
      border: "1px solid " + (dark ? "#374151" : "#e5e7eb"),
      background: dark ? "#1f2937" : "white",
    }}>
      <div style={{ fontSize: 40 }}>{product.emoji}</div>
      <strong>{product.name}</strong>
      <p style={{ margin: "4px 0 8px", opacity: 0.7 }}>৳{product.price}</p>
      <button onClick={() => dispatch({ type: "ADD", item: product })}>
        Add to cart
      </button>
    </div>
  );
}

function CartBar() {
  const { cart, dispatch } = useContext(CartCtx);
  const { dark, setDark } = useContext(ThemeCtx);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{
      display: "flex", gap: 8, alignItems: "center",
      padding: "10px 14px", borderRadius: 12, marginBottom: 14,
      border: "1px solid " + (dark ? "#374151" : "#e5e7eb"),
    }}>
      <span style={{ fontSize: 22 }}>🛒</span>
      <span style={{
        background: "#ef4444", color: "white", borderRadius: 999,
        padding: "2px 8px", fontSize: 13,
      }}>{count}</span>
      <span style={{ flex: 1, fontWeight: "bold" }}>৳{total}</span>
      {count > 0 && <button onClick={() => dispatch({ type: "CLEAR" })}>Clear</button>}
      <button onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</button>
    </div>
  );
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [dark, setDark] = useLocalStorage("rj-cart-dark", false);

  const theme = { dark, setDark };
  const cartCtx = { cart, dispatch };

  return (
    <ThemeCtx.Provider value={theme}>
      <CartCtx.Provider value={cartCtx}>
        <div style={{
          padding: 16, borderRadius: 16, minHeight: 300,
          background: dark ? "#111827" : "#f9fafb",
          color: dark ? "#f9fafb" : "#111827",
        }}>
          <h2 style={{ marginTop: 0 }}>🛍️ ReactJatra Shop</h2>
          <CartBar />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </CartCtx.Provider>
    </ThemeCtx.Provider>
  );
}

render(<App />);`,
  },
};
