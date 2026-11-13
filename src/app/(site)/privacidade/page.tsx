import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CookieSettingsButton } from "@/components/layout/CookieConsent";
import { siteConfig, formatPhoneBR } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a AlphaFlow Digital coleta, utiliza e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "/privacidade" },
};

const UPDATED = "13 de novembro de 2026";

export default function PrivacidadePage() {
  const phone = formatPhoneBR(siteConfig.whatsappNumber);
  const contact = [siteConfig.contactEmail && `e-mail ${siteConfig.contactEmail}`, phone && `WhatsApp ${phone}`].filter(Boolean).join(" ou ");

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="container-x max-w-3xl">
        <Breadcrumbs items={[{ name: "Política de Privacidade", path: "/privacidade" }]} />
        <h1 className="text-chrome mt-8 text-4xl font-semibold leading-tight sm:text-5xl">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-mute">Última atualização: {UPDATED}</p>

        <div className="mt-12 space-y-10 leading-relaxed text-soft/85 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:mt-3 [&_ul]:space-y-1.5">
          <section>
            <h2>1. Quem somos</h2>
            <p>
              Esta política descreve como a <strong>AlphaFlow Digital</strong>, empresa de desenvolvimento de sites, trata os dados pessoais
              coletados por este site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
              {siteConfig.business.cnpj && <> CNPJ: {siteConfig.business.cnpj}.</>}
            </p>
          </section>

          <section>
            <h2>2. Dados que coletamos</h2>
            <ul>
              <li><strong>Formulário de orçamento:</strong> nome, nome da empresa, segmento, WhatsApp, e-mail, plano de interesse e descrição do projeto.</li>
              <li><strong>Área do cliente:</strong> nome, e-mail, empresa, telefone e informações do projeto contratado.</li>
              <li><strong>Navegação:</strong> dados técnicos (como tipo de dispositivo e páginas visitadas), somente se você aceitar os cookies de análise.</li>
            </ul>
          </section>

          <section>
            <h2>3. Para que usamos seus dados</h2>
            <ul>
              <li>Responder solicitações de orçamento e entrar em contato sobre o seu projeto (base legal: procedimentos preliminares a contrato e consentimento).</li>
              <li>Prestar os serviços contratados, incluindo acesso à área do cliente, suporte e acompanhamento técnico (base legal: execução de contrato).</li>
              <li>Melhorar o site a partir de estatísticas de uso agregadas (base legal: consentimento).</li>
            </ul>
            <p className="mt-3">Não vendemos nem alugamos seus dados pessoais.</p>
          </section>

          <section>
            <h2>4. Compartilhamento</h2>
            <p>Os dados podem ser processados por fornecedores que viabilizam o funcionamento do site, apenas na medida necessária:</p>
            <ul>
              <li>Hospedagem do site e banco de dados/autenticação (Supabase).</li>
              <li>Serviço de envio de e-mails transacionais, quando utilizado.</li>
              <li>Google Analytics 4, somente após o seu consentimento.</li>
              <li>WhatsApp (Meta), quando você escolhe iniciar uma conversa por ele.</li>
            </ul>
          </section>

          <section>
            <h2>5. Armazenamento e segurança</h2>
            <p>
              Adotamos medidas técnicas para proteger seus dados, como conexões criptografadas (HTTPS), controle de acesso por permissões
              e autenticação segura. As senhas da área do cliente nunca são armazenadas por nós em texto: são gerenciadas pelo provedor de
              autenticação com criptografia. Os dados são mantidos pelo tempo necessário às finalidades descritas ou exigido por lei.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-28">
            <h2>6. Cookies</h2>
            <ul>
              <li><strong>Essenciais:</strong> necessários para o funcionamento do site e para manter a sessão da área do cliente. Não podem ser desativados.</li>
              <li><strong>Análise (opcionais):</strong> Google Analytics 4, carregado apenas se você clicar em “Aceitar”.</li>
            </ul>
            <p className="mt-3">Você pode mudar sua escolha a qualquer momento:</p>
            <div className="mt-4"><CookieSettingsButton /></div>
          </section>

          <section>
            <h2>7. Seus direitos</h2>
            <p>Nos termos da LGPD, você pode solicitar a qualquer momento:</p>
            <ul>
              <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade e informação sobre compartilhamentos;</li>
              <li>Revogação do consentimento.</li>
            </ul>
          </section>

          <section>
            <h2>8. Contato</h2>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta política, fale conosco{contact ? <> pelo {contact}</> : " pelos canais informados no rodapé do site"}.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
