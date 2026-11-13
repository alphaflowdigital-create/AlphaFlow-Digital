import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth";

/**
 * Destino dos links enviados por e-mail (confirmação de cadastro e recuperação de senha).
 * Suporta o fluxo PKCE (?code=) e o fluxo por token (?token_hash=&type=).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = safeNext(searchParams.get("next"));
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(`${origin}/login`);

  let ok = false;
  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  }

  if (!ok) {
    const dest = next === "/redefinir-senha" ? "/redefinir-senha" : "/login?erro=link-invalido";
    return NextResponse.redirect(`${origin}${dest}`);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
