"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";

const storageKey = "apex-theme";

function readInitial(): Theme {
  if (typeof window === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

let currentTheme: Theme = readInitial();
const listeners = new Set<() => void>();

function getTheme(): Theme {
  return currentTheme;
}

function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setTheme(next: Theme) {
  currentTheme = next;
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(storageKey, next);
  } catch {
    /* storage is not available */
  }
  listeners.forEach((listener) => listener());
}

type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light" as Theme);
  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, []);
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider.");
  return context;
}