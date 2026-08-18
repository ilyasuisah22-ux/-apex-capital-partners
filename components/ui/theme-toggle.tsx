"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle({ inverse = false }: { inverse?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const update = () => setTheme(currentTheme());
    update();
    window.addEventListener("apex-theme-change", update);
    return () => window.removeEventListener("apex-theme-change", update);
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("apex-theme", next);
    setTheme(next);
    window.dispatchEvent(new Event("apex-theme-change"));
  }

  const nextLabel = theme === "dark" ? "Use light theme" : "Use dark theme";
  return <button className={`theme-toggle ${inverse ? "theme-toggle-inverse" : ""}`} type="button" onClick={toggle} aria-label={nextLabel} title={nextLabel}><svg viewBox="0 0 24 24" aria-hidden="true">{theme === "dark" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />}</svg><span>{theme === "dark" ? "Light" : "Dark"}</span></button>;
}
