"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { SEGMENTS } from "@/content/site";
import { maskPhone, PLAN_OPTIONS, validateLead, type LeadErrors, type LeadInput } from "@/lib/lead";
import { whatsappLink, WA_MESSAGES, hasWhatsapp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const EMPTY: LeadInput = { name: "", company: "", segment: "", whatsapp: "", email: "", plan: "", description: "", consent: false };

export function QuoteForm() {
  const router = useRouter();
  const [data, setData] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [hp, setHp] = useState(""); // honeypot anti-spam

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const errs = validateLead(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: hp }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: LeadErrors };
      if (res.ok && json.ok) {
        router.push("/obrigado");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerMsg(json.error ?? "Não foi possível enviar sua solicitação agora.");
      setStatus("error");
    } catch {
      setServerMsg("Falha de conexão. Verifique sua internet e tente novamente.");
      setStatus("error");
    }
  }

  const fieldProps = (k: keyof LeadInput) => ({
    id: `lead-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `lead-${k}-err` : undefined,
  });
  const Err = ({ k }: { k: keyof LeadInput }) =>
    errors[k] ? <p id={`lead-${k}-err`} className="field-error" role="alert">{errors[k]}</p> : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-describedby="lead-status">
      <div>
        <label htmlFor="lead-name" className="label">Nome *</label>
        <input {...fieldProps("name")} className="field" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Seu nome" />
        <Err k="name" />
      </div>
      <div>
        <label htmlFor="lead-company" className="label">Nome da empresa *</label>
        <input {...fieldProps("company")} className="field" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} placeholder="Nome do seu negócio" />
        <Err k="company" />
      </div>
      <div>
        <label htmlFor="lead-segment" className="label">Segmento *</label>
        <select {...fieldProps("segment")} className="field" value={data.segment} onChange={(e) => set("segment", e.target.value)}>
          <option value="" disabled>Selecione</option>
          {SEGMENTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <Err k="segment" />
      </div>
      <div>
        <label htmlFor="lead-whatsapp" className="label">WhatsApp *</label>
        <input {...fieldProps("whatsapp")} className="field" type="tel" inputMode="tel" autoComplete="tel-national" value={data.whatsapp} onChange={(e) => set("whatsapp", maskPhone(e.target.value))} placeholder="(00) 00000-0000" />
        <Err k="whatsapp" />
      </div>
      <div>
        <label htmlFor="lead-email" className="label">E-mail *</label>
        <input {...fieldProps("email")} className="field" type="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="voce@empresa.com.br" />
        <Err k="email" />
      </div>
      <div>
        <label htmlFor="lead-plan" className="label">Plano de interesse *</label>
        <select {...fieldProps("plan")} className="field" value={data.plan} onChange={(e) => set("plan", e.target.value)}>
          <option value="" disabled>Selecione</option>
          {PLAN_OPTIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <Err k="plan" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="lead-description" className="label">Descrição do projeto *</label>
        <textarea {...fieldProps("description")} className="field min-h-32 resize-y" maxLength={2000} value={data.description} onChange={(e) => set("description", e.target.value)} placeholder="Conte sobre seu negócio, o que espera do site e se já possui domínio, logo ou fotos." />
        <div className="flex justify-between"><Err k="description" /><span className="ml-auto mt-1.5 text-xs text-mute">{data.description.length}/2000</span></div>
      </div>

      {/* honeypot: invisível para pessoas, preenchido por robôs */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Não preencha</label>
        <input id="lead-website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mute">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-white"
          />
          <span>
            Concordo com o uso dos meus dados para retorno sobre esta solicitação, conforme a{" "}
            <Link href="/privacidade" className="text-white underline underline-offset-4">Política de Privacidade</Link>.
          </span>
        </label>
        <Err k="consent" />
      </div>

      <div id="lead-status" aria-live="polite" className="sm:col-span-2">
        {status === "error" && (
          <div className="flex flex-col gap-3 rounded-xl border border-[#ff8a8a]/40 bg-[#ff6b6b]/[0.07] p-4 text-sm text-soft sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a8a]" aria-hidden /> <span>{serverMsg} Sua solicitação <strong>não</strong> foi registrada.{hasWhatsapp ? " Você pode enviá-la pelo WhatsApp." : ""}</span></p>
            {hasWhatsapp && (
              <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm shrink-0">
                <WhatsAppIcon className="h-4 w-4" /> Enviar pelo WhatsApp
              </a>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary h-12 px-7" disabled={status === "sending"}>
          {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…</> : <>Enviar solicitação <ArrowRight className="h-4 w-4" aria-hidden /></>}
        </button>
        <p className="text-xs text-mute">* Campos obrigatórios. Sem compromisso.</p>
      </div>
    </form>
  );
}
