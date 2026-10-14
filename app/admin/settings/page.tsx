import { requireAdmin } from "@/lib/supabase/auth";
import { AccountSettings } from "@/components/admin/account-settings";

export default async function AdminSettingsPage() {
  const { user } = await requireAdmin();
  return <AccountSettings email={user.email ?? ""} displayName={String(user.user_metadata?.display_name ?? user.user_metadata?.name ?? "")} />;
}
