"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Minimal hash router so the whole app can live on the single "/" route
 * while still supporting deep links like #/learn/day-3.
 */

function readHash(): string {
  if (typeof window === "undefined") return "#/";
  const h = window.location.hash;
  return h && h.length > 1 ? h : "#/";
}

export function useHashRoute() {
  const [hash, setHash] = useState<string>("#/");

  useEffect(() => {
    const onChange = () => setHash(readHash());
    onChange();
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = to.startsWith("#") ? to : `#${to}`;
    if (window.location.hash === target) {
      setHash(target); // force update even if same
    } else {
      window.location.hash = target;
    }
    // scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // parse: "#/learn/day-3?q=1" -> { path: "/learn/day-3", segments: ["learn","day-3"] }
  const path = hash.replace(/^#/, "").split("?")[0] || "/";
  const segments = path.split("/").filter(Boolean);

  return { hash, path, segments, navigate };
}

/** helper to build links */
export function href(route: string) {
  return route.startsWith("#") ? route : `#${route}`;
}
