// Configurações públicas centralizadas. Nenhum dado comercial é inventado:
// tudo que não estiver preenchido no .env simplesmente não é exibido.

const clean = (v?: string) => (v && v.trim() ? v.trim() : undefined);

export const siteConfig = {
  name: "AlphaFlow Digital",
  shortName: "AlphaFlow",
  tagline: "Tecnologia, criatividade e estratégia para transformar sua presença digital.",
  description:
    "Criação de sites profissionais, landing pages e catálogos digitais para empresas e negócios locais. Design personalizado, layout responsivo e SEO técnico.",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "pt_BR",
  whatsappNumber: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, ""),
  instagramUrl: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  contactEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  gaId: clean(process.env.NEXT_PUBLIC_GA_ID),
  business: {
    city: clean(process.env.NEXT_PUBLIC_BUSINESS_CITY),
    state: clean(process.env.NEXT_PUBLIC_BUSINESS_STATE),
    street: clean(process.env.NEXT_PUBLIC_BUSINESS_STREET),
    postalCode: clean(process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE),
    cnpj: clean(process.env.NEXT_PUBLIC_BUSINESS_CNPJ),
  },
};

export function formatPhoneBR(num?: string) {
  if (!num) return undefined;
  const local = num.startsWith("55") ? num.slice(2) : num;
  const m = local.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : num;
}
