import type { Day } from "../types";

export const day2: Day = {
  id: "day-2",
  day: 2,
  icon: "database",
  hours: { en: "2 hrs learn · 3 hrs build", bn: "২ ঘণ্টা শেখা · ৩ ঘণ্টা বানানো" },
  title: { en: "Day 2 — State: Making UI Interactive", bn: "দিন ২ — State: UI-কে ইন্টারঅ্যাকটিভ করা" },
  subtitle: {
    en: "useState, controlled inputs, immutable updates, lifting state up, and why updates feel \"late\".",
    bn: "useState, কন্ট্রোলড ইনপুট, ইমিউটেবল আপডেট, lifting state up, আর আপডেট \"দেরিতে\" লাগার কারণ।",
  },
  tagline: {
    en: "useState, controlled inputs, immutable updates, lifting state up.",
    bn: "useState, কন্ট্রোলড ইনপুট, ইমিউটেবল আপডেট, lifting state up।",
  },
  goals: [
    { en: "Add state with useState and update it correctly", bn: "useState দিয়ে state যোগ করা ও সঠিকভাবে আপডেট করা" },
    { en: "Build controlled inputs (forms that work)", bn: "কন্ট্রোলড ইনপুট বানানো (যে ফর্ম কাজ করে)" },
    { en: "Update arrays and objects immutably", bn: "অ্যারে ও অবজেক্ট immutably আপডেট করা" },
    { en: "Lift state up to share it between components", bn: "component-এর মধ্যে state শেয়ার করতে lifting state up করা" },
    { en: "Explain props vs state and update batching", bn: "props vs state ও update batching ব্যাখ্যা করা" },
  ],
  sections: [
    {
      id: "usestate",
      title: { en: "useState — memory of a component", bn: "useState — component-এর মেমরি" },
      body: [
        {
          en: "Props come from the parent and can't change. State is a component's own private memory — when it changes, React re-renders that component automatically. useState(initialValue) returns a pair: [value, setValue]. The value is read-only for you; the ONLY way to change it is calling the setter.",
          bn: "Props parent থেকে আসে, বদলানো যায় না। State হলো component-এর নিজস্ব প্রাইভেট মেমরি — এটা বদলালে React ওই component-টা অটোমেটিক re-render করে। useState(initialValue) একটা জোড়া দেয়: [value, setValue]। value আপনার জন্য শুধু পড়ার; একমাত্র বদলানোর উপায় হলো setter কল করা।",
        },
        {
          en: "Every setter call triggers a re-render — but only if the new value differs from the old one (Object.is comparison). Calling the setter with the same value skips the render entirely.",
          bn: "setter কল করলেই re-render হয় — তবে শুধু তখনই যখন নতুন ভ্যালু পুরনোটা থেকে আলাদা (Object.is তুলনা)। একই ভ্যালু দিয়ে setter কল করলে render-ই হয় না।",
        },
      ],
      code: [
        {
          title: "counter.jsx",
          language: "jsx",
          code: `import { useState } from "react";

function Counter() {
  //     state   setter          initial value
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>

      {/* ✅ correct — new value */}
      <button onClick={() => setCount(count + 1)}>+1</button>

      {/* ✅ also correct — function form (best practice) */}
      <button onClick={() => setCount(c => c + 1)}>+1 (fn)</button>

      {/* ❌ WRONG — this does NOTHING:
          setCount(count + 1); setCount(count + 1);
          Both see the SAME old count, so result is +1, not +2! */}

      {/* ❌ WRONG — mutating the variable directly
          count++ — React never knows, no re-render */}
    </div>
  );
}`,
        },
        {
          title: "three rules of state",
          language: "js",
          code: `// 1. State is per-component-instance
//    Two <Counter />s have two SEPARATE counts.

// 2. Never mutate state directly
//    ❌ count++ / user.name = "x" / todos.push(t)
//    ✅ setCount(c => c + 1) / setUser({...user, name:"x"})
//       setTodos([...todos, t])

// 3. State updates use the FUNCTION form when
//    the new value depends on the old one:
setCount(c => c + 1);          // safest, always correct
setTodos(prev => [...prev, newTodo]);`,
        },
      ],
      live: {
        title: "Try it — three state types at once",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  // number, string, boolean — the primitives
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <button onClick={() => setCount(c => c + 1)}>+1</button>{" "}
        <button onClick={() => setCount(0)}>Reset</button>
        <p>Count = {count}</p>
      </div>

      <div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type to update string state..."
        />
        <p>Hi {name || "there"}!</p>
      </div>

      <div>
        <button onClick={() => setLiked(l => !l)}>
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
      </div>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "controlled",
      title: { en: "Controlled Inputs", bn: "কন্ট্রোলড ইনপুট" },
      body: [
        {
          en: "HTML inputs keep their own internal state. A controlled input takes that power away: you set value={state} and onChange={e => setState(e.target.value)}. Now React state is the single source of truth — the input displays exactly what your state says. This is THE standard React form pattern.",
          bn: "HTML ইনপুট নিজের ভেতরে নিজের state রাখে। কন্ট্রোলড ইনপুট সেই ক্ষমতা কেড়ে নেয়: আপনি দেন value={state} আর onChange={e => setState(e.target.value)}। এখন React state-ই একমাত্র সত্যের উৎস — ইনপুট ঠিক তাই দেখায় আপনার state যা বলে। এটাই React ফর্মের স্ট্যান্ডার্ড প্যাটার্ন।",
        },
        {
          en: "Why bother? Validation on every keystroke, conditional UI, clearing the form programmatically, disabling the submit button until valid — all trivial when React owns the data.",
          bn: "এত কষ্ট কেন? প্রতি কী-প্রেসে ভ্যালিডেশন, কন্ডিশনাল UI, প্রোগ্রাম দিয়ে ফর্ম ক্লিয়ার, ভ্যালিড না হওয়া পর্যন্ত সাবমিট বাটন ডিজেবল — React ডেটার মালিক হলে সবই সহজ হয়ে যায়।",
        },
      ],
      code: [
        {
          title: "controlled-form.jsx",
          language: "jsx",
          code: `import { useState } from "react";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // every keystroke updates state → instant validation!
  const isValid = email.includes("@") && password.length >= 8;

  function handleSubmit(e) {
    e.preventDefault();          // stop page reload
    console.log({ email, password });
    setEmail(""); setPassword(""); // clear the form easily
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password (8+ chars)"
      />
      {/* button disabled until valid — impossible with plain HTML */}
      <button disabled={!isValid}>Sign up</button>
    </form>
  );
}`,
        },
      ],
      live: {
        title: "Try it — live validation",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errors = {
    username: username.length > 0 && username.length < 3
      ? "Username must be 3+ characters" : "",
    email: email.length > 0 && !email.includes("@")
      ? "Email must contain @" : "",
    password: password.length > 0 && password.length < 8
      ? "Password must be 8+ characters" : "",
  };

  const filled = username && email && password;
  const hasErrors = Object.values(errors).some(Boolean);

  function submit(e) {
    e.preventDefault();
    alert("Submitted! 🎉 " + JSON.stringify({ username, email }));
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 320, display: "grid", gap: 8 }}>
      {[
        { label: "Username", value: username, set: setUsername, err: errors.username },
        { label: "Email", value: email, set: setEmail, err: errors.email },
        { label: "Password", value: password, set: setPassword, err: errors.password },
      ].map(f => (
        <label key={f.label}>
          {f.label}
          <input
            value={f.value}
            onChange={e => f.set(e.target.value)}
            style={{
              display: "block", width: "100%", padding: 8,
              border: "1px solid " + (f.err ? "#ef4444" : "#d1d5db"),
              borderRadius: 6,
            }}
          />
          {f.err && <small style={{ color: "#ef4444" }}>{f.err}</small>}
        </label>
      ))}
      <button disabled={!filled || hasErrors}>Create account</button>
    </form>
  );
}

render(<App />);`,
      },
    },
    {
      id: "immutable",
      title: { en: "Updating Arrays & Objects (immutably)", bn: "অ্যারে ও অবজেক্ট আপডেট (immutably)" },
      body: [
        {
          en: "React compares state by reference. If you mutate an array (push) or object (user.name = \"x\"), the reference stays the same — React sees \"no change\" and skips the render. So EVERY state update must produce a NEW array/object. These recipes cover 95% of cases — memorize them.",
          bn: "React state তুলনা করে reference দিয়ে। যদি অ্যারে (push) বা অবজেক্ট (user.name = \"x\") mutate করেন, reference একই থাকে — React দেখে \"কিছু বদলায়নি\" আর render বাদ দেয়। তাই প্রতিটি state আপডেটে নতুন অ্যারে/অবজেক্ট বানাতে হবে। নিচের রেসিপিগুলো ৯৫% কেস কভার করে — মুখস্থ করে ফেলুন।",
        },
      ],
      code: [
        {
          title: "immutable-recipes.js — the cheat recipes",
          language: "js",
          code: `// ===== ARRAY RECIPES =====
setItems(prev => [...prev, item]);              // add at end
setItems(prev => [item, ...prev]);              // add at start
setItems(prev => prev.filter(i => i.id !== id)); // remove
setItems(prev => prev.map(i =>                  // update one
  i.id === id ? { ...i, done: !i.done } : i
));
setItems(prev => prev.slice(0, -1));            // remove last
setItems(prev => [...prev].reverse());          // reversed copy
setItems([]);                                    // clear

// ===== OBJECT RECIPES =====
setUser(prev => ({ ...prev, name: "New" }));           // one field
setUser(prev => ({ ...prev, address: {                 // nested (one level)
  ...prev.address, city: "Dhaka",
}}));
// deep nesting → spread each level, or use immer library

// ===== COMPLETE TODO EXAMPLE =====
const addTodo = text =>
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);

const removeTodo = id =>
  setTodos(prev => prev.filter(t => t.id !== id));

const toggleTodo = id =>
  setTodos(prev =>
    prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
  );`,
        },
      ],
      live: {
        title: "Try it — a tiny todo (add/remove/toggle)",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn useState", done: true },
    { id: 2, text: "Build a todo app", done: false },
  ]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggle = id =>
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const remove = id => setTodos(prev => prev.filter(t => t.id !== id));

  return (
    <div style={{ maxWidth: 340 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          placeholder="New todo..."
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map(t => (
        <div key={t.id} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 0", borderBottom: "1px solid #f3f4f6",
        }}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span style={{
            flex: 1, textDecoration: t.done ? "line-through" : "none",
            color: t.done ? "#9ca3af" : "inherit",
          }}>
            {t.text}
          </span>
          <button onClick={() => remove(t.id)} style={{ border: "none", background: "none", cursor: "pointer" }}>
            🗑️
          </button>
        </div>
      ))}

      <p style={{ color: "#6b7280", fontSize: 14 }}>
        {todos.filter(t => !t.done).length} remaining of {todos.length}
      </p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "lifting",
      title: { en: "Lifting State Up", bn: "Lifting State Up (state উপরে তোলা)" },
      body: [
        {
          en: "Two siblings can't share state directly — state lives in one component, and data flows down via props. If sibling A needs sibling B's data, MOVE that state up to their closest common parent, which passes values and callbacks down to both. This pattern is called lifting state up, and you'll use it in every real app.",
          bn: "দুটি sibling (ভাই-বোন) component সরাসরি state শেয়ার করতে পারে না — state একটা component-এ থাকে, আর ডেটা props দিয়ে নিচে নামে। যদি sibling A-এর sibling B-এর ডেটা দরকার হয়, সেই state-টা দুজনের সবচেয়ে কাছের কমন parent-এ সরিয়ে নিন, যেটা ভ্যালু ও কলব্যাক দুজনকেই পাঠাবে। এই প্যাটার্নটাকে বলে lifting state up — প্রতিটা আসল অ্যাপে এটা লাগবে।",
        },
        {
          en: "Rule of thumb: keep state as CLOSE to where it's used as possible. Only lift when multiple components need it. A parent owning state that only one child uses adds useless re-renders.",
          bn: "সহজ নিয়ম: state-কে যতটা সম্ভব ব্যবহারের জায়গার কাছে রাখুন। শুধু একাধিক component-এর দরকার হলে উপরে তুলুন। এমন parent যে শুধু এক child-এর ব্যবহৃত state ধরে রাখে, অহেতুক re-render বাড়ায়।",
        },
      ],
      code: [
        {
          title: "lifting-state.jsx — temperature converter",
          language: "jsx",
          code: `// ❌ Each input has its own state → they can't sync!
// ✅ State lives in the PARENT, both inputs receive it

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) return <p>💧 Water boils!</p>;
  return <p>💧 Water is liquid</p>;
}

function Calculator() {
  const [celsius, setCelsius] = useState(0);   // LIFTED here

  return (
    <div>
      <input value={celsius}
             onChange={e => setCelsius(e.target.value)} />
      <input value={fahrenheitFrom(celsius)} readOnly />
      <BoilingVerdict celsius={celsius} />      {/* sibling uses it too */}
    </div>
  );
}`,
        },
      ],
      live: {
        title: "Try it — synced sibling inputs",
        language: "jsx",
        code: `import { useState } from "react";

// Child 1 — temperature input (controlled by parent's state)
function CelsiusInput({ value, onChange }) {
  return (
    <label>
      °C:
      <input type="number" value={value}
        onChange={e => onChange(Number(e.target.value) || 0)} />
    </label>
  );
}

// Child 2 — shows fahrenheit, derived from the SAME state
function FahrenheitDisplay({ celsius }) {
  return <p>= {(celsius * 9) / 5 + 32}°F</p>;
}

// Child 3 — verdict, also derived
function Verdict({ celsius }) {
  return celsius >= 100
    ? <p style={{ color: "#ef4444" }}>🔥 Water boils!</p>
    : <p style={{ color: "#3b82f6" }}>💧 Water is liquid</p>;
}

// PARENT owns the state and passes it down
function App() {
  const [celsius, setCelsius] = useState(25);

  return (
    <div>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay celsius={celsius} />
      <Verdict celsius={celsius} />
    </div>
  );
}

render(<App />);

// All three children stay in sync because they read ONE source of truth.`,
      },
    },
    {
      id: "props-vs-state",
      title: { en: "Props vs State (and why updates feel \"late\")", bn: "Props বনাম State (আর আপডেট \"দেরিতে\" লাগে কেন)" },
      body: [
        {
          en: "PROPS: passed IN by the parent, read-only, make components reusable. STATE: owned by the component itself, changeable via its setter, triggers re-render on change. A common interview trap: \"can a child change its props?\" — No. But a parent can pass a callback prop the child CALLS, causing the parent to change its own state.",
          bn: "PROPS: parent থেকে ভেতরে আসে, শুধু পড়ার যায়, component-কে reusable করে। STATE: component-এর নিজের, setter দিয়ে বদলানো যায়, বদলালে re-render হয়। ইন্টারভিউয়ের কমন ফাঁদ: \"child কি নিজের props বদলাতে পারে?\" — না। তবে parent একটা কলব্যাক prop পাঠাতে পারে, child সেটা কল করলে parent নিজের state বদলায়।",
        },
        {
          en: "Why does console.log(count) right after setCount(count + 1) still print the OLD value? Because React batches updates: multiple setStates in one event handler are collected and applied together in one re-render. The variable count in your closure doesn't change mid-function — it's a snapshot. Use the functional updater (setCount(c => c + 1)) when you need the latest value.",
          bn: "setCount(count + 1) এর পরপরই console.log(count) করলে পুরনো ভ্যালু কেন দেখায়? কারণ React updates batch করে: এক ইভেন্ট হ্যান্ডলারের একাধিক setState জমা হয়ে একসাথে এক re-render-এ প্রয়োগ হয়। আপনার closure-এর count ভ্যারিয়েবল ফাংশনের মাঝখানে বদলায় না — সেটা একটা snapshot। সর্বশেষ ভ্যালু দরকার হলে functional updater (setCount(c => c + 1)) ব্যবহার করুন।",
        },
      ],
      code: [
        {
          title: "batching-demo.jsx",
          language: "jsx",
          code: `function BatchingDemo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);        // 0 — OLD value! (snapshot)

    setCount(count + 1);       // still sees 0 too!
    // result: count becomes 1, NOT 2 ❌
  }

  function handleClickFixed() {
    setCount(c => c + 1);      // queue: "whatever it is, +1"
    setCount(c => c + 1);      // queue: "whatever it is, +1"
    // result: count becomes +2 ✅
  }

  return <button onClick={handleClick}>{count}</button>;
}`,
        },
        {
          title: "props vs state — the table",
          language: "txt",
          code: `PROPS                        STATE
─────                        ─────
passed from parent           owned by component
read-only                    updated via setter
component cannot change      component CAN change (via setter)
changes → re-render          changes → re-render
good for: config, data       good for: user input,
from parent, callbacks       toggles, fetched data,
                             anything interactive`,
        },
      ],
      live: {
        title: "Try it — see batching with your own eyes",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  const addLog = msg => setLog(prev => [...prev.slice(-4), msg]);

  function brokenPlus2() {
    setCount(count + 1);   // both use the same stale snapshot!
    setCount(count + 1);
    addLog("broken: count=" + count + " → renders as 1");
  }

  function fixedPlus2() {
    setCount(c => c + 1);  // functional form chains correctly
    setCount(c => c + 1);
    addLog("fixed: functional → renders as 2");
  }

  return (
    <div>
      <h2>count = {count}</h2>
      <button onClick={brokenPlus2}>+2 (broken ❌)</button>{" "}
      <button onClick={fixedPlus2}>+2 (fixed ✅)</button>{" "}
      <button onClick={() => { setCount(0); setLog([]); }}>reset</button>
      <ul style={{ fontSize: 13, color: "#6b7280" }}>
        {log.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </div>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "warn",
          text: {
            en: "Classic bug: increment twice in one click shows +1. Cause: two setCount(count + 1) calls both read the same snapshot. Fix: setCount(c => c + 1). Interviewers LOVE this question.",
            bn: "ক্লাসিক বাগ: এক ক্লিকে দুইবার increment করলে +১ দেখায়। কারণ: দুটো setCount(count + 1) কল একই snapshot পড়ে। সমাধান: setCount(c => c + 1)। ইন্টারভিউয়াররা এই প্রশ্ন খুব পছন্দ করে।",
          },
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d2-e1",
      level: 1,
      title: { en: "Exercise 1 — Like button with count", bn: "অনুশীলন ১ — কাউন্ট সহ লাইক বাটন" },
      task: {
        en: "Build a LikeButton: shows \"🤍 Like (n)\" and toggles to \"❤️ Liked (n+1)\" on click. Clicking again un-likes. Only ONE state variable needed... or two if you like — but think about which is truly needed!",
        bn: "একটা LikeButton বানান: \"🤍 Like (n)\" দেখায়, ক্লিক করলে \"❤️ Liked (n+1)\" হয়। আবার ক্লিক করলে লাইক উঠে যায়। একটাই state ভ্যারিয়েবল লাগবে... চাইলে দুটোও নিতে পারেন — কিন্তু ভাবুন আসলে কোনটা সত্যিই দরকার!",
      },
      starter: `import { useState } from "react";

function LikeButton() {
  // TODO: state goes here

  return <button>{/* TODO */}</button>;
}

render(<LikeButton />);`,
      solution: `import { useState } from "react";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(l => !l)}>
      {liked ? "❤️ Liked" : "🤍 Like"}{" "}
      ({liked ? 101 : 100})
    </button>
  );
}

render(<LikeButton />);`,
      hints: [
        { en: "Only `liked` (boolean) is needed — the count can be derived: liked ? 101 : 100.", bn: "শুধু `liked` (boolean) লাগবে — কাউন্ট বের করা যায়: liked ? 101 : 100।" },
      ],
    },
    {
      id: "d2-e2",
      level: 2,
      title: { en: "Exercise 2 — Color picker with lifting", bn: "অনুশীলন ২ — Lifting সহ কালার পিকার" },
      task: {
        en: "Build a color picker: App holds the selected color state. A child <ColorButtons> receives an onPick callback and renders 4 color buttons. A sibling child <Preview> receives the color and shows a colored box. Lift the state into App.",
        bn: "একটা কালার পিকার বানান: App-এ নির্বাচিত কালারের state থাকবে। Child <ColorButtons> একটা onPick কলব্যাক পাবে আর ৪টা কালার বাটন দেখাবে। Sibling child <Preview> কালার পেয়ে একটা রঙিন বক্স দেখাবে। state-টা App-এ lift করুন।",
      },
      starter: `import { useState } from "react";

function ColorButtons({ onPick }) {
  // TODO: 4 buttons that call onPick with a color
  return <div style={{ color: "#9ca3af" }}>🎨 buttons go here…</div>;
}

function Preview({ color }) {
  // TODO: colored box showing current color name too
  return <div style={{ color: "#9ca3af" }}>preview goes here…</div>;
}

function App() {
  // TODO: lift state here, wire both children
  return (
    <div>
      <h3>Pick a color 🎨</h3>
      <ColorButtons onPick={() => {}} />
      <Preview color="blue" />
    </div>
  );
}

render(<App />);`,
      solution: `import { useState } from "react";

const COLORS = [
  { name: "Red", hex: "#ef4444" },
  { name: "Green", hex: "#22c55e" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Purple", hex: "#a855f7" },
];

function ColorButtons({ onPick }) {
  return (
    <div>
      {COLORS.map(c => (
        <button
          key={c.name}
          onClick={() => onPick(c)}
          style={{ background: c.hex, color: "white", margin: 4 }}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}

function Preview({ color }) {
  return (
    <div>
      <div style={{
        width: 120, height: 80, borderRadius: 10,
        background: color.hex, marginTop: 12,
      }} />
      <p>Selected: {color.name} ({color.hex})</p>
    </div>
  );
}

function App() {
  const [color, setColor] = useState(COLORS[2]);

  return (
    <div>
      <h3>Pick a color 🎨</h3>
      <ColorButtons onPick={setColor} />
      <Preview color={color} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "d2-e3",
      level: 3,
      title: { en: "Exercise 3 — Cart quantity controls", bn: "অনুশীলন ৩ — কার্টের পরিমাণ কন্ট্রোল" },
      task: {
        en: "A mini cart: each product row has − and + buttons and shows quantity. Total price updates live. Quantity 0 → show \"Remove\" state or hide row. Use ONLY immutable array updates.",
        bn: "একটা মিনি কার্ট: প্রতিটি প্রোডাক্ট সারিতে − ও + বাটন আর পরিমাণ দেখাবে। মোট দাম লাইভ আপডেট হবে। পরিমাণ ০ হলে সারিটা লুকান বা \"Remove\" দেখান। শুধু immutable অ্যারে আপডেট ব্যবহার করুন।",
      },
      starter: `import { useState } from "react";

function App() {
  const [cart, setCart] = useState([
    { id: 1, name: "Rice (kg)", price: 65, qty: 2 },
    { id: 2, name: "Oil (L)", price: 190, qty: 1 },
    { id: 3, name: "Eggs (dozen)", price: 140, qty: 3 },
  ]);

  // TODO: increment(id), decrement(id) with immutable updates
  // TODO: total via reduce

  return (
    <div>
      <h3>🛒 Your cart</h3>
      {/* TODO: rows with − qty + and line total */}
      <hr />
      {/* TODO: grand total */}
    </div>
  );
}

render(<App />);`,
      solution: `import { useState } from "react";

function App() {
  const [cart, setCart] = useState([
    { id: 1, name: "Rice (kg)", price: 65, qty: 2 },
    { id: 2, name: "Oil (L)", price: 190, qty: 1 },
    { id: 3, name: "Eggs (dozen)", price: 140, qty: 3 },
  ]);

  const changeQty = (id, delta) =>
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter(item => item.qty > 0)   // auto-remove empties
    );

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ maxWidth: 360 }}>
      <h3>🛒 Your cart</h3>
      {cart.map(item => (
        <div key={item.id} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 0", borderBottom: "1px solid #f3f4f6",
        }}>
          <span style={{ flex: 1 }}>{item.name}</span>
          <button onClick={() => changeQty(item.id, -1)}>−</button>
          <span>{item.qty}</span>
          <button onClick={() => changeQty(item.id, +1)}>+</button>
          <span style={{ width: 80, textAlign: "right" }}>
            ৳{item.price * item.qty}
          </span>
        </div>
      ))}
      {cart.length === 0 && <p>Cart is empty 🛒💨</p>}
      <h4>Total: ৳{total}</h4>
    </div>
  );
}

render(<App />);`,
    },
  ],
  project: {
    title: { en: "Day 2 Project — Full Todo App", bn: "দিন ২ প্রজেক্ট — পূর্ণাঙ্গ Todo অ্যাপ" },
    brief: {
      en: "The classic for a reason. Build a todo app with: add (input + Enter or button), toggle complete, delete, filter tabs (All / Active / Done), a counter, and \"Clear completed\". Add localStorage persistence for bonus (or save that for Day 4's custom hook — your choice).",
      bn: "ক্লাসিক প্রজেক্ট, আর কারণ ছাড়া নয়। একটা todo অ্যাপ বানান: যোগ (ইনপুট + Enter বা বাটন), complete টগল, ডিলিট, ফিল্টার ট্যাব (All / Active / Done), কাউন্টার, আর \"Clear completed\"। বোনাস হিসেবে localStorage persistence যোগ করুন (বা সেটা দিন ৪-এর custom hook-এর জন্য রেখে দিন — আপনার পছন্দ)।",
    },
    requirements: [
      { en: "Add todo via input (Enter key + button)", bn: "ইনপুট দিয়ে todo যোগ (Enter কী + বাটন)" },
      { en: "Toggle done / delete single todo", bn: "done টগল / একটা todo ডিলিট" },
      { en: "Filter tabs: All, Active, Completed", bn: "ফিল্টার ট্যাব: All, Active, Completed" },
      { en: "Counts (e.g. \"3 of 7 remaining\")", bn: "কাউন্ট (যেমন \"৭টার মধ্যে ৩টা বাকি\")" },
      { en: "Clear completed button", bn: "Clear completed বাটন" },
    ],
    solution: `import { useState } from "react";

const FILTERS = {
  all: () => true,
  active: t => !t.done,
  done: t => t.done,
};

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0" }}>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span style={{
        flex: 1,
        textDecoration: todo.done ? "line-through" : "none",
        color: todo.done ? "#9ca3af" : "inherit",
      }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Master useState", done: true },
    { id: 2, text: "Build todo app", done: false },
    { id: 3, text: "Learn useEffect", done: false },
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    const value = text.trim();
    if (!value) return;
    setTodos(prev => [...prev, { id: Date.now(), text: value, done: false }]);
    setText("");
  };

  const toggle = id =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = id => setTodos(prev => prev.filter(t => t.id !== id));

  const clearDone = () => setTodos(prev => prev.filter(t => !t.done));

  const visible = todos.filter(FILTERS[filter]);
  const remaining = todos.filter(t => !t.done).length;

  return (
    <div style={{ maxWidth: 360 }}>
      <h2>📝 My Todos</h2>

      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          placeholder="What needs doing?"
          style={{ flex: 1, padding: 8, border: "1px solid #d1d5db", borderRadius: 6 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {Object.keys(FILTERS).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 10px", borderRadius: 999, textTransform: "capitalize",
              border: "1px solid " + (filter === f ? "#2563eb" : "#d1d5db"),
              background: filter === f ? "#2563eb" : "white",
              color: filter === f ? "white" : "black",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.map(t => (
        <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={remove} />
      ))}

      <div style={{
        display: "flex", justifyContent: "space-between",
        marginTop: 10, color: "#6b7280", fontSize: 14,
      }}>
        <span>{remaining} of {todos.length} remaining</span>
        <button onClick={clearDone}>Clear completed</button>
      </div>
    </div>
  );
}

render(<App />);`,
  },
};
