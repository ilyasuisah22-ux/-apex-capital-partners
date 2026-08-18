"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle({ variant = "default", className = "" }: { variant?: "default" | "inverse"; className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return <button type="button" className={`theme-toggle ${variant === "inverse" ? "on-dark" : ""} ${className}`} onClick={toggleTheme} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}><Moon className="theme-toggle-moon" aria-hidden="true" /><Sun className="theme-toggle-sun" aria-hidden="true" /></button>;
}
