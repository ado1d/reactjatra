import type { Day } from "../types";

export const day6: Day = {
  id: "day-6",
  day: 6,
  icon: "gauge",
  hours: { en: "2 hrs learn · 3 hrs build", bn: "২ ঘণ্টা শেখা · ৩ ঘণ্টা বানানো" },
  title: { en: "Day 6 — Performance & State Management", bn: "দিন ৬ — পারফরম্যান্স ও স্টেট ম্যানেজমেন্ট" },
  subtitle: {
    en: "How rendering really works, memo/useMemo/useCallback (and when NOT to), lazy loading, error boundaries, and global state libraries.",
    bn: "রেন্ডারিং আসলে কীভাবে কাজ করে, memo/useMemo/useCallback (আর কখন নয়), lazy loading, error boundary, আর গ্লোবাল state লাইব্রেরি।",
  },
  tagline: {
    en: "React.memo, useMemo/useCallback, lazy+Suspense, error boundaries, Redux/Zustand.",
    bn: "React.memo, useMemo/useCallback, lazy+Suspense, error boundary, Redux/Zustand।",
  },
  goals: [
    { en: "Understand when and why components re-render", bn: "কোথায় কেন component re-render হয় বোঝা" },
    { en: "Use React.memo, useMemo, and useCallback correctly", bn: "React.memo, useMemo ও useCallback সঠিকভাবে ব্যবহার করা" },
    { en: "Know when NOT to optimize (most of the time!)", bn: "কখন optimize করতে হবে না জানা (বেশিরভাগ সময়!)" },
    { en: "Code-split with React.lazy + Suspense", bn: "React.lazy + Suspense দিয়ে কোড-স্প্লিট করা" },
    { en: "Explain reconciliation and use Redux Toolkit / Zustand basics", bn: "Reconciliation ব্যাখ্যা করা ও Redux Toolkit / Zustand বেসিক ব্যবহার" },
  ],
  sections: [
    {
      id: "rerenders",
      title: { en: "How rendering actually works", bn: "রেন্ডারিং আসলে কীভাবে কাজ করে" },
      body: [
        {
          en: "A component re-renders when: (1) its state changes, (2) its parent re-renders, or (3) its context value changes. Crucial detail: when a parent re-renders, ALL children re-render by default — even if their props didn't change. Re-render is usually cheap (React just calls your function and diffs), but with big lists or heavy computation it adds up.",
          bn: "একটা component re-render হয় যখন: (১) তার state বদলায়, (২) তার parent re-render হয়, বা (৩) তার context-এর ভ্যালু বদলায়। গুরুত্বপূর্ণ খুঁটিনাটি: parent re-render হলে ডিফল্টে সব children re-render হয় — তাদের props না বদলালেও। Re-render সাধারণত সস্তা (React শুধু আপনার ফাংশন কল করে diff করে), কিন্তু বড় লিস্ট বা ভারী হিসাবে সেটা জমে যায়।",
        },
        {
          en: "The reconciliation algorithm: React builds a new virtual DOM tree on each render, diffs it against the previous one (same-type elements → compare props; different type → destroy & rebuild), and patches only the changed parts of the real DOM. Keys tell React which list items are \"the same\" across renders.",
          bn: "Reconciliation অ্যালগরিদম: প্রতি render-এ React নতুন virtual DOM ট্রি বানায়, আগেরটার সাথে diff করে (একই টাইপ এলিমেন্ট → props তুলনা; ভিন্ন টাইপ → ভেঙে নতুন বানানো), আর আসল DOM-এর শুধু বদলানো অংশ প্যাচ করে। Key React-কে বলে লিস্টের কোন আইটেম render-গুলোতে \"একই\" — এটাই সম্পর্কে বোঝায়।",
        },
      ],
      code: [
        {
          title: "render-tree.jsx — watch re-renders spread",
          language: "jsx",
          code: `import { useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);
  console.log("Parent renders");

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>

      {/* Changing count re-renders ALL of these, every time: */}
      <ChildA />                       {/* no props at all — still re-renders */}
      <ChildB items={staticArray} />   {/* "unchanged" props — still re-renders!
                                          (new comparison is by reference,
                                          and functions/objects/array literals
                                          are recreated every render) */}
    </div>
  );
}

// The fix for expensive children:
const MemoChild = React.memo(function ChildB({ items }) {
  console.log("ChildB renders — ONLY if items reference changed");
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
});

// WHY does "unchanged" fail? Every render of Parent creates:
//   style={{...}}     → new object reference
//   onClick={() => …} → new function reference
// So props ARE different (by reference) every single time!`,
        },
      ],
      live: {
        title: "Try it — see who re-renders",
        language: "jsx",
        code: `import { useState, memo } from "react";

const Log = ({ label, color }) => (
  <div style={{ fontFamily: "monospace", fontSize: 13, color }}>
    {new Date().toLocaleTimeString()} — {label} rendered
  </div>
);

const MemoChild = memo(function MemoChild() {
  return <Log label="memo child (skips when props same)" color="#f59e0b" />;
});

function NormalChild() {
  return <Log label="normal child (always renders)" color="#ef4444" />;
}

function App() {
  const [count, setCount] = useState(0);
  const [, forceRender] = useState(0);

  return (
    <div style={{ maxWidth: 380 }}>
      <button onClick={() => setCount(c => c + 1)}>
        Re-render tree (count={count})
      </button>{" "}
      <button onClick={() => forceRender(x => x + 1)}>
        Force again
      </button>
      <div style={{
        background: "#0f172a", padding: 10, borderRadius: 8,
        marginTop: 10, minHeight: 90,
      }}>
        <Log label="parent" color="#4ade80" />
        <NormalChild />
        <MemoChild />
      </div>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Every click: parent + normal child re-render (new timestamp),
        but the memo child's log time only changes if IT re-renders —
        with no props, React.memo skips it entirely!
      </p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "memo-tools",
      title: { en: "memo / useMemo / useCallback — the trio", bn: "memo / useMemo / useCallback — ত্রয়ী" },
      body: [
        {
          en: "Three tools, three jobs: React.memo skips re-rendering a CHILD when props are equal; useMemo caches a computed VALUE between renders; useCallback caches a FUNCTION reference between renders (so memoized children don't see \"new\" function props). They work together: memo is useless if the parent passes fresh callbacks — which is exactly when useCallback comes in.",
          bn: "তিনটি টুল, তিনটি কাজ: React.memo props সমান থাকলে CHILD re-render বাদ দেয়; useMemo render-এর মাঝে হিসাব করা VALUE ক্যাশ করে; useCallback render-এর মাঝে FUNCTION reference ক্যাশ করে (যাতে memoized children নতুন ফাংশন prop না দেখে)। এরা একসাথে কাজ করে: parent নতুন কলব্যাক পাঠালে memo অর্থহীন — ঠিক সেখানেই useCallback লাগে।",
        },
        {
          en: "The most important lesson: DON'T optimize by default. Every memo adds comparison cost and code complexity. React itself is fast. Optimize when you can MEASURE a problem (React DevTools Profiler) — typically: slow computations (filtering 10k items), lists of 100+ rows, or inputs that lag while typing.",
          bn: "সবচেয়ে গুরুত্বপূর্ণ শিক্ষা: ডিফল্টভাবে optimize করবেন না। প্রতিটা memo তুলনার খরচ আর কোডের জটিলতা বাড়ায়। React নিজেই দ্রুত। যখন সমস্যা মেপে দেখতে পারবেন তখনই optimize করুন (React DevTools Profiler) — সাধারণত: ধীর হিসাব (১০ হাজার আইটেম filter), ১০০+ সারির লিস্ট, বা টাইপ করার সময় আটকে যাওয়া ইনপুট।",
        },
      ],
      code: [
        {
          title: "the-trio.jsx",
          language: "jsx",
          code: `import { useState, useMemo, useCallback, memo } from "react";

// ── useMemo: cache a VALUE ───────────────────────────
function ProductList({ products, query }) {
  // Without memo: re-filters ALL products on EVERY render
  // (typing in an unrelated input would re-run this!)
  const filtered = useMemo(() => {
    console.log("filtering…");        // now runs only when deps change
    return products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);              // ← deps!

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// ── useCallback: cache a FUNCTION ────────────────────
function Parent() {
  const [count, setCount] = useState(0);

  // Without it: new function every render → memo child re-renders
  const handleClick = useCallback(id => {
    console.log("clicked", id);
  }, []);   // empty: never changes → stable reference

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <MemoRow id={1} onClick={handleClick} />
    </div>
  );
}

// ── React.memo: skip a CHILD's re-render ─────────────
const MemoRow = memo(function Row({ id, onClick }) {
  console.log("Row rendered");        // skipped unless props change
  return <button onClick={() => onClick(id)}>Row {id}</button>;
});

// ── useMemo also caches OBJECTS/arrays passed as props
function Parent2() {
  const items = useMemo(() => [1, 2, 3], []);   // stable reference
  const style = useMemo(() => ({ color: "red" }), []);
  return <MemoChild items={items} style={style} />;
}`,
        },
        {
          title: "when NOT to use them",
          language: "txt",
          code: `❌ Don't memo when:
- the computation is trivial (2 + 2, small .map)
- the component renders fast anyway
- props change every render anyway (defeats memo)
- you haven't measured a real problem

✅ Do memo when:
- filtering/sorting large lists on each render
- 100+ list rows re-render while typing
- passing callbacks to memoized children
- expensive JSON parsing / date formatting

MEASURE FIRST: React DevTools → Profiler →
Record → interact → see which components are slow.`,
        },
      ],
      live: {
        title: "Try it — useMemo with a HEAVY computation",
        language: "jsx",
        code: `import { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [range, setRange] = useState(100000);

  // This loop takes real time! (feel free to raise the range)
  const primes = useMemo(() => {
    const t0 = performance.now();
    const found = [];
    for (let n = 2; found.length < 300; n++) {
      let isPrime = true;
      for (let d = 2; d * d <= n; d++) {
        if (n % d === 0) { isPrime = false; break; }
      }
      if (isPrime) found.push(n);
    }
    console.log("prime calc took", (performance.now() - t0).toFixed(1), "ms");
    return found;
  }, []);   // ← computed ONCE. Remove the memo and every
            //   count click re-runs the whole loop!

  return (
    <div style={{ maxWidth: 380 }}>
      <p>
        count = {count}{" "}
        <button onClick={() => setCount(c => c + 1)}>+1 (fast!)</button>
      </p>
      <p>
        range = {range.toLocaleString()}{" "}
        <input type="range" min={100000} max={1000000} step={100000}
          value={range}
          onChange={e => setRange(Number(e.target.value))} />
      </p>
      <p>
        First 300 primes (cached): {primes.slice(0, 15).join(", ")}…
      </p>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Clicking +1 stays instant — useMemo means the prime loop
        only ever ran once. Try removing the useMemo in the editor
        and feel the difference!
      </p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "lazy-errors",
      title: { en: "Lazy Loading & Error Boundaries", bn: "Lazy Loading ও Error Boundary" },
      body: [
        {
          en: "React.lazy splits your app into chunks loaded on demand — users download the dashboard code only when they visit /dashboard. Pair with Suspense which shows a fallback while loading. Error boundaries (still class-only!) catch render errors of children and show a recovery UI instead of a white screen of death.",
          bn: "React.lazy আপনার অ্যাপকে চাহিদামাফিক লোড হওয়া খণ্ডে ভাগ করে — ইউজার /dashboard-এ গেলেই শুধু ড্যাশবোর্ডের কোড নামে। Suspense-এর সাথে জুড়ুন, যেটা লোড হওয়ার সময় fallback দেখায়। Error boundary (এখনো class-ই!) children-এর render error ধরে ফেলে আর সাদা স্ক্রিনের বদলে রিকভারি UI দেখায়।",
        },
      ],
      code: [
        {
          title: "lazy-suspense-error.jsx",
          language: "jsx",
          code: `import { lazy, Suspense, Component } from "react";

// 1) LAZY — loads Dashboard.jsx as a SEPARATE file on demand
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Charts = lazy(() => import("./pages/Charts"));

function App() {
  return (
    <Suspense fallback={<p>Loading page… ⏳</p>}>
      <Dashboard />          {/* shows fallback until chunk arrives */}
    </Suspense>
  );
}

// 2) ERROR BOUNDARY — the one surviving class component
class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };                       // render the fallback UI
  }

  componentDidCatch(error, info) {
    console.error("Caught:", error, info);  // log to Sentry etc.
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>💥 Something went wrong</h2>
          <pre>{String(this.state.error)}</pre>
          <button onClick={() => this.setState({ error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Wrap risky trees:
// <ErrorBoundary>
//   <Suspense fallback={<Loader />}>
//     <Dashboard />
//   </Suspense>
// </ErrorBoundary>`,
        },
      ],
      live: {
        title: "Try it — error boundary catching a crash",
        language: "jsx",
        code: `import { useState, Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          border: "1px solid #ef4444", borderRadius: 10, padding: 14,
          background: "#fef2f2", color: "#991b1b",
        }}>
          <strong>💥 ErrorBoundary caught:</strong>
          <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>
            {String(this.state.error)}
          </pre>
          <button onClick={() => this.setState({ error: null })}>
            🔄 Recover
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Bomber({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error("KABOOM! This component crashed 💣");
  }
  return <p style={{ color: "#22c55e" }}>😊 Everything is fine.</p>;
}

function App() {
  const [crash, setCrash] = useState(false);

  return (
    <div style={{ maxWidth: 380 }}>
      <button onClick={() => setCrash(c => !c)}>
        {crash ? "Fix component 🛠️" : "Crash component 💣"}
      </button>
      <div style={{ marginTop: 10 }}>
        <ErrorBoundary>
          <Bomber shouldCrash={crash} />
        </ErrorBoundary>
      </div>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Without the boundary, this error would unmount the WHOLE app
        (white screen). The boundary contains the blast 🔥
      </p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "global-state",
      title: { en: "Global State: Redux Toolkit & Zustand", bn: "গ্লোবাল State: Redux Toolkit ও Zustand" },
      body: [
        {
          en: "Context is fine for themes and small shared data, but for large apps with frequently-changing state you want a real store. Redux Toolkit (RTK) is the industry standard: one store, slices of reducers, actions dispatched from anywhere, and DevTools time-travel. Zustand is the modern lightweight alternative: a hook and a set function — no providers, no boilerplate.",
          bn: "থিম আর ছোট শেয়ারড ডেটার জন্য Context চলে, কিন্তু বড় অ্যাপে দ্রুত বদলানো state-এর জন্য দরকার আসল store। Redux Toolkit (RTK) ইন্ডাস্ট্রি স্ট্যান্ডার্ড: এক store, reducer-এর slice, যেকোনো জায়গা থেকে dispatch, আর DevTools-এ time-travel। Zustand আধুনিক হালকা বিকল্প: একটা hook আর একটা set ফাংশন — provider নেই, boilerplate নেই।",
        },
      ],
      code: [
        {
          title: "Redux Toolkit — the standard",
          language: "js",
          code: `// npm install @reduxjs/toolkit react-redux

// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    // RTK uses Immer: you "mutate" but it's actually immutable!
    addItem(state, action) {
      const found = state.items.find(i => i.id === action.payload.id);
      if (found) found.qty++;
      else state.items.push({ ...action.payload, qty: 1 });
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

// store/index.js
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// main.jsx:  <Provider store={store}><App /></Provider>

// Any component:
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const items = useSelector(s => s.cart.items);   // read
  const dispatch = useDispatch();                 // write

  return (
    <div>
      <button onClick={() => dispatch(addItem({ id: 1, name: "Tea", price: 15 }))}>
        Add tea
      </button>
      <p>{items.length} items</p>
    </div>
  );
}`,
        },
        {
          title: "Zustand — the lightweight rival",
          language: "js",
          code: `// npm install zustand

import { create } from "zustand";

const useCart = create(set => ({
  items: [],
  addItem: item =>
    set(state => ({
      items: [...state.items, { ...item, qty: 1 }],
    })),
  clear: () => set({ items: [] }),
}));

// Any component, no Provider needed:
function Cart() {
  const items = useCart(s => s.items);       // select state
  const addItem = useCart(s => s.addItem);   // select action

  return (
    <button onClick={() => addItem({ id: 1, name: "Tea", price: 15 })}>
      Add tea ({items.length})
    </button>
  );
}

// That's it. That's the whole library, basically.`,
        },
        {
          title: "which one to pick?",
          language: "txt",
          code: `Context          → themes, auth user, language
                   (low-frequency changes, few consumers)

Zustand          → app state, medium-to-large apps,
                   you want simple & fast to write

Redux Toolkit    → enterprise apps, teams, need for
                   DevTools/middleware/strict patterns
                   (also: many jobs require it)

TanStack Query   → SERVER state (fetching, caching,
                   invalidation) — replaces most of
                   what people wrongly put in Redux!

Server state ≠ client state. Use the right tool.`,
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d6-e1",
      level: 2,
      title: { en: "Exercise 1 — Slow list, meet useMemo", bn: "অনুশীলন ১ — ধীর লিস্ট + useMemo" },
      task: {
        en: "10,000 numbers are generated once and a separate count state exists. Sort the 10k numbers on every render WITHOUT memo, then fix it with useMemo so count clicks stay fast. Add a render counter to prove it.",
        bn: "১০,০০০ সংখ্যা একবার জেনারেট হয় আর আলাদা একটা count state আছে। প্রথমে memo ছাড়া প্রতি render-এ ১০ হাজার সংখ্যা sort করুন, তারপর useMemo দিয়ে ঠিক করুন যাতে count ক্লিক দ্রুত থাকে। প্রমাণ হিসেবে render কাউন্টার দিন।",
      },
      starter: `import { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const numbers = [];  // TODO: generate 10000 random numbers ONCE

  // TODO: sorted copy — first naive, then with useMemo

  return (
    <div>
      <p>count={count} <button onClick={() => setCount(c => c + 1)}>+1</button></p>
      <p>Top 5 sorted: {/* TODO */}</p>
    </div>
  );
}

render(<App />);`,
      solution: `import { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const renders = useRef ? null : null; // (keep it simple — no ref needed)

  const numbers = useMemo(() =>
    Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000000)),
    []
  );

  const sorted = useMemo(
    () => [...numbers].sort((a, b) => a - b),
    [numbers]
  );

  return (
    <div>
      <p>count={count} <button onClick={() => setCount(c => c + 1)}>+1</button></p>
      <p>Top 5 sorted: {sorted.slice(0, 5).join(", ")}</p>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        +1 clicks are instant — sorting never re-runs!
      </p>
    </div>
  );
}

render(<App />);`,
      hints: [
        { en: "Generate the numbers inside useMemo too — a plain array literal would be recreated (new reference) every render.", bn: "সংখ্যাগুলোও useMemo-এর ভেতরে বানান — সাধারণ অ্যারে লিখলে প্রতি render-এ নতুন reference হয়।" },
      ],
    },
    {
      id: "d6-e2",
      level: 3,
      title: { en: "Exercise 2 — memoized table rows", bn: "অনুশীলন ২ — memoized টেবিল সারি" },
      task: {
        en: "A table of 200 rows receives a callback prop. Typing in a search box re-renders the parent. Use React.memo + useCallback so filtered rows only re-render when the list actually changes. Log each row's render to verify.",
        bn: "২০০ সারির টেবিল একটা callback prop পায়। সার্চ বক্সে টাইপ করলে parent re-render হয়। React.memo + useCallback ব্যবহার করুন যাতে ফিল্টার হওয়া সারিগুলো শুধু লিস্ট বদলালে re-render হয়। যাচাই করতে প্রতি সারির render লগ করুন।",
      },
      starter: `import { useState, memo, useCallback } from "react";

const PRODUCTS = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  name: \`Product #\${String(i).padStart(3, "0")}\`,
}));

// TODO: memoized Row + stable callback

function App() {
  const [query, setQuery] = useState("");

  // TODO: filtered list (useMemo?), stable onSelect

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)} /* wired already! */
        placeholder="Filter..."
      />
      {/* TODO: rows */}
    </div>
  );
}

render(<App />);`,
      solution: `import { useState, memo, useCallback, useMemo } from "react";

const PRODUCTS = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  name: \`Product #\${String(i).padStart(3, "0")}\`,
}));

const Row = memo(function Row({ product, onSelect }) {
  console.log("Row rendered:", product.id);
  return (
    <div onClick={() => onSelect(product.id)} style={{
      padding: "4px 10px", cursor: "pointer", fontSize: 14,
      borderBottom: "1px solid #f3f4f6",
      color: "inherit",
    }}>
      {product.name}
    </div>
  );
});

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => PRODUCTS.filter(p => p.name.includes(query)),
    [query]
  );

  const handleSelect = useCallback(id => setSelected(id), []);

  return (
    <div style={{ maxWidth: 300 }}>
      <p>Selected: {selected !== null ? \`#\${selected}\` : "none"}</p>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Filter... try '005'"
        style={{ width: "100%", padding: 8, border: "1px solid #d1d5db", borderRadius: 6 }}
      />
      <div style={{ maxHeight: 220, overflowY: "auto", border: "1px solid #e5e7eb", borderRadius: 8, marginTop: 8 }}>
        {filtered.map(p => (
          <Row key={p.id} product={p} onSelect={handleSelect} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Clicking rows: only selected text changes, rows skip re-render.
        Filtering: only matching rows render (check console).
      </p>
    </div>
  );
}

render(<App />);`,
      hints: [
        { en: "memo alone fails if onSelect is a fresh arrow each render — stabilize it with useCallback.", bn: "onSelect প্রতি render-এ নতুন অ্যারো হলে memo একা ব্যর্থ — useCallback দিয়ে স্থিতিশীল করুন।" },
      ],
    },
  ],
  project: {
    title: { en: "Day 6 Project — Optimize the Shop", bn: "দিন ৬ প্রজেক্ট — শপ অপ্টিমাইজ করুন" },
    brief: {
      en: "Take your Day 4/5 app and upgrade it: (1) wrap product rows in React.memo with useCallback handlers, (2) useMemo the filtered/sorted list, (3) lazy-load the dashboard route with Suspense, (4) add an ErrorBoundary around the app, (5) add Zustand for cart state (replacing or alongside Context), (6) verify with the React DevTools Profiler that typing in search no longer re-renders everything.",
    },
    requirements: [
      { en: "React.memo on list rows + useCallback for handlers", bn: "লিস্ট সারিতে React.memo + handler-এ useCallback" },
      { en: "useMemo for filtering/sorting", bn: "ফিল্টার/সর্টে useMemo" },
      { en: "React.lazy + Suspense for the dashboard route", bn: "Dashboard রাউটে React.lazy + Suspense" },
      { en: "ErrorBoundary wrapping the app", bn: "অ্যাপ জুড়ে ErrorBoundary" },
      { en: "Zustand store for the cart", bn: "কার্টের জন্য Zustand store" },
      { en: "Profiler before/after screenshots in your notes", bn: "নোটে Profiler-এর আগে/পরে স্ক্রিনশট" },
    ],
    solution: `// Zustand version of the Day 4 cart (the key upgrade):
import { create } from "zustand";

const useCart = create(set => ({
  items: [],
  add: item =>
    set(state => {
      const found = state.items.find(i => i.id === item.id);
      return found
        ? { items: state.items.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i) }
        : { items: [...state.items, { ...item, qty: 1 }] };
    }),
  dec: id =>
    set(state => ({
      items: state.items
        .map(i => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
}));

// usage anywhere — no Provider, no Context:
// const items = useCart(s => s.items);
// const add = useCart(s => s.add);`,
  },
};
