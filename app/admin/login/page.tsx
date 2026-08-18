import { Suspense } from "react";
import { AdminLogin } from "@/components/admin/admin-login";

export default function AdminLoginPage() { return <main className="admin-login-page"><Suspense fallback={<p>Preparing secure sign in...</p>}><AdminLogin /></Suspense></main>; }
