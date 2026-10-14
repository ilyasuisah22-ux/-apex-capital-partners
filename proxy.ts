import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getPublicEnv } from "@/lib/config";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicAdminAuthRoute = pathname === "/admin/login" || pathname === "/admin/forgot-password" || pathname === "/admin/reset-password";
  if (!request.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();
  const env = getPublicEnv();
  if (!env) {
    if (publicAdminAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login?setup=required", request.url));
  }
  const response = NextResponse.next({ request });
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: { getAll: () => request.cookies.getAll(), setAll: (cookiesToSet) => cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options)) },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user && !publicAdminAuthRoute) return NextResponse.redirect(new URL(`/admin/login?next=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
