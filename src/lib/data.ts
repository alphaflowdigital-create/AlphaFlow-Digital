import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Plan, ProjectStatus } from "@/content/site";

export type Profile = {
  id: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  role: "client" | "admin";
  created_at: string;
};

export type Project = {
  id: string;
  client_id: string;
  name: string;
  plan: Plan["id"];
  status: ProjectStatus;
  notes: string | null;
  published_url: string | null;
  domain: string | null;
  started_at: string | null;
  published_at: string | null;
  updated_at: string;
};

export type Lead = {
  id: string; name: string; company: string; segment: string; whatsapp: string;
  email: string; plan: string; description: string; status: string; created_at: string;
};

/**
 * Sessão obrigatória para a área do cliente. O proxy já protege a rota;
 * esta verificação no servidor é a segunda camada.
 */
export const requireSession = cache(async () => {
  await connection(); // sempre renderizado por requisição, nunca pré-gerado
  const supabase = await createClient();
  if (!supabase) redirect("/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/area-do-cliente");
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle<Profile>();
  return { supabase, user, profile, isAdmin: profile?.role === "admin" };
});

export async function requireAdmin() {
  const s = await requireSession();
  if (!s.isAdmin) redirect("/area-do-cliente");
  return s;
}
