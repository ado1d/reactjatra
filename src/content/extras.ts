import type { ExtraTopic } from "./types";

export const extraTopics: ExtraTopic[] = [
  {
    id: "x-styling",
    icon: "palette",
    title: { en: "Styling in React (3 ways)", bn: "React-এ স্টাইলিং (৩ উপায়)" },
    why: {
      en: "You can build anything, but it also has to LOOK good. Each styling approach has a real job: inline styles for quick dynamic values, CSS Modules for component-scoped styles, Tailwind for rapid consistent UIs.",
      bn: "আপনি যা-ই বানান, সেটা দেখতেও ভালো হতে হবে। প্রতিটি স্টাইলিং পদ্ধতির আসল কাজ আছে: quick dynamic ভ্যালুর জন্য inline style, component-scoped স্টাইলের জন্য CSS Module, দ্রুত ও সামঞ্জস্যপূর্ণ UI-এর জন্য Tailwind।",
    },
    body: [
      {
        en: "Inline styles work for dynamic values computed in JS (progress bar widths, drag positions), but they can't do hover/media queries and get messy fast. CSS Modules (button.module.css) scope styles to one file — class names get auto-hashed, so no collisions, and your CSS stays real CSS. Tailwind gives you utility classes (flex gap-2 rounded-xl) directly in JSX — extremely fast once learned, and what this very app uses.",
        bn: "Inline style JS-এ হিসাব করা dynamic ভ্যালুর জন্য ভালো (প্রগ্রেস বারের প্রস্থ, ড্র্যাগ পজিশন), কিন্তু hover/media query পারে না আর দ্রুত এলোমেলো হয়। CSS Module (button.module.css) এক ফাইলে স্টাইল scope করে — class-এর নাম auto-hash হয়, সংঘর্ষ হয় না, আর CSS আসল CSS-ই থাকে। Tailwind আপনাকে utility class সরাসরি JSX-এ দেয় (flex gap-2 rounded-xl) — একবার শিখলে অত্যন্ত দ্রুত, আর এই অ্যাপটাই এটা ব্যবহার করে।",
      },
    ],
    code: [
      {
        title: "1-inline.jsx",
        language: "jsx",
        code: `// dynamic values only — not your whole design system
<progress style={{ width: \`\${percent}%\` }} />
<div style={{ transform: \`translateY(\${offset}px)\` }} />`,
      },
      {
        title: "2-Button.module.css + usage",
        language: "css",
        code: `/* Button.module.css — scoped! */
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  background: #2563eb;
  color: white;
}
.btn:hover { background: #1d4ed8; }   /* hover works here */

// Button.jsx
import styles from "./Button.module.css";
<button className={styles.btn}>Click</button>
// renders as class="Button_btn__x7f2k" — collision-free`,
      },
      {
        title: "3-tailwind.jsx",
        language: "jsx",
        code: `<button
  className="rounded-lg bg-blue-600 px-4 py-2
             font-medium text-white
             transition hover:bg-blue-700
             active:scale-95"
>
  Click
</button>`,
      },
    ],
  },
  {
    id: "x-composition",
    icon: "blocks",
    title: { en: "Component Composition Patterns", bn: "Component Composition প্যাটার্ন" },
    why: {
      en: "\"Smart\" apps become dumb when everything is one giant component. Composition patterns are how experienced React devs keep code flexible: children as props, render props, compound components, and the container/presentational split.",
      bn: "সব এক giant component-এ গাদা করলে \"স্মার্ট\" অ্যাপও বোকা হয়ে যায়। Composition প্যাটার্ন দিয়েই অভিজ্ঞ React ডেভেলপাররা কোড flexible রাখেন: children as props, render props, compound component, আর container/presentational ভাগ।",
    },
    body: [
      {
        en: "The most important pattern is also the simplest: pass JSX as the children prop instead of hardcoding content. It inverts control — the parent decides what goes inside. Compound components (like <Tabs><Tabs.List/><Tabs.Panel/></Tabs>) coordinate through context while letting the consumer arrange the pieces. Container/presentational means one component fetches/manages data and a separate \"dumb\" one just renders it — great for testability.",
        bn: "সবচেয়ে গুরুত্বপূর্ণ প্যাটার্নটাই সবচেয়ে সহজ: কনটেন্ট hardcode করার বদলে JSX-কে children prop হিসেবে পাঠান। এতে নিয়ন্ত্রণ উল্টে যায় — parent ঠিক করে ভেতরে কী থাকবে। Compound component (<Tabs><Tabs.List/><Tabs.Panel/></Tabs> এর মতো) context দিয়ে সমন্বয় করে কিন্তু consumer-কে অংশগুলো সাজানোর স্বাধীনতা দেয়। Container/presentational মানে এক component ডেটা ফেচ/ম্যানেজ করে আর আলাদা \"বোকা\" component শুধু রেন্ডার করে — টেস্টের জন্য দারুণ।",
      },
    ],
    code: [
      {
        title: "composition-patterns.jsx",
        language: "jsx",
        code: `// 1) CHILDREN — pass content, not config
<Modal>
  <h2>Are you sure?</h2>       {/* any JSX the parent wants */}
  <button>Cancel</button>
  <button danger>Delete</button>
</Modal>

// 2) RENDER PROP — pass a function, get flexibility
function DataList({ url, renderItem }) {
  const { data, loading } = useFetch(url);
  if (loading) return <p>Loading…</p>;
  return <ul>{data.map(renderItem)}</ul>;
}
<DataList url="/api/users"
  renderItem={u => <li key={u.id}>{u.name}</li>} />

// 3) COMPOUND COMPONENT — coordinated pieces via context
const TabsCtx = createContext();
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return (
    <TabsCtx.Provider value={{ active, setActive }}>
      {children}
    </TabsCtx.Provider>
  );
}
function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsCtx);
  return (
    <button aria-selected={active === index}
            onClick={() => setActive(index)}>
      {children}
    </button>
  );
}
// Consumer arranges freely:
// <Tabs><div><Tab index={0}>A</Tab><Tab index={1}>B</Tab></div></Tabs>

// 4) CONTAINER / PRESENTATIONAL
function UserListContainer() {          // smart: data
  const { data, loading } = useFetch("/users");
  if (loading) return <Spinner />;
  return <UserList users={data} />;     // dumb: just renders
}
function UserList({ users }) {          // easy to test, reuse
  return users.map(u => <Row key={u.id} user={u} />);
}`,
      },
    ],
  },
  {
    id: "x-debugging",
    icon: "bug",
    title: { en: "Debugging React Like a Pro", bn: "প্রোর মতো React ডিবাগ করা" },
    why: {
      en: "You WILL break things daily. Debugging skill is the difference between 5-minute fixes and 5-hour panic. Learn these tools once, save hundreds of hours.",
      bn: "রোজই কিছু ভাঙবেন। ডিবাগিং দক্ষতাই ৫ মিনিটের ফিক্স আর ৫ ঘণ্টার আতঙ্কের পার্থক্য। এই টুলগুলো একবার শিখুন, শত ঘণ্টা বাঁচান।",
    },
    body: [
      {
        en: "React DevTools (browser extension) shows your component tree with live props/state, and the Profiler records which components re-render and how long they take. Learn to read error screens: \"Cannot read property 'x' of undefined\" usually means fetching hasn't finished (guard with data?.field), \"Rendered more hooks than during the previous render\" means you broke the Rules of Hooks, and key warnings point at list identity problems.",
        bn: "React DevTools (ব্রাউজার এক্সটেনশন) আপনার component ট্রি লাইভ props/state সহ দেখায়, আর Profiler রেকর্ড করে কোন component re-render হয়, কত সময় নেয়। Error স্ক্রিন পড়তে শিখুন: \"Cannot read property 'x' of undefined\" সাধারণত মানে ফেচিং শেষ হয়নি (data?.field দিয়ে আগলান), \"Rendered more hooks than during the previous render\" মানে Rules of Hooks ভেঙেছেন, আর key warning মানে লিস্ট identity সমস্যা।",
      },
    ],
    code: [
      {
        title: "common-errors.jsx — error → cause → fix",
        language: "jsx",
        code: `// ❌ "Cannot read properties of undefined (reading 'map')"
// cause: data is null while fetching
{data.map(...)}
// ✅ fix: optional chaining + guard
{data?.map(...)}
{data ? <List items={data} /> : <Loading />}

// ❌ "Rendered more hooks than during the previous render"
// cause: hook inside if/loop (Rules of Hooks!)
if (user) { const [x, setX] = useState(); }
// ✅ fix: call hooks unconditionally, branch the logic
const [x, setX] = useState();
if (!user) return <Login />;

// ❌ "Each child in a list should have a unique 'key' prop"
// fix: key={item.id}

// ❌ "Warning: Can't perform a React state update on an
//    unmounted component"
// cause: async code finished after unmount
// fix: AbortController + cleanup in useEffect

// 🔍 DEBUGGING TOOLKIT
console.log({ state, props });          // log objects, not strings
"use hook logger": console.count("renders")
React DevTools → Components → inspect props/state live
React DevTools → Profiler → record → find slow renders
// <React.StrictMode> double-renders in dev to surface bugs`,
      },
    ],
  },
  {
    id: "x-folder",
    icon: "folder",
    title: { en: "Project Structure & Environment Variables", bn: "প্রজেক্ট স্ট্রাকচার ও Environment Variable" },
    why: {
      en: "Messy folders cost you minutes every single day. A clean structure makes files predictable, and env variables keep your API keys out of git.",
      bn: "এলোমেলো ফোল্ডার প্রতিদিন মিনিট খরচ করায়। পরিষ্কার স্ট্রাকচারে ফাইল অনুমানযোগ্য হয়, আর env variable API কীকে git-এর বাইরে রাখে।",
    },
    body: [
      {
        en: "Start simple: components/ for shared pieces, features/ (or pages/) for route-level groups that keep their own components/hooks/styles together, hooks/ and lib/ (or utils/) for reusable logic. The rule that matters most: related code lives together — a page's components sit next to it, only genuinely shared code moves to global folders. Vite env variables must start with VITE_ and are read via import.meta.env — remember they're public, so real secrets belong on a server.",
        bn: "সহজে শুরু করুন: শেয়ারড জিনিসে components/, রাউট-লেভেল গ্রুপের জন্য features/ (বা pages/) যেখানে তাদের নিজের component/hooks/styles একসাথে থাকে, পুনর্ব্যবহারযোগ্য লজিকে hooks/ আর lib/ (বা utils/)। সবচেয়ে জরুরি নিয়ম: সম্পর্কিত কোড একসাথে থাকবে — পেজের component তার পাশেই, শুধু সত্যিই শেয়ারড কোড গ্লোবাল ফোল্ডারে যাবে। Vite-এর env variable অবশ্যই VITE_ দিয়ে শুরু হবে আর import.meta.env দিয়ে পড়বে — মনে রাখবেন এগুলো public, আসল সিক্রেট সার্ভারে থাকবে।",
      },
    ],
    code: [
      {
        title: "structure + env",
        language: "txt",
        code: `src/
├── components/        # shared dumb components
│   ├── Button.jsx
│   └── Card.jsx
├── features/          # feature-grouped (scales best)
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── useAuth.js
│   │   └── auth.context.jsx
│   └── cart/
│       ├── CartPage.jsx
│       └── cart.store.js
├── hooks/             # shared custom hooks
│   ├── useLocalStorage.js
│   └── useFetch.js
├── lib/               # pure logic, no React
│   └── format.js
├── App.jsx
└── main.jsx

# ── environment variables (Vite) ──
# .env.local  (git-ignored!)
VITE_API_URL=https://api.example.com
VITE_OMDB_KEY=abc123

# usage:
const url = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_OMDB_KEY;

# ⚠️ VITE_ vars are bundled = PUBLIC.
#    Real secrets? Keep them on a backend.`,
      },
    ],
  },
  {
    id: "x-server-state",
    icon: "server",
    title: { en: "Server State: TanStack Query & SWR", bn: "সার্ভার State: TanStack Query ও SWR" },
    why: {
      en: "Here's the truth seniors learn late: 80% of useEffect fetching code is a solved problem. TanStack Query gives you caching, refetching, deduplication, and optimistic updates in 3 lines.",
      bn: "সিনিয়ররা যে সত্যটা দেরিতে জানে: useEffect দিয়ে ফেচিংয়ের ৮০% কোডই আগে থেকে সমাধান করা সমস্যা। TanStack Query ৩ লাইনে caching, refetching, deduplication আর optimistic update দেয়।",
    },
    body: [
      {
        en: "Server state is fundamentally different from client state: it's owned by the server, can go stale, needs caching and revalidation. TanStack Query models exactly that: useQuery defines the cache key and the fetcher; you get isLoading, isError, data, automatic background refetch on window focus, and staleTime control. useMutation handles writes with automatic cache invalidation. Once you learn it, you'll never hand-roll a loading flag for fetching again.",
        bn: "Server state আর client state মৌলিকভাবে আলাদা: এর মালিক সার্ভার, পুরনো হতে পারে, caching ও revalidation দরকার। TanStack Query ঠিক সেটাই মডেল করে: useQuery ক্যাশ key আর fetcher ঠিক করে; আপনি পান isLoading, isError, data, উইন্ডো ফোকাসে অটো ব্যাকগ্রাউন্ড refetch, আর staleTime নিয়ন্ত্রণ। useMutation লেখার কাজ সামলায় অটো ক্যাশ invalidation সহ। একবার শিখলে ফেচিংয়ের জন্য আর কখনো হাতে loading flag লিখবেন না।",
      },
    ],
    code: [
      {
        title: "tanstack-query.jsx",
        language: "jsx",
        code: `// npm install @tanstack/react-query
import { useQuery, useMutation, useQueryClient } from
  "@tanstack/react-query";

function Todos() {
  const qc = useQueryClient();

  // READ — caching, retries, background refetch: automatic
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],                       // cache key
    queryFn: () =>
      fetch("/api/todos").then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      }),
    staleTime: 60_000,                          // 1min freshness
  });

  // WRITE + auto-refresh the list
  const add = useMutation({
    mutationFn: text =>
      fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text }),
      }),
    onSuccess: () => qc.invalidateQueries(["todos"]),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data.map(t => <div key={t.id}>{t.text}</div>)}
      <button onClick={() => add.mutate("new todo")}>
        {add.isPending ? "Adding…" : "Add"}
      </button>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "x-ts",
    icon: "types",
    title: { en: "TypeScript for React (your next step)", bn: "React-এর জন্য TypeScript (আপনার পরের ধাপ)" },
    why: {
      en: "Job postings list it, senior devs demand it, and it catches real bugs (a typo'd prop name) before your app even runs. Here's the 10-minute preview you'll need next week.",
      bn: "চাকরির বিজ্ঞাপনে লেখা থাকে, সিনিয়র ডেভেলপাররা চায়, আর অ্যাপ চালানোর আগেই আসল বাগ (বানান ভুল prop) ধরে। পরের সপ্তাহে যা লাগবে তার ১০ মিনিটের প্রিভিউ এখানে।",
    },
    body: [
      {
        en: "TypeScript = JavaScript + types. In React you'll type props (the biggest win — autocomplete everywhere and compile errors on typos), useState generics, event handlers, and API responses. Start by migrating ONE component of your capstone, then grow. The syntax feels heavy for a day, then becomes your safety net forever.",
        bn: "TypeScript = JavaScript + টাইপ। React-এ আপনি prop-এ টাইপ দেবেন (সবচেয়ে বড় লাভ — সবখানে autocomplete আর বানান ভুলে কম্পাইল এরর), useState-এর generic, event handler, আর API রেসপন্সে। ক্যাপস্টোনের একটা component migrate করে শুরু করুন, তারপর বাড়ান। সিনট্যাক্স একদিন ভারী লাগবে, তারপর চিরকালের নিরাপত্তা জাল হয়ে যাবে।",
      },
    ],
    code: [
      {
        title: "UserCard.tsx",
        language: "tsx",
        code: `type User = {
  id: number;
  name: string;
  email?: string;              // optional
  role: "admin" | "user";      // union — only these two!
};

type Props = {
  user: User;
  isOnline: boolean;
  onSelect: (id: number) => void;
};

function UserCard({ user, isOnline, onSelect }: Props) {
  return (
    <div onClick={() => onSelect(user.id)}>
      {user.name} {isOnline ? "🟢" : "⚪"}
      {/* user.nmae  ← TS ERROR before you even run! */}
    </div>
  );
}

// typed state & events
const [user, setUser] = useState<User | null>(null);
const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setQuery(e.target.value);

// typed API data
const res = await fetch("/api/users");
const data: User[] = await res.json();`,
      },
    ],
  },
  {
    id: "x-react19",
    icon: "sparkles",
    title: { en: "React 19+ & The Server Era (awareness)", bn: "React 19+ ও সার্ভার যুগ (ধারণা)" },
    why: {
      en: "Interviews increasingly ask about React Server Components and the new use API. You don't need deep mastery — you need to know what they are and when they matter.",
      bn: "ইন্টারভিউতে ক্রমেই React Server Component আর নতুন use API নিয়ে জিজ্ঞেস করছে। গভীর দক্ষতা লাগবে না — কী এগুলো আর কখন গুরুত্বপূর্ণ জানলেই চলবে।",
    },
    body: [
      {
        en: "React 19 shipped the Actions/form actions (forms that call functions directly), use() for reading promises and context conditionally, and first-class React Server Components support in frameworks like Next.js. RSC components run on the server, ship zero JS to the browser, and can await data directly — they pair with client components for interactivity. For a fresh React learner the practical takeaway is: learn plain React first (you're doing that!), because RSC builds on exactly these fundamentals.",
        bn: "React 19-এ এসেছে Actions/form actions (ফর্ম সরাসরি ফাংশন কল করে), conditionally promise ও context পড়ার জন্য use(), আর Next.js-এর মতো ফ্রেমওয়ার্কে first-class React Server Component সাপোর্ট। RSC component সার্ভারে চলে, ব্রাউজারে শূন্য JS পাঠায়, সরাসরি ডেটা await করতে পারে — ইন্টারঅ্যাকটিভিটির জন্য client component-এর সাথে জুড়ে কাজ করে। নতুন React শিক্ষার্থীর জন্য বাস্তব কথা: আগে খাঁটি React শিখুন (আপনি তা-ই করছেন!), কারণ RSC ঠিক এই বেসিকের উপরেই দাঁড়ানো।",
      },
    ],
    code: [
      {
        title: "react19.tsx",
        language: "tsx",
        code: `// 1) FORM ACTIONS — no onSubmit boilerplate
function Signup() {
  const [result, action, pending] = useActionState(
    async (prev, formData) => {
      const name = formData.get("name");
      return await createAccount(name);
    },
    null
  );
  return (
    <form action={action}>
      <input name="name" />
      <button disabled={pending}>
        {pending ? "Creating…" : "Sign up"}
      </button>
    </form>
  );
}

// 2) use() — read a promise (suspends!)
function Profile() {
  const user = use(userPromise);  // suspends until resolved
  return <h1>{user.name}</h1>;
}

// 3) Server Component (Next.js) — zero client JS
async function Posts() {          // "use server" world
  const posts = await db.query("SELECT …");
  return posts.map(p => <Post key={p.id} {...p} />);
}`,
      },
    ],
  },
];
