import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

/** Cliente Supabase com a sessão do usuário (Server Components, Server Actions, Route Handlers). */
export async function createClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Chamado a partir de um Server Component: o proxy já renova a sessão.
        }
      },
    },
  });
}

/**
 * Cliente com a service role — ignora RLS. Usar SOMENTE no servidor e apenas
 * para operações controladas (ex.: gravar orçamentos enviados pelo site).
 */
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createAdminClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
