# AlphaFlow Digital — Site institucional

Site institucional + área do cliente da **AlphaFlow Digital**, construído com
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase e Lucide.

## Rodar no computador

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. Para gerar a versão de produção: `npm run build` e depois `npm start`.

## O que já funciona sem nenhuma configuração extra

- Site completo (todas as seções), responsivo, com animações leves.
- WhatsApp em todos os botões de contratação, com mensagens personalizadas por plano/serviço.
- Botão flutuante (desktop) e barra fixa de conversão (celular).
- SEO técnico: títulos/descrições únicos, Open Graph, `sitemap.xml`, `robots.txt`, canonical,
  Schema.org (Organization, ProfessionalService com os planos, FAQPage, BreadcrumbList).
- Banner de cookies (LGPD) e Política de Privacidade.
- Páginas `/obrigado`, `/privacidade` e 404 personalizada.

## O que depende de configuração

Copie `.env.example` para `.env.local` (já existe um `.env.local` com o WhatsApp e o Instagram) e preencha:

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio final do site (SEO, sitemap, canonical). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número comercial, só dígitos com DDI+DDD (`5519998353524`). |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Perfil do Instagram. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail público (opcional). |
| `NEXT_PUBLIC_BUSINESS_*` | Cidade, estado, endereço, CEP, CNPJ — só aparecem se preenchidos. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (`G-XXXX`). Só carrega após o visitante aceitar os cookies. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Login, cadastro e área do cliente. |
| `SUPABASE_SERVICE_ROLE_KEY` | Gravar os orçamentos do formulário (apenas no servidor). |
| `RESEND_API_KEY` + `LEADS_NOTIFY_EMAIL` | (Opcional) Receber cada orçamento por e-mail. |
| `LEADS_WEBHOOK_URL` | (Opcional) Enviar cada orçamento para Make/Zapier/n8n/Discord. |

> Depois de alterar o `.env.local`, reinicie o `npm run dev`. Variáveis `NEXT_PUBLIC_*` são
> incorporadas no build: em produção, configure-as na hospedagem **antes** do deploy.

### Formulário de orçamento

O formulário só redireciona para `/obrigado` quando a solicitação foi **realmente** gravada no
Supabase **ou** entregue por e-mail/webhook. Sem nenhum desses destinos configurado, ele mostra um
aviso de que a solicitação não foi registrada e oferece o WhatsApp — nunca finge sucesso.

### Ativar o Supabase (login + área do cliente + orçamentos)

1. Crie um projeto gratuito em https://supabase.com.
2. **SQL Editor → New query**: cole o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**.
   Isso cria as tabelas `profiles`, `projects` e `leads`, com RLS (segurança por linha).
3. **Project Settings → API**: copie `Project URL`, `anon public` e `service_role` para o `.env.local`.
4. **Authentication → URL Configuration**:
   - *Site URL*: `http://localhost:3000` (e depois o domínio final).
   - *Redirect URLs*: adicione `http://localhost:3000/auth/confirm` e `https://SEU-DOMINIO/auth/confirm`.
5. (Recomendado) **Authentication → Emails → SMTP**: configure um SMTP próprio — o envio padrão do Supabase tem limite baixo.
6. Cadastre-se no site em `/cadastro`, confirme o e-mail e torne sua conta administradora no SQL Editor:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'SEU-EMAIL');
   ```
7. Em `/area-do-cliente/admin` você vincula projetos a clientes, altera status/notas e vê os orçamentos recebidos.

**Permissões:** clientes só leem os próprios dados; somente administradores criam e alteram projetos
(regra aplicada no código **e** no banco via RLS). Um cliente não consegue promover a si mesmo a admin.
Senhas são gerenciadas exclusivamente pelo Supabase Auth.

## Estrutura

```
src/
  app/
    (site)/            páginas públicas (início, obrigado, privacidade) com header/footer
    (auth)/            login, cadastro, recuperar-senha, redefinir-senha
    area-do-cliente/   painel, conta, admin (protegidos) + server actions
    auth/confirm/      destino dos links de e-mail (confirmação e recuperação)
    api/orcamento/     recebe o formulário (validação, anti-spam, Supabase, e-mail/webhook)
    sitemap.ts, robots.ts, not-found.tsx, icon.png, apple-icon.png
  components/          header, footer, seções, cards de planos, formulários, área do cliente
  content/site.ts      TODOS os textos, planos, preços, FAQ e portfólio — edite aqui
  lib/                 config, WhatsApp, Supabase, validações
  proxy.ts             renova sessão e protege /area-do-cliente
supabase/schema.sql    banco + RLS
scripts/build-brand-assets.mjs   gera logo transparente, ícones e imagem social a partir da logo original
design-ref/            logo original e referência visual
```

## Atualizações comuns

- **Preços, planos, textos e FAQ:** `src/content/site.ts`.
- **Adicionar um projeto real ao portfólio:** em `PORTFOLIO`, inclua um item com `kind: "real"`,
  `image: "/portfolio/arquivo.webp"` (coloque a imagem em `public/portfolio/`) e `demoUrl`.
- **Depoimentos reais:** preencha `TESTIMONIALS` (com autorização do cliente). A seção aparece sozinha.
- **Logo:** se a logo mudar, substitua `design-ref/logo-original.jpg` e rode `npm run brand`.

## Publicação (sugestão: Vercel)

1. Suba o projeto para um repositório no GitHub.
2. Importe na Vercel, configure as variáveis do `.env.example` e faça o deploy.
3. Aponte o domínio e atualize `NEXT_PUBLIC_SITE_URL` + URLs de redirecionamento no Supabase.
