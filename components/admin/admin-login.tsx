"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget); const supabase = createSupabaseBrowserClient(); if (!supabase) { setError("Admin access is not configured yet. Add the Supabase environment variables first."); setLoading(false); return; } const { error: loginError } = await supabase.auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) }); if (loginError) { setError("The email or password was not accepted."); setLoading(false); return; } router.push(searchParams.get("next") || "/admin"); router.refresh(); }
  return <><ThemeToggle variant="inverse" className="admin-login-theme" /><form className="admin-login-form" onSubmit={submit}><p className="eyebrow text-brass">Owner access</p><h1>Welcome back.</h1>{searchParams.get("password-reset") === "complete" ? <p className="admin-success" role="status">Password updated. Sign in with your new password.</p> : null}{searchParams.get("recovery") ? <p className="admin-error" role="alert">That recovery link is invalid or has expired. Request a new one.</p> : null}<p>Sign in to manage media and review inquiries.</p><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-button admin-button-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button><Link className="account-back-link" href="/admin/forgot-password">Forgot password?</Link></form></>;
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [busy, setBusy] = useState(false);
  async function requestReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); setResetError("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setResetError("Password recovery is not configured."); setBusy(false); return; }
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/admin/reset-password")}`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    if (error) setResetError("We could not request a reset email. Check the address and try again.");
    else setMessage("If an account exists for that address, Supabase will send a reset email. Check your inbox and spam folder.");
    setBusy(false);
  }
  return <main className="admin-login-page"><form className="admin-login-form" onSubmit={requestReset}><p className="eyebrow text-brass">Account recovery</p><h1>Reset password.</h1><p>Enter the email address associated with your administrator account.</p>{message && <p className="admin-success" role="status">{message}</p>}{resetError && <p className="admin-error" role="alert">{resetError}</p>}<label>Email<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><button className="admin-button admin-button-primary" disabled={busy}>{busy ? "Sending..." : "Send reset email"}</button><Link className="account-back-link" href="/admin/login">Back to sign in</Link></form></main>;
}
