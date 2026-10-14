import { Suspense } from "react";
import { ForgotPasswordForm } from "@/components/admin/admin-login";

export default function ForgotPasswordPage() {
  return <Suspense fallback={<main className="admin-login-page"><p>Preparing account recovery...</p></main>}><ForgotPasswordForm /></Suspense>;
}
