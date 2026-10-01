import type { Day } from "../types";

export const day5: Day = {
  id: "day-5",
  day: 5,
  icon: "route",
  hours: { en: "2 hrs learn · 3 hrs build", bn: "২ ঘণ্টা শেখা · ৩ ঘণ্টা বানানো" },
  title: { en: "Day 5 — Routing & Forms", bn: "দিন ৫ — রাউটিং ও ফর্ম" },
  subtitle: {
    en: "React Router (pages, params, guards) and forms done right: controlled vs uncontrolled, validation, and React Hook Form.",
    bn: "React Router (পেজ, param, guard) আর সঠিক ফর্ম: controlled vs uncontrolled, ভ্যালিডেশন, এবং React Hook Form।",
  },
  tagline: {
    en: "React Router, useParams/useNavigate, protected routes, forms & validation.",
    bn: "React Router, useParams/useNavigate, protected route, ফর্ম ও ভ্যালিডেশন।",
  },
  goals: [
    { en: "Explain SPA routing vs multi-page websites", bn: "SPA রাউটিং বনাম মাল্টি-পেজ ওয়েবসাইট ব্যাখ্যা করা" },
    { en: "Build routes with React Router: pages, links, params", bn: "React Router দিয়ে রাউট বানানো: পেজ, লিংক, param" },
    { en: "Navigate programmatically with useNavigate", bn: "useNavigate দিয়ে প্রোগ্রাম্যাটিক নেভিগেশন" },
    { en: "Protect routes (auth guard pattern)", bn: "Route আগলে রাখা (auth guard প্যাটার্ন)" },
    { en: "Choose between controlled and uncontrolled forms", bn: "Controlled ও uncontrolled ফর্মের মধ্যে বাছাই করা" },
  ],
  sections: [
    {
      id: "spa-routing",
      title: { en: "Why routing? (SPA vs MPA)", bn: "রাউটিং কেন? (SPA বনাম MPA)" },
      body: [
        {
          en: "A traditional multi-page site (MPA) requests a new HTML page from the server for every URL. A React SPA (single-page app) loads ONE html file, and JavaScript swaps what's on screen — no page reloads, instant navigation. React Router fakes URLs (/products, /profile) so the browser's back button, bookmarks, and sharing all still work.",
          bn: "প্রচলিত মাল্টি-পেজ সাইট (MPA) প্রতিটি URL-এর জন্য সার্ভার থেকে নতুন HTML পেজ চায়। React SPA (সিঙ্গেল-পেজ অ্যাপ) একটাই html ফাইল লোড করে, আর জাভাস্ক্রিপ্ট স্ক্রিনে যা আছে বদলে দেয় — পেজ রিলোড নেই, তাৎক্ষণিক নেভিগেশন। React Router URL (/products, /profile) নকল করে, তাই ব্রাউজারের ব্যাক বাটন, বুকমার্ক, শেয়ার — সবই কাজ করে।",
        },
        {
          en: "Install with npm install react-router-dom, wrap your app in BrowserRouter, and declare routes with Routes/Route. In modern React Router (v6.4+), you can also use createBrowserRouter for data loading — but start with the declarative style; it covers everything you need this week.",
          bn: "npm install react-router-dom দিয়ে ইনস্টল করুন, অ্যাপটা BrowserRouter-এ মুড়ুন, আর Routes/Route দিয়ে রাউট ঘোষণা করুন। আধুনিক React Router-এ (v6.4+) ডেটা লোডিংয়ের জন্য createBrowserRouter-ও আছে — তবে declarative স্টাইলে শুরু করুন; এই সপ্তাহের সব কাজ এতেই হয়ে যাবে।",
        },
      ],
      code: [
        {
          title: "terminal",
          language: "bash",
          code: `npm install react-router-dom`,
        },
        {
          title: "src/main.jsx — the setup",
          language: "jsx",
          code: `import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* NESTED routes render inside App's <Outlet /> */}
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />  {/* 404 */}
      </Route>
    </Routes>
  </BrowserRouter>
);`,
        },
        {
          title: "src/App.jsx — layout with Outlet",
          language: "jsx",
          code: `import { Link, NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        {/* Link = SPA navigation (no reload) — NEVER <a href> */}
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {/* NavLink knows when it's active — perfect for tabs! */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
      </nav>

      <main>
        <Outlet />   {/* 👈 the matched child route renders here */}
      </main>
    </div>
  );
}`,
        },
      ],
      live: {
        title: "Try it — SPA router simulation (no library)",
        language: "jsx",
        code: `import { useState, useEffect } from "react";

// A tiny hand-rolled router so you can SEE the concept.
// React Router does this + URL sync for you.

const routes = ["/", "/about", "/contact"];

function App() {
  const [path, setPath] = useState("/");

  // keep a fake history so Back works
  const [history, setHistory] = useState(["/"]);

  function navigate(to) {
    setPath(to);
    setHistory(h => [...h, to]);
  }

  function back() {
    setHistory(h => {
      if (h.length < 2) return h;
      const next = h.slice(0, -1);
      setPath(next[next.length - 1]);
      return next;
    });
  }

  let page;
  if (path === "/") page = <h2>🏠 Home page</h2>;
  else if (path === "/about") page = <h2>👤 About page</h2>;
  else if (path === "/contact") page = <h2>📞 Contact page</h2>;
  else page = <h2>❓ 404 — not found</h2>;

  return (
    <div style={{ maxWidth: 340 }}>
      <nav style={{ display: "flex", gap: 6 }}>
        {routes.map(r => (
          <button
            key={r}
            onClick={() => navigate(r)}
            style={{
              fontWeight: path === r ? "bold" : "normal",
              borderBottom: path === r ? "2px solid #2563eb" : "none",
              background: "none", border: "none", cursor: "pointer",
              padding: "4px 2px", fontSize: 14,
            }}
          >
            {r}
          </button>
        ))}
      </nav>
      <hr />
      {page}
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        history: {history.join(" → ")}
      </p>
      <button onClick={back}>← Back</button>
    </div>
  );
}

render(<App />);`,
      },
    },
    {
      id: "params",
      title: { en: "Dynamic Routes & Navigation", bn: "ডায়নামিক রাউট ও নেভিগেশন" },
      body: [
        {
          en: "URL segments starting with : are dynamic params — /products/:id matches /products/42 and gives you id=\"42\" via useParams(). Read params to fetch the right data. For navigation from code (after login, after form submit), use useNavigate() — the hook version of navigate.",
          bn: ": দিয়ে শুরু হওয়া URL সেগমেন্ট হলো ডায়নামিক param — /products/:id মানে /products/42-ও ম্যাচ করবে আর useParams() দিয়ে id=\"42\" পাবেন। সঠিক ডেটা ফেচ করতে param পড়ুন। কোড থেকে নেভিগেট করতে (লগইনের পর, ফর্ম সাবমিটের পর) useNavigate() ব্যবহার করুন — navigate-এর hook ভার্সন।",
        },
      ],
      code: [
        {
          title: "ProductDetail.jsx",
          language: "jsx",
          code: `import { useParams, useNavigate, Link } from "react-router-dom";

function ProductDetail() {
  // URL: /products/:id  →  /products/7
  const { id } = useParams();            // { id: "7" }
  const navigate = useNavigate();

  const product = products.find(p => String(p.id) === id);

  if (!product) {
    return <p>Product not found <Link to="/products">Go back</Link></p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      <button onClick={() => navigate(-1)}>      ← back one step
        Back
      </button>
      <button onClick={() => navigate("/products")}>
        Go to products
      </button>
      <button onClick={() => navigate("/login", { state: { from: "product" } })}>
        Login (carries state)
      </button>
    </div>
  );
}

// In Login, read that state:
// const location = useLocation();
// location.state?.from`,
        },
      ],
    },
    {
      id: "protected",
      title: { en: "Protected Routes (auth guard)", bn: "Protected Route (auth guard)" },
      body: [
        {
          en: "The pattern for \"logged-in only\" pages: a wrapper component that checks auth and either renders children or redirects to /login (remembering where the user wanted to go). You'll use this in every real app you ever build.",
          bn: "\"শুধু লগইন করা\" পেজের প্যাটার্ন: একটা wrapper component যেটা auth চেক করে, তারপর হয় children রেন্ডার করে নয়তো /login-এ পাঠিয়ে দেয় (ইউজার কোথায় যেতে চেয়েছিল মনে রেখে)। জীবনে যে আসল অ্যাপই বানাবেন, সবখানেই এটা লাগবে।",
        },
      ],
      code: [
        {
          title: "ProtectedRoute.jsx",
          language: "jsx",
          code: `import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-context";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();   // where did they try to go?

  // don't flash the login page while checking the session
  if (loading) return <p>Loading…</p>;

  if (!user) {
    // remember destination → redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;                  // authorized → render the page
}

// Wire it up:
// <Route path="/dashboard" element={
//   <ProtectedRoute><Dashboard /></ProtectedRoute>
// } />

// And in Login, after success:
// const { state } = useLocation();
// navigate(state?.from?.pathname || "/dashboard", { replace: true });`,
        },
      ],
      live: {
        title: "Try it — login + protected page (simulated)",
        language: "jsx",
        code: `import { useState } from "react";

// Simulated auth + router to show the guard pattern working
function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [wanted, setWanted] = useState(null);

  function navigate(to) { setPage(to); }

  function login() {
    setUser({ name: "Ayesha" });
    navigate(wanted || "dashboard");   // go where they wanted!
    setWanted(null);
  }

  function logout() {
    setUser(null);
    navigate("home");
  }

  // The guard component
  function Protected({ children }) {
    if (!user) {
      setWanted("dashboard");
      return (
        <div style={{ color: "#ef4444" }}>
          🔒 Please log in first!
          <button onClick={() => navigate("login")}>Go to login</button>
        </div>
      );
    }
    return children;
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <nav style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["home", "dashboard"].map(p => (
          <button key={p} onClick={() => navigate(p)}
            style={{ fontWeight: page === p ? "bold" : "normal" }}>
            {p}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        {user && <small>👤 {user.name}</small>}
      </nav>

      {page === "home" && <div><h2>🏠 Home (public)</h2><p>Anyone can see this page.</p></div>}

      {page === "login" && (
        <div>
          <h2>🔑 Login</h2>
          <button onClick={login}>Log in as Ayesha</button>
        </div>
      )}

      {page === "dashboard" && (
        <Protected>
          <h2>📊 Dashboard (protected)</h2>
          <p>Welcome, {user?.name}! Secret data: 🤫</p>
          <button onClick={logout}>Log out</button>
        </Protected>
      )}
    </div>
  );
}

render(<App />);

// Flow: click "dashboard" while logged out → guard blocks you
// → login → lands on dashboard automatically!`,
      },
    },
    {
      id: "forms",
      title: { en: "Forms: Controlled vs Uncontrolled", bn: "ফর্ম: Controlled বনাম Uncontrolled" },
      body: [
        {
          en: "Controlled (React state owns the value): instant validation, conditional logic, programmatic control — the default choice. Uncontrolled (the DOM owns the value, read via ref on submit): less code, slightly faster, fine for simple forms. Know both; interviewers ask.",
          bn: "Controlled (React state ভ্যালুর মালিক): তাৎক্ষণিক ভ্যালিডেশন, কন্ডিশনাল লজিক, প্রোগ্রাম্যাটিক নিয়ন্ত্রণ — ডিফল্ট পছন্দ। Uncontrolled (DOM ভ্যালুর মালিক, সাবমিটে ref দিয়ে পড়ুন): কম কোড, সামান্য দ্রুত, সহজ ফর্মে চলে। দুটোই জানুন; ইন্টারভিউয়াররা জিজ্ঞেস করে।",
        },
      ],
      code: [
        {
          title: "controlled vs uncontrolled",
          language: "jsx",
          code: `// CONTROLLED — React state is the source of truth
function ControlledForm() {
  const [email, setEmail] = useState("");

  return (
    <form onSubmit={e => { e.preventDefault(); console.log(email); }}>
      <input value={email}
             onChange={e => setEmail(e.target.value)} />
      <button disabled={!email.includes("@")}>Send</button>
    </form>
  );
}

// UNCONTROLLED — the DOM holds the value; read it when needed
function UncontrolledForm() {
  const emailRef = useRef(null);

  return (
    <form onSubmit={e => {
      e.preventDefault();
      console.log(emailRef.current.value);   // read ONCE
    }}>
      <input ref={emailRef} defaultValue="you@mail.com" />
      <button>Send</button>
    </form>
  );
}`,
        },
        {
          title: "React Hook Form — the pro move",
          language: "jsx",
          code: `import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,          // connect inputs
    handleSubmit,      // submit wrapper
    formState: { errors, isSubmitting },
    watch,             // live values
    reset,             // clear form
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = data => {
    console.log(data);        // { name, email, password }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", {
        required: "Name is required",
        minLength: { value: 3, message: "Min 3 characters" },
      })} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email", {
        required: "Email required",
        pattern: { value: /^\\S+@\\S+$/i, message: "Invalid email" },
      })} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password", {
        required: "Password required",
        minLength: { value: 8, message: "8+ characters" },
      })} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button disabled={isSubmitting}>
        {isSubmitting ? "Creating…" : "Sign up"}
      </button>
    </form>
  );
}`,
        },
      ],
      live: {
        title: "Try it — validation without a library",
        language: "jsx",
        code: `import { useState } from "react";

function App() {
  const [values, setValues] = useState({ name: "", email: "", age: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const errors = {
    name: !values.name.trim()
      ? "Name is required"
      : values.name.trim().length < 3
        ? "Name must be 3+ characters" : "",
    email: !values.email
      ? "Email is required"
      : !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)
        ? "That doesn't look like an email" : "",
    age: values.age !== "" && (isNaN(values.age) || +values.age < 18)
      ? "Must be 18+" : "",
  };

  const valid = !errors.name && !errors.email && !errors.age;

  const set = field => e =>
    setValues(v => ({ ...v, [field]: e.target.value }));

  const blur = field => () =>
    setTouched(t => ({ ...t, [field]: true }));

  function submit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, age: true });
    if (valid) setSubmitted(values);
  }

  const field = (name, label, type = "text") => (
    <label style={{ display: "block", marginBottom: 10, fontSize: 14 }}>
      {label}
      <input
        type={type}
        value={values[name]}
        onChange={set(name)}
        onBlur={blur(name)}
        style={{
          display: "block", width: "100%", padding: 8, marginTop: 4,
          border: "1px solid " + (touched[name] && errors[name] ? "#ef4444" : "#d1d5db"),
          borderRadius: 6,
        }}
      />
      {touched[name] && errors[name] && (
        <span style={{ color: "#ef4444", fontSize: 12 }}>{errors[name]}</span>
      )}
    </label>
  );

  return (
    <form onSubmit={submit} style={{ maxWidth: 320 }}>
      <h3 style={{ marginTop: 0 }}>📝 Registration</h3>
      {field("name", "Full name")}
      {field("email", "Email")}
      {field("age", "Age (18+)", "number")}
      <button disabled={!valid && Object.keys(touched).length === 3}>
        Create account
      </button>
      {submitted && (
        <p style={{ color: "#22c55e" }}>✅ Welcome, {submitted.name}!</p>
      )}
    </form>
  );
}

render(<App />);

// "touched" = only show errors for fields the user has visited.
// This is the UX pattern libraries implement for you!`,
      },
    },
  ],
  exercises: [
    {
      id: "d5-e1",
      level: 2,
      title: { en: "Exercise 1 — Fake router with 404", bn: "অনুশীলন ১ — 404 সহ ফেক রাউটার" },
      task: {
        en: "Simulate routing with state: pages home, profile, settings. Unknown page shows a 404 with a \"go home\" button. Add a page title map (home → \"Welcome\" etc.) displayed as an h1.",
        bn: "State দিয়ে রাউটিং সিমুলেট করুন: পেজ home, profile, settings। অজানা পেজে \"go home\" বাটনসহ 404 দেখান। পেজ টাইটেল ম্যাপ (home → \"Welcome\" ইত্যাদি) যোগ করে h1-এ দেখান।",
      },
      starter: `import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  // TODO: PAGE_TITLES map + 404 handling

  return (
    <div>
      {/* TODO: nav buttons */}
      {/* TODO: page content by page */}
    </div>
  );
}

render(<App />);`,
      solution: `import { useState } from "react";

const PAGES = {
  home: { title: "Welcome 🏠", body: "This is the home page." },
  profile: { title: "Your Profile 👤", body: "Ayesha — Frontend Dev" },
  settings: { title: "Settings ⚙️", body: "Dark mode: ON" },
};

function App() {
  const [page, setPage] = useState("home");

  const current = PAGES[page];

  return (
    <div style={{ maxWidth: 340 }}>
      <nav style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {Object.keys(PAGES).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{ fontWeight: page === p ? "bold" : "normal",
                     borderBottom: page === p ? "2px solid #2563eb" : "none" }}
          >
            {p}
          </button>
        ))}
        <button onClick={() => setPage("nope")}>broken 🔗</button>
      </nav>

      {current ? (
        <div>
          <h2>{current.title}</h2>
          <p>{current.body}</p>
        </div>
      ) : (
        <div>
          <h2>❓ 404 — Page not found</h2>
          <p>\`{page}\` doesn't exist.</p>
          <button onClick={() => setPage("home")}>🏠 Go home</button>
        </div>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "d5-e2",
      level: 3,
      title: { en: "Exercise 2 — Full login flow with guard", bn: "অনুশীলন ২ — Guard সহ পূর্ণ লগইন ফ্লো" },
      task: {
        en: "Build: login form (email + password, validates email format, wrong password shows error, correct = user:admin/pass:1234), protected dashboard page, logout. After login redirect to dashboard. Guard blocks dashboard when logged out.",
        bn: "বানান: লগইন ফর্ম (email + password, email ফরম্যাট ভ্যালিডেট, ভুল পাসওয়ার্ডে error, সঠিক = user: admin / pass: 1234), protected dashboard পেজ, logout। লগইনের পর dashboard-এ যাবে। লগআউট অবস্থায় dashboard ব্লক হবে।",
      },
      starter: `import { useState } from "react";

function App() {
  // TODO: user state, page state
  // TODO: LoginPage, Dashboard, Protected components
}

render(<App />);`,
      solution: `import { useState } from "react";

const CREDENTIALS = { email: "admin@test.com", password: "1234" };

function LoginPage({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = f => e => setForm(v => ({ ...v, [f]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) {
      setError("Invalid email format");
      return;
    }
    setBusy(true);
    setTimeout(() => {                        // fake server delay
      if (form.email === CREDENTIALS.email && form.password === CREDENTIALS.password) {
        onSuccess({ email: form.email, name: "Admin" });
      } else {
        setError("Wrong email or password");
      }
      setBusy(false);
    }, 600);
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 300 }}>
      <h3>🔑 Login</h3>
      <input style={{ display: "block", width: "100%", padding: 8, margin: "6px 0", borderRadius: 6, border: "1px solid #d1d5db" }}
        value={form.email} onChange={set("email")} placeholder="admin@test.com" />
      <input style={{ display: "block", width: "100%", padding: 8, margin: "6px 0", borderRadius: 6, border: "1px solid #d1d5db" }}
        type="password" value={form.password} onChange={set("password")} placeholder="1234" />
      <button disabled={busy}>{busy ? "Checking…" : "Log in"}</button>
      {error && <p style={{ color: "#ef4444" }}>❌ {error}</p>}
    </form>
  );
}

function Protected({ user, goLogin, children }) {
  if (!user) {
    return (
      <div>
        <p>🔒 This page is protected.</p>
        <button onClick={goLogin}>Go to login</button>
      </div>
    );
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  return (
    <div style={{ maxWidth: 340 }}>
      <nav style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <button onClick={() => setPage("login")}>login</button>
        <button onClick={() => setPage("dashboard")}>dashboard</button>
      </nav>

      {page === "login" &&
        (user
          ? <p>✅ Already logged in as {user.name}</p>
          : <LoginPage onSuccess={u => { setUser(u); setPage("dashboard"); }} />)}

      {page === "dashboard" && (
        <Protected user={user} goLogin={() => setPage("login")}>
          <h3>📊 Dashboard</h3>
          <p>Welcome back, <strong>{user.name}</strong> ({user.email})!</p>
          <p>Secret stats: 📈 42 users, 💰 ৳99,000 MRR</p>
          <button onClick={() => { setUser(null); setPage("login"); }}>Log out</button>
        </Protected>
      )}
    </div>
  );
}

render(<App />);`,
    },
  ],
  project: {
    title: { en: "Day 5 Project — Multi-page Shop with Auth", bn: "দিন ৫ প্রজেক্ট — Auth সহ মাল্টি-পেজ শপ" },
    brief: {
      en: "Build a real multi-page app with Vite + React Router: Home, Product List, Product Details (via :id params), Login, and a protected Dashboard. Bonus: nested routes for the dashboard (overview/orders tabs) and a 404 page.",
      bn: "Vite + React Router দিয়ে একটা আসল মাল্টি-পেজ অ্যাপ বানান: Home, Product List, Product Details (:id param দিয়ে), Login, আর protected Dashboard। বোনাস: dashboard-এ nested route (overview/orders ট্যাব) আর 404 পেজ।",
    },
    requirements: [
      { en: "Pages: /, /products, /products/:id, /login, /dashboard", bn: "পেজ: /, /products, /products/:id, /login, /dashboard" },
      { en: "Layout with nav + <Outlet />", bn: "Nav + <Outlet /> সহ লেআউট" },
      { en: "Login sets fake user in state/context", bn: "লগইন fake ইউজার state/context-এ সেট করে" },
      { en: "ProtectedRoute guards /dashboard", bn: "ProtectedRoute দিয়ে /dashboard আগলানো" },
      { en: "useParams for product details + 404 catch-all", bn: "প্রোডাক্ট ডিটেইলে useParams + 404 catch-all" },
    ],
  },
};
