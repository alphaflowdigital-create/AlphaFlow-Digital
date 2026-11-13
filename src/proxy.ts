import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/area-do-cliente"];
const AUTH_PAGES = ["/login", "/cadastro"];

/**
 * Renova a sessão do Supabase a cada requisição e protege a área do cliente.
 * O site institucional continua 100% aberto: só /area-do-cliente exige login.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Sem Supabase configurado não existe sessão possível: a área do cliente fica bloqueada.
  if (!url || !key) {
    if (isProtected) return redirectToLogin(request);
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // getUser() valida o token no servidor do Supabase (não confia apenas no cookie).
  const { data: { user } } = await supabase.auth.getUser();

  if (isProtected && !user) return redirectToLogin(request);

  if (user && AUTH_PAGES.includes(pathname)) {
    const dest = request.nextUrl.clone();
    dest.pathname = "/area-do-cliente";
    dest.search = "";
    return NextResponse.redirect(dest);
  }

  return response;
}

function redirectToLogin(request: NextRequest) {
  const dest = request.nextUrl.clone();
  dest.pathname = "/login";
  dest.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(dest);
}

export const config = {
  matcher: ["/area-do-cliente/:path*", "/login", "/cadastro", "/redefinir-senha", "/auth/:path*"],
};
