import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizePhone, PLAN_OPTIONS, validateLead, type LeadInput } from "@/lib/lead";

// Limite simples por IP (memória da instância) para conter abuso.
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 10 * 60_000, MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n++;
  return h.n > MAX;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Muitas tentativas em pouco tempo. Aguarde alguns minutos." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot preenchido = robô. Respondemos sem gravar nada.
  if (str(body.website)) return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });

  const input: LeadInput = {
    name: str(body.name).trim(),
    company: str(body.company).trim(),
    segment: str(body.segment).trim(),
    whatsapp: str(body.whatsapp),
    email: str(body.email).trim().toLowerCase(),
    plan: str(body.plan),
    description: str(body.description).trim(),
    consent: body.consent === true,
  };
  const errors = validateLead(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Revise os campos destacados.", errors }, { status: 422 });
  }

  const lead = {
    name: input.name,
    company: input.company,
    segment: input.segment,
    whatsapp: normalizePhone(input.whatsapp),
    email: input.email,
    plan: input.plan,
    description: input.description,
    consent_at: new Date().toISOString(),
  };

  const supabase = createServiceClient();
  let stored = false;
  if (supabase) {
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      console.error("[orcamento] falha ao gravar lead:", error.message);
      return NextResponse.json({ ok: false, error: "Não foi possível registrar sua solicitação agora." }, { status: 500 });
    }
    stored = true;
  }

  const notified = await notify(lead);

  // Só confirmamos o envio se a solicitação foi efetivamente registrada OU notificada.
  if (!stored && !notified) {
    console.warn("[orcamento] nenhum destino configurado (Supabase, Resend ou webhook).");
    return NextResponse.json(
      { ok: false, error: "O envio por formulário ainda não está disponível." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}

async function notify(lead: Record<string, string>) {
  const planLabel = PLAN_OPTIONS.find((p) => p.value === lead.plan)?.label ?? lead.plan;
  let delivered = false;

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "novo_orcamento", ...lead, plan_label: planLabel }),
        signal: AbortSignal.timeout(8000),
      });
      delivered ||= r.ok;
    } catch (e) { console.error("[orcamento] webhook falhou:", e); }
  }

  const key = process.env.RESEND_API_KEY, to = process.env.LEADS_NOTIFY_EMAIL;
  if (key && to) {
    const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
    const rows = [
      ["Nome", lead.name], ["Empresa", lead.company], ["Segmento", lead.segment],
      ["WhatsApp", lead.whatsapp], ["E-mail", lead.email], ["Plano", planLabel], ["Projeto", lead.description],
    ].map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666">${k}</td><td style="padding:6px 12px">${esc(v)}</td></tr>`).join("");
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEADS_FROM_EMAIL || "AlphaFlow Digital <onboarding@resend.dev>",
          to: [to],
          reply_to: lead.email,
          subject: `Novo orçamento: ${lead.company} (${planLabel})`,
          html: `<h2>Nova solicitação de orçamento</h2><table>${rows}</table>`,
        }),
        signal: AbortSignal.timeout(8000),
      });
      delivered ||= r.ok;
    } catch (e) { console.error("[orcamento] e-mail falhou:", e); }
  }
  return delivered;
}
