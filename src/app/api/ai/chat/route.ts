export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Try models in order — protects against future model deprecations. */
const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
];

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildSystemPrompt(lang: "en" | "bn", topic?: string): string {
  const languageRule =
    lang === "bn"
      ? "Reply in Bengali (বাংলা). If the learner writes in English, reply in English instead — always mirror the learner's own language."
      : "Reply in English. If the learner writes in Bengali (বাংলা), reply in Bengali — always mirror the learner's own language.";

  const context = topic
    ? `The learner is currently viewing: ${topic}. Tailor your answer to this context when relevant.`
    : "The learner is currently on the app's home page (new to the course).";

  return `You are "React Saathi" (রিয়্যাক্ট সাথী) — the friendly AI tutor inside ReactJatra, a bilingual (English + Bengali) app that takes complete beginners from zero to deployed React apps in 7 days.

${context}

Curriculum the learner is following:
- Day 0: Modern JavaScript refresher — arrow functions, destructuring, spread/rest, map/filter/reduce, template literals, ES modules, async/await, fetch
- Day 1: Components, JSX rules, props, children, rendering lists with keys, conditional rendering, event handling
- Day 2: useState, controlled inputs, immutable state updates, lifting state up, batching
- Day 3: useEffect — dependency arrays, cleanup, data fetching, AbortController, loading/error states, stale closures
- Day 4: useRef, useContext, useReducer, custom hooks (useLocalStorage)
- Day 5: React Router (Routes, Link, useParams, useNavigate, nested & protected routes), forms, react-hook-form
- Day 6: Performance — React.memo, useMemo, useCallback, React.lazy + Suspense, error boundaries, virtual DOM & reconciliation, Redux Toolkit / Zustand overview
- Day 7: Capstone project + deployment (Vercel/Netlify)
The app also offers: interview questions, a cheat sheet, a live code playground, and extra topics (styling, composition patterns, debugging, project structure, server state, TypeScript, React 19).

How to answer:
- ${languageRule}
- Be warm, encouraging and beginner-friendly. The learner may be new to programming — explain jargon in simple words.
- ALWAYS support explanations with a short, complete, runnable code example in a fenced code block (use \`\`\`jsx for React code). Prefer modern React: function components + hooks, no class components unless asked.
- Structure answers with short paragraphs, **bold key terms** and bullet lists. Keep answers under ~350 words unless the learner explicitly asks for more depth.
- Formatting rules (the chat renders GitHub-Flavored Markdown):
  - Use fenced code blocks with a language tag for all code.
  - Tables: use proper GFM tables with EVERY row on its own line (header row, then | --- | --- |, then one data row per line). NEVER put a whole table on one line. Keep tables narrow — at most 3 columns, short cells — because the chat panel is small; prefer bullet lists when a table would be wide.
  - NEVER use HTML tags such as <br>, <b>, <div> — plain Markdown only.
  - Use \`code\` spans for identifiers inside sentences.
- When relevant, point out common beginner mistakes and how to fix them.
- If asked something unrelated to React/JavaScript/web programming, answer in one or two sentences and kindly steer back to learning React.`;
}

function sanitizeHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const cleaned: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = (m as ChatMessage).role;
    const content = (m as ChatMessage).content;
    if ((role === "user" || role === "assistant") && typeof content === "string" && content.trim()) {
      cleaned.push({ role, content: content.slice(0, 4000) });
    }
  }
  // keep only the most recent turns to control tokens
  return cleaned.slice(-12);
}

/** Convert Groq's SSE stream into a plain-text token stream. */
function sseToTextStream(
  body: ReadableStream<Uint8Array>,
  headers: Record<string, string>
): Response {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta: string | undefined = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* partial JSON line — wait for more bytes */
            }
          }
        }
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
    cancel() {
      body.cancel().catch(() => undefined);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      ...headers,
    },
  });
}

/** Ask Groq; returns a streaming Response, or null if Groq is unavailable. */
async function tryGroq(
  history: ChatMessage[],
  lang: "en" | "bn",
  topic?: string
): Promise<Response | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const models = process.env.GROQ_MODEL
    ? [process.env.GROQ_MODEL]
    : GROQ_MODELS;

  for (const model of models) {
    try {
      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: buildSystemPrompt(lang, topic) },
            ...history,
          ],
          temperature: 0.6,
          max_completion_tokens: 2048,
          top_p: 0.95,
          stream: true,
        }),
      });

      if (res.ok && res.body) {
        return sseToTextStream(res.body, {
          "X-AI-Provider": "groq",
          "X-AI-Model": model,
        });
      }

      // 400/404 usually means a bad/deprecated model — try the next one.
      // Other codes (401/403/429) won't improve by switching models.
      if (res.status !== 400 && res.status !== 404) {
        console.error(`Groq request failed (${res.status}):`, await res.text().catch(() => ""));
        return null;
      }
      console.error(`Groq model ${model} rejected (${res.status}) — trying fallback model.`);
    } catch (err) {
      console.error("Groq request error:", err);
      return null; // network-level failure (e.g. geo-block) — use fallback
    }
  }
  return null;
}

/**
 * Fallback provider (z-ai-web-dev-sdk) — used when Groq is unreachable,
 * e.g. when previewing the app from regions Groq blocks. The reply is
 * generated in one shot, then emitted as small chunks so the UI still
 * shows a smooth "typing" stream.
 */
async function fallbackProvider(
  history: ChatMessage[],
  lang: "en" | "bn",
  topic?: string
): Promise<Response> {
  const { default: ZAI } = await import("z-ai-web-dev-sdk");
  const zai = await ZAI.create();

  const completion = await zai.chat.completions.create({
    messages: [
      { role: "assistant", content: buildSystemPrompt(lang, topic) },
      ...history,
    ],
    thinking: { type: "disabled" },
  });

  const content: string = completion.choices?.[0]?.message?.content ?? "";
  if (!content.trim()) throw new Error("Empty fallback response");

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // emit ~24 chars at a time for a natural typing feel
      for (let i = 0; i < content.length; i += 24) {
        controller.enqueue(encoder.encode(content.slice(i, i + 24)));
        await new Promise((r) => setTimeout(r, 24));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "X-AI-Provider": "zai-fallback",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const history = sanitizeHistory(
      (body as { messages?: unknown }).messages
    );
    if (!history.length || history[history.length - 1].role !== "user") {
      return Response.json({ error: "A user message is required" }, { status: 400 });
    }

    const lang = (body as { lang?: string }).lang === "bn" ? "bn" : "en";
    const rawTopic = (body as { topic?: unknown }).topic;
    const topic =
      typeof rawTopic === "string" && rawTopic.trim()
        ? rawTopic.trim().slice(0, 200)
        : undefined;

    // Primary: Groq (Llama) — fast, streaming
    const groq = await tryGroq(history, lang, topic);
    if (groq) return groq;

    // Fallback: local preview provider
    try {
      return await fallbackProvider(history, lang, topic);
    } catch (err) {
      console.error("Fallback provider failed:", err);
      return Response.json(
        { error: "The AI tutor is unavailable right now. Please try again in a moment." },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error("AI chat route error:", err);
    return Response.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
