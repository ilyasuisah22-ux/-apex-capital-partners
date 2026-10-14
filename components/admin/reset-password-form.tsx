"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function ResetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password"));
    if (password !== String(data.get("confirm"))) { setError("Passwords do not match."); setBusy(false); return; }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setError("Password recovery is not configured."); setBusy(false); return; }
    const { data: session, error: sessionError } = await supabase.auth.getUser();
    if (sessionError || !session.user) { setError("Recovery link is invalid or expired. Request a new one."); setBusy(false); return; }
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) setError("Could not update password. Request a fresh recovery link.");
    else { await supabase.auth.signOut(); router.replace("/admin/login?password-reset=complete"); }
    setBusy(false);
  }
  return <main className="admin-login-page"><form className="admin-login-form" onSubmit={submit}><p className="eyebrow text-brass">Account recovery</p><h1>Choose a new password.</h1><p>Set a new password for your administrator account.</p>{error && <p className="admin-error" role="alert">{error}</p>}<label>New password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label><label>Confirm new password<input name="confirm" type="password" autoComplete="new-password" minLength={8} required /></label><button className="admin-button admin-button-primary" disabled={busy}>{busy ? "Updating..." : "Update password"}</button></form></main>;
}
