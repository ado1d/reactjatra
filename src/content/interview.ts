import type { InterviewQuestion } from "./types";

export const interviewQuestions: InterviewQuestion[] = [
  /* ============ CORE ============ */
  {
    id: "q-vdom",
    category: "core",
    question: {
      en: "What is the Virtual DOM, and how does reconciliation work?",
      bn: "Virtual DOM কী, আর reconciliation কীভাবে কাজ করে?",
    },
    answer: [
      {
        en: "The virtual DOM is a lightweight JavaScript representation of the real DOM — a tree of objects describing your UI. When state changes, React builds a NEW virtual tree, compares it with the previous one (this diffing process is called reconciliation), and then applies only the resulting changes to the real DOM.",
        bn: "Virtual DOM হলো আসল DOM-এর একটা হালকা জাভাস্ক্রিপ্ট রিপ্রেজেন্টেশন — অবজেক্টের ট্রি, যা আপনার UI বর্ণনা করে। State বদলালে React নতুন virtual ট্রি বানায়, আগেরটার সাথে তুলনা করে (এই diff প্রক্রিয়াকেই reconciliation বলে), তারপর শুধু পরিবর্তনগুলোই আসল DOM-এ প্রয়োগ করে।",
      },
      {
        en: "Reconciliation rules: elements of the same type are compared and updated in place; a different element type destroys the subtree and rebuilds it; in lists, keys identify which items were added/removed/moved so React can match old to new correctly. Direct DOM manipulation is slow because each change triggers layout work — batching minimal real-DOM updates through the virtual DOM keeps UIs fast.",
        bn: "Reconciliation-এর নিয়ম: একই টাইপের এলিমেন্ট তুলনা করে জায়গায় জায়গায় আপডেট হয়; ভিন্ন টাইপ হলে সাবট্রি ভেঙে নতুন বানায়; লিস্টে key দিয়ে বোঝা যায় কোন আইটেম যোগ/মুছ/সরানো হয়েছে, তাই React পুরনো আর নতুন সঠিকভাবে মেলাতে পারে। সরাসরি DOM ম্যানিপুলেশন ধীর কারণ প্রতিটি পরিবর্তনে layout কাজ হয় — virtual DOM দিয়ে ন্যূনতম real-DOM আপডেট batch করলে UI দ্রুত থাকে।",
      },
    ],
  },
  {
    id: "q-keys",
    category: "core",
    question: {
      en: "Why do lists need keys? Why is using the index risky?",
      bn: "লিস্টে key কেন দরকার? ইনডেক্স ব্যবহার বিপজ্জনক কেন?",
    },
    answer: [
      {
        en: "Keys give each list item a stable identity across renders, so during reconciliation React knows which DOM node corresponds to which data item. With correct keys, adding an item in the middle creates one new node; without keys (or with wrong keys), React may destroy and rebuild nodes unnecessarily, losing internal state like input focus or scroll position.",
        bn: "Key প্রতিটি লিস্ট আইটেমকে render-গুলোর মধ্যে স্থায়ী পরিচয় দেয়, তাই reconciliation-এর সময় React জানে কোন DOM নোড কোন ডেটা আইটেমের। সঠিক key থাকলে মাঝখানে আইটেম যোগ করলে একটাই নতুন নোড বানায়; key না থাকলে (বা ভুল key হলে) React অহেতুক নোড ভেঙে নতুন বানাতে পারে — ইনপুট ফোকাস বা স্ক্রল পজিশনের মতো internal state হারিয়ে যায়।",
      },
      {
        en: "Index as key is risky when the list can insert, remove, or reorder items: after removing item 0, every item's index shifts, so React matches old nodes to the WRONG data — glitchy inputs and wrong animations. Index is only acceptable for static, never-reordered lists. And Math.random() as a key is useless: a new identity every render means React can never match anything.",
        bn: "লিস্টে insert, remove বা reorder হতে পারলে ইনডেক্স key ঝুঁকিপূর্ণ: ০ নম্বর আইটেম মুছলে সবার ইনডেক্স সরে যায়, তাই React ভুল ডেটার সাথে পুরনো নোড মেলায় — ইনপুট গ্লিচ আর ভুল অ্যানিমেশন। ইনডেক্স শুধু স্ট্যাটিক, কখনো reorder না হওয়া লিস্টে চলে। আর Math.random() key একেবারেই অর্থহীন: প্রতি render-এ নতুন পরিচয় মানে React কিছুই মেলাতে পারে না।",
      },
    ],
    code: [
      {
        title: "key-demo.jsx",
        language: "jsx",
        code: `// ✅ stable identity from the data
{todos.map(t => <TodoItem key={t.id} todo={t} />)}

// ⚠️ index — OK only for static lists
{todos.map((t, i) => <TodoItem key={i} todo={t} />)}

// ❌ random — a new key each render, worse than nothing
{todos.map(t => <TodoItem key={Math.random()} todo={t} />)}`,
      },
    ],
  },
  {
    id: "q-props-state",
    category: "core",
    question: {
      en: "Props vs state? Controlled vs uncontrolled components?",
      bn: "Props বনাম state? Controlled বনাম uncontrolled component?",
    },
    answer: [
      {
        en: "Props are inputs passed from parent to child — read-only, the child cannot change them. State is a component's own mutable memory — updated via its setter, and each update re-renders it. A child can't edit its props, but it can CALL a function prop that triggers the parent's state change (callbacks flow up, data flows down).",
        bn: "Props হলো parent থেকে child-এ আসা ইনপুট — শুধু পড়ার, child বদলাতে পারে না। State হলো component-এর নিজের পরিবর্তনযোগ্য মেমরি — setter দিয়ে আপডেট হয়, প্রতি আপডেটে re-render হয়। Child নিজের props সম্পাদনা করতে পারে না, তবে function prop কল করে parent-এর state বদলাতে পারে (কলব্যাক ওঠে, ডেটা নামে)।",
      },
      {
        en: "Controlled component: React state owns the input's value (value + onChange) — enabling instant validation and programmatic control. Uncontrolled: the DOM keeps the value; you read it via ref on submit. Controlled is the default choice; uncontrolled suits simple forms or file inputs (which can't be fully controlled).",
        bn: "Controlled component: React state ইনপুটের ভ্যালুর মালিক (value + onChange) — তাৎক্ষণিক ভ্যালিডেশন ও প্রোগ্রাম্যাটিক নিয়ন্ত্রণ সম্ভব। Uncontrolled: DOM ভ্যালু রাখে; সাবমিটে ref দিয়ে পড়েন। Controlled-ই ডিফল্ট পছন্দ; uncontrolled সহজ ফর্ম বা file input-এ ভালো (যেগুলো পুরোপুরি control করা যায় না)।",
      },
    ],
  },
  {
    id: "q-jsx",
    category: "core",
    question: {
      en: "What is JSX, and how does it compile?",
      bn: "JSX কী, আর কীভাবে কম্পাইল হয়?",
    },
    answer: [
      {
        en: "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It is NOT understood by browsers — a compiler (Babel, or SWC in modern Vite builds) transforms it into React.createElement() calls, which return plain objects (elements) describing the UI. React then renders those objects to the DOM.",
        bn: "JSX হলো এমন সিনট্যাক্স এক্সটেনশন যা জাভাস্ক্রিপ্টের ভেতরে HTML-এর মতো মার্কআপ লিখতে দেয়। ব্রাউজার JSX বোঝে না — কম্পাইলার (Babel, বা আধুনিক Vite-এ SWC) সেটাকে React.createElement() কলে বদলে দেয়, যা UI বর্ণনা করা সাধারণ অবজেক্ট (element) রিটার্ন করে। React তারপর সেই অবজেক্টগুলো DOM-এ রেন্ডার করে।",
      },
    ],
    code: [
      {
        title: "compile-demo.js",
        language: "js",
        code: `// You write:
const el = <h1 className="title">Hi {name}</h1>;

// Compiler output (classic runtime):
const el = React.createElement(
  "h1",
  { className: "title" },
  "Hi ",
  name
);

// Modern automatic runtime (React 17+):
import { jsx as _jsx } from "react/jsx-runtime";
const el = _jsx("h1", {
  className: "title",
  children: ["Hi ", name],
});`,
      },
    ],
  },
  {
    id: "q-lifting",
    category: "core",
    question: {
      en: "What does \"lifting state up\" mean?",
      bn: "\"Lifting state up\" মানে কী?",
    },
    answer: [
      {
        en: "When two sibling components need the same data, that state should move up to their closest common parent. The parent owns the state and passes values and callback props down to both children. This keeps data flowing one way (parent → child) and both siblings stay in sync automatically. Rule: keep state as close to its usage as possible, and only lift it when sharing is genuinely needed.",
        bn: "দুটি sibling component-এর একই ডেটা দরকার হলে, সেই state-টা তাদের সবচেয়ে কাছের কমন parent-এ সরিয়ে নিতে হয়। Parent স্টেটের মালিক হয় আর ভ্যালু ও কলব্যাক props দুই child-কেই পাঠায়। এতে ডেটা একদিকে প্রবাহিত হয় (parent → child) আর দুই sibling অটোমেটিক sync থাকে। নিয়ম: state ব্যবহারের জায়গার যত কাছে সম্ভব রাখুন, শুধু সত্যিই শেয়ার দরকার হলে lift করুন।",
      },
    ],
  },

  /* ============ HOOKS ============ */
  {
    id: "q-rules",
    category: "hooks",
    question: {
      en: "What are the Rules of Hooks, and why do they exist?",
      bn: "Rules of Hooks কী, আর কেন আছে?",
    },
    answer: [
      {
        en: "Two rules: (1) Only call hooks at the TOP LEVEL of your component or custom hook — never inside conditions, loops, or nested functions. (2) Only call hooks from React functions (components or custom hooks), not regular JS functions.",
        bn: "দুটি নিয়ম: (১) Hook শুধু component বা custom hook-এর TOP LEVEL-এ কল করুন — কখনো condition, loop বা nested ফাংশনের ভেতরে নয়। (২) Hook শুধু React ফাংশন থেকে কল করুন (component বা custom hook), সাধারণ JS ফাংশন থেকে নয়।",
      },
      {
        en: "Why: React doesn't track hooks by name — it tracks them by CALL ORDER in an internal list per component. If a hook call is skipped by an if-statement, every hook after it shifts position, and React matches state to the wrong slots — chaos. Keeping the order identical on every render makes the positional matching reliable. The eslint-plugin-react-hooks linter enforces both rules automatically.",
        bn: "কেন: React hook-কে নামে ট্র্যাক করে না — প্রতি component-এর একটা internal লিস্টে কলের ক্রম (CALL ORDER) ধরে রাখে। if-statement কোনো hook কল বাদ দিলে পরের সব hook-এর অবস্থান সরে যায়, আর React ভুল স্লটের সাথে state মেলায় — সর্বনাশ। প্রতি render-এ ক্রম একই রাখলে positional matching নির্ভরযোগ্য থাকে। eslint-plugin-react-hooks linter দুটি নিয়মই অটোমেটিক enforce করে।",
      },
    ],
    code: [
      {
        title: "rules-demo.jsx",
        language: "jsx",
        code: `// ❌ BREAKS: conditional hook — order changes between renders
function Bad({ user }) {
  if (user) {
    const [name, setName] = useState(user.name);  // hook #1 sometimes missing!
  }
  const [age, setAge] = useState(0);              // sometimes it's #1, sometimes #2
}

// ✅ CORRECT: hooks always run, branch the USAGE instead
function Good({ user }) {
  const [name, setName] = useState(user?.name ?? "");
  const [age, setAge] = useState(0);
  // or put the conditional logic in a custom hook/component`,
      },
    ],
  },
  {
    id: "q-useeffect-deps",
    category: "hooks",
    question: {
      en: "Explain the useEffect dependency array and cleanup.",
      bn: "useEffect-এর dependency array ও cleanup ব্যাখ্যা করুন।",
    },
    answer: [
      {
        en: "useEffect(fn, deps) runs after the render commits. No deps array → runs after every render. Empty array [] → runs once after mount. [a, b] → runs after mount and whenever a or b changes (by Object.is comparison). The deps are the effect's contract with React: everything the effect reads from the component scope should be listed.",
        bn: "useEffect(fn, deps) রেন্ডার commit হওয়ার পরে চলে। Deps array না থাকলে → প্রতি render-এর পরে চলে। খালি array [] → mount-এর পরে একবার। [a, b] → mount-এর পরে আর a বা b বদলালে (Object.is তুলনায়) চলে। Deps হলো effect-এর React-এর সাথে চুক্তি: effect যা যা component scope থেকে পড়ে, সবই তালিকাভুক্ত হওয়া উচিত।",
      },
      {
        en: "Cleanup: if your effect returns a function, React calls it before each re-run of the effect AND at unmount. Use it to clear timers, remove listeners, and abort fetches — preventing leaks and stale-request races. A fetch effect without AbortController can resolve after the component unmounted and try to set state on a dead component.",
        bn: "Cleanup: effect ফাংশন return করলে React প্রতি re-run-এর আগে ও unmount-এ সেটা কল করে। টাইমার বন্ধ, লিসেনার সরানো, fetch abort করার জন্য এটা ব্যবহার করুন — লিক আর stale-request race আটকায়। AbortController ছাড়া fetch effect component unmount-এর পরে resolve হয়ে মৃত component-এ state সেট করতে চাইতে পারে।",
      },
    ],
    code: [
      {
        title: "fetch-cleanup.jsx",
        language: "jsx",
        code: `useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
    .then(r => r.json())
    .then(setResults)
    .catch(e => {
      if (e.name !== "AbortError") setError(e);
    });

  return () => controller.abort();  // cancels the previous query
}, [query]);   // re-runs whenever the query changes`,
      },
    ],
  },
  {
    id: "q-memo-trio",
    category: "hooks",
    question: {
      en: "useMemo vs useCallback vs React.memo?",
      bn: "useMemo বনাম useCallback বনাম React.memo?",
    },
    answer: [
      {
        en: "All three are about caching, but different things: useMemo caches a computed VALUE (recomputed only when deps change) — for expensive calculations or stabilizing object/array references. useCallback caches a FUNCTION reference — equivalent to useMemo(() => fn, deps). React.memo wraps a COMPONENT so it skips re-rendering when its props are shallow-equal to the last render.",
        bn: "তিনটিই ক্যাশিং নিয়ে, কিন্তু ভিন্ন জিনিসের: useMemo হিসাব করা VALUE ক্যাশ করে (deps বদলালেই পুনরায় হিসাব) — ভারী হিসাব বা অবজেক্ট/অ্যারে reference স্থিতিশীল রাখতে। useCallback FUNCTION reference ক্যাশ করে — useMemo(() => fn, deps) এর সমান। React.memo COMPONENT মুড়ে রাখে, যাতে props আগের render-এর সাথে shallow-equal হলে re-render বাদ যায়।",
      },
      {
        en: "They combine: a memo'd child re-renders anyway if the parent passes a fresh inline function — so you stabilize the callback with useCallback. And the counterpoint interviewers want to hear: don't optimize by default. Each adds comparison cost and complexity; measure with the Profiler first and only memo genuinely slow parts.",
        bn: "এরা একসাথে কাজ করে: parent নতুন inline ফাংশন পাঠালে memo-করা child তবু re-render করবে — তাই useCallback দিয়ে কলব্যাক স্থিতিশীল করুন। আর যে কথাটা ইন্টারভিউয়ার শুনতে চায়: ডিফল্টে optimize করবেন না। প্রতিটি তুলনার খরচ ও জটিলতা বাড়ায়; আগে Profiler দিয়ে মাপুন, শুধু সত্যিই ধীর অংশ memo করুন।",
      },
    ],
    code: [
      {
        title: "trio.jsx",
        language: "jsx",
        code: `const sorted = useMemo(() => [...items].sort(cmp), [items]);
//        ^ cached value

const onSelect = useCallback(id => select(id), [select]);
//        ^ cached function reference

const Row = memo(function Row({ item, onSelect }) { /* … */ });
//      ^ component that skips re-render on equal props`,
      },
    ],
  },
  {
    id: "q-ref-vs-state",
    category: "hooks",
    question: {
      en: "useRef vs useState?",
      bn: "useRef বনাম useState?",
    },
    answer: [
      {
        en: "Both persist values across renders. The difference is re-rendering: updating state triggers a re-render, mutating a ref does NOT. So state is for data the UI displays; refs are for data the UI doesn't render — DOM nodes, timer IDs, previous values, flags like \"isMounted\". Also, state must be updated immutably through its setter; ref.current can be mutated directly at any time.",
        bn: "দুটোই render-এর মাঝে ভ্যালু ধরে রাখে। পার্থক্য re-rendering-এ: state আপডেট করলে re-render হয়, ref mutate করলে হয় না। তাই state UI-তে দেখানো ডেটার জন্য; ref UI-তে render না হওয়া ডেটার জন্য — DOM নোড, টাইমার ID, আগের ভ্যালু, \"isMounted\" জাতীয় flag। আরও: state অবশ্যই setter দিয়ে immutably আপডেট করতে হয়; ref.current যখন-তখন সরাসরি mutate করা যায়।",
      },
    ],
  },
  {
    id: "q-reducer",
    category: "hooks",
    question: {
      en: "When would you use useReducer over useState?",
      bn: "কখন useState-এর বদলে useReducer নেবেন?",
    },
    answer: [
      {
        en: "Use useReducer when state updates are complex: multiple related fields, updates that depend on previous state in non-trivial ways, or many different update actions. The reducer centralizes all transition logic in one pure, testable function — (state, action) => newState — and components just describe what happened (\"ADD_ITEM\") instead of how state changes. If you find yourself writing setX with complicated inline logic or several useStates that must stay in sync, that's the moment.",
        bn: "State আপডেট জটিল হলে useReducer নিন: একাধিক সম্পর্কিত field, আগের state-এর উপর জটিলভাবে নির্ভরশীল আপডেট, বা বহু ভিন্ন আপডেট action। Reducer সব transition লজিক এক pure, testable ফাংশনে কেন্দ্রীভূত করে — (state, action) => newState — আর component শুধু বর্ণনা করে কী ঘটেছে (\"ADD_ITEM\"), কীভাবে state বদলাবে তা নয়। জটিল inline লজিকসহ setX বা sync-এ রাখতে হওয়া একাধিক useState লিখতে দেখলেই সেটাই সময়।",
      },
    ],
  },
  {
    id: "q-custom-hook",
    category: "hooks",
    question: {
      en: "What's a custom hook? Write one live.",
      bn: "Custom hook কী? একটা লাইভ লিখুন।",
    },
    answer: [
      {
        en: "A custom hook is a function starting with \"use\" that calls other hooks, letting you extract and reuse stateful logic across components. Each caller gets independent state. The two rules: name starts with \"use\", and it's called at the top level. Classic live-write examples: useLocalStorage (persisted state), useDebounce (delayed value), useToggle, useFetch(url), useWindowSize.",
        bn: "Custom hook হলো \"use\" দিয়ে শুরু হওয়া ফাংশন যা অন্য hook কল করে, ফলে state-সহ লজিক component-গুলোর মধ্যে extract ও reuse করা যায়। প্রতিটি caller স্বাধীন state পায়। দুটি নিয়ম: নাম \"use\" দিয়ে শুরু, আর top level-এ কল হবে। ক্লাসিক লাইভ-লেখার উদাহরণ: useLocalStorage (persisted state), useDebounce (বিলম্বিত ভ্যালু), useToggle, useFetch(url), useWindowSize।",
      },
    ],
    code: [
      {
        title: "useLocalStorage.js — the interview favorite",
        language: "js",
        code: `function useLocalStorage(key, initial) {
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
}`,
      },
    ],
  },

  /* ============ INTERMEDIATE ============ */
  {
    id: "q-prop-drilling",
    category: "intermediate",
    question: {
      en: "How do you avoid prop drilling?",
      bn: "Prop drilling এড়াবেন কীভাবে?",
    },
    answer: [
      {
        en: "Prop drilling is passing props through intermediate components that don't need them. Fixes, in increasing order of power: (1) composition — pass JSX as children so middle components don't know about the data at all; (2) React Context for data genuinely needed by a subtree (theme, auth, locale); (3) a state library (Zustand/Redux) where ANY component imports the store directly — no prop chain at all; (4) co-locate state better — often the deepest component that uses the data can own it.",
        bn: "Prop drilling মানে এমন props মাঝের component-গুলোর ভেতর দিয়ে পাঠানো যাদের ওদের দরকারই নেই। সমাধান, ক্রমবর্ধমান ক্ষমতায়: (১) composition — JSX-কে children হিসেবে পাঠান, মাঝের component ডেটাই জানবে না; (২) React Context, সাবট্রিতে সত্যিই দরকারি ডেটার জন্য (থিম, auth, ভাষা); (৩) state লাইব্রেরি (Zustand/Redux), যেখানে যেকোনো component সরাসরি store import করে — prop চেইনই নেই; (৪) state-এর জায়গা ঠিক করুন — প্রায়ই ডেটা যে সবচেয়ে গভীর component ব্যবহার করে, সে-ই মালিক হতে পারে।",
      },
    ],
    code: [
      {
        title: "composition-fix.jsx",
        language: "jsx",
        code: `// ❌ drilling: App → Page → Sidebar → UserMenu needs user
// ✅ composition: pass the rendered node down instead
function App() {
  const [user, setUser] = useState(null);
  return (
    <Page
      header={<UserMenu user={user} />}  {/* used where needed */}
    />
  );
}
function Page({ header }) {
  return <Layout>{header}</Layout>;    // never touches \`user\`
}`,
      },
    ],
  },
  {
    id: "q-late-updates",
    category: "intermediate",
    question: {
      en: "Why can state updates seem \"late\"? (batching & closures)",
      bn: "State আপডেট \"দেরিতে\" লাগে কেন? (batching ও closure)",
    },
    answer: [
      {
        en: "Two reasons. Batching: React groups multiple setState calls from one event into a single re-render — the state variable in your current function is a snapshot that never updates mid-function, so setCount(count+1) twice still reads the same stale count and results in +1. Fix: use the functional updater setCount(c => c + 1), which queues operations on the LATEST value.",
        bn: "দুটো কারণ। Batching: React এক ইভেন্টের একাধিক setState কল একত্র করে এক re-render-এ করে — আপনার বর্তমান ফাংশনের state ভ্যারিয়েবল একটা snapshot, ফাংশনের মাঝখানে বদলায় না, তাই setCount(count+1) দুবার লিখলেও একই পুরনো count পড়ে +১-ই হয়। সমাধান: functional updater setCount(c => c + 1) নিন, যা সর্বশেষ ভ্যালুর উপর অপারেশন সারিবদ্ধ করে।",
      },
      {
        en: "Closures: a function \"captures\" the variables of the render it was created in. A setInterval created on mount with [] deps forever sees count = 0 — that's the stale closure problem. Fix: functional updates again, or a ref for the latest value. This single question tests batching, closures, and immutability at once — which is why interviewers love it.",
        bn: "Closure: ফাংশন যে render-এ তৈরি হয়েছে তার ভ্যারিয়েবল \"capture\" করে। [] deps-এ mount-এ বানানো setInterval চিরকাল count = 0 দেখে — এটাই stale closure সমস্যা। সমাধান: আবার functional update, বা সর্বশেষ ভ্যালুর জন্য ref। এই একটি প্রশ্নেই batching, closure ও immutability পরীক্ষা হয় — তাই ইন্টারভিউয়াররা এটা ভালোবাসে।",
      },
    ],
    code: [
      {
        title: "stale-closure.jsx",
        language: "jsx",
        code: `// ❌ stale closure: log stays "Count: 0" forever
useEffect(() => {
  const id = setInterval(() => {
    console.log("Count:", count);   // captured at mount
  }, 1000);
  return () => clearInterval(id);
}, []);

// ✅ fix 1: functional update
setCount(c => c + 1);

// ✅ fix 2: keep latest value in a ref
const countRef = useRef(count);
useEffect(() => { countRef.current = count; }, [count]);
// then read countRef.current inside the interval`,
      },
    ],
  },
  {
    id: "q-rerenders",
    category: "intermediate",
    question: {
      en: "What causes unnecessary re-renders, and how do you fix them?",
      bn: "অহেতুক re-render কী ঘটায়, আর কীভাবে ঠিক করবেন?",
    },
    answer: [
      {
        en: "A re-render happens on state change, context change, or PARENT re-render. \"Unnecessary\" ones come from: state living too high (typing in a search box re-renders the whole app), unstable props (new object/array/function literals on every render defeat React.memo), and heavy components inside a frequently re-rendering tree.",
        bn: "State বদলালে, context বদলালে, বা PARENT re-render হলে re-render হয়। \"অহেতুক\" re-render আসে: state অনেক উঁচুতে থাকলে (সার্চ বক্সে টাইপ করলে পুরো অ্যাপ re-render), unstable props (প্রতি render-এ নতুন object/array/function literal React.memo-কে ব্যর্থ করে), আর ঘন ঘন re-render হওয়া ট্রির ভেতরে ভারী component থাকলে।",
      },
      {
        en: "Fix in order: (1) move state down to where it's used; (2) memoize expensive computations with useMemo; (3) wrap hot child components in React.memo + stabilize their function props with useCallback; (4) split contexts so consumers only re-render for the slice they read. Always measure with the React DevTools Profiler before optimizing — guessing wastes time on code that was never slow.",
        bn: "ঠিক করার ক্রম: (১) state নিচে, ব্যবহারের জায়গায় নামান; (২) ভারী হিসাব useMemo দিয়ে মেমোইজ করুন; (৩) হট child component-এ React.memo + তাদের function props useCallback দিয়ে স্থিতিশীল করুন; (৪) context ভাগ করুন যাতে consumer শুধু নিজের পড়া অংশের জন্য re-render হয়। Optimize করার আগে সবসময় React DevTools Profiler দিয়ে মাপুন — অনুমান করলে যে কোড মোটেই ধীর ছিল না সেখানেই সময় নষ্ট হয়।",
      },
    ],
  },
  {
    id: "q-context-redux",
    category: "intermediate",
    question: {
      en: "Context vs Redux: when to use which?",
      bn: "Context বনাম Redux: কখন কোনটা?",
    },
    answer: [
      {
        en: "Context is a dependency-injection mechanism, not a state manager: every consumer re-renders when the provider value changes, and there's no devtools, middleware, or selector optimization. It's perfect for low-frequency global data — theme, auth user, current language. Redux Toolkit (or Zustand) is a real state store: components subscribe to precise slices (only re-render when THEIR slice changes), with devtools time-travel, middleware, and structured patterns for teams.",
        bn: "Context হলো dependency-injection ব্যবস্থা, state ম্যানেজার নয়: provider-এর ভ্যালু বদলালে সব consumer re-render হয়, আর devtools, middleware বা selector optimization নেই। কম-বার বদলানো গ্লোবাল ডেটার জন্য পারফেক্ট — থিম, auth ইউজার, বর্তমান ভাষা। Redux Toolkit (বা Zustand) আসল state store: component নির্দিষ্ট slice-এ subscribe করে (শুধু নিজের slice বদলালেই re-render), সাথে devtools time-travel, middleware, আর টিমের জন্য সুগঠিত প্যাটার্ন।",
      },
      {
        en: "The modern nuance: most of what people used Redux for — caching API data — is now TanStack Query's job (server state ≠ client state). A 2024-ish stack: Context for theme/auth, TanStack Query for server data, and Zustand (or Redux Toolkit in enterprise) for the remaining interactive client state.",
        bn: "আধুনিক নূন্যতা: মানুষ যে কাজে Redux ব্যবহার করত — API ডেটা ক্যাশিং — সেটা এখন TanStack Query-এর কাজ (server state ≠ client state)। ২০২৪-এর স্ট্যাক: থিম/auth-এ Context, সার্ভার ডেটায় TanStack Query, আর বাকি interactive client state-এ Zustand (বা enterprise-এ Redux Toolkit)।",
      },
    ],
  },
  {
    id: "q-boundaries-lazy",
    category: "intermediate",
    question: {
      en: "What are error boundaries and lazy loading?",
      bn: "Error boundary ও lazy loading কী?",
    },
    answer: [
      {
        en: "An error boundary is a component (still class-based, or via react-error-boundary) that catches render errors in its subtree using getDerivedStateFromError + componentDidCatch, showing a fallback UI instead of unmounting the whole app. They catch render/lifecycle errors but NOT event handler errors, async callbacks, or server errors — those need try/catch.",
        bn: "Error boundary হলো এমন component (এখনো class-ভিত্তিক, বা react-error-boundary দিয়ে) যা getDerivedStateFromError + componentDidCatch দিয়ে তার সাবট্রির render error ধরে ফেলে আর পুরো অ্যাপ unmount-এর বদলে fallback UI দেখায়। এরা render/lifecycle error ধরে কিন্তু event handler, async callback বা সার্ভার error নয় — ওগুলোর জন্য try/catch লাগে।",
      },
      {
        en: "Lazy loading = React.lazy(() => import('./Page')) splits that component into a separate JS chunk downloaded on first render, wrapped in <Suspense fallback={...}> to show a loader meanwhile. It shrinks the initial bundle and gets content to users faster — typically applied to routes (admin panel, dashboard) and heavy widgets (charts, editors).",
        bn: "Lazy loading = React.lazy(() => import('./Page')) ওই component-কে আলাদা JS খণ্ডে ভাগ করে যা প্রথম render-এ নামে, আর <Suspense fallback={...}> দিয়ে মুড়ে লোডার দেখায়। এতে শুরুর bundle ছোট হয় আর ইউজার দ্রুত কনটেন্ট পায় — সাধারণত রাউটে (অ্যাডমিন প্যানেল, ড্যাশবোর্ড) আর ভারী উইজেটে (চার্ট, এডিটর) লাগানো হয়।",
      },
    ],
    code: [
      {
        title: "lazy.jsx",
        language: "jsx",
        code: `const Admin = lazy(() => import("./pages/Admin"));

<ErrorBoundary fallback={<Crash />}>
  <Suspense fallback={<Spinner />}>
    <Admin />
  </Suspense>
</ErrorBoundary>`,
      },
    ],
  },
  {
    id: "q-csr-ssr",
    category: "intermediate",
    question: {
      en: "Client-side vs server-side rendering (Next.js awareness)?",
      bn: "Client-side বনাম server-side rendering (Next.js সম্পর্কে ধারণা)?",
    },
    answer: [
      {
        en: "CSR (plain React/Vite): the browser downloads a near-empty HTML + JS bundle, then React builds the page in the browser. Great for interactive dashboards; slower first paint, weaker SEO by default. SSR (Next.js): the server renders HTML per request — fast first paint, full SEO — then React \"hydrates\" it into an interactive app. Next.js also offers SSG (HTML built once at deploy) and ISR (revalidate in background).",
        bn: "CSR (সাধারণ React/Vite): ব্রাউজার প্রায় খালি HTML + JS bundle নামায়, তারপর React ব্রাউজারেই পেজ বানায়। Interactive ড্যাশবোর্ডে দারুণ; প্রথম পেইন্ট ধীর, ডিফল্টে SEO দুর্বল। SSR (Next.js): সার্ভার প্রতি রিকোয়েস্টে HTML রেন্ডার করে — দ্রুত প্রথম পেইন্ট, পূর্ণ SEO — তারপর React সেটাকে \"hydrate\" করে interactive বানায়। Next.js-এ SSG (ডিপ্লয়ে একবার HTML) ও ISR (ব্যাকগ্রাউন্ডে revalidate)-ও আছে।",
      },
      {
        en: "When you need marketing pages, blogs, or e-commerce with SEO → Next.js/Remix. For admin panels behind login → plain Vite + React is simpler and perfectly fine. The interview-safe answer shows you know both models exist and WHY you'd pick each.",
        bn: "SEO-সহ মার্কেটিং পেজ, ব্লগ, বা ই-কমার্স দরকার হলে → Next.js/Remix। লগইনের আড়ালে অ্যাডমিন প্যানেলের জন্য → সাধারণ Vite + React সহজ ও যথেষ্ট। ইন্টারভিউ-নিরাপদ উত্তরে দেখান যে আপনি দুই মডেলই জানেন আর কোনটা কেন বাছবেন তা বলতে পারেন।",
      },
    ],
  },

  /* ============ CODING ============ */
  {
    id: "q-code-counter",
    category: "coding",
    question: {
      en: "Live-coding: Counter with +1, -1, reset — 2 minutes.",
      bn: "লাইভ-কোডিং: +1, -1, reset সহ কাউন্টার — ২ মিনিট।",
    },
    answer: [
      {
        en: "What the interviewer checks: functional updates (setCount(c => c + 1)), button wiring, and whether you can type JSX confidently. Curveball to expect: \"make the +2 button work\" — the classic stale-snapshot trap that only the functional form solves.",
        bn: "ইন্টারভিউয়ার যা দেখে: functional update (setCount(c => c + 1)), বাটন ওয়্যারিং, আর আপনি আত্মবিশ্বাসে JSX লিখতে পারেন কি না। প্রত্যাশিত টুইস্ট: \"+২ বাটন কাজ করাও\" — ক্লাসিক stale-snapshot ফাঁদ, শুধু functional রূপই সমাধান করে।",
      },
    ],
    code: [
      {
        title: "counter.jsx",
        language: "jsx",
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c - 1)}>−1</button>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => {
        setCount(c => c + 1);   // both work — functional
        setCount(c => c + 1);   // form chains correctly → +2
      }}>+2</button>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "q-code-debounce",
    category: "coding",
    question: {
      en: "Live-coding: Debounced search input — 15 minutes.",
      bn: "লাইভ-কোডিং: Debounced সার্চ ইনপুট — ১৫ মিনিট।",
    },
    answer: [
      {
        en: "The pattern they want: useEffect with a setTimeout that only fires after typing pauses, cleared on cleanup so every keystroke resets the timer. Bonus points: extract it into a useDebounce custom hook, mention AbortController for canceling in-flight requests, and show the loading state during the delay.",
        bn: "যে প্যাটার্ন চাওয়া হয়: setTimeout সহ useEffect যা টাইপ থামার পরেই চলে, আর cleanup-এ ক্লিয়ার হয় যাতে প্রতি কী-প্রেস টাইমার রিসেট করে। বোনাস: useDebounce custom hook-এ extract করা, চলমান রিকোয়েস্ট বাতিলে AbortController-এর কথা বলা, আর বিলম্বের সময় loading state দেখানো।",
      },
    ],
    code: [
      {
        title: "debounced-search.jsx",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);     // reset on every keystroke
  }, [value, delay]);
  return debounced;
}

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return; }
    const c = new AbortController();
    fetch(\`/api/search?q=\${debouncedQuery}\`, { signal: c.signal })
      .then(r => r.json())
      .then(setResults)
      .catch(e => e.name !== "AbortError" && console.error(e));
    return () => c.abort();
  }, [debouncedQuery]);

  return (
    <input value={query} onChange={e => setQuery(e.target.value)} />
  );
}`,
      },
    ],
  },
  {
    id: "q-code-fetch",
    category: "coding",
    question: {
      en: "Live-coding: Fetch and display API data with loading & error states.",
      bn: "লাইভ-কোডিং: Loading ও error state সহ API ডেটা ফেচ করে দেখানো।",
    },
    answer: [
      {
        en: "They're watching for the full four-state pattern: loading, error, empty, success — plus res.ok checking (fetch doesn't throw on 404!), async/await hygiene, and cleanup. Say these out loud as you write; narrating is part of the evaluation.",
        bn: "তারা দেখছে পূর্ণ চার-স্টেট প্যাটার্ন: loading, error, empty, success — তার সাথে res.ok চেকিং (fetch 404-এ throw করে না!), async/await পরিচ্ছন্নতা, আর cleanup। লিখতে লিখতে জোরে বলুন; ব্যাখ্যা করাও মূল্যায়নের অংশ।",
      },
    ],
    code: [
      {
        title: "fetch-pattern.jsx",
        language: "jsx",
        code: `function UserList() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const c = new AbortController();

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/users", { signal: c.signal });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        setUsers(await res.json());
        setError(null);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => c.abort();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users?.length) return <p>No users.</p>;
  return users.map(u => <div key={u.id}>{u.name}</div>);
}`,
      },
    ],
  },
  {
    id: "q-code-accordion",
    category: "coding",
    question: {
      en: "Live-coding: Accordion / tabs / star rating.",
      bn: "লাইভ-কোডিং: অ্যাকর্ডিয়ন / ট্যাব / স্টার রেটিং।",
    },
    answer: [
      {
        en: "Accordion: openIndex state in the parent; each item sets it; clicking the open one closes it (null). Tabs: activeTab state keyed by name or index. Star rating: hovered + selected states, render 5 stars with a map, fill stars <= hovered/selected. All three test the same skill — lifting state up and conditional rendering.",
        bn: "অ্যাকর্ডিয়ন: parent-এ openIndex state; প্রতিটি আইটেম সেটা বদলায়; খোলা আইটেমে ক্লিক করলে বন্ধ (null)। ট্যাব: নাম বা ইনডেক্স দিয়ে activeTab state। স্টার রেটিং: hovered + selected state, map দিয়ে ৫টা স্টার, hovered/selected পর্যন্ত ভরানো। তিনটাই একই দক্ষতা পরীক্ষা করে — lifting state up ও conditional rendering।",
      },
    ],
    code: [
      {
        title: "accordion-tabs-stars.jsx",
        language: "jsx",
        code: `// ACCORDION
function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return items.map((item, i) => (
    <div key={item.id}>
      <button onClick={() => setOpen(open === i ? null : i)}>
        {item.title}
      </button>
      {open === i && <p>{item.body}</p>}
    </div>
  ));
}

// TABS
function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);
  return (
    <>
      {tabs.map(t => (
        <button key={t.id}
          onClick={() => setActive(t.id)}
          style={{ fontWeight: active === t.id ? "bold" : "normal" }}>
          {t.label}
        </button>
      ))}
      {tabs.find(t => t.id === active).content}
    </>
  );
}

// STAR RATING
function Stars({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          style={{ cursor: "pointer", fontSize: 24,
                   color: n <= (hover || value) ? "#f59e0b" : "#d1d5db" }}>
          ★
        </span>
      ))}
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "q-code-modal",
    category: "coding",
    question: {
      en: "Live-coding: Modal component (and infinite scroll / pagination).",
      bn: "লাইভ-কোডিং: Modal component (ও infinite scroll / pagination)।",
    },
    answer: [
      {
        en: "Modal essentials: conditional render at the top level, backdrop click closes it, Escape key closes it (useEffect + keydown listener with cleanup), and body scroll lock. Mention portals (createPortal) for rendering outside the parent DOM. For infinite scroll: IntersectionObserver on a sentinel div + a page state + appending with functional updates.",
        bn: "Modal-এর অত্যাবশ্যকীয়: টপ লেভেলে conditional render, backdrop ক্লিকে বন্ধ, Escape কী-তে বন্ধ (useEffect + cleanup সহ keydown listener), আর body scroll lock। Parent DOM-এর বাইরে রেন্ডারে portal-এর (createPortal) কথা বলুন। Infinite scroll-এ: sentinel div-এ IntersectionObserver + page state + functional update দিয়ে যোগ করা।",
      },
    ],
    code: [
      {
        title: "modal.jsx",
        language: "jsx",
        code: `import { useEffect } from "react";

function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";   // lock scroll
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";       // restore
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div onClick={onClose}                    {/* backdrop */}
         style={{ position: "fixed", inset: 0,
                  background: "rgba(0,0,0,.5)",
                  display: "grid", placeItems: "center" }}>
      <div onClick={e => e.stopPropagation()}  {/* don't close inside */}
           style={{ background: "white", padding: 20,
                    borderRadius: 12, minWidth: 300 }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Bonus pattern — infinite scroll core:
// const observer = new IntersectionObserver(([e]) => {
//   if (e.isIntersecting && hasMore && !loading) setPage(p => p + 1);
// });
// observer.observe(sentinelRef.current);
// ...then append: setItems(prev => [...prev, ...newPage]);`,
      },
    ],
  },
];
