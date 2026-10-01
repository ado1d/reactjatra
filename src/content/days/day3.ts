import type { Day } from "../types";

export const day3: Day = {
  id: "day-3",
  day: 3,
  icon: "cloud",
  hours: { en: "2 hrs learn · 3 hrs build", bn: "২ ঘণ্টা শেখা · ৩ ঘণ্টা বানানো" },
  title: { en: "Day 3 — Effects & Data Fetching", bn: "দিন ৩ — useEffect ও ডেটা ফেচিং" },
  subtitle: {
    en: "The component lifecycle, useEffect and its dependency array, cleanup, API fetching, loading/error states, and the classic pitfalls.",
    bn: "Component lifecycle, useEffect ও dependency array, cleanup, API ফেচিং, loading/error state, আর ক্লাসিক ফাঁদগুলো।",
  },
  tagline: {
    en: "useEffect, dependency array, cleanup, API fetching, loading/error states.",
    bn: "useEffect, dependency array, cleanup, API ফেচিং, loading/error state।",
  },
  goals: [
    { en: "Understand the render → effect lifecycle", bn: "render → effect lifecycle বোঝা" },
    { en: "Master the dependency array: [], [x], and none", bn: "Dependency array আয়ত্ত করা: [], [x] ও কিছু না দেওয়া" },
    { en: "Write cleanup functions (and know why you must)", bn: "Cleanup ফাংশন লেখা (আর কেন লাগে তা জানা)" },
    { en: "Fetch APIs with loading, error, and empty states", bn: "Loading, error ও empty state সহ API ফেচ করা" },
    { en: "Fix infinite loops and stale closures", bn: "Infinite loop ও stale closure ঠিক করা" },
  ],
  sections: [
    {
      id: "lifecycle",
      title: { en: "The Component Lifecycle (in hooks world)", bn: "Component Lifecycle (hooks যুগে)" },
      body: [
        {
          en: "Every component goes through: MOUNT (born, inserted into DOM) → UPDATE (re-rendered when state/props change) → UNMOUNT (removed from DOM). Class components had separate methods (componentDidMount etc.), but with hooks ALL of these are expressed with useEffect. The mental model: render is about computing WHAT to show; effects are for everything outside that — timers, subscriptions, API calls, DOM manipulation.",
          bn: "প্রতিটা component-এর যাত্রা: MOUNT (জন্ম, DOM-এ ঢোকা) → UPDATE (state/props বদলালে re-render) → UNMOUNT (DOM থেকে সরে যাওয়া)। Class component-এ আলাদা মেথড ছিল (componentDidMount ইত্যাদি), কিন্তু hooks-এ এসবই useEffect দিয়ে হয়। মেন্টাল মডেল: render মানে হিসাব করা কী দেখাবে; effect মানে ওইটার বাইরের সব কিছু — টাইমার, সাবস্ক্রিপশন, API কল, DOM ম্যানিপুলেশন।",
        },
        {
          en: "The golden rule: useEffect runs AFTER the render is painted on screen. Your component renders first (possibly with loading state), THEN the effect fires (start the fetch), then when data arrives you setState, which re-renders with the data.",
          bn: "সোনার নিয়ম: useEffect চলে রেন্ডার স্ক্রিনে আঁকার পরে। আপনার component আগে রেন্ডার হয় (হয়তো loading state নিয়ে), তারপর effect চলে (ফেচ শুরু), তারপর ডেটা এলে setState করেন, আর সেটা ডেটা নিয়ে আবার re-render করে।",
        },
      ],
      code: [
        {
          title: "lifecycle.jsx",
          language: "jsx",
          code: `import { useState, useEffect } from "react";

function Lifecycle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("I run after EVERY render (no deps array)");
  });

  useEffect(() => {
    console.log("I run ONCE after mount ([] empty deps)");
    return () => {
      console.log("I run at UNMOUNT (cleanup)");
    };
  }, []);

  useEffect(() => {
    console.log("I run on mount AND whenever count changes");
    return () => {
      console.log("I clean up BEFORE the next run & at unmount");
    };
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Click once and watch the console order:
// render → "every render" → "count changed" → (click)
// render → "every render" → cleanup(count) → "count changed"`,
        },
      ],
    },
    {
      id: "dep-array",
      title: { en: "The Dependency Array — three flavors", bn: "Dependency Array — তিন রকম" },
      body: [
        {
          en: "The deps array tells React WHEN to re-run the effect. Get this wrong and you get infinite loops or stale data. The three cases, plus how to think about them: include EVERYTHING from the component body that the effect reads (state, props). If you intentionally omit something, you're telling React \"this value doesn't matter here\".",
          bn: "Deps array React-কে বলে কখন effect আবার চলবে। এটা ভুল করলে infinite loop বা পুরনো ডেটা। তিনটি কেস আর চিন্তার পদ্ধতি: effect যা যা পড়ে (state, props) component বডি থেকে, সবকিছুই include করুন। কিছু ইচ্ছা করে বাদ দিলে আপনি React-কে বলছেন \"এই ভ্যালুটা এখানে গুরুত্বপূর্ণ না\"।",
        },
      ],
      code: [
        {
          title: "deps-cheatsheet.js",
          language: "js",
          code: `// FLAVOR 1: no array → after EVERY render
useEffect(() => {
  console.log("every single render");
});          // ⚠️ rarely what you want

// FLAVOR 2: [] empty → ONLY after the first render (mount)
useEffect(() => {
  console.log("once, like componentDidMount");
}, []);      // ✅ initial fetch, event listeners, timers

// FLAVOR 3: [a, b] → after mount + whenever a or b changes
useEffect(() => {
  console.log("query changed:", query);
}, [query]); // ✅ re-fetch on search change

// The values you list are the effect's "dependencies".
// Everything the effect READS from the component scope
// should appear here. (React's eslint plugin enforces this.)`,
        },
        {
          title: "every useEffect is a story",
          language: "js",
          code: `// "When the app starts, fetch products once"
useEffect(() => {
  fetchProducts();
}, []);

// "Whenever the search query changes, search again"
useEffect(() => {
  searchAPI(query);
}, [query]);

// "Whenever dark mode changes, update localStorage + page bg"
useEffect(() => {
  localStorage.setItem("dark", dark);
}, [dark]);

// "Keep the document title synced with the message count"
useEffect(() => {
  document.title = \`(\${count}) Inbox\`;
}, [count]);`,
        },
      ],
      live: {
        title: "Try it — watch effects fire",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState(["🎬 component mounted"]);

  const log = msg => setLogs(prev => [...prev.slice(-6), msg]);

  useEffect(() => {
    log(\`⚡ effect [count] ran (count=\${count})\`);
    return () => log(\`🧹 cleanup before next [count] run\`);
  }, [count]);

  return (
    <div style={{ maxWidth: 360 }}>
      <button onClick={() => setCount(c => c + 1)}>
        Re-render (count={count})
      </button>
      <div style={{
        background: "#0f172a", color: "#4ade80", borderRadius: 8,
        padding: 12, fontFamily: "monospace", fontSize: 13, marginTop: 12,
      }}>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "cleanup",
      title: { en: "Cleanup Functions", bn: "Cleanup ফাংশন" },
      body: [
        {
          en: "Effects often start things that keep running after the component is gone: timers, subscriptions, event listeners, in-flight fetches. The cleanup function (returned from useEffect) stops them — React calls it before every re-run of the effect AND at unmount. No cleanup = memory leaks, double logs, and updates to dead components.",
          bn: "Effect প্রায়ই এমন কাজ শুরু করে যেগুলো component চলে গাওয়ার পরও চলতে থাকে: টাইমার, সাবস্ক্রিপশন, ইভেন্ট লিসেনার, চলমান fetch। Cleanup ফাংশন (useEffect থেকে return করা) সেগুলো থামায় — React effect পুনরায় চলার আগে ও unmount-এ এটা কল করে। Cleanup না থাকলে = মেমরি লিক, ডাবল লগ, আর মৃত component-এ আপডেট।",
        },
      ],
      code: [
        {
          title: "cleanup-examples.jsx",
          language: "jsx",
          code: `// 1) TIMER cleanup
useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);        // stop the timer!
}, []);

// 2) EVENT LISTENER cleanup
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

// 3) FETCH ABORT (the professional pattern)
useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setResults(data))
    .catch(err => {
      if (err.name !== "AbortError") setError(err); // ignore aborts
    });

  return () => controller.abort();       // cancel stale request!
}, [query]);

// 4) just a log
useEffect(() => {
  console.log("mounted");
  return () => console.log("unmounted 👋");
}, []);`,
        },
      ],
      live: {
        title: "Try it — countdown timer with cleanup",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

function Timer({ seconds, onDone }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);   // reset when parent restarts
  }, [seconds]);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(id);   // ← THE cleanup!
  }, [left]);

  useEffect(() => {
    if (left === 0) onDone?.();
  }, [left]);

  const pct = (left / seconds) * 100;

  return (
    <div>
      <h2>{left}s ⏳</h2>
      <div style={{
        width: 220, height: 10, background: "#e5e7eb", borderRadius: 5,
      }}>
        <div style={{
          width: pct + "%", height: "100%",
          background: pct > 30 ? "#22c55e" : "#ef4444",
          borderRadius: 5, transition: "width 1s linear",
        }} />
      </div>
    </div>
  );
}

function App() {
  const [duration, setDuration] = useState(10);
  const [done, setDone] = useState(false);

  return (
    <div>
      <select value={duration} onChange={e => {
        setDuration(Number(e.target.value));
        setDone(false);
      }}>
        <option value={5}>5 seconds</option>
        <option value={10}>10 seconds</option>
        <option value={30}>30 seconds</option>
      </select>
      <Timer key={duration} seconds={duration} onDone={() => setDone(true)} />
      {done && <p>🎉 Time's up!</p>}
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "fetching",
      title: { en: "Fetching Data — the full pattern", bn: "ডেটা ফেচিং — পূর্ণ প্যাটার্ন" },
      body: [
        {
          en: "Production data fetching has FOUR states: idle, loading, success, error — plus empty (success but no data). Handle all of them or your UI will crash on the first network hiccup. This pattern below is the backbone of your Day 3 project and appears in virtually every interview coding round.",
          bn: "প্রোডাকশন ডেটা ফেচিংয়ে চারটা state: idle, loading, success, error — তার সাথে empty (সফল কিন্তু ডেটা নেই)। সবগুলো হ্যান্ডল করুন, নাহলে প্রথম নেটওয়ার্ক সমস্যাতেই UI ক্র্যাশ করবে। নিচের প্যাটার্নটা দিন ৩-এর প্রজেক্টের মেরুদণ্ড আর প্রায় প্রতিটা ইন্টারভিউ কোডিং রাউন্ডে আসে।",
        },
      ],
      code: [
        {
          title: "useFetchUser.jsx",
          language: "jsx",
          code: `import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState(null);   // null = never loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);                  // reset before retry
        const res = await fetch("/api/users", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);               // runs ALWAYS
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // The 4-state UI
  if (loading) return <p>Loading users… ⏳</p>;
  if (error) return <p>Error: {error} 😢 <button>Retry</button></p>;
  if (!users || users.length === 0) return <p>No users found 📭</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
        },
      ],
      live: {
        title: "Try it — live API with all 4 states",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [userId]);

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ marginBottom: 12 }}>
        {[1, 2, 3, 999].map(id => (
          <button key={id} onClick={() => setUserId(id)} style={{ margin: 2 }}>
            User {id}
          </button>
        ))}
      </div>

      {loading && <p>⏳ Loading user {userId}...</p>}
      {error && <p>❌ Error: {error}</p>}
      {user && !loading && !error && (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 14 }}>
          <h3 style={{ margin: "0 0 4px" }}>{user.name}</h3>
          <p style={{ margin: 0, color: "#6b7280" }}>✉️ {user.email}</p>
          <p style={{ margin: 0, color: "#6b7280" }}>🏙️ {user.address?.city}</p>
          <p style={{ margin: 0, color: "#6b7280" }}>🏢 {user.company?.name}</p>
        </div>
      )}
      <p style={{ fontSize: 12, color: "#9ca3af" }}>
        Click User 999 to see the error state. Switch fast to see AbortController cancel stale requests.
      </p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "pitfalls",
      title: { en: "The 4 Classic Pitfalls (interview favorites)", bn: "৪টি ক্লাসিক ফাঁদ (ইন্টারভিউয়ের প্রিয়)" },
      body: [
        {
          en: "These four bugs bite every React developer exactly once. Learn to recognize and fix them here, and you'll debug Day 3's project in minutes instead of hours.",
          bn: "এই চারটা বাগ প্রতিটা React ডেভেলপারকে ঠিক একবার কামড়ায়। এখানে চিনে ঠিক করতে শিখে নিন, তাহলে আজকের প্রজেক্ট ঘণ্টার বদলে মিনিটে ডিবাগ করবেন।",
        },
      ],
      code: [
        {
          title: "pitfalls.jsx — bug → fix",
          language: "jsx",
          code: `// ❌ PITFALL 1: INFINITE LOOP — setState unconditionally
useEffect(() => {
  setCount(count + 1);   // set → render → effect → set → ...
});                      // deps array MISSING

// ✅ FIX: add the right deps, or restructure
useEffect(() => {
  setCount(c => c + 1);
}, []);   // if it really should run once — or compute
          // during render instead of an effect

// ❌ PITFALL 2: STALE CLOSURE — old value captured
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);       // count is FROZEN at 0!
  }, 1000);
  return () => clearInterval(id);
}, []);                         // empty deps = count never updates

// ✅ FIX: functional update
setCount(c => c + 1);           // always fresh ✅

// ❌ PITFALL 3: missing dependency = stale data
useEffect(() => {
  fetch(\`/api?q=\${query}\`);    // uses OLD query!
}, []);                          // query not listed

// ✅ FIX: list it
useEffect(() => {
  fetch(\`/api?q=\${query}\`);   // re-runs whenever query changes
}, [query]);

// ❌ PITFALL 4: async directly in useEffect
useEffect(async () => {          // async fn returns a Promise,
  const data = await fetch(x);   // not a cleanup function!
}, []);

// ✅ FIX: define async inside, call it
useEffect(() => {
  const load = async () => {
    const data = await fetch(x);
  };
  load();
}, []);`,
        },
      ],
      live: {
        title: "Try it — debounced search (pitfall-fixing in practice)",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }

    setLoading(true);

    // debounce: wait 500ms after typing stops → avoids spam
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users?name_like=\${query}\`
        );
        const data = await res.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(id);   // ← cancels while typing!
  }, [query]);

  return (
    <div style={{ maxWidth: 360 }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search users... (try 'Leanne')"
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
      />
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        {loading ? "⏳ searching..." : query ? \`\${results.length} results for "\${query}"\` : "Type to search"}
      </p>
      <ul>
        {results.map(u => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);

// Notice: typing fast doesn't spam the API — the cleanup
// cancels each pending timeout until you pause for 500ms.
// This is debounce, built with cleanup alone. (Day 4 turns
// this into a reusable custom hook!)`,
      },
      tips: [
        {
          kind: "tip",
          text: {
            en: "Install the \"React hooks eslint plugin\" (eslint-plugin-react-hooks) — it catches pitfalls 1, 3, and 4 automatically. Vite's React template ships with it enabled.",
            bn: "\"React hooks eslint plugin\" (eslint-plugin-react-hooks) ইনস্টল করুন — এটা ফাঁদ ১, ৩ ও ৪ অটোমেটিক ধরে ফেলে। Vite-এর React টেমপ্লেটে এটা এনাবলডই থাকে।",
          },
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d3-e1",
      level: 1,
      title: { en: "Exercise 1 — Document title syncer", bn: "অনুশীলন ১ — ডকুমেন্ট টাইটেল সিঙ্ক" },
      task: {
        en: "Keep document.title synced with a name input: \"Chat — Hi {name}\". When the input is empty, title should be \"Chat\". Use useEffect with the right deps.",
        bn: "নামের ইনপুটের সাথে document.title সিঙ্ক রাখুন: \"Chat — Hi {name}\"। ইনপুট খালি থাকলে title হবে \"Chat\"। সঠিক deps সহ useEffect ব্যবহার করুন।",
      },
      starter: `import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");

  // TODO: useEffect that updates document.title

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name..."
      />
      <p>Title is now: <strong>{name ? \`Chat — Hi \${name}\` : "Chat"}</strong></p>
    </div>
  );
}

render(<App />);`,
      solution: `import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    document.title = name ? \`Chat — Hi \${name}\` : "Chat";
  }, [name]);

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name..."
      />
      <p>Title is now: <strong>{name ? \`Chat — Hi \${name}\` : "Chat"}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "d3-e2",
      level: 2,
      title: { en: "Exercise 2 — Live clock with pause", bn: "অনুশীলন ২ — পজ সহ লাইভ ঘড়ি" },
      task: {
        en: "Show a ticking clock (updates every second) with a Pause/Resume button. Use setInterval with cleanup. Bonus: show elapsed seconds too.",
        bn: "একটা চলমান ঘড়ি দেখান (প্রতি সেকেন্ডে আপডেট) সাথে Pause/Resume বাটন। setInterval আর cleanup ব্যবহার করুন। বোনাস: অতিবাহিত সেকেন্ডও দেখান।",
      },
      starter: `import { useState, useEffect } from "react";

function Clock({ paused }) {
  const [now, setNow] = useState(new Date());

  // TODO: setInterval that ticks when not paused (with cleanup!)
  return <div style={{ fontFamily: "monospace", fontSize: 32 }}>🕐 {now.toLocaleTimeString()}</div>;
}

function App() {
  // TODO: paused state + toggle button
  return (
    <div>
      <Clock paused={false} />
      <p style={{ color: "#9ca3af" }}>⏸️ pause button goes here…</p>
    </div>
  );
}

render(<App />);`,
      solution: `import { useState, useEffect } from "react";

function Clock({ paused }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (paused) return;                 // no interval when paused
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);     // cleanup on pause/unmount
  }, [paused]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: 32 }}>
      🕐 {now.toLocaleTimeString()}
    </div>
  );
}

function App() {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <Clock paused={paused} />
      <button onClick={() => setPaused(p => !p)}>
        {paused ? "▶️ Resume" : "⏸️ Pause"}
      </button>
    </div>
  );
}

render(<App />);`,
      hints: [
        { en: "Early-return inside useEffect when paused — but the cleanup still needs to exist for the running case.", bn: "Paused হলে useEffect-এর ভেতরে early return দিন — তবে চলার কেসের জন্য cleanup থাকতেই হবে।" },
      ],
    },
    {
      id: "d3-e3",
      level: 3,
      title: { en: "Exercise 3 — Post fetcher with userId switcher", bn: "অনুশীলন ৩ — userId সুইচার সহ পোস্ট ফেচার" },
      task: {
        en: "Fetch posts from https://jsonplaceholder.typicode.com/posts?userId={id} for the selected user (1-3 buttons). Show loading, error, empty, and success states. Abort stale requests with AbortController.",
        bn: "নির্বাচিত ইউজারের (১-৩ বাটন) জন্য https://jsonplaceholder.typicode.com/posts?userId={id} থেকে পোস্ট ফেচ করুন। Loading, error, empty ও success state দেখান। AbortController দিয়ে পুরনো রিকোয়েস্ট বাতিল করুন।",
      },
      starter: `import { useState, useEffect } from "react";

function App() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: useEffect on [userId] with abort + all states

  return (
    <div>
      {[1, 2, 3].map(id => (
        <button key={id} onClick={() => setUserId(id)}>User {id}</button>
      ))}
      {/* TODO: 4-state UI */}
    </div>
  );
}

render(<App />);`,
      solution: `import { useState, useEffect } from "react";

function App() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/posts?userId=\${userId}\`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [userId]);

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ marginBottom: 10 }}>
        {[1, 2, 3].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              margin: 2, fontWeight: userId === id ? "bold" : "normal",
              borderBottom: userId === id ? "2px solid #2563eb" : "none",
            }}
          >
            User {id}
          </button>
        ))}
      </div>

      {loading && <p>⏳ Loading posts...</p>}
      {error && <p>❌ {error}</p>}
      {posts?.length === 0 && <p>📭 No posts</p>}
      {posts && posts.slice(0, 5).map(p => (
        <div key={p.id} style={{
          border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, margin: "6px 0",
        }}>
          <strong style={{ textTransform: "capitalize" }}>{p.title}</strong>
        </div>
      ))}
      {posts && posts.length > 5 && (
        <p style={{ color: "#6b7280", fontSize: 13 }}>
          …and {posts.length - 5} more
        </p>
      )}
    </div>
  );
}

render(<App />);`,
    },
  ],
  project: {
    title: { en: "Day 3 Project — Movie Search App", bn: "দিন ৩ প্রজেক্ট — মুভি সার্চ অ্যাপ" },
    brief: {
      en: "Build a movie search app using the free OMDb API (get a key at omdbapi.com) or OpenWeather. Search box with debounce (300-500ms), movie cards with poster/title/year, loading skeleton, error message with retry, and \"no results\" state. Persist your last search in localStorage for polish.",
      bn: "OMDb API (omdbapi.com-এ ফ্রি কী নিন) বা OpenWeather দিয়ে মুভি সার্চ অ্যাপ বানান। Debounce সহ (৩০০-৫০০ms) সার্চ বক্স, পোস্টার/টাইটেল/বছর সহ মুভি কার্ড, loading skeleton, retry সহ error বার্তা, আর \"no results\" state। পলিশ হিসেবে শেষ সার্চটা localStorage-এ রাখুন।",
    },
    requirements: [
      { en: "Debounced search input (cleanup-based)", bn: "Debounce সহ সার্চ ইনপুট (cleanup-ভিত্তিক)" },
      { en: "Movie cards: poster, title, year, type", bn: "মুভি কার্ড: পোস্টার, টাইটেল, বছর, টাইপ" },
      { en: "Loading, error (+retry), empty, no-results states", bn: "Loading, error (+retry), empty, no-results state" },
      { en: "AbortController cancels stale requests", bn: "AbortController দিয়ে পুরনো রিকোয়েস্ট বাতিল" },
    ],
    solution: `import { useState, useEffect } from "react";

// Uses OMDb's public demo key for learning — get your own at omdbapi.com
function MovieCard({ movie }) {
  return (
    <div style={{
      width: 130, border: "1px solid #e5e7eb", borderRadius: 10,
      overflow: "hidden", background: "white",
    }}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster"}
        alt={movie.Title}
        style={{ width: "100%", height: 190, objectFit: "cover" }}
      />
      <div style={{ padding: 8 }}>
        <strong style={{ fontSize: 13, display: "block" }}>
          {movie.Title}
        </strong>
        <small style={{ color: "#6b7280" }}>
          {movie.Year} · {movie.Type}
        </small>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!query.trim()) { setMovies([]); return; }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const id = setTimeout(async () => {           // debounce 400ms
      try {
        const res = await fetch(
          \`https://www.omdbapi.com/?s=\${encodeURIComponent(query)}&apikey=564727fa\`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "False") {
          setMovies([]);
          setError(data.Error);                   // e.g. "Movie not found!"
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [query, retry]);

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>🎬 Movie Search</h2>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies... (try 'inception')"
        style={{
          width: "100%", padding: 10, fontSize: 16,
          border: "1px solid #d1d5db", borderRadius: 8,
        }}
      />

      {loading && <p>⏳ Searching for "{query}"…</p>}
      {error && !loading && (
        <p>
          ❌ {error}{" "}
          <button onClick={() => setRetry(r => r + 1)}>Retry</button>
        </p>
      )}
      {!loading && !error && movies.length === 0 && query && (
        <p>📭 Nothing found for "{query}"</p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
        {movies.map(m => <MovieCard key={m.imdbID} movie={m} />)}
      </div>
    </div>
  );
}

render(<App />);`,
  },
};
