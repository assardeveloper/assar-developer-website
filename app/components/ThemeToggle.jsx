"use client";

import { useEffect, useState } from "react";

// Switches between light and dark. The choice is remembered on this device.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => setTheme(document.documentElement.dataset.theme || "dark"), []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Change theme">
      <span className="theme-icon sun">☀️</span>
      <span className="theme-icon moon">🌙</span>
    </button>
  );
}
