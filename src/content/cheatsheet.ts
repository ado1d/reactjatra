import type { CheatSection } from "./types";

export const cheatSections: CheatSection[] = [
  {
    id: "c-jsx",
    title: { en: "JSX Essentials", bn: "JSX এসেনশিয়াল" },
    items: [
      {
        title: { en: "Rules in 10 lines", bn: "১০ লাইনে নিয়ম" },
        code: `// one parent (fragment: <> ... </>)
// className= (not class=), htmlFor= (not for=)
// {expression} for any JS value
// self-close: <img />, <br />
// style takes an object: style={{ color: "red" }}
// false/null/undefined render nothing
// comments: {/* like this */}
// events camelCase: onClick, onChange, onSubmit`,
      },
      {
        title: { en: "Conditional rendering", bn: "কন্ডিশনাল রেন্ডারিং" },
        code: `{cond ? <A /> : <B />}      {/* either/or */}
{items.length > 0 && <List />} {/* show or nothing */}
{count > 0 && <Badge />}       {/* ⚠️ 0 renders as "0"! use count > 0 */}`,
      },
      {
        title: { en: "Lists", bn: "লিস্ট" },
        code: `{users.map(u => (
  <UserCard key={u.id} user={u} />
))}
// key = stable unique id. Never Math.random().
// index only for static, never-reordered lists.`,
      },
    ],
  },
  {
    id: "c-state",
    title: { en: "useState", bn: "useState" },
    items: [
      {
        title: { en: "Basic + functional update", bn: "বেসিক + functional update" },
        code: `const [x, setX] = useState(0);

setX(5);               // set to 5
setX(x => x + 1);      // ✅ based on latest (always safe)
setX(prev => !prev);   // toggle booleans`,
      },
      {
        title: { en: "Immutable recipes", bn: "Immutable রেসিপি" },
        code: `setItems(p => [...p, item]);               // add
setItems(p => [item, ...p]);               // prepend
setItems(p => p.filter(i => i.id !== id)); // remove
setItems(p => p.map(i =>
  i.id === id ? { ...i, done: !i.done } : i)); // update one
setUser(p => ({ ...p, name: "New" }));     // object field
setUser(p => ({ ...p.address, city: "Dhaka" })); // nested`,
      },
      {
        title: { en: "Controlled input", bn: "কন্ট্রোলড ইনপুট" },
        code: `const [text, setText] = useState("");
<input value={text}
       onChange={e => setText(e.target.value)} />`,
      },
    ],
  },
  {
    id: "c-effect",
    title: { en: "useEffect", bn: "useEffect" },
    items: [
      {
        title: { en: "The three flavors", bn: "তিন রকম" },
        code: `useEffect(() => {...});          // every render (rare)
useEffect(() => {...}, []);       // once after mount
useEffect(() => {...}, [query]);  // mount + query change
useEffect(() => {
  return () => { /* cleanup */ }; // before re-run & unmount
}, [query]);`,
      },
      {
        title: { en: "Fetch pattern (memorize!)", bn: "Fetch প্যাটার্ন (মুখস্থ!)" },
        code: `useEffect(() => {
  const c = new AbortController();
  (async () => {
    try {
      setLoading(true);
      const res = await fetch(url, { signal: c.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setData(await res.json());
    } catch (e) {
      if (e.name !== "AbortError") setError(e);
    } finally { setLoading(false); }
  })();
  return () => c.abort();
}, [url]);`,
      },
      {
        title: { en: "Timer pattern", bn: "টাইমার প্যাটার্ন" },
        code: `useEffect(() => {
  const id = setInterval(() => setS(s => s + 1), 1000);
  return () => clearInterval(id);
}, []);`,
      },
    ],
  },
  {
    id: "c-refs-context",
    title: { en: "useRef & useContext", bn: "useRef ও useContext" },
    items: [
      {
        title: { en: "useRef", bn: "useRef" },
        code: `const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();      // DOM node

const prevRef = useRef(null);  // persist w/o re-render
useEffect(() => { prevRef.current = value; }, [value]);`,
      },
      {
        title: { en: "Context in 3 steps", bn: "৩ ধাপে Context" },
        code: `const ThemeCtx = createContext(null);

<ThemeCtx.Provider value={{ dark, setDark }}>
  <App />
</ThemeCtx.Provider>

const { dark, setDark } = useContext(ThemeCtx);`,
      },
    ],
  },
  {
    id: "c-reducer",
    title: { en: "useReducer", bn: "useReducer" },
    items: [
      {
        title: { en: "Shape", bn: "গঠন" },
        code: `function reducer(state, action) {
  switch (action.type) {
    case "ADD":  return [...state, action.item];
    case "DEL":  return state.filter(i => i.id !== action.id);
    default:     return state;
  }
}
const [items, dispatch] = useReducer(reducer, []);
dispatch({ type: "ADD", item: { id: 1 } });`,
      },
    ],
  },
  {
    id: "c-perf",
    title: { en: "Performance trio", bn: "পারফরম্যান্স ত্রয়ী" },
    items: [
      {
        title: { en: "memo / useMemo / useCallback", bn: "memo / useMemo / useCallback" },
        code: `const Child = memo(function Child({ onGo }) { ... });
//     ^ skip re-render if props equal

const sorted = useMemo(() => [...items].sort(), [items]);
//          ^ cache a VALUE

const onGo = useCallback(() => go(id), [id]);
//        ^ cache a FUNCTION (pairs with memo'd children)`,
      },
      {
        title: { en: "Lazy + Suspense + ErrorBoundary", bn: "Lazy + Suspense + ErrorBoundary" },
        code: `const Page = lazy(() => import("./Page"));

<ErrorBoundary fallback={<Oops />}>
  <Suspense fallback={<Spinner />}>
    <Page />
  </Suspense>
</ErrorBoundary>`,
      },
    ],
  },
  {
    id: "c-custom-hooks",
    title: { en: "Custom hooks toolkit", bn: "Custom hook টুলকিট" },
    items: [
      {
        title: { en: "useLocalStorage", bn: "useLocalStorage" },
        code: `function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key);
          return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV];
}`,
      },
      {
        title: { en: "useDebounce", bn: "useDebounce" },
        code: `function useDebounce(value, delay = 400) {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setD(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return d;
}`,
      },
    ],
  },
  {
    id: "c-router",
    title: { en: "React Router", bn: "React Router" },
    items: [
      {
        title: { en: "Routes & links", bn: "রাউট ও লিংক" },
        code: `<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="users/:id" element={<User />} />
      <Route path="admin" element={<Protected><Admin /></Protected>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>

<Link to="/users">Users</Link>
<NavLink className={({isActive}) =>
  isActive ? "on" : ""}>Home</NavLink>`,
      },
      {
        title: { en: "Hooks", bn: "হুকস" },
        code: `const { id } = useParams();       // /users/:id
const nav = useNavigate();        // nav("/x"), nav(-1)
const loc = useLocation();        // loc.search, loc.state
const [params, setParams] = useSearchParams();
params.get("q"); setParams({ q: "x" });`,
      },
    ],
  },
  {
    id: "c-events-forms",
    title: { en: "Events & Forms", bn: "ইভেন্ট ও ফর্ম" },
    items: [
      {
        title: { en: "Event patterns", bn: "ইভেন্ট প্যাটার্ন" },
        code: `<button onClick={handleClick}>Go</button>
<button onClick={() => remove(id)}>Del</button>
<input onChange={e => setX(e.target.value)} />
<form onSubmit={e => {
  e.preventDefault();       // no page reload!
  submit();
}}>`,
      },
      {
        title: { en: "Form object state", bn: "ফর্ম অবজেক্ট state" },
        code: `const [form, setForm] = useState({ email: "", pass: "" });
const set = f => e =>
  setForm(p => ({ ...p, [f]: e.target.value }));
<input value={form.email} onChange={set("email")} />`,
      },
    ],
  },
  {
    id: "c-props-patterns",
    title: { en: "Props & children patterns", bn: "Props ও children প্যাটার্ন" },
    items: [
      {
        title: { en: "Defaults & children", bn: "ডিফল্ট ও children" },
        code: `function Card({ title, color = "gray", children }) {
  return (
    <div className={\`card card-\${color}\`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}`,
      },
      {
        title: { en: "Render props (function children)", bn: "Render props (ফাংশন children)" },
        code: `function List({ items, renderItem }) {
  return <ul>{items.map(renderItem)}</ul>;
}
<List items={users}
  renderItem={u => <li key={u.id}>{u.name}</li>} />`,
      },
    ],
  },
];
