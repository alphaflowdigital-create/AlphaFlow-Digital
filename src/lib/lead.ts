// Validação compartilhada entre o formulário (navegador) e a API (servidor).

export const PLAN_OPTIONS = [
  { value: "alpha_start", label: "Alpha Start" },
  { value: "alpha_business", label: "Alpha Business" },
  { value: "alpha_premium", label: "Alpha Premium" },
  { value: "nao_sei", label: "Ainda não sei — quero orientação" },
] as const;

export type LeadInput = {
  name: string;
  company: string;
  segment: string;
  whatsapp: string;
  email: string;
  plan: string;
  description: string;
  consent: boolean;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizePhone(v: string) {
  return v.replace(/\D/g, "");
}

export function maskPhone(v: string) {
  const d = normalizePhone(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validateLead(input: LeadInput): LeadErrors {
  const e: LeadErrors = {};
  if (input.name.trim().length < 2) e.name = "Informe seu nome.";
  if (input.company.trim().length < 2) e.company = "Informe o nome da empresa.";
  if (!input.segment) e.segment = "Selecione o segmento.";
  const phone = normalizePhone(input.whatsapp);
  if (phone.length < 10 || phone.length > 13) e.whatsapp = "Informe um WhatsApp válido com DDD.";
  if (!EMAIL_RE.test(input.email.trim())) e.email = "Informe um e-mail válido.";
  if (!PLAN_OPTIONS.some((p) => p.value === input.plan)) e.plan = "Selecione um plano de interesse.";
  const len = input.description.trim().length;
  if (len < 10) e.description = "Conte um pouco sobre o projeto (mínimo de 10 caracteres).";
  else if (len > 2000) e.description = "A descrição deve ter no máximo 2000 caracteres.";
  if (!input.consent) e.consent = "É necessário concordar com a política de privacidade.";
  if (input.name.length > 120) e.name = "Nome muito longo.";
  if (input.company.length > 160) e.company = "Nome muito longo.";
  if (input.email.length > 200) e.email = "E-mail muito longo.";
  return e;
}
