"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLogout() {
  const router = useRouter();
  async function logout() { const supabase = createSupabaseBrowserClient(); if (supabase) await supabase.auth.signOut(); router.push("/admin/login"); router.refresh(); }
  return <button className="admin-button admin-button-quiet" onClick={logout}>Log out</button>;
}
