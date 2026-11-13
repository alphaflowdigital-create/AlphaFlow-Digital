// Todo o conteúdo editorial do site fica aqui, separado dos componentes.
import {
  BookOpen, ClipboardList, Compass, Gauge, Globe, LayoutTemplate, Link2, MessageCircle,
  Palette, PenTool, RefreshCcw, Rocket, Search, SearchCheck, Smartphone, Wrench, Zap,
  MonitorSmartphone, Target, Layers, Handshake, CalendarCheck, PackageCheck, type LucideIcon,
} from "lucide-react";

export const NAV = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Planos", href: "/#planos" },
  { label: "Sobre nós", href: "/#sobre" },
  { label: "FAQ", href: "/#faq" },
];

export const POSITIONING: { label: string; icon: LucideIcon }[] = [
  { label: "Design personalizado", icon: Palette },
  { label: "Experiência responsiva", icon: MonitorSmartphone },
  { label: "Desenvolvimento estratégico", icon: Compass },
  { label: "Presença digital profissional", icon: Globe },
  { label: "Foco em conversão", icon: Target },
];

export const PROBLEMS = [
  {
    title: "Sua empresa não possui um site?",
    text: "Tenha um espaço profissional na internet para apresentar seu negócio.",
  },
  {
    title: "Seus clientes não encontram informações facilmente?",
    text: "Organize seus serviços, contatos, localização e diferenciais em um único lugar.",
  },
  {
    title: "Seu negócio precisa transmitir mais credibilidade?",
    text: "Uma presença digital bem construída ajuda a fortalecer a imagem da sua empresa.",
  },
];

export const SERVICES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Sites institucionais", text: "Apresentação completa da sua empresa, serviços, diferenciais e canais de contato em um site sob medida.", icon: Globe },
  { title: "Landing pages", text: "Páginas focadas em um único objetivo: apresentar uma oferta e direcionar o visitante para o contato.", icon: LayoutTemplate },
  { title: "Catálogos digitais", text: "Produtos ou serviços organizados de forma visual, fáceis de navegar e de compartilhar com clientes.", icon: BookOpen },
  { title: "Redesign de sites", text: "Modernização visual e técnica de sites existentes, preservando o que funciona e corrigindo o que não funciona.", icon: RefreshCcw },
  { title: "Otimização de desempenho", text: "Ajustes de carregamento, imagens e código para uma navegação mais rápida em qualquer conexão.", icon: Gauge },
  { title: "SEO básico e avançado", text: "Estrutura técnica, metadados e conteúdo organizados para facilitar a leitura do site pelos mecanismos de busca.", icon: Search },
  { title: "Integrações com WhatsApp", text: "Botões e mensagens prontas que levam o visitante direto para uma conversa com a sua empresa.", icon: MessageCircle },
  { title: "Formulários de captação", text: "Formulários de contato e orçamento com validação, organizados para facilitar o seu atendimento.", icon: ClipboardList },
];

export const DIFFERENTIALS: { title: string; icon: LucideIcon }[] = [
  { title: "Design autoral e personalizado", icon: PenTool },
  { title: "Experiência adaptada a dispositivos móveis", icon: Smartphone },
  { title: "Navegação intuitiva", icon: Compass },
  { title: "Carregamento otimizado", icon: Zap },
  { title: "Estrutura preparada para mecanismos de busca", icon: SearchCheck },
  { title: "Integração com canais de contato", icon: Link2 },
  { title: "Acompanhamento técnico conforme o plano contratado", icon: Wrench },
];

export const STEPS: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Primeiro contato", text: "Entendemos seu negócio, seus objetivos e suas necessidades.", icon: Handshake },
  { title: "Planejamento", text: "Definimos a estrutura, os recursos e a identidade visual do projeto.", icon: Layers },
  { title: "Desenvolvimento", text: "Criamos seu site com design personalizado, responsividade e funcionalidades contratadas.", icon: PenTool },
  { title: "Publicação", text: "Após aprovação, publicamos o projeto e iniciamos o acompanhamento conforme o plano escolhido.", icon: Rocket },
];

export type PortfolioItem = {
  segment: string;
  title: string;
  description: string;
  /** "demo" = projeto demonstrativo; "real" = projeto de cliente (somente quando existir). */
  kind: "demo" | "real";
  variant: "restaurant" | "clinic" | "barber" | "garage";
  /** URL de demonstração navegável. Quando ausente, o card oferece contato. */
  demoUrl?: string;
  /** Captura de tela real (public/portfolio/...). Quando ausente, usa a prévia ilustrada. */
  image?: string;
};

// Projetos demonstrativos: conceitos visuais, NÃO são clientes.
// Para adicionar um projeto real, inclua um item com kind: "real", image e demoUrl.
export const PORTFOLIO: PortfolioItem[] = [
  { segment: "Restaurantes", title: "Cardápio e reservas", description: "Conceito com cardápio organizado por categorias, horários de funcionamento, localização e pedido direto pelo WhatsApp.", kind: "demo", variant: "restaurant" },
  { segment: "Clínicas e consultórios", title: "Especialidades e agendamento", description: "Conceito com apresentação de especialidades, profissionais, convênios e botão de agendamento em destaque.", kind: "demo", variant: "clinic" },
  { segment: "Barbearias e salões", title: "Serviços e estilo", description: "Conceito com tabela de serviços, galeria de trabalhos e agendamento rápido pelo celular.", kind: "demo", variant: "barber" },
  { segment: "Oficinas mecânicas", title: "Serviços e orçamento", description: "Conceito com lista de serviços, diferenciais da oficina, mapa e formulário de orçamento.", kind: "demo", variant: "garage" },
];

export type Plan = {
  id: "alpha_start" | "alpha_business" | "alpha_premium";
  name: string;
  setup: number;
  monthly: number;
  description: string;
  inheritsFrom?: string;
  includes: string[];
  monthlyServices: string[];
  cta: string;
  featured?: boolean;
  pages: string;
};

export const PLANS: Plan[] = [
  {
    id: "alpha_start",
    name: "Alpha Start",
    setup: 600,
    monthly: 149.9,
    pages: "Até 3 páginas",
    description: "Uma solução profissional para pequenos negócios que desejam marcar presença na internet e facilitar o contato com seus clientes.",
    includes: [
      "Site institucional de até 3 páginas",
      "Design moderno e profissional",
      "Layout responsivo",
      "Página inicial com apresentação da empresa",
      "Seção de serviços e diferenciais",
      "Botão de contato pelo WhatsApp",
      "Integração com redes sociais",
      "Formulário de contato",
      "Mapa de localização",
      "Configuração básica de SEO",
      "Publicação e configuração inicial",
    ],
    monthlyServices: ["Hospedagem", "Monitoramento de funcionamento", "Manutenção técnica", "Suporte para eventuais problemas"],
    cta: "Escolher Alpha Start",
  },
  {
    id: "alpha_business",
    name: "Alpha Business",
    setup: 1000,
    monthly: 199.9,
    pages: "Até 6 páginas",
    featured: true,
    description: "Uma solução completa para empresas que desejam transmitir credibilidade, apresentar seus serviços e conquistar novas oportunidades comerciais.",
    inheritsFrom: "Alpha Start",
    includes: [
      "Site institucional de até 6 páginas",
      "Design personalizado conforme a identidade da empresa",
      "Estrutura profissional de apresentação comercial",
      "Seção de diferenciais e vantagens competitivas",
      "Galeria de fotos, projetos e trabalhos realizados",
      "Depoimentos de clientes",
      "Formulário de orçamento",
      "Botões estratégicos de conversão",
      "Integração avançada com WhatsApp",
      "Otimização de velocidade e desempenho",
      "Configuração de SEO para páginas e conteúdos",
      "Integração com Google Maps",
      "Configuração do Google Analytics",
    ],
    monthlyServices: ["Hospedagem", "Monitoramento de funcionamento", "Manutenção técnica preventiva", "Suporte prioritário", "Acompanhamento de desempenho técnico"],
    cta: "Escolher Alpha Business",
  },
  {
    id: "alpha_premium",
    name: "Alpha Premium",
    setup: 1800,
    monthly: 299.9,
    pages: "Até 10 páginas",
    description: "Uma experiência digital completa para empresas que desejam se destacar no mercado, fortalecer sua marca e oferecer uma experiência diferenciada aos visitantes.",
    inheritsFrom: "Alpha Business",
    includes: [
      "Site de até 10 páginas",
      "Design exclusivo e sofisticado",
      "Animações e interações personalizadas",
      "Experiência de navegação avançada",
      "Catálogo digital de produtos ou serviços",
      "Páginas individuais para serviços estratégicos",
      "Seções personalizadas para campanhas comerciais",
      "Formulários avançados de captação",
      "Integrações personalizadas conforme a necessidade",
      "Otimização avançada de SEO",
      "Ferramentas de análise de tráfego",
      "Recursos de segurança",
      "Otimização avançada de desempenho",
      "Estrutura preparada para futuras expansões",
    ],
    monthlyServices: ["Hospedagem de alto desempenho", "Monitoramento contínuo", "Manutenção técnica avançada", "Verificações de segurança", "Suporte prioritário", "Acompanhamento técnico"],
    cta: "Escolher Alpha Premium",
  },
];

export const PLAN_LABEL: Record<Plan["id"], string> = {
  alpha_start: "Alpha Start",
  alpha_business: "Alpha Business",
  alpha_premium: "Alpha Premium",
};

export const ADDONS = [
  { name: "Página adicional", price: "R$ 100 a R$ 150" },
  { name: "Landing page", price: "R$ 350 a R$ 500" },
  { name: "Catálogo digital personalizado", price: "R$ 200 a R$ 350" },
  { name: "Integrações especiais", price: "Sob orçamento" },
  { name: "Redesign de site existente", price: "A partir de R$ 400" },
  { name: "Funcionalidades exclusivas", price: "Sob orçamento" },
];

export const CONDITIONS = [
  "O desenvolvimento é cobrado uma única vez.",
  "A mensalidade começa após a publicação.",
  "Hospedagem, manutenção e suporte estão incluídos conforme o plano.",
  "O domínio é contratado e pago separadamente pelo cliente, quando aplicável.",
  "Funcionalidades adicionais e alterações fora do escopo são orçadas separadamente.",
  "Os planos não incluem produção de conteúdo, gestão de redes sociais ou campanhas de tráfego pago.",
  "Integrações dependem da viabilidade técnica e dos serviços de terceiros.",
];

export const COMMITMENTS: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Comunicação clara", text: "Você sabe o que está sendo feito, o que está incluso no seu plano e o que depende de orçamento separado — sem letras miúdas.", icon: MessageCircle },
  { title: "Planejamento antes do código", text: "Cada projeto começa entendendo o negócio, o público e os objetivos. A estrutura é definida antes de qualquer tela ser desenhada.", icon: CalendarCheck },
  { title: "Entrega com acompanhamento", text: "Após a publicação, o site continua sendo cuidado: hospedagem, manutenção e suporte conforme o plano escolhido.", icon: PackageCheck },
];

/** Depoimentos REAIS de clientes. Mantenha vazio até existirem avaliações verdadeiras. */
export const TESTIMONIALS: { name: string; company: string; segment: string; text: string }[] = [];

export const FAQ = [
  { q: "Quanto tempo demora para desenvolver um site?", a: "O prazo depende da complexidade do projeto, quantidade de páginas e disponibilidade dos materiais necessários. O cronograma será informado durante o planejamento." },
  { q: "Preciso pagar mensalidade?", a: "Sim. A mensalidade corresponde aos serviços de hospedagem, manutenção e suporte previstos no plano contratado." },
  { q: "O site funciona em celulares?", a: "Sim. Todos os projetos são desenvolvidos com layout responsivo, adaptando-se a celulares, tablets e computadores." },
  { q: "Posso solicitar alterações depois da publicação?", a: "Sim. Alterações e ajustes podem ser solicitados. O atendimento e o escopo dependem do plano contratado. Funcionalidades adicionais podem gerar orçamento separado." },
  { q: "Minha empresa precisa ter domínio próprio?", a: "O domínio personalizado é recomendado para fortalecer sua identidade digital. Sua contratação e renovação são de responsabilidade do cliente, quando aplicável." },
];

export const SEGMENTS = [
  "Restaurante ou lanchonete",
  "Clínica ou consultório",
  "Barbearia ou salão",
  "Oficina mecânica",
  "Loja ou comércio",
  "Prestador de serviços",
  "Pequena ou média empresa",
  "Outro",
];

export const PROJECT_STATUS = [
  { id: "aguardando_briefing", label: "Aguardando briefing" },
  { id: "planejamento", label: "Planejamento" },
  { id: "design", label: "Design" },
  { id: "desenvolvimento", label: "Desenvolvimento" },
  { id: "revisao", label: "Revisão do cliente" },
  { id: "publicado", label: "Publicado" },
  { id: "manutencao", label: "Em acompanhamento" },
] as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[number]["id"];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
