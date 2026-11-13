import { FAQ, PLANS } from "@/content/site";
import { siteConfig } from "@/lib/config";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON gerado no servidor a partir de dados próprios; "<" escapado por segurança.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Organização + negócio local. Endereço/CNPJ/telefone só entram se configurados. */
export function OrganizationJsonLd() {
  const { url, business, whatsappNumber, instagramUrl, contactEmail } = siteConfig;
  const hasAddress = business.city || business.street;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: siteConfig.name,
        url,
        logo: `${url}/brand/logo-circle-512.png`,
        description: siteConfig.description,
        ...(instagramUrl && { sameAs: [instagramUrl] }),
        ...(contactEmail && { email: contactEmail }),
        ...(business.cnpj && { taxID: business.cnpj }),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#business`,
        name: siteConfig.name,
        url,
        image: `${url}/og-image.png`,
        parentOrganization: { "@id": `${url}/#organization` },
        description: "Criação e desenvolvimento de sites profissionais, landing pages e catálogos digitais para empresas e comércios.",
        priceRange: "R$ 600 – R$ 1.800",
        ...(whatsappNumber && { telephone: `+${whatsappNumber}` }),
        ...(hasAddress && {
          address: {
            "@type": "PostalAddress",
            addressCountry: "BR",
            ...(business.street && { streetAddress: business.street }),
            ...(business.city && { addressLocality: business.city }),
            ...(business.state && { addressRegion: business.state }),
            ...(business.postalCode && { postalCode: business.postalCode }),
          },
        }),
        areaServed: { "@type": "Country", name: "Brasil" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planos de criação de sites",
          itemListElement: PLANS.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.description,
            price: p.setup.toFixed(2),
            priceCurrency: "BRL",
            itemOffered: { "@type": "Service", name: `Desenvolvimento de site — ${p.name}` },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.name,
        inLanguage: "pt-BR",
        publisher: { "@id": `${url}/#organization` },
      },
    ],
  };
  return <Script data={data} />;
}

export function FaqJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${siteConfig.url}${it.path}` })),
      }}
    />
  );
}
