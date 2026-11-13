import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

/** Botão flutuante (desktop) + barra fixa de conversão (celular). */
export function WhatsAppFloat() {
  const href = whatsappLink(WA_MESSAGES.conversa);
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-white text-ink-950 shadow-[0_10px_40px_-6px_rgba(255,255,255,0.35)] transition-transform hover:scale-105 lg:grid"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-line bg-ink-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          Fale com a AlphaFlow
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-950/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Link href="/#planos" className="btn btn-ghost btn-sm h-11 flex-1">Ver planos</Link>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm h-11 flex-[1.4]">
            <WhatsAppIcon className="h-4 w-4" /> Solicitar orçamento
          </a>
        </div>
      </div>
    </>
  );
}
