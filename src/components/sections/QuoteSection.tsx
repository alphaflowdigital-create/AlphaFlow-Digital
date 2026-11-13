import { Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink, WA_MESSAGES, hasWhatsapp } from "@/lib/whatsapp";

export function QuoteSection() {
  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            id="orcamento-title"
            eyebrow="Orçamento"
            title="Conte sobre o seu negócio."
            text="Preencha o formulário e a equipe AlphaFlow Digital entra em contato para entender o seu projeto. Sem compromisso."
          />
          <Reveal className="mt-10 space-y-5">
            {[
              { icon: Clock, t: "Retorno pelo canal que você preferir", d: "WhatsApp ou e-mail, conforme os dados informados." },
              { icon: ShieldCheck, t: "Seus dados protegidos", d: "Usados apenas para responder a esta solicitação, conforme a LGPD." },
              { icon: MessageCircle, t: "Prefere conversar agora?", d: "Fale diretamente pelo WhatsApp." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-white/[0.04]"><Icon className="h-4 w-4 text-white" aria-hidden /></span>
                <div><p className="font-medium text-white">{t}</p><p className="mt-0.5 text-sm text-mute">{d}</p></div>
              </div>
            ))}
            {hasWhatsapp && (
              <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-2">
                <WhatsAppIcon className="h-4 w-4" /> Conversar pelo WhatsApp
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={120} className="card p-6 sm:p-8">
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
