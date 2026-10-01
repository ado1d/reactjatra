import type { Day } from "../types";

export const day0: Day = {
  id: "day-0",
  day: 0,
  icon: "javascript",
  hours: { en: "3–4 hrs · refresher + drills", bn: "৩–৪ ঘণ্টা · রিভিশন + প্র্যাকটিস" },
  title: { en: "Day 0 — JavaScript You MUST Know", bn: "দিন ০ — যে জাভাস্ক্রিপ্ট জানা জরুরি" },
  subtitle: {
    en: "React is just JavaScript with superpowers. Weak JS = painful React. Strengthen these 7 skills first.",
    bn: "রিয়্যাক্ট আসলে জাভাস্ক্রিপ্টেরই সুপারপাওয়ার ভার্সন। জাভাস্ক্রিপ্ট দুর্বল হলে রিয়্যাক্ট কষ্টদায়ক লাগবে। তাই আগে এই ৭টি স্কিল মজবুত করুন।",
  },
  tagline: {
    en: "The JS prerequisites: arrow functions, destructuring, spread/rest, map/filter/reduce, template literals, modules, async/await.",
    bn: "জাভাস্ক্রিপ্ট প্রি-রিকুইজিট: অ্যারো ফাংশন, ডিস্ট্রাকচারিং, স্প্রেড/রেস্ট, map/filter/reduce, টেমপ্লেট লিটারেল, মডিউল, async/await।",
  },
  goals: [
    { en: "Write arrow functions confidently, including implicit returns", bn: "অ্যারো ফাংশন আত্মবিশ্বাসে লিখতে পারা, ইমপ্লিসিট রিটার্নসহ" },
    { en: "Destructure objects and arrays like a pro", bn: "অবজেক্ট ও অ্যারে প্রফেশনালভাবে ডিস্ট্রাকচার করা" },
    { en: "Use spread/rest for immutable copies", bn: "ইমিউটেবল কপির জন্য স্প্রেড/রেস্ট ব্যবহার করা" },
    { en: "Transform data with map, filter, reduce", bn: "map, filter, reduce দিয়ে ডেটা ট্রান্সফর্ম করা" },
    { en: "Fetch APIs with async/await and handle errors", bn: "async/await দিয়ে API ফেচ করা ও এরর হ্যান্ডল করা" },
  ],
  sections: [
    {
      id: "why-js",
      title: { en: "Why this day exists", bn: "এই দিনটা কেন দরকার" },
      body: [
        {
          en: "React is not a new language — it is a JavaScript library. Every React component you will write is a JavaScript function. Every list you render uses .map(), every prop you receive is destructured, every API call uses async/await. When developers say \"React is hard\", 80% of the time the actual problem is weak JavaScript.",
          bn: "রিয়্যাক্ট কোনো নতুন ভাষা নয় — এটা একটা জাভাস্ক্রিপ্ট লাইব্রেরি। আপনি যে প্রতিটা React component লিখবেন সেটা একটা JavaScript ফাংশন। প্রতিটা লিস্ট রেন্ডার হয় .map() দিয়ে, প্রতিটা prop ডিস্ট্রাকচার করা হয়, প্রতিটা API কল async/await দিয়ে হয়। ডেভেলপাররা যখন বলে \"React কঠিন\", তার ৮০% ক্ষেত্রেই আসল সমস্যা হলো দুর্বল জাভাস্ক্রিপ্ট।",
        },
        {
          en: "Spend this day drilling the seven concepts below until they feel automatic. Do every exercise in the playground — typing the code yourself builds the muscle memory that video-watching never will. If you already know JS well, skim each section and jump straight to the exercises to verify.",
          bn: "নিচের সাতটি কনসেপ্ট ততক্ষণ প্র্যাকটিস করুন যতক্ষণ না সেগুলো স্বয়ংক্রিয় মনে হয়। প্রতিটি এক্সারসাইজ প্লেগ্রাউন্ডে করুন — নিজে হাতে কোড লিখলে যে মাসল মেমরি তৈরি হয়, ভিডিও দেখে তা কখনোই হয় না। যদি আপনার JS ইতিমধ্যে ভালো হয়, তাহলে সেকশনগুলো দ্রুত দেখে সরাসরি এক্সারসাইজে চলে যান যাচাই করতে।",
        },
      ],
    },
    {
      id: "arrow",
      title: { en: "1. Arrow Functions", bn: "১. অ্যারো ফাংশন (Arrow Function)" },
      body: [
        {
          en: "Arrow functions are the short way to write functions, and they appear in almost every line of React code. Learn the three shapes below until you can read them in your sleep. The () => value shape (implicit return) is used constantly in JSX callbacks.",
          bn: "অ্যারো ফাংশন হলো ফাংশন লেখার সংক্ষিপ্ত উপায়, আর রিয়্যাক্ট কোডের প্রায় প্রতি লাইনেই এটা থাকে। নিচের তিনটি আকৃতি ভালো করে শিখুন। () => value আকৃতিটি (ইমপ্লিসিট রিটার্ন) JSX কলব্যাকে বারবার ব্যবহৃত হয়।",
        },
      ],
      code: [
        {
          title: "arrow-functions.js",
          language: "js",
          code: `// 1. Regular function
function add(a, b) {
  return a + b;
}

// 2. Arrow function — same thing
const add = (a, b) => {
  return a + b;
};

// 3. Arrow with implicit return (no braces, no "return")
const add = (a, b) => a + b;

// 4. Single parameter — parentheses optional
const double = n => n * 2;

// 5. Returning an object needs parentheses
const makeUser = name => ({ name: name, role: "dev" });`,
        },
      ],
      live: {
        title: "Try it — transform these to arrows",
        language: "jsx",
        code: `// Practice reading arrow functions used in React style
const users = [
  { name: "Ayesha", role: "dev", isOnline: true },
  { name: "Rahim", role: "designer", isOnline: false },
];

const getNames = (users) => users.map(u => u.name);      // implicit return
const online = (users) => users.filter(u => u.isOnline);
const totalOnline = (users) => users.filter(u => u.isOnline).length;

function App() {
  return (
    <div>
      <p>All names: {getNames(users).join(", ")}</p>
      <p>Online now: {totalOnline(users)}</p>
      <p>First user: {JSON.stringify(online(users))}</p>
    </div>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "tip",
          text: {
            en: "In React you will write onClick={() => setCount(count + 1)} — an arrow function passed as a value. If you write onClick={setCount(count + 1)} it calls immediately and causes infinite loops. The arrow delays the call until click.",
            bn: "React-এ আপনি লিখবেন onClick={() => setCount(count + 1)} — একটা অ্যারো ফাংশন ভ্যালু হিসেবে পাঠানো হচ্ছে। যদি লেখেন onClick={setCount(count + 1)} তাহলে সাথে সাথেই কল হবে আর ইনফিনিট লুপ হবে। অ্যারো ফাংশন কলটা ক্লিক পর্যন্ত পিছিয়ে রাখে।",
          },
        },
      ],
    },
    {
      id: "destructuring",
      title: { en: "2. Destructuring Objects & Arrays", bn: "২. ডিস্ট্রাকচারিং (Destructuring)" },
      body: [
        {
          en: "Destructuring pulls values out of objects and arrays in one line. React uses it everywhere: function UserCard({ name, role }) is destructuring the props object. Master both object and array destructuring, including defaults and renaming.",
          bn: "ডিস্ট্রাকচারিং এক লাইনে অবজেক্ট বা অ্যারে থেকে ভ্যালু বের করে আনে। React-এ এটা সর্বত্র: function UserCard({ name, role }) মানে props অবজেক্টটা ডিস্ট্রাকচার করা হচ্ছে। অবজেক্ট ও অ্যারে দুই ধরনের ডিস্ট্রাকচারিংই শিখুন — ডিফল্ট ভ্যালু ও রিনেমিংসহ।",
        },
      ],
      code: [
        {
          title: "destructuring.js",
          language: "js",
          code: `// ----- Object destructuring -----
const user = { name: "Ayesha", role: "dev", city: "Dhaka" };

const name = user.name;         // old way
const { name, role } = user;    // destructuring — same result!

// Default values (if key is missing)
const { city, country = "BD" } = user;

// Rename: put value into a differently-named variable
const { name: userName } = user;   // userName === "Ayesha"

// Nested destructuring
const person = { info: { age: 25 } };
const { info: { age } } = person; // age === 25

// ----- Array destructuring -----
const colors = ["red", "green", "blue"];
const [first, second] = colors;    // first="red", second="green"

// Skip items
const [onlyFirst, , third] = colors;

// Swap variables (classic interview trick)
let a = 1, b = 2;
[a, b] = [b, a];                   // a=2, b=1

// ----- In function parameters (THIS is React props) -----
// Instead of: function Card(props) { return props.title }
function Card({ title, subtitle = "none" }) {
  return title + " / " + subtitle;
}`,
        },
      ],
      live: {
        title: "Try it — destructuring in action",
        language: "jsx",
        code: `function UserCard({ name, role, isOnline = false }) {
  // { name, role } destructured from the props object!
  return (
    <div style={{ padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <strong>{name}</strong> — {role}
      <div>{isOnline ? "🟢 Online" : "⚪ Offline"}</div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <UserCard name="Ayesha" role="dev" isOnline />
      <UserCard name="Rahim" role="designer" />
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "spread",
      title: { en: "3. Spread & Rest (...)", bn: "৩. স্প্রেড ও রেস্ট (...)" },
      body: [
        {
          en: "The three dots ... mean two different things: SPREAD (unpack values into a new array/object) when used in a call or literal, and REST (collect the remaining args) when used in a function parameter. React state must be updated immutably, which means you will constantly make copies with spread.",
          bn: "তিনটা ডট ... দুটো ভিন্ন জিনিস বোঝায়: লিটারেল বা কলে ব্যবহার করলে SPREAD (ভ্যালুগুলো নতুন অ্যারে/অবজেক্টে আনপ্যাক করা), আর ফাংশন প্যারামিটারে ব্যবহার করলে REST (বাকি আর্গুমেন্টগুলো জমা করা)। React state অবশ্যই immutably আপডেট করতে হয়, তাই স্প্রেড দিয়ে কপি বানানো আপনাকে প্রতিনিয়ত করতে হবে।",
        },
      ],
      code: [
        {
          title: "spread-rest.js",
          language: "js",
          code: `// ----- SPREAD: copy & merge -----
const nums = [1, 2, 3];
const more = [...nums, 4];            // [1,2,3,4] — original untouched

const user = { name: "Ayesha", role: "dev" };
const updated = { ...user, role: "senior dev" }; // override one field
// updated = { name: "Ayesha", role: "senior dev" }

// THIS is how you update React state (immutable!):
// setTodos(prev => [...prev, newTodo])
// setUser(prev => ({ ...prev, name: "New Name" }))

// ----- REST: collect the rest -----
function sum(...numbers) {            // numbers = [1,2,3]
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

// Rest in destructuring: "everything else"
const { name, ...rest } = user;       // rest = { role: "dev" }`,
        },
      ],
      live: {
        title: "Try it — immutable updates",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [user, setUser] = useState({ name: "Ayesha", role: "dev", visits: 0 });
  const [tags, setTags] = useState(["react", "js"]);

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <button onClick={() => setUser({ ...user, visits: user.visits + 1 })}>
        Visit (spread copy!)
      </button>
      <hr />
      <p>Tags: {tags.join(", ")}</p>
      <button onClick={() => setTags([...tags, "hook-" + (tags.length + 1)])}>
        Add tag
      </button>
      <button onClick={() => setTags(tags.slice(0, -1))}>Remove last</button>
    </div>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "warn",
          text: {
            en: "NEVER mutate state directly: user.name = \"x\" or todos.push(item) will NOT trigger a re-render. Always create a new array/object with spread.",
            bn: "কখনোই স্টেট সরাসরি মিউটেট করবেন না: user.name = \"x\" বা todos.push(item) লিখলে re-render হবে না। সবসময় স্প্রেড দিয়ে নতুন অ্যারে/অবজেক্ট বানান।",
          },
        },
      ],
    },
    {
      id: "map-filter-reduce",
      title: { en: "4. map / filter / reduce", bn: "৪. map / filter / reduce" },
      body: [
        {
          en: "These three array methods do 90% of data work in React. map transforms every item (and renders lists in JSX), filter keeps matching items, and reduce boils everything down to a single value. All three return a NEW array/value — they never mutate.",
          bn: "এই তিনটি অ্যারে মেথড React-এর ৯০% ডেটা কাজ করে। map প্রতিটি আইটেম বদলে দেয় (JSX-এ লিস্ট রেন্ডার করে), filter ম্যাচিং আইটেমগুলো রাখে, আর reduce সবকিছু মিলিয়ে একটা ভ্যালু বানায়। তিনটিই নতুন অ্যারে/ভ্যালু রিটার্ন করে — কখনো মিউটেট করে না।",
        },
      ],
      code: [
        {
          title: "array-methods.js",
          language: "js",
          code: `const products = [
  { id: 1, name: "Laptop", price: 75000, inStock: true },
  { id: 2, name: "Mouse", price: 800, inStock: false },
  { id: 3, name: "Keyboard", price: 2500, inStock: true },
];

// map: transform each item (SAME length)
const names = products.map(p => p.name);
// ["Laptop", "Mouse", "Keyboard"]

// filter: keep some items (length may shrink)
const available = products.filter(p => p.inStock);
// [laptop, keyboard]

// reduce: boil down to ONE value
const totalValue = products.reduce((sum, p) => sum + p.price, 0);
// 78300

// Chaining (very common in real apps)
const inStockNames = products
  .filter(p => p.inStock)      // keep available ones
  .map(p => p.name);           // then grab their names
// ["Laptop", "Keyboard"]

// find: get ONE item (also common)
const mouse = products.find(p => p.id === 2);`,
        },
      ],
      live: {
        title: "Try it — a mini product dashboard",
        language: "jsx",
        code: `const products = [
  { id: 1, name: "Laptop", price: 75000, inStock: true },
  { id: 2, name: "Mouse", price: 800, inStock: false },
  { id: 3, name: "Keyboard", price: 2500, inStock: true },
  { id: 4, name: "Monitor", price: 18000, inStock: true },
];

function App() {
  const inStock = products.filter(p => p.inStock);
  const total = inStock.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <h3>In-stock products</h3>
      <ul>
        {inStock.map(p => (
          <li key={p.id}>{p.name} — ৳{p.price}</li>
        ))}
      </ul>
      <p><strong>Total value:</strong> ৳{total}</p>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "template",
      title: { en: "5. Template Literals", bn: "৫. টেমপ্লেট লিটারেল" },
      body: [
        {
          en: "Backticks ` ` let you embed variables and expressions with ${...}, write multi-line strings, and build URLs/dynamic classes cleanly. In JSX you will use them for class names, API URLs, and formatted text constantly.",
          bn: "ব্যাকটিক ` ` দিয়ে ${...} সিনট্যাক্সে ভ্যারিয়েবল ও এক্সপ্রেশন এমবেড করা যায়, মাল্টি-লাইন স্ট্রিং লেখা যায়, আর URL/ডায়নামিক ক্লাস পরিষ্কারভাবে বানানো যায়। JSX-এ আপনি ক্লাস নেম, API URL আর ফরম্যাটেড টেক্সটে এটা প্রতিনিয়ত ব্যবহার করবেন।",
        },
      ],
      code: [
        {
          title: "template-literals.js",
          language: "js",
          code: `const name = "Ayesha";
const age = 25;

// Old concatenation
"Hello " + name + ", you are " + age + " years old"

// Template literal (backticks!)
\`Hello \${name}, you are \${age} years old\`

// Expressions work inside \${}
\`Next year you'll be \${age + 1}\`
\`Your name has \${name.length} letters\`

// Building URLs (used in every fetch call)
const query = "dhaka";
fetch(\`https://api.weather.com?q=\${query}&units=metric\`)

// Dynamic class names in React
const isActive = true;
\`btn \${isActive ? "btn-active" : "btn-default"}\`

// Multi-line strings
const email = \`Dear student,
Welcome to the React course!
See you on Day 1.\`;`,
        },
      ],
    },
    {
      id: "modules",
      title: { en: "6. ES Modules (import / export)", bn: "৬. ES মডিউল (import / export)" },
      body: [
        {
          en: "React apps are split across many files — every component lives in its own file, connected with imports and exports. Learn named exports vs the default export, and the folder pattern that every React project follows.",
          bn: "React অ্যাপ অনেকগুলো ফাইলে ভাগ করা থাকে — প্রতিটি component নিজের ফাইলে থাকে, import আর export দিয়ে যুক্ত থাকে। named export বনাম default export শিখুন, আর প্রতিটি React প্রজেক্টের ফোল্ডার প্যাটার্নটা শিখে নিন।",
        },
      ],
      code: [
        {
          title: "src/components/UserCard.jsx (a component file)",
          language: "js",
          code: `// Named export — can be many per file, braces required
export function Badge({ text }) {
  return <span className="badge">{text}</span>;
}

export function Avatar({ src }) {
  return <img src={src} className="avatar" />;
}

// Default export — only ONE per file, no braces on import
export default function UserCard({ name }) {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}`,
        },
        {
          title: "src/App.jsx (importing them)",
          language: "js",
          code: `import UserCard from "./components/UserCard";     // default
import { Badge, Avatar } from "./components/UserCard"; // named
import { useState } from "react";                      // from packages
import * as Icon from "lucide-react";                  // namespace import

// Renaming on import
import { Badge as B } from "./components/UserCard";`,
        },
        {
          title: "Typical project structure",
          language: "txt",
          code: `src/
├── App.jsx
├── main.jsx
├── components/
│   ├── Navbar.jsx
│   └── UserCard.jsx
├── hooks/
│   └── useLocalStorage.js
└── utils/
    └── format.js`,
        },
      ],
      tips: [
        {
          kind: "note",
          text: {
            en: "Rule of thumb: use default export for the file's main component, named exports for helpers. Many teams now use ONLY named exports because default imports allow lazy renaming mistakes.",
            bn: "সহজ নিয়ম: ফাইলের মূল component-এর জন্য default export, হেল্পারদের জন্য named export। এখন অনেক টিম শুধু named export ব্যবহার করে, কারণ default import-এ নাম ভুলে যাওয়ার ঝুঁকি থাকে।",
          },
        },
      ],
    },
    {
      id: "async",
      title: { en: "7. async / await + fetch", bn: "৭. async / await + fetch" },
      body: [
        {
          en: "React apps talk to APIs constantly, and async/await is the modern way to do it. Understand promises, the try/catch pattern with fetch, and the crucial detail that fetch only rejects on network failure — a 404 or 500 is still a \"successful\" response, so you must check res.ok yourself.",
          bn: "React অ্যাপ প্রতিনিয়ত API-এর সাথে কথা বলে, আর async/await হলো সেটা করার আধুনিক উপায়। promise, fetch-এর সাথে try/catch প্যাটার্ন, আর একটা গুরুত্বপূর্ণ বিষয় বুঝুন: fetch শুধু নেটওয়ার্ক ফেল হলেই reject করে — 404 বা 500 হলেও রেসপন্স \"সফল\" ধরা হয়, তাই res.ok নিজে চেক করতে হবে।",
        },
      ],
      code: [
        {
          title: "fetch-data.js",
          language: "js",
          code: `// A promise = a value that arrives LATER
// fetch() returns a promise immediately, data arrives later

// ---- old way: .then chains ----
fetch("https://api.github.com/users/github")
  .then(res => res.json())       // parse body (also async!)
  .then(data => console.log(data))
  .catch(err => console.error(err));

// ---- modern way: async/await ----
async function getUser(username) {
  try {
    const res = await fetch(\`https://api.github.com/users/\${username}\`);

    // IMPORTANT: fetch does NOT throw on 404/500!
    if (!res.ok) {
      throw new Error("HTTP error: " + res.status);
    }

    const data = await res.json();  // wait for parsing
    return data;
  } catch (err) {
    console.error("Failed:", err.message);
    return null;
  }
}

// Multiple requests in PARALLEL (faster than sequential!)
const [user, repos] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/repos").then(r => r.json()),
]);`,
        },
      ],
      live: {
        title: "Try it — real API call (live!)",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [joke, setJoke] = useState("Click the button! 🎉");
  const [loading, setLoading] = useState(false);

  async function getJoke() {
    setLoading(true);
    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setJoke(data.value);
    } catch (err) {
      setJoke("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <p>{loading ? "Loading..." : joke}</p>
      <button onClick={getJoke} disabled={loading}>
        {loading ? "Fetching..." : "Get a joke"}
      </button>
    </div>
  );
}

render(<App />);`,
      },
      tips: [
        {
          kind: "tip",
          text: {
            en: "This exact try/catch + res.ok + loading pattern is what you'll build on Day 3 inside useEffect. Learn it here and Day 3 becomes easy.",
            bn: "এই try/catch + res.ok + loading প্যাটার্নটাই Day 3-এ useEffect-এর ভেতরে ব্যবহার করবেন। এখানে শিখে নিলে Day 3 সহজ হয়ে যাবে।",
          },
        },
      ],
    },
  ],
  exercises: [
    {
      id: "d0-e1",
      level: 1,
      title: { en: "Exercise 1 — Arrow + map warmup", bn: "অনুশীলন ১ — অ্যারো + map ওয়ার্মআপ" },
      task: {
        en: "Given the array of prices, use map with an arrow function to render each price with 10% VAT added (price * 1.1), rounded to a whole number. Show them in a <ul> list.",
        bn: "দামের অ্যারে থেকে map আর অ্যারো ফাংশন ব্যবহার করে প্রতিটি দামে ১০% VAT যোগ করে (price * 1.1) পূর্ণ সংখ্যায় রাউন্ড করে দেখান। <ul> লিস্টে দেখাতে হবে।",
      },
      starter: `function App() {
  const prices = [100, 250, 80, 1200];

  // TODO: map prices to prices with VAT, rounded
  // const withVat = ...

  return (
    <ul>
      {/* TODO: render list items */}
    </ul>
  );
}

render(<App />);`,
      solution: `function App() {
  const prices = [100, 250, 80, 1200];

  const withVat = prices.map(p => Math.round(p * 1.1));

  return (
    <ul>
      {withVat.map((p, i) => (
        <li key={i}>৳{p}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
      hints: [
        { en: "Math.round() rounds a number.", bn: "Math.round() সংখ্যাকে রাউন্ড করে।" },
      ],
    },
    {
      id: "d0-e2",
      level: 2,
      title: { en: "Exercise 2 — Filter + reduce stats", bn: "অনুশীলন ২ — Filter + reduce স্ট্যাটস" },
      task: {
        en: "From the students array: (1) filter students with marks >= 60 (passed), (2) use reduce to find the average marks of the passed students. Render both the passing list and the average.",
        bn: "students অ্যারে থেকে: (১) marks >= 60 হলে filter করুন (পাস), (২) reduce দিয়ে পাস করা স্টুডেন্টদের গড় নম্বর বের করুন। পাস লিস্ট ও গড় দুটোই রেন্ডার করুন।",
      },
      starter: `function App() {
  const students = [
    { id: 1, name: "Karim", marks: 82 },
    { id: 2, name: "Rahima", marks: 45 },
    { id: 3, name: "Jamil", marks: 67 },
    { id: 4, name: "Sultana", marks: 91 },
    { id: 5, name: "Borhan", marks: 55 },
  ];

  // TODO: 1) filter passed students
  // TODO: 2) reduce to average

  return (
    <div>
      {/* TODO */}
    </div>
  );
}

render(<App />);`,
      solution: `function App() {
  const students = [
    { id: 1, name: "Karim", marks: 82 },
    { id: 2, name: "Rahima", marks: 45 },
    { id: 3, name: "Jamil", marks: 67 },
    { id: 4, name: "Sultana", marks: 91 },
    { id: 5, name: "Borhan", marks: 55 },
  ];

  const passed = students.filter(s => s.marks >= 60);
  const average =
    passed.reduce((sum, s) => sum + s.marks, 0) / passed.length;

  return (
    <div>
      <h3>Passed: {passed.map(s => s.name).join(", ")}</h3>
      <p>Average marks: {average.toFixed(1)}</p>
    </div>
  );
}

render(<App />);`,
      hints: [
        { en: "reduce returns a total; divide by passed.length for the average.", bn: "reduce মোট দেয়; গড়ের জন্য passed.length দিয়ে ভাগ করুন।" },
      ],
    },
    {
      id: "d0-e3",
      level: 2,
      title: { en: "Exercise 3 — Immutable state updates", bn: "অনুশীলন ৩ — ইমিউটেবল স্টেট আপডেট" },
      task: {
        en: "Complete the three handlers using ONLY immutable updates (spread/slice/filter — no push, no index assignment): addTag (append), removeLastTag, and renameFirstTag (change the first tag to \"mastered\").",
        bn: "শুধুমাত্র immutable আপডেট (spread/slice/filter — push নয়, ইনডেক্সে সরাসরি অ্যাসাইন নয়) দিয়ে তিনটি হ্যান্ডলার সম্পূর্ণ করুন: addTag (শেষে যোগ), removeLastTag, আর renameFirstTag (প্রথম ট্যাগ \"mastered\" করুন)।",
      },
      starter: `import { useState } from "react";

function App() {
  const [tags, setTags] = useState(["react", "state", "hooks"]);

  function addTag() {
    // TODO: immutable append of "components"
  }

  function removeLastTag() {
    // TODO: immutable remove of last item
  }

  function renameFirstTag() {
    // TODO: first tag becomes "mastered" (immutable!)
  }

  return (
    <div>
      <p>{tags.join(" | ")}</p>
      <button onClick={addTag}>Add</button>
      <button onClick={removeLastTag}>Remove last</button>
      <button onClick={renameFirstTag}>Rename first</button>
    </div>
  );
}

render(<App />);`,
      solution: `import { useState } from "react";

function App() {
  const [tags, setTags] = useState(["react", "state", "hooks"]);

  function addTag() {
    setTags(prev => [...prev, "components"]);
  }

  function removeLastTag() {
    setTags(prev => prev.slice(0, -1));
  }

  function renameFirstTag() {
    setTags(prev =>
      prev.map((tag, i) => (i === 0 ? "mastered" : tag))
    );
  }

  return (
    <div>
      <p>{tags.join(" | ")}</p>
      <button onClick={addTag}>Add</button>
      <button onClick={removeLastTag}>Remove last</button>
      <button onClick={renameFirstTag}>Rename first</button>
    </div>
  );
}

render(<App />);`,
      hints: [
        { en: "For rename: map over items and replace only index 0.", bn: "রিনেমের জন্য: map দিয়ে শুধু ইনডেক্স ০ বদলান।" },
      ],
    },
  ],
  project: {
    title: { en: "Day 0 Project — Dev Profile Card (JS only)", bn: "দিন ০ প্রজেক্ট — ডেভ প্রোফাইল কার্ড (শুধু JS)" },
    brief: {
      en: "Build a tiny \"profile card generator\": an array of 4 developers with name, skills (array), and years of experience. Use filter to find seniors (2+ years), map to render skill chips, and reduce to compute total team experience. No React needed — but try it in the playground with JSX since it supports it.",
      bn: "একটা ছোট \"প্রোফাইল কার্ড জেনারেটর\" বানান: ৪ জন ডেভেলপারের অ্যারে, যাতে নাম, স্কিল (অ্যারে) ও অভিজ্ঞতার বছর থাকবে। filter দিয়ে সিনিয়র (২+ বছর) খুঁজুন, map দিয়ে স্কিল চিপ রেন্ডার করুন, আর reduce দিয়ে টিমের মোট অভিজ্ঞতা বের করুন। React লাগবে না — তবে প্লেগ্রাউন্ডে JSX সাপোর্ট করে বলে চেষ্টা করতে পারেন।",
    },
    requirements: [
      { en: "Array of 4 devs: { name, skills: [], years }", bn: "৪ জন ডেভের অ্যারে: { name, skills: [], years }" },
      { en: "Render all devs with map, each skill as a chip", bn: "map দিয়ে সব ডেভ রেন্ডার করুন, প্রতিটি স্কিল চিপ হিসেবে" },
      { en: "Show seniors only (2+ years) using filter", bn: "filter দিয়ে শুধু সিনিয়র (২+ বছর) দেখান" },
      { en: "Show total team experience with reduce", bn: "reduce দিয়ে টিমের মোট অভিজ্ঞতা দেখান" },
    ],
    solution: `function App() {
  const devs = [
    { id: 1, name: "Ayesha", skills: ["JS", "React", "CSS"], years: 3 },
    { id: 2, name: "Rahim", skills: ["Figma", "CSS"], years: 1 },
    { id: 3, name: "Nusrat", skills: ["JS", "Node"], years: 4 },
    { id: 4, name: "Tanvir", skills: ["Python"], years: 2 },
  ];

  const seniors = devs.filter(d => d.years >= 2);
  const totalExp = devs.reduce((sum, d) => sum + d.years, 0);

  return (
    <div>
      <h2>Team — total {totalExp} years experience</h2>
      <h3>Seniors</h3>
      {seniors.map(d => (
        <div key={d.id} style={{ border: "1px solid #ddd", padding: 8, margin: 4 }}>
          <strong>{d.name}</strong> ({d.years} yrs)
          <div>
            {d.skills.map(s => (
              <span key={s} style={{
                background: "#ddd", borderRadius: 12,
                padding: "2px 8px", margin: 2, fontSize: 12
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
  },
};
