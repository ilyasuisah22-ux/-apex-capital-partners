"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget); const supabase = createSupabaseBrowserClient(); if (!supabase) { setError("Admin access is not configured yet. Add the Supabase environment variables first."); setLoading(false); return; } const { error: loginError } = await supabase.auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) }); if (loginError) { setError("The email or password was not accepted."); setLoading(false); return; } router.push(searchParams.get("next") || "/admin"); router.refresh(); }
  return <><ThemeToggle variant="inverse" className="admin-login-theme" /><form className="admin-login-form" onSubmit={submit}><p className="eyebrow text-brass">Owner access</p><h1>Welcome back.</h1><p>Sign in to manage media and review inquiries.</p><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-button admin-button-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button></form></>;
}
