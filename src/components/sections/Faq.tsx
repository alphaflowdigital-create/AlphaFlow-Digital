"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "@/content/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="text-chrome mt-5 text-[2rem] font-semibold leading-[1.05] sm:text-5xl">
            Suas dúvidas, respondidas.
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-mute">
            Não encontrou o que procurava?{" "}
            <a href={whatsappLink(WA_MESSAGES.conversa)} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:no-underline">
              Fale com a gente pelo WhatsApp
            </a>.
          </p>
        </div>

        <ul className="space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${base}-q${i}`, panelId = `${base}-a${i}`;
            return (
              <li key={item.q} className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${isOpen ? "border-white bg-white text-ink-950" : "border-line bg-ink-950/60 text-white hover:border-line-strong"}`}>
                <h3 className="text-base sm:text-lg">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold sm:px-6"
                  >
                    {item.q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${isOpen ? "rotate-45 bg-ink-950 text-white" : "bg-white/10"}`}>
                      <Plus className="h-4 w-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="px-5 pb-6 leading-relaxed text-ink-950/70 sm:px-6">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
