"use client";

import { SunIcon, MoonIcon } from "@/components/ui/icons";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle({ variant = "default", className = "" }: { variant?: "default" | "inverse"; className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return <button type="button" className={`icon-button theme-toggle ${variant === "inverse" ? "on-dark" : ""} ${className}`} onClick={toggleTheme} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}><MoonIcon className="theme-toggle-moon size-4" /><SunIcon className="theme-toggle-sun size-4" /></button>;
}