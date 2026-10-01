import type { Day } from "../types";

export const day1: Day = {
  id: "day-1",
  day: 1,
  icon: "atom",
  hours: { en: "2 hrs learn · 3 hrs build", bn: "২ ঘণ্টা শেখা · ৩ ঘণ্টা বানানো" },
  title: { en: "Day 1 — Foundations", bn: "দিন ১ — বেসিক (Foundations)" },
  subtitle: {
    en: "Components, JSX, props, children, lists & keys, conditional rendering, and events.",
    bn: "Component, JSX, props, children, লিস্ট ও key, কন্ডিশনাল রেন্ডারিং, আর ইভেন্ট।",
  },
  tagline: {
    en: "Components, JSX, props, lists, conditional rendering, events.",
    bn: "Component, JSX, props, লিস্ট, কন্ডিশনাল রেন্ডারিং, ইভেন্ট।",
  },
  goals: [
    { en: "Explain WHY React exists (components, declarative UI, virtual DOM)", bn: "ব্যাখ্যা করতে পারা কেন React এসেছে (component, declarative UI, virtual DOM)" },
    { en: "Write components with correct JSX (no more than the rules!)", bn: "সঠিক JSX দিয়ে component লেখা (নিয়মগুলো মেনে!)" },
    { en: "Pass and use props, including children", bn: "props পাঠানো ও ব্যবহার করা, children-সহ" },
    { en: "Render lists with keys and use conditional rendering", bn: "key সহ লিস্ট রেন্ডার করা ও কন্ডিশনাল রেন্ডারিং করা" },
    { en: "Handle onClick / onChange events", bn: "onClick / onChange ইভেন্ট হ্যান্ডল করা" },
  ],
  sections: [
    {
      id: "what-is-react",
      title: { en: "What is React and why should you care?", bn: "রিয়্যাক্ট কী এবং কেন শিখবেন?" },
      body: [
        {
          en: "React is a JavaScript library for building user interfaces, created at Facebook/Meta in 2013. Its core idea: instead of manually grabbing DOM elements and updating them (document.getElementById...), you describe what the UI should look like for any given state, and React figures out how to update the DOM efficiently. This style is called declarative UI.",
          bn: "React হলো ইউজার ইন্টারফেস বানানোর একটা জাভাস্ক্রিপ্ট লাইব্রেরি, যেটা ২০১৩ সালে Facebook/Meta-তে তৈরি হয়েছিল। এর মূল আইডিয়া: DOM এলিমেন্ট ধরে ধরে ম্যানুয়ালি আপডেট করার (document.getElementById...) বদলে আপনি শুধু বর্ণনা করবেন প্রতিটি স্টেটে UI দেখতে কেমন হবে, আর DOM কীভাবে আপডেট করতে হবে সেটা React নিজেই হিসাব করে নেয়। এই স্টাইলকে বলে declarative UI।",
        },
        {
          en: "Three pillars make React powerful: (1) Components — reusable, composable building blocks (a Button, a Navbar, a UserCard); (2) Declarative — UI = f(state); when state changes, React re-renders automatically; (3) The Virtual DOM — React keeps a lightweight copy of the UI in memory, compares old vs new (\"reconciliation\"), and touches the real DOM only where something actually changed.",
          bn: "তিনটি স্তম্ভ React-কে শক্তিশালী করে: (১) Component — পুনর্ব্যবহারযোগ্য, জোড়া লাগানো যায় এমন বিল্ডিং ব্লক (একটা Button, একটা Navbar, একটা UserCard); (২) Declarative — UI = f(state); state বদলালে React অটোমেটিক re-render করে; (৩) Virtual DOM — React মেমরিতে UI-এর একটা হালকা কপি রাখে, পুরনো আর নতুনটা তুলনা করে (\"reconciliation\"), আর শুধু যেখানে সত্যিই কিছু বদলেছে সেখানেই আসল DOM ছোঁয়।",
        },
        {
          en: "Why do companies love it? Reusable components mean faster development, one-way data flow makes apps predictable and debuggable, and the massive ecosystem (React Native for mobile, Next.js for full-stack) means your skills scale beyond web pages. React powers Facebook, Instagram, Netflix, Airbnb, and many more.",
          bn: "কোম্পানিগুলো কেন এটা পছন্দ করে? পুনর্ব্যবহারযোগ্য component মানে দ্রুত ডেভেলপমেন্ট, one-way data flow মানে অ্যাপ predictable ও ডিবাগ করা সহজ, আর বিশাল ইকোসিস্টেম (মোবাইলের জন্য React Native, ফুলস্ট্যাকের জন্য Next.js) মানে আপনার স্কিল শুধু ওয়েবপেজেই সীমাবদ্ধ থাকে না। Facebook, Instagram, Netflix, Airbnb — সবাই React চালায়।",
        },
      ],
      code: [
        {
          title: "imperative vs declarative — the key difference",
          language: "js",
          code: `// ❌ IMPERATIVE (vanilla JS): HOW to update, step by step
const btn = document.getElementById("counter");
let count = 0;
btn.addEventListener("click", () => {
  count++;
  // manually find the label and update it
  document.getElementById("label").textContent =
    "Count: " + count;
});

// ✅ DECLARATIVE (React): WHAT the UI looks like for any count
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
// When count changes, React updates the DOM for you. Forever.`,
        },
      ],
    },
    {
      id: "setup",
      title: { en: "Setting up with Vite (your daily driver)", bn: "Vite দিয়ে সেটআপ" },
      body: [
        {
          en: "Vite is the fastest way to start React projects today — it creates a dev server in seconds with hot reload. Run the command below, choose React and JavaScript when asked, and you have a working app. You will use this for every day's project.",
          bn: "আজকাল React প্রজেক্ট শুরু করার সবচেয়ে দ্রুত উপায় হলো Vite — সেকেন্ডেই hot reload সহ dev server বানিয়ে দেয়। নিচের কমান্ডটা চালান, জিজ্ঞেস করলে React আর JavaScript বাছুন, আর আপনার কাজ করার মতো অ্যাপ রেডি। প্রতিদিনের প্রজেক্টে এটাই ব্যবহার করবেন।",
        },
      ],
      code: [
        {
          title: "terminal",
          language: "bash",
          code: `npm create vite@latest my-react-app
# ✅ Select: React  →  JavaScript (or TypeScript later)
cd my-react-app
npm install
npm run dev      # opens http://localhost:5173`,
        },
        {
          title: "what Vite gives you",
          language: "txt",
          code: `my-react-app/
├── index.html          # the ONE html page (SPA)
├── package.json
└── src/
    ├── main.jsx        # entry: renders <App /> into #root
    ├── App.jsx         # your root component
    ├── App.css
    └── assets/

# main.jsx — the 3 lines that boot every React app:
# createRoot(document.getElementById("root")).render(<App />)`,
        },
      ],
      tips: [
        {
          kind: "tip",
          text: {
            en: "Hot reload = you save the file, the browser updates instantly without losing state. This feedback loop is why building in React feels so fast.",
            bn: "Hot reload = ফাইল সেভ করলেই স্টেট হারানো ছাড়াই ব্রাউজার সাথে সাথে আপডেট হয়ে যায়। এই দ্রুত ফিডব্যাকের জন্যই React-এ কাজ করা দ্রুত লাগে।",
          },
        },
      ],
    },
    {
      id: "jsx",
      title: { en: "JSX — HTML inside JavaScript", bn: "JSX — জাভাস্ক্রিপ্টের ভেতরে HTML" },
      body: [
        {
          en: "JSX looks like HTML but it is actually JavaScript syntax that gets compiled (by Babel/SWC in Vite) into function calls. Understanding JSX rules prevents 90% of Day-1 errors. Memorize these rules now.",
          bn: "JSX দেখতে HTML-এর মতো কিন্তু এটা আসলে জাভাস্ক্রিপ্ট সিনট্যাক্স, যেটা (Vite-এর Babel/SWC) ফাংশন কলে কম্পাইল করে। JSX-এর নিয়মগুলো জানা থাকলে প্রথম দিনের ৯০% এরর এড়ানো যায়। এখনই নিয়মগুলো মুখস্থ করে ফেলুন।",
        },
      ],
      code: [
        {
          title: "jsx-rules.jsx — the 8 rules",
          language: "jsx",
          code: `function Rules() {
  const user = { name: "Ayesha", img: "a.png" };
  const isLoggedIn = true;

  return (
    // RULE 1: ONE parent element (use <> </> fragment if needed)
    <div className="card">           {/* RULE 2: className, NOT class */}

      {/* RULE 3: {} embeds any JS expression */}
      <h2>Hello {user.name.toUpperCase()}!</h2>
      <p>{2 + 2}</p>
      <p>{isLoggedIn ? "Welcome back" : "Please login"}</p>

      {/* RULE 4: every tag must close — <img /> not <img> */}
      <img src={user.img} alt={user.name} />

      {/* RULE 5: style takes an OBJECT, keys in camelCase */}
      <p style={{ color: "crimson", fontSize: 14, marginTop: 8 }}>
        styled text
      </p>

      {/* RULE 6: JSX comments look like this */}

      {/* RULE 7: false, null, undefined render NOTHING */}
      {false && <p>You never see me</p>}

      {/* RULE 8: attributes are camelCase (onClick, tabIndex) */}
      <button onClick={() => alert("clicked")}>Click</button>
    </div>
  );
}`,
        },
        {
          title: "What JSX compiles into (interview gold)",
          language: "js",
          code: `// You write this JSX:
const el = <h1 className="title">Hello {name}</h1>;

// The compiler turns it into this function call:
const el = React.createElement(
  "h1",
  { className: "title" },
  "Hello ",
  name
);

// That's why you need \`import React from "react"\`
// in older setups — JSX is just function calls under the hood!`,
        },
      ],
      live: {
        title: "Try it — fix and play with JSX",
        language: "jsx",
        code: `function Profile() {
  const user = {
    name: "Ayesha Rahman",
    role: "Frontend Developer",
    avatar: "🌸",
  };
  const isOnline = true;

  return (
    <div style={{
      padding: 20, borderRadius: 12,
      border: "1px solid #ddd", textAlign: "center",
    }}>
      <div style={{ fontSize: 48 }}>{user.avatar}</div>
      <h2 style={{ margin: "8px 0 4px" }}>{user.name}</h2>
      <p style={{ color: "#666", margin: 0 }}>{user.role}</p>
      <p style={{ color: isOnline ? "green" : "gray" }}>
        {isOnline ? "🟢 Online now" : "⚪ Offline"}
      </p>
    </div>
  );
}

render(<Profile />);`,
      },
    },
    {
      id: "components-props",
      title: { en: "Components & Props", bn: "Component ও Props" },
      body: [
        {
          en: "A component is just a JavaScript function that returns JSX. Capital letter = component (UserCard), lowercase = HTML tag (div). Props are the inputs a component receives from its parent — like function arguments. Props flow ONE way: parent → child, never up. A component must never modify its own props (they are read-only).",
          bn: "Component আসলে এমন একটা জাভাস্ক্রিপ্ট ফাংশন যেটা JSX রিটার্ন করে। বড় হাতের অক্ষর = component (UserCard), ছোট হাতের = HTML ট্যাগ (div)। Props হলো parent থেকে পাওয়া ইনপুট — ফাংশনের আর্গুমেন্টের মতো। Props এক দিকেই যায়: parent → child, কখনো উল্টো নয়। Component কখনোই নিজের props বদলাতে পারে না (এগুলো read-only)।",
        },
        {
          en: "Destructure props in the parameter list — it's the modern standard. Use defaultProps or default values for optional props. And remember: children is just another prop — whatever you nest between the component's tags.",
          bn: "প্যারামিটার লিস্টেই props ডিস্ট্রাকচার করুন — এটাই আধুনিক স্ট্যান্ডার্ড। ঐচ্ছিক props-এর জন্য ডিফল্ট ভ্যালু দিন। আর মনে রাখুন: children-ও আসলে আরেকটা prop — component-এর ট্যাগের ভেতরে যা লিখবেন সেটাই।",
        },
      ],
      code: [
        {
          title: "UserCard.jsx",
          language: "jsx",
          code: `// Props = inputs from the parent. Destructure them!
function UserCard({ name, role, isOnline = false, avatar = "🙂" }) {
  return (
    <div className="user-card">
      <span className="avatar">{avatar}</span>
      <div>
        <h3>{name}</h3>
        <p>{role}</p>
        <small>{isOnline ? "Online" : "Offline"}</small>
      </div>
    </div>
  );
}

// Using it — data flows DOWN from parent
function App() {
  return (
    <UserCard
      name="Ayesha"
      role="Developer"
      isOnline={true}      // {} for JS values, "" for strings
      avatar="👩‍💻"
    />
  );
}`,
        },
        {
          title: "children — the nesting prop",
          language: "jsx",
          code: `// Card doesn't know its content — it receives it as children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Card title="Welcome!">
      {/* everything here becomes \`children\` */}
      <p>Anything can go here — even other components.</p>
      <UserCard name="Rahim" role="Designer" />
    </Card>
  );
}`,
        },
      ],
      live: {
        title: "Try it — props & children playground",
        language: "jsx",
        code: `function Badge({ children, color = "gray" }) {
  return (
    <span style={{
      background: color, color: "white", borderRadius: 12,
      padding: "2px 10px", fontSize: 12, margin: 2,
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

function UserCard({ name, role, isOnline = false }) {
  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}>
      <h3 style={{ margin: 0 }}>{name}</h3>
      <p style={{ margin: "4px 0", color: "#666" }}>
        <Badge color={isOnline ? "green" : "gray"}>
          {isOnline ? "🟢 Online" : "⚪ Offline"}
        </Badge>{" "}
        {role}
      </p>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      <UserCard name="Ayesha" role="Frontend Dev" isOnline />
      <UserCard name="Rahim" role="UI Designer" />
      <UserCard name="Nusrat" role="Backend Dev" isOnline />
    </div>
  );
}

render(<App />);

// 👆 Try: add a new UserCard, change names, add a new prop like "city"!`,
      },
      tips: [
        {
          kind: "warn",
          text: {
            en: "Props are READ-ONLY. If a component needs changeable data, that data belongs in state (Day 2). Modifying props directly breaks React's data flow and causes bugs that are very hard to trace.",
            bn: "Props শুধু পড়ার জন্য (READ-ONLY)। কোনো component-এর পরিবর্তনযোগ্য ডেটা দরকার হলে সেটা state-এ থাকবে (দিন ২)। Props সরাসরি বদলালে React-এর ডেটা ফ্লো ভেঙে যায় আর খুব কঠিন বাগ হয়।",
          },
        },
      ],
    },
    {
      id: "lists",
      title: { en: "Rendering Lists with map + key", bn: "map + key দিয়ে লিস্ট রেন্ডারিং" },
      body: [
        {
          en: "To render an array in JSX you map data → JSX elements. Every element in a list needs a unique key — a stable identity (usually an id from your data). Keys let React know WHICH item changed, was added, or removed, so it can update efficiently instead of rebuilding the whole list.",
          bn: "JSX-এ অ্যারে রেন্ডার করতে map করে ডেটা → JSX এলিমেন্ট বানান। লিস্টের প্রতিটি এলিমেন্টের একটা ইউনিক key দরকার — একটা স্থায়ী পরিচয় (সাধারণত ডেটার id)। key দিয়ে React বুঝতে পারে কোন আইটেমটা বদলেছে, যোগ হয়েছে বা মুছে গেছে, তাই পুরো লিস্ট না বানিয়ে শুধু দরকারিটুকু আপডেট করতে পারে।",
        },
        {
          en: "Why is the array index a risky key? If items are added/removed/reordered, indexes shift, and React may reuse the wrong DOM nodes — causing glitchy inputs and lost focus. Use index ONLY for static lists that never change order.",
          bn: "অ্যারের ইনডেক্স key হিসেবে বিপজ্জনক কেন? আইটেম যোগ/মুছ/সাজানো হলে ইনডেক্স বদলে যায়, আর React ভুল DOM নোড রিইউজ করতে পারে — ইনপুট গ্লিচ হয়, ফোকাস হারায়। ইনডেক্স শুধু সেসব স্ট্যাটিক লিস্টে ব্যবহার করুন যেগুলোর ক্রম কখনো বদলায় না।",
        },
      ],
      code: [
        {
          title: "List.jsx",
          language: "jsx",
          code: `function ProductList() {
  const products = [
    { id: "p1", name: "Laptop", price: 75000 },
    { id: "p2", name: "Phone", price: 35000 },
    { id: "p3", name: "Headphones", price: 4500 },
  ];

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} — ৳{product.price}
        </li>
      ))}
    </ul>
  );
}

// ✅ key = stable unique id from data
// ⚠️ key={index} works but breaks on insert/remove/reorder
// ❌ key={Math.random()} — new key every render = useless
// ❌ no key — React warns and performs badly`,
        },
      ],
      live: {
        title: "Try it — interactive list with add/remove",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Learn JSX" },
    { id: 2, text: "Learn props" },
  ]);

  return (
    <div>
      <button
        onClick={() =>
          setItems([...items, {
            id: Date.now(),
            text: "Item " + (items.length + 1),
          }])
        }
      >
        + Add item
      </button>
      <button onClick={() => setItems(items.slice(0, -1))}>
        − Remove last
      </button>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <p>{items.length} items — each has a unique key!</p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "conditional",
      title: { en: "Conditional Rendering", bn: "কন্ডিশনাল রেন্ডারিং" },
      body: [
        {
          en: "Showing/hiding UI based on data is a daily job in React. There are three main tools: the ternary (condition ? A : B) when you need two branches, the && shortcut when you show-or-nothing, and early returns in the component body for complex cases (like loading screens).",
          bn: "ডেটা অনুযায়ী UI দেখানো/লুকানো React-এর রোজকার কাজ। তিনটি মূল টুল আছে: দুই শাখা দরকার হলে ternary (condition ? A : B), দেখাবে-নাহলে-কিছু-না হলে && শর্টকাট, আর জটিল ক্ষেত্রে (লোডিং স্ক্রিনের মতো) component বডির শুরুতে early return।",
        },
      ],
      code: [
        {
          title: "conditional.jsx",
          language: "jsx",
          code: `function Notification({ type, messages, isLoading }) {
  // 1) TERNARY — either A or B
  const icon = type === "error" ? "🔴" : "🟢";

  // 2) && — render only if true (short-circuit)
  const hasMessages = messages.length > 0;

  // 3) EARLY RETURN — bail out early for special states
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>{icon} Inbox</h3>

      {hasMessages && (
        <p>You have {messages.length} new messages!</p>
      )}

      {/* ternary inside JSX */}
      {messages.length > 5
        ? <p className="warn">Too many notifications!</p>
        : <p className="ok">You're all caught up.</p>}

      {/* ⚠️ TRAP: left side must be boolean, or 0 renders!
          {count && <p>...</p>}  renders "0" when count is 0 */}
      {messages.length > 0 && <hr />}
    </div>
  );
}`,
        },
      ],
      live: {
        title: "Try it — login/logout states",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unread, setUnread] = useState(2);

  // Early return pattern for the "logged out" world
  if (!isLoggedIn) {
    return (
      <div>
        <p>🔒 Please log in to continue</p>
        <button onClick={() => setIsLoggedIn(true)}>Log in</button>
      </div>
    );
  }

  return (
    <div>
      <h3>👋 Welcome back!</h3>

      {/* && pattern */}
      {unread > 0 && <p>🔔 You have {unread} unread messages</p>}

      {/* ternary pattern */}
      <p>{unread > 5 ? "📬 Inbox almost full!" : "✅ Inbox under control"}</p>

      <button onClick={() => setUnread(unread + 1)}>New message</button>
      <button onClick={() => setIsLoggedIn(false)}>Log out</button>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "events",
      title: { en: "Handling Events", bn: "ইভেন্ট হ্যান্ডলিং" },
      body: [
        {
          en: "React events use camelCase (onClick, onChange, onSubmit) and receive a synthetic event object with methods like preventDefault(). The two mistakes every beginner makes: calling the function instead of passing it, and losing the event argument. Learn the three correct patterns below.",
          bn: "React ইভেন্ট camelCase ব্যবহার করে (onClick, onChange, onSubmit) আর একটা synthetic event অবজেক্ট দেয়, যাতে preventDefault()-এর মতো মেথড থাকে। প্রতিটি বিগিনার দুটি ভুল করে: ফাংশন পাঠানোর বদলে কল করে ফেলা, আর event আর্গুমেন্ট হারিয়ে ফেলা। নিচের তিনটি সঠিক প্যাটার্ন শিখুন।",
        },
      ],
      code: [
        {
          title: "events.jsx",
          language: "jsx",
          code: `function Events() {
  function handleClick(event) {
    // event = synthetic event (like DOM event, normalized)
    event.preventDefault();
    console.log("clicked!", event.target);
  }

  function deleteItem(id) {
    console.log("deleting", id);
  }

  return (
    <div>
      {/* ✅ Pattern 1: pass the function (NO parentheses!) */}
      <button onClick={handleClick}>Click me</button>

      {/* ❌ WRONG: calls during render = infinite loop
          <button onClick={handleClick()}>...</button> */}

      {/* ✅ Pattern 2: wrap in arrow to pass extra args */}
      <button onClick={() => deleteItem(42)}>Delete</button>

      {/* ✅ Pattern 3: inline arrow (fine for small handlers) */}
      <button onClick={e => console.log("inline", e.target)}>Inline</button>

      {/* Form submit — preventDefault stops page reload */}
      <form onSubmit={e => {
        e.preventDefault();
        console.log("submitted!");
      }}>
        <input onChange={e => console.log(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}`,
        },
      ],
      live: {
        title: "Try it — events everywhere",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [clicks, setClicks] = useState(0);
  const [theme, setTheme] = useState("light");

  const isDark = theme === "dark";

  return (
    <div style={{
      padding: 20, borderRadius: 12,
      background: isDark ? "#1a1a2e" : "#fafafa",
      color: isDark ? "white" : "black",
    }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type your name..."
      />
      <p>Hello, {name || "stranger"}! 👋</p>

      <button onClick={() => setClicks(clicks + 1)}>
        Clicked {clicks} times
      </button>

      <button onClick={() => setTheme(isDark ? "light" : "dark")}>
        {isDark ? "☀️ Light" : "🌙 Dark"} mode
      </button>
    </div>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "note",
          text: {
            en: "Day 1 mental model: data flows down via props, events flow up via handler functions. Parent passes data AND callbacks; child calls the callback when something happens. This is called one-way (unidirectional) data flow.",
            bn: "দিন ১-এর মেন্টাল মডেল: ডেটা props-এর মাধ্যমে নিচে নামে, ইভেন্ট হ্যান্ডলার ফাংশনের মাধ্যমে উপরে ওঠে। Parent ডেটা ও কলব্যাক দুটোই পাঠায়; child কিছু ঘটলে কলব্যাক কল করে। এটাকেই বলে one-way (unidirectional) data flow।",
          },
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d1-e1",
      level: 1,
      title: { en: "Exercise 1 — Build a Greeting component", bn: "অনুশীলন ১ — Greeting component বানান" },
      task: {
        en: "Create a <Greeting name=\"...\" hour={10} /> component that shows \"Good morning\" before 12, \"Good afternoon\" before 17, and \"Good evening\" otherwise, followed by the name. Use conditional rendering.",
        bn: "একটা <Greeting name=\"...\" hour={10} /> component বানান যেটা ১২টার আগে \"Good morning\", ১৭টার আগে \"Good afternoon\", আর বাকি সময় \"Good evening\" দেখাবে, তারপর নাম। কন্ডিশনাল রেন্ডারিং ব্যবহার করুন।",
      },
      starter: `function Greeting({ name, hour }) {
  // TODO: return the right greeting based on hour
  // morning < 12, afternoon < 17, evening otherwise
  return <h3>❓ {name}</h3>;
}

function App() {
  return (
    <div>
      <Greeting name="Ayesha" hour={9} />
      <Greeting name="Rahim" hour={14} />
      <Greeting name="Nusrat" hour={20} />
    </div>
  );
}

render(<App />);`,
      solution: `function Greeting({ name, hour }) {
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";

  return <h3>{greeting}, {name}! 🌤️</h3>;
}

function App() {
  return (
    <div>
      <Greeting name="Ayesha" hour={9} />
      <Greeting name="Rahim" hour={14} />
      <Greeting name="Nusrat" hour={20} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "d1-e2",
      level: 2,
      title: { en: "Exercise 2 — Skill list with keys", bn: "অনুশীলন ২ — key সহ স্কিল লিস্ট" },
      task: {
        en: "Render the skills array as chips. Each skill has an id — use it as key. Add a button that removes the FIRST skill (using filter) and verify the correct chip disappears.",
        bn: "skills অ্যারেটা চিপ হিসেবে রেন্ডার করুন। প্রতিটি skill-এর একটা id আছে — সেটাই key হিসেবে ব্যবহার করুন। একটা বাটন যোগ করুন যেটা প্রথম skill-টা (filter দিয়ে) মুছে দেয়, আর যাচাই করুন সঠিক চিপটাই মুছে যায়।",
      },
      starter: `import { useState } from "react";

function App() {
  const [skills, setSkills] = useState([
    { id: "s1", name: "HTML" },
    { id: "s2", name: "CSS" },
    { id: "s3", name: "JavaScript" },
    { id: "s4", name: "React" },
  ]);

  function removeFirst() {
    // TODO: remove the first skill immutably
  }

  return (
    <div>
      <button onClick={removeFirst}>Remove first skill</button>
      {/* TODO: render skill chips with key */}
    </div>
  );
}

render(<App />);`,
      solution: `import { useState } from "react";

function App() {
  const [skills, setSkills] = useState([
    { id: "s1", name: "HTML" },
    { id: "s2", name: "CSS" },
    { id: "s3", name: "JavaScript" },
    { id: "s4", name: "React" },
  ]);

  function removeFirst() {
    setSkills(prev => prev.filter((s, i) => i !== 0));
  }

  return (
    <div>
      <button onClick={removeFirst}>Remove first skill</button>
      <div>
        {skills.map(s => (
          <span key={s.id} style={{
            background: "#2563eb", color: "white",
            padding: "4px 12px", borderRadius: 14,
            margin: 4, display: "inline-block",
          }}>
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "d1-e3",
      level: 3,
      title: { en: "Exercise 3 — Traffic light (props + conditional)", bn: "অনুশীলন ৩ — ট্রাফিক লাইট (props + কন্ডিশনাল)" },
      task: {
        en: "Build a <SignalLight color=\"red|yellow|green\" /> component: a circle that is bright when active, gray otherwise. The App has a state color and three buttons to switch. One light is active at a time.",
        bn: "একটা <SignalLight color=\"red|yellow|green\" /> component বানান: একটা বৃত্ত, active হলে উজ্জ্বল, নাহলে ধূসর। App-এ color নামে state থাকবে আর তিনটা বাটনে বদলানো যাবে। একসাথে একটাই লাইট active থাকবে।",
      },
      starter: `import { useState } from "react";

function SignalLight({ color, active }) {
  // TODO: circle div, bright when active
  return <div />;
}

function App() {
  // TODO: state for the active color
  return (
    <div>
      {/* TODO: 3 SignalLights + 3 buttons */}
    </div>
  );
}

render(<App />);`,
      solution: `import { useState } from "react";

const COLORS = {
  red: "#ef4444",
  yellow: "#eab308",
  green: "#22c55e",
};

function SignalLight({ color, active }) {
  return (
    <div style={{
      width: 48, height: 48, borderRadius: "50%",
      background: active ? COLORS[color] : "#d1d5db",
      margin: 6, boxShadow: active ? \`0 0 16px \${COLORS[color]}\` : "none",
      transition: "all 0.3s",
    }} />
  );
}

function App() {
  const [color, setColor] = useState("red");

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "inline-flex", flexDirection: "column",
        background: "#111", padding: 12, borderRadius: 16,
      }}>
        {Object.keys(COLORS).map(c => (
          <SignalLight key={c} color={c} active={color === c} />
        ))}
      </div>
      <div>
        {Object.keys(COLORS).map(c => (
          <button key={c} onClick={() => setColor(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
  project: {
    title: { en: "Day 1 Project — Profile Card List", bn: "দিন ১ প্রজেক্ট — প্রোফাইল কার্ড লিস্ট" },
    brief: {
      en: "Build a team page from an array of at least 6 users. Each UserCard shows avatar (emoji), name, role, and online status. Add a button to toggle each user's online status (hint: keep the users array in state and update it immutably — a sneak peek at Day 2). Add a search input that filters users by name.",
      bn: "কমপক্ষে ৬ জন ইউজারের অ্যারে থেকে একটা টিম পেজ বানান। প্রতিটি UserCard-তে অ্যাভাটার (ইমোজি), নাম, রোল ও অনলাইন স্টেটাস দেখান। প্রতিটি ইউজারের অনলাইন স্টেটাস টগল করার বাটন যোগ করুন (হিন্ট: users অ্যারেটা state-এ রাখুন আর immutably আপডেট করুন — দিন ২-এর ঝলক)। নাম দিয়ে ইউজার ফিল্টার করার সার্চ ইনপুট যোগ করুন।",
    },
    requirements: [
      { en: "UserCard component with props: name, role, isOnline, avatar", bn: "UserCard component, props সহ: name, role, isOnline, avatar" },
      { en: "Render 6+ users with map + unique keys", bn: "map + ইউনিক key দিয়ে ৬+ ইউজার রেন্ডার" },
      { en: "Toggle button per card (green ⚪/🟢)", bn: "প্রতি কার্ডে টগল বাটন (⚪/🟢)" },
      { en: "Search input filtering by name", bn: "নাম দিয়ে ফিল্টার করার সার্চ ইনপুট" },
    ],
    solution: `import { useState } from "react";

function UserCard({ user, onToggle }) {
  return (
    <div style={{
      display: "flex", gap: 12, alignItems: "center",
      padding: 12, border: "1px solid #e5e7eb", borderRadius: 12,
    }}>
      <div style={{ fontSize: 36 }}>{user.avatar}</div>
      <div style={{ flex: 1 }}>
        <strong>{user.name}</strong>
        <div style={{ color: "#6b7280", fontSize: 14 }}>{user.role}</div>
      </div>
      <button
        onClick={() => onToggle(user.id)}
        style={{
          border: "none", borderRadius: 20, padding: "6px 12px",
          background: user.isOnline ? "#22c55e" : "#e5e7eb",
          color: user.isOnline ? "white" : "#374151", cursor: "pointer",
        }}
      >
        {user.isOnline ? "🟢 Online" : "⚪ Offline"}
      </button>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ayesha Rahman", role: "Frontend Dev", avatar: "👩‍💻", isOnline: true },
    { id: 2, name: "Rahim Uddin", role: "UI Designer", avatar: "🎨", isOnline: false },
    { id: 3, name: "Nusrat Jahan", role: "Backend Dev", avatar: "🧑‍🔬", isOnline: true },
    { id: 4, name: "Tanvir Hasan", role: "DevOps", avatar: "🛠️", isOnline: false },
    { id: 5, name: "Sultana Razia", role: "QA Engineer", avatar: "🔍", isOnline: true },
    { id: 6, name: "Jamil Chowdhury", role: "Data Analyst", avatar: "📊", isOnline: false },
  ]);
  const [query, setQuery] = useState("");

  const toggleOnline = id =>
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, isOnline: !u.isOnline } : u))
    );

  const visible = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Our Team ({visible.length})</h2>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by name..."
        style={{
          width: "100%", padding: 8, marginBottom: 12,
          border: "1px solid #d1d5db", borderRadius: 8,
        }}
      />
      <div style={{ display: "grid", gap: 8 }}>
        {visible.length === 0 && <p>No users match "{query}" 😕</p>}
        {visible.map(u => (
          <UserCard key={u.id} user={u} onToggle={toggleOnline} />
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
  },
};
