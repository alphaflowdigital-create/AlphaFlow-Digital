"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, requireSession } from "@/lib/data";
import { PLANS, PROJECT_STATUS } from "@/content/site";

export type ActionState = { ok?: boolean; error?: string; message?: string } | undefined;

const text = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/login?msg=saiu");
}

export async function updateProfile(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase, user } = await requireSession();
  const full_name = text(fd, "full_name", 120);
  if (full_name.length < 2) return { error: "Informe seu nome." };
  const phone = text(fd, "phone", 20).replace(/[^\d()+\s-]/g, "");
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, company: text(fd, "company", 160) || null, phone: phone || null })
    .eq("id", user.id);
  if (error) return { error: "Não foi possível salvar. Tente novamente." };
  revalidatePath("/area-do-cliente", "layout");
  return { ok: true, message: "Dados atualizados com sucesso." };
}

// ── Ações administrativas (RLS também bloqueia quem não é admin) ──────────

const VALID_STATUS = PROJECT_STATUS.map((s) => s.id) as string[];
const VALID_PLANS = PLANS.map((p) => p.id) as string[];

export async function createProject(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const client_id = text(fd, "client_id", 64);
  const name = text(fd, "name", 160);
  const plan = text(fd, "plan", 40);
  if (!client_id || name.length < 2 || !VALID_PLANS.includes(plan)) return { error: "Preencha cliente, nome do projeto e plano." };
  const { error } = await supabase.from("projects").insert({ client_id, name, plan, started_at: new Date().toISOString().slice(0, 10) });
  if (error) return { error: "Não foi possível criar o projeto." };
  revalidatePath("/area-do-cliente", "layout");
  return { ok: true, message: "Projeto criado." };
}

export async function updateProject(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = text(fd, "id", 64);
  const status = text(fd, "status", 40);
  if (!id || !VALID_STATUS.includes(status)) return { error: "Status inválido." };
  const published_url = text(fd, "published_url", 300);
  if (published_url && !/^https?:\/\//.test(published_url)) return { error: "A URL publicada deve começar com http:// ou https://" };
  const patch: Record<string, unknown> = {
    status,
    notes: text(fd, "notes", 2000) || null,
    published_url: published_url || null,
    domain: text(fd, "domain", 200) || null,
  };
  if (status === "publicado") patch.published_at = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from("projects").update(patch).eq("id", id);
  if (error) return { error: "Não foi possível atualizar o projeto." };
  revalidatePath("/area-do-cliente", "layout");
  return { ok: true, message: "Projeto atualizado." };
}

export async function updateLeadStatus(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(fd, "id", 64);
  const status = text(fd, "status", 20);
  if (!["novo", "em_contato", "convertido", "descartado"].includes(status)) return;
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/area-do-cliente/admin");
}
