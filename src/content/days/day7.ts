import type { Day } from "../types";

export const day7: Day = {
  id: "day-7",
  day: 7,
  icon: "trophy",
  hours: { en: "4-5 hrs capstone + revision", bn: "৪-৫ ঘণ্টা ক্যাপস্টোন + রিভিশন" },
  title: { en: "Day 7 — Capstone + Interview Prep", bn: "দিন ৭ — ক্যাপস্টোন + ইন্টারভিউ প্রস্তুতি" },
  subtitle: {
    en: "Build a complete app that combines all 7 days, deploy it live, then revise for interviews.",
    bn: "৭ দিনের সবকিছু মিলিয়ে একটা পূর্ণাঙ্গ অ্যাপ বানান, লাইভ ডিপ্লয় করুন, তারপর ইন্টারভিউয়ের রিভিশন দিন।",
  },
  tagline: {
    en: "Capstone app, deployment, interview revision & what's next.",
    bn: "ক্যাপস্টোন অ্যাপ, ডিপ্লয়মেন্ট, ইন্টারভিউ রিভিশন ও পরের ধাপ।",
  },
  goals: [
    { en: "Ship a complete app with auth, routing, API, state, and forms", bn: "Auth, রাউটিং, API, state ও ফর্মসহ পূর্ণাঙ্গ অ্যাপ শিপ করা" },
    { en: "Deploy to Vercel or Netlify with a live URL", bn: "Vercel বা Netlify-তে লাইভ URL সহ ডিপ্লয় করা" },
    { en: "Revise all interview questions out loud", bn: "সব ইন্টারভিউ প্রশ্ন জোরে জোরে রিভিশন করা" },
    { en: "Know your next learning steps (TS, Next.js, testing)", bn: "পরের শেখার ধাপ জানা (TS, Next.js, testing)" },
  ],
  sections: [
    {
      id: "capstone",
      title: { en: "The Capstone — pick one and build", bn: "ক্যাপস্টোন — একটা বেছে নিয়ে বানান" },
      body: [
        {
          en: "Your capstone must combine: fake auth (login/logout, stored in localStorage), routing (4+ pages, protected route), API fetching (loading/error/empty states), global state (Context/RTK/Zustand), forms with validation, and persistence. Three ideas that hit all requirements — pick the one you'd actually use:",
          bn: "আপনার ক্যাপস্টোনে অবশ্যই থাকতে হবে: fake auth (login/logout, localStorage-এ), রাউটিং (৪+ পেজ, protected route), API ফেচিং (loading/error/empty state), গ্লোবাল state (Context/RTK/Zustand), ভ্যালিডেশনসহ ফর্ম, আর persistence। তিনটা আইডিয়া যেগুলো সব চাহিদা পূরণ করে — যেটা সত্যিই ব্যবহার করবেন সেটা বাছুন:",
        },
      ],
      code: [
        {
          title: "Option A — Expense Tracker (easiest)",
          language: "txt",
          code: `Pages: Login → Dashboard (protected) → Expenses → Reports
Features:
├── Fake auth (localStorage, protected routes)
├── Add expense form (title, amount, category) + validation
├── Expense list: filter by month, delete, edit
├── Zustand/Context + useReducer for expense state
├── Totals by category (reduce!) + simple bar chart
└── Persist everything to localStorage

API it: swap localStorage for json-server for real API practice.`,
        },
        {
          title: "Option B — Mini E-commerce Store",
          language: "txt",
          code: `Pages: Home → Products → Product/:id → Cart → Login → Checkout
Features:
├── Products from https://fakestoreapi.com (useFetch!)
├── Search + category filter (useMemo)
├── Cart with Context/useReducer (add/remove/qty)
├── Checkout form with validation
├── Protected checkout (login required)
└── Order confirmation page with order number`,
        },
        {
          title: "Option C — Blog with Comments",
          language: "txt",
          code: `Pages: Home → Posts → Post/:id → Login → Admin (protected)
Features:
├── Posts from https://jsonplaceholder.typicode.com
├── Post detail with comments (nested fetching!)
├── Add comment form (optimistic UI!)
├── Admin: create/edit posts (protected)
├── Search + pagination
└── Auth context for the admin guard`,
        },
      ],
      tips: [
        {
          kind: "tip",
          text: {
            en: "Scope discipline: pick the SMALLEST version that still touches every requirement. A finished tiny app beats an unfinished impressive one — for your portfolio AND your learning. You can always add features after deployment.",
            bn: "স্কোপ নিয়ন্ত্রণ: এমন সবচেয়ে ছোট ভার্সন বাছুন যেটা এতোক্ষণ প্রতিটি চাহিদায় ছোঁয়। শেষ করা ছোট অ্যাপ অসম্পূর্ণ দারুণ অ্যাপের চেয়ে ভালো — পোর্টফোলিও আর শেখা দুটোর জন্যই। ডিপ্লয়ের পর চাইলে ফিচার যোগ করতে পারবেন।",
          },
        },
      ],
    },
    {
      id: "deploy",
      title: { en: "Deploy — 10 minutes to a live URL", bn: "ডিপ্লয় — ১০ মিনিটে লাইভ URL" },
      body: [
        {
          en: "An undeployed project doesn't exist in a portfolio. Both Vercel and Netlify detect Vite automatically and are free. Push your code to GitHub, connect the repo, and you get a live HTTPS URL plus automatic redeploys on every push.",
          bn: "ডিপ্লয় না হওয়া প্রজেক্ট পোর্টফোলিওতে \"নেই\" বললেই চলে। Vercel আর Netlify দুটোই Vite অটো ধরে নেয় আর দুটোই ফ্রি। কোড GitHub-এ push করুন, repo কানেক্ট করুন, আর পেয়ে যাবেন লাইভ HTTPS URL, সাথে প্রতি push-এ অটো রিডিপ্লয়।",
        },
      ],
      code: [
        {
          title: "deploy-checklist.sh",
          language: "bash",
          code: `# 1) Push to GitHub (if you haven't)
git init && git add . && git commit -m "capstone: react app"
# create repo on github.com, then:
git remote add origin https://github.com/you/your-app.git
git push -u origin main

# 2) VERCEL (recommended for React/Vite)
#    → vercel.com → Sign up with GitHub
#    → "Add New Project" → import your repo
#    → Framework preset: Vite (auto-detected)
#    → Deploy. Done. You get: yourapp.vercel.app

# 3) NETLIFE (alternative)
#    → netlify.com → "Add new site" → Import from Git
#    → Build command: npm run build
#    → Publish directory: dist
#    → Deploy.

# 4) CLI alternative for Vercel:
npm i -g vercel && vercel`,
        },
        {
          title: "before deploying — the pre-flight check",
          language: "txt",
          code: `□ npm run build passes locally with no errors
□ No console.log spam left in code
□ No hardcoded API keys in source
  (use VITE_OMDB_KEY + .env files)
□ README.md with: what it does, screenshots,
  tech stack, how to run locally
□ .gitignore includes node_modules & .env
□ Favicon + page title set`,
        },
      ],
      tips: [
        {
          kind: "warn",
          text: {
            en: "Vite env variables MUST start with VITE_ (e.g. VITE_API_KEY) and are PUBLIC — anyone can read them in the bundle. Never put secret server keys in a Vite app; those belong on a backend.",
            bn: "Vite-এর env ভ্যারিয়েবল অবশ্যই VITE_ দিয়ে শুরু হতে হবে (যেমন VITE_API_KEY) আর সেগুলো PUBLIC — bundle-এ যে কেউ পড়তে পারবে। গোপন সার্ভার কী কখনো Vite অ্যাপে রাখবেন না; ওগুলো backend-এর জিনিস।",
          },
        },
      ],
    },
    {
      id: "revision",
      title: { en: "Interview Revision — say it out loud", bn: "ইন্টারভিউ রিভিশন — জোরে জোরে বলুন" },
      body: [
        {
          en: "Reading answers ≠ being able to say them. The technique that works: open the Interview tab of this app, read each question, and answer OUT LOUD as if explaining to a friend. Stumbled? You found a gap — review that day's lesson and try again. Then practice the coding rounds against the clock: counter in 2 minutes, todo in 10, debounced search in 15.",
          bn: "উত্তর পড়া আর বলতে পারা এক নয়। যে টেকনিক কাজ করে: এই অ্যাপের Interview ট্যাব খুলুন, প্রতিটি প্রশ্ন পড়ুন, আর বন্ধুকে বোঝানোর মতো জোরে জোরে উত্তর দিন। আটকে গেলেন? ঘাটতি পেয়ে গেছেন — সেই দিনের লেসন দেখে আবার চেষ্টা করুন। তারপর ঘড়ি ধরে কোডিং রাউন্ড প্র্যাকটিস করুন: ২ মিনিটে কাউন্টার, ১০ মিনিটে todo, ১৫ মিনিটে debounced search।",
        },
      ],
      code: [
        {
          title: "the 3-pass revision plan",
          language: "txt",
          code: `PASS 1 (30 min) — All questions, out loud.
  For each: 1-2 sentence answer + code if asked.
  Mark the ones you fumbled → "gap list".

PASS 2 (30 min) — Only the gap list.
  Re-read the matching lesson section.
  Answer again, out loud, in front of a mirror/screen.

PASS 3 (30 min) — Coding rounds, timed.
  ✅ Counter — 2 min
  ✅ Todo list — 10 min
  ✅ Fetch + loading/error — 10 min
  ✅ Debounced search — 15 min
  ✅ Accordion / tabs / modal — 8 min each
  (All of these are in the Playground tab!)

The golden interview answers follow this shape:
  1. One-sentence definition
  2. Why it exists / what problem it solves
  3. A tiny code example
  4. One gotcha or best practice
Practice answers in THAT order.`,
        },
      ],
    },
    {
      id: "whats-next",
      title: { en: "What's Next — your learning roadmap", bn: "পরবর্তী ধাপ — আপনার শেখার রোডম্যাপ" },
      body: [
        {
          en: "You now have real React fundamentals — most bootcamp grads can't pass the interview list you just mastered. Here's the priority order for the next month: (1) TypeScript — the industry default, start converting your capstone; (2) TanStack Query — server state done right, replaces 80% of useEffect fetching; (3) Next.js — routing, SSR/SSG, and full-stack React; (4) Testing — Vitest + React Testing Library; (5) Class components — just learn to READ them (legacy codebases) using the lifecycle-to-hooks mapping.",
          bn: "আপনার হাতে এখন আসল React ফাউন্ডেশন — বেশিরভাগ বুটক্যাম্প গ্র্যাজুয়েট আপনি এইমাত্র যে ইন্টারভিউ লিস্ট আয়ত্ত করলেন তা পাস করতে পারে না। পরের মাসের অগ্রাধিকার: (১) TypeScript — ইন্ডাস্ট্রি ডিফল্ট, ক্যাপস্টোনটা convert করা শুরু করুন; (২) TanStack Query — সার্ভার state-এর সঠিক সমাধান, useEffect ফেচিংয়ের ৮০% বদলে দেয়; (৩) Next.js — রাউটিং, SSR/SSG, আর ফুলস্ট্যাক React; (৪) Testing — Vitest + React Testing Library; (৫) Class component — শুধু পড়তে শেখুন (লিগ্যাসি কোডবেসের জন্য) lifecycle-to-hooks ম্যাপিং দিয়ে।",
        },
      ],
      code: [
        {
          title: "class → hooks mapping (just learn to read)",
          language: "js",
          code: `// You'll see these in older codebases & interview panels:
//   componentDidMount   → useEffect(() => {}, [])
//   componentDidUpdate  → useEffect(() => {}, [deps])
//   componentWillUnmount → useEffect(() => { return cleanup }, [])
//   this.state/this.setState → useState
//   this.props          → props (function params)
//   shouldComponentUpdate → React.memo
//   getDerivedStateFromProps → derive during render / useMemo

// Modern React is ~99% function components.
// Learn to READ classes; write functions.`,
        },
        {
          title: "a 30-day roadmap after today",
          language: "txt",
          code: `Week 1 — TypeScript
  ├─ types, interfaces, generics basics
  ├─ type your Day 5 project (props, events, state)
  └─ learn to read library .d.ts files

Week 2 — TanStack Query + API patterns
  ├─ useQuery, useMutation, invalidation
  ├─ refactor capstone fetching to React Query
  └─ understand caching & staleTime

Week 3 — Next.js App Router
  ├─ server vs client components
  ├─ routing, layouts, data fetching
  └─ deploy a Next.js app to Vercel

Week 4 — Testing + polish
  ├─ Vitest + React Testing Library
  ├─ test your custom hooks
  └─ polish capstone → portfolio piece + write README`,
        },
      ],
      tips: [
        {
          kind: "note",
          text: {
            en: "Keep the habit alive: one small project per week beats one huge project per quarter. Recreate UIs you like (a Spotify card, a Twitter thread) — it's the fastest way to make React feel native.",
            bn: "অভ্যাসটা বাঁচিয়ে রাখুন: সপ্তাহে একটা ছোট প্রজেক্ট, ত্রৈমাসিক একটা বিশাল প্রজেক্টের চেয়ে ভালো। পছন্দের UI নকল করুন (একটা Spotify কার্ড, একটা Twitter থ্রেড) — React-কে নিজের মনে করার এটাই দ্রুততম উপায়।",
          },
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d7-e1",
      level: 3,
      title: { en: "Exercise — Capstone dry-run in one file", bn: "অনুশীলন — এক ফাইলে ক্যাপস্টোন ড্রাই-রান" },
      task: {
        en: "A mini capstone simulator: fake auth (context), a protected page, a form with validation, data fetching from an API, and localStorage persistence — all wired together. Study it, then break it and fix it, then rebuild from scratch in your own Vite project.",
        bn: "একটা মিনি ক্যাপস্টোন সিমুলেটর: fake auth (context), protected পেজ, ভ্যালিডেশনসহ ফর্ম, API থেকে ডেটা ফেচ, আর localStorage persistence — সব একসাথে জোড়া। এটা পড়ুন, তারপর ভেঙে ঠিক করুন, তারপর নিজের Vite প্রজেক্টে শূন্য থেকে আবার বানান।",
      },
      starter: `// Study the solution — this combines Days 1-6.
// Then rebuild it yourself in a real Vite project!

// Your mission afterwards (offline, in Vite):
// 1. Auth context + login form + protected dashboard
// 2. Fetch posts from an API with loading/error
// 3. Add-post form with validation (global state)
// 4. Persist the user + posts in localStorage

render(<p>Open the solution 👇</p>);`,
      solution: `import { createContext, useContext, useState, useEffect, useCallback } from "react";

/* custom hook: persistence */
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

/* auth context */
const AuthCtx = createContext(null);

/* form with validation */
function NoteForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const invalid = text.trim().length < 3;

  function submit(e) {
    e.preventDefault();
    setTouched(true);
    if (invalid) { setError("Note must be 3+ characters"); return; }
    onAdd(text.trim());
    setText(""); setTouched(false); setError("");
  }

  return (
    <form onSubmit={submit}>
      <input value={text} onChange={e => setText(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Write a note..."
        style={{ padding: 8, width: "70%", borderRadius: 6,
          border: "1px solid " + (touched && invalid ? "#ef4444" : "#d1d5db") }} />
      <button style={{ marginLeft: 6 }}>Add</button>
      {touched && invalid && <p style={{ color: "#ef4444", fontSize: 13 }}>{error}</p>}
    </form>
  );
}

/* API fetching component */
function QuoteWidget() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const c = new AbortController();
    setLoading(true); setError(null);
    fetch("https://api.chucknorris.io/jokes/random", { signal: c.signal })
      .then(r => r.json())
      .then(d => setQuote(d.value))
      .catch(e => e.name !== "AbortError" && setError(e.message))
      .finally(() => setLoading(false));
    return () => c.abort();
  }, [refresh]);

  if (loading) return <p>⏳ Fetching wisdom...</p>;
  if (error) return <p>❌ {error} <button onClick={() => setRefresh(r => r + 1)}>retry</button></p>;
  return (
    <blockquote style={{ borderLeft: "3px solid #9ca3af", margin: "10px 0", paddingLeft: 10, fontStyle: "italic" }}>
      "{quote}"
      <button onClick={() => setRefresh(r => r + 1)} style={{ display: "block", marginTop: 4 }}>🔄 New one</button>
    </blockquote>
  );
}

function App() {
  const [user, setUser] = useLocalStorage("rj-cap-user", null);
  const [notes, setNotes] = useLocalStorage("rj-cap-notes", []);
  const [page, setPage] = useState("home");

  const addNote = useCallback(text => {
    setNotes(prev => [...prev, { id: Date.now(), text }]);
  }, [setNotes]);

  return (
    <AuthCtx.Provider value={{ user, setUser }}>
      <div style={{ maxWidth: 400 }}>
        <nav style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <button onClick={() => setPage("home")}>home</button>
          <button onClick={() => setPage("dashboard")}>dashboard 🔒</button>
          {user && <span style={{ marginLeft: "auto" }}>👤 {user.name}</span>}
        </nav>

        {page === "home" && (
          <div>
            <h3>🏠 Home</h3>
            <QuoteWidget />
          </div>
        )}

        {page === "dashboard" && (
          user ? (
            <div>
              <h3>📊 {user.name}'s Dashboard</h3>
              <NoteForm onAdd={addNote} />
              <ul>
                {notes.map(n => (
                  <li key={n.id} style={{ display: "flex", gap: 6 }}>
                    <span style={{ flex: 1 }}>{n.text}</span>
                    <button onClick={() => setNotes(p => p.filter(x => x.id !== n.id))}>🗑️</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => setUser(null)}>Log out</button>
            </div>
          ) : (
            <div>
              <p>🔒 Please log in</p>
              <button onClick={() => setUser({ name: "Ayesha" })}>Log in as Ayesha</button>
            </div>
          )
        )}
      </div>
    </AuthCtx.Provider>
  );
}

render(<App />);`,
    },
  ],
  project: {
    title: { en: "Ship It — Portfolio-ready Capstone", bn: "শিপ করুন — পোর্টফোলিও-রেডি ক্যাপস্টোন" },
    brief: {
      en: "Build your chosen capstone in a real Vite project, deploy it, and polish the README with screenshots, live link, feature list, and tech stack. Add the repo + live URL to your CV the same day. Momentum matters more than perfection.",
      bn: "আসল Vite প্রজেক্টে আপনার পছন্দের ক্যাপস্টোন বানান, ডিপ্লয় করুন, আর README-তে স্ক্রিনশট, লাইভ লিংক, ফিচার লিস্ট ও টেক স্ট্যাক দিয়ে সাজান। একই দিনে রিপো + লাইভ URL CV-তে যোগ করুন। নিখুঁত হওয়ার চেয়ে গতি বেশি জরুরি।",
    },
    requirements: [
      { en: "Fake auth + protected routes", bn: "Fake auth + protected route" },
      { en: "API fetching with all UI states", bn: "সব UI state সহ API ফেচিং" },
      { en: "Global state + forms + validation", bn: "গ্লোবাল state + ফর্ম + ভ্যালিডেশন" },
      { en: "localStorage persistence", bn: "localStorage persistence" },
      { en: "Deployed live (Vercel/Netlify) + README", bn: "লাইভ ডিপ্লয় (Vercel/Netlify) + README" },
    ],
  },
};
