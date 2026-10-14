"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AccountSettings({ email, displayName }: { email: string; displayName: string }) {
  const [name, setName] = useState(displayName);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [newEmail, setNewEmail] = useState(email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy("profile"); setMessage(""); setError("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setError("Account service is not configured."); setBusy(""); return; }
    const { error: updateError } = await supabase.auth.updateUser({ data: { display_name: name.trim() } });
    if (updateError) setError(updateError.message); else setMessage("Profile updated.");
    setBusy("");
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy("email"); setMessage(""); setError("");
    if (newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) { setError("Enter a different email address."); setBusy(""); return; }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setError("Account service is not configured."); setBusy(""); return; }
    const { error: updateError } = await supabase.auth.updateUser({ email: newEmail.trim() });
    if (updateError) setError(updateError.message); else { setCurrentEmail(newEmail.trim()); setMessage("Email change requested. Follow the verification link sent by Supabase before the new address takes effect."); }
    setBusy("");
  }

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy("password"); setMessage(""); setError("");
    if (password.length < 8) { setError("Use at least 8 characters for your new password."); setBusy(""); return; }
    if (password !== confirmPassword) { setError("The new passwords do not match."); setBusy(""); return; }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setError("Account service is not configured."); setBusy(""); return; }
    const { error: updateError } = await supabase.auth.updateUser({ password, current_password: currentPassword });
    if (updateError) setError(updateError.message); else { setCurrentPassword(""); setPassword(""); setConfirmPassword(""); setMessage("Password changed successfully."); }
    setBusy("");
  }

  return <main className="admin-page"><div className="admin-page-heading"><div><p className="eyebrow text-brass">Account</p><h1>Account settings</h1><p>Manage your administrator profile and sign-in details.</p></div></div>{message && <p className="admin-success" role="status">{message}</p>}{error && <p className="admin-error" role="alert">{error}</p>}<div className="account-settings-grid"><form className="admin-panel account-form" onSubmit={submitProfile}><h2>Profile</h2><p className="account-current">Signed in as {currentEmail}</p><label>Display name<input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required /></label><button className="admin-button admin-button-primary" disabled={busy !== ""}>{busy === "profile" ? "Saving..." : "Save profile"}</button></form><form className="admin-panel account-form" onSubmit={submitEmail}><h2>Login email</h2><p className="account-current">Current: {currentEmail}</p><label>New email<input type="email" autoComplete="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required /></label><button className="admin-button admin-button-primary" disabled={busy !== ""}>{busy === "email" ? "Requesting..." : "Update email"}</button><small>Supabase may require verification at one or both email addresses.</small></form><form className="admin-panel account-form" onSubmit={submitPassword}><h2>Change password</h2><label>Current password<input type="password" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required /></label><label>New password<input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required /></label><label>Confirm new password<input type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} required /></label><button className="admin-button admin-button-primary" disabled={busy !== ""}>{busy === "password" ? "Updating..." : "Change password"}</button></form></div></main>;
}
