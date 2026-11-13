import { siteConfig } from "./config";

export const WA_MESSAGES = {
  orcamento: "Olá! Gostaria de solicitar um orçamento para desenvolver o site da minha empresa.",
  conversa: "Olá! Vim pelo site da AlphaFlow Digital e gostaria de conversar sobre um projeto.",
  suporte: "Olá! Sou cliente da AlphaFlow Digital e preciso de suporte no meu projeto.",
  plano: (plan: string) =>
    `Olá! Tenho interesse no plano ${plan} da AlphaFlow Digital. Gostaria de saber mais.`,
  adicional: (service: string) =>
    `Olá! Gostaria de saber mais sobre o serviço adicional "${service}" da AlphaFlow Digital.`,
  portfolio: (segment: string) =>
    `Olá! Vi o projeto demonstrativo para ${segment} no site da AlphaFlow Digital e gostaria de algo parecido para o meu negócio.`,
} as const;

/**
 * Link do WhatsApp com mensagem personalizada. Se o número não estiver
 * configurado, retorna a âncora do formulário de orçamento — nunca um link quebrado.
 */
export function whatsappLink(message: string = WA_MESSAGES.orcamento) {
  if (!siteConfig.whatsappNumber) return "/#orcamento";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const hasWhatsapp = Boolean(siteConfig.whatsappNumber);
