import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getPublicEnv } from "@/lib/config";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = url.searchParams.get("next") || "/admin/reset-password";
  const safeNext = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/admin/reset-password";
  const env = getPublicEnv();
  if (!code || !env) return NextResponse.redirect(new URL("/admin/login?recovery=invalid", url));
  const response = NextResponse.redirect(new URL(safeNext, url));
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.headers.get("cookie")?.split("; ").map((value) => { const i = value.indexOf("="); return { name: value.slice(0, i), value: value.slice(i + 1) }; }) ?? [],
      setAll: (items) => items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)),
    },
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  return error ? NextResponse.redirect(new URL("/admin/login?recovery=invalid", url)) : response;
}
