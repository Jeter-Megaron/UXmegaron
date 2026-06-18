// Conteúdo completo das páginas de case, bilíngue (PT + EN).
// Números internos PASTOR/FTTX liberados pelo Jéter para publicação (jun/2026).

export type Meta = { label: string; value: string };
export type Stat = { value: string; label: string };
export type Card = { title: string; desc: string };

export type CaseDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  impact: string;
  meta: Meta[];
  context: string;
  did: {
    heading: string;
    intro: string;
    bullets?: string[];
    bulletsHeading?: string;
    cards?: Card[];
    cardsHeading?: string;
    quote?: string;
  };
  results: {
    heading: string;
    stats: Stat[];
    note: string;
  };
  screens: string[];
  next: { slug: string; title: string };
};

const casesPT: Record<string, CaseDetail> = {
  pastor: {
    slug: "pastor",
    eyebrow: "CASE · UX · PESQUISA",
    title: "PASTOR",
    impact:
      "Reestruturei, com pesquisa, o sistema que ~100 colaboradores usam para monitorar a rede GPON. O redesenho foi guiado por 41 usuários reais e validação contínua com o cliente.",
    meta: [
      { label: "PAPEL", value: "Product Designer (único)" },
      { label: "DURAÇÃO", value: "8 meses até o MVP" },
      { label: "DOMÍNIO", value: "Monitoramento de rede GPON" },
      { label: "FERRAMENTAS", value: "Figma · pesquisa" },
    ],
    context:
      "O sistema antigo de monitoramento era confuso e os dados nem sempre confiáveis. Mesmo assim, cerca de 100 colaboradores internos dependiam dele: analistas de monitoramento, líderes de suporte técnico e operadores que precisavam detectar rompimentos de fibra e problemas de sinal e agir antes que o cliente sentisse a queda.",
    did: {
      heading: "Dois ciclos: validar antes de escalar",
      intro:
        "Priorizei um MVP porque o objetivo era validar as hipóteses com público real e gerar valor desde o início. Expandir vem depois. Cada decisão de interface nasceu de uma dor observada.",
      cards: [
        {
          title: "Ciclo 1: Descoberta + MVP",
          desc: "Entendi o sistema antigo, o mercado e as dores reais. Depois defini um MVP focado no essencial (monitoramento e alertas) e cheguei a um protótipo de alta fidelidade validado com o cliente.",
        },
        {
          title: "Ciclo 2: Usuários reais",
          desc: "Liberei acesso para uso real e ajustei pelo feedback. Uma pesquisa com 41 usuários e um grupo focal com usuários-chave guiaram os ajustes.",
        },
      ],
    },
    results: {
      heading: "O impacto",
      stats: [
        { value: "98,06%", label: "assertividade na detecção (agregação)" },
        { value: "99,72%", label: "assertividade na detecção (individual)" },
        { value: "< 1 min", label: "para processar e entregar, com ingestão a cada 15 min" },
        { value: "26.922", label: "clientes atendidos via chamados (Mai–Ago/2025)" },
      ],
      note: "Fonte: relatório de resultados do projeto Pastor (Brisanet).",
    },
    screens: ["/cases/pastor-1.png"],
    next: { slug: "fttx", title: "FTTX" },
  },

  fttx: {
    slug: "fttx",
    eyebrow: "CASE · UX · APP DE CAMPO",
    title: "FTTX",
    impact:
      "Reformulei o app que técnicos de fibra usam ~8h por dia. De uma ferramenta cheia de travamentos para uma operação mais rápida, segura e acessível.",
    meta: [
      { label: "PAPEL", value: "Product Designer (único)" },
      { label: "DURAÇÃO", value: "6 meses" },
      { label: "DOMÍNIO", value: "Fibra óptica · campo" },
      { label: "FERRAMENTAS", value: "Figma · Miro · Maze · Jira" },
    ],
    context:
      "FTTX (Fiber to the X) é o sistema de planejamento, monitoramento e gestão do cabeamento de fibra óptica. O app interno que os técnicos usam em campo acumulava erros, travamentos e funcionalidades mal projetadas. E era usado durante toda a jornada, 7–8h por dia. Eu precisava resolver gestão de equipamentos, segurança e a jornada de trabalho.",
    did: {
      heading: "Pesquisa antes de desenhar",
      intro:
        "Escolhi uma pesquisa quantitativa porque os técnicos são geograficamente dispersos e eu precisava de volume rápido. Em uma semana, 71 respostas mostraram onde mais doía.",
      bullets: [
        "~75% usavam o sistema 7–8h por dia, a jornada inteira.",
        "~13% relataram deficiência visual (miopia/astigmatismo). O sistema não tinha nenhum recurso de acessibilidade.",
        "Erros, travamentos e bugs eram a frustração nº 1.",
        "Faltava um modo offline para áreas sem cobertura.",
      ],
      cardsHeading: "Prioridade: impacto × esforço (Quick Wins)",
      cards: [
        { title: "Modo offline", desc: "Operar sem internet em áreas de cobertura ruim." },
        { title: "Acessibilidade", desc: "Contraste, tamanho de fonte e ícones, pensados para os 13%." },
        { title: "Estabilização", desc: "Correção dos bugs e travamentos críticos." },
        { title: "Simplificação", desc: "Menus, visibilidade de botões e fluxos mais claros." },
      ],
      quote:
        "Na refatoração, evitei grandes mudanças estruturais para não impor curva de aprendizado a quem usa o app 8h por dia. Ajustei os fluxos existentes para o técnico reconhecer o caminho.",
    },
    results: {
      heading: "O que mudou",
      stats: [
        { value: "71", label: "respostas guiaram as decisões" },
        { value: "4", label: "Quick Wins entregues" },
        { value: "Offline", label: "principal pedido, viabilizado" },
        { value: "Em uso", label: "pelos técnicos, em campo" },
      ],
      note: "Não tenho métrica numérica de impacto, e tudo bem ser honesto: o resultado é a adoção. O app reformulado entrou em produção e hoje é a ferramenta do dia a dia dos técnicos, com acessibilidade, modo offline e mais estabilidade.",
    },
    screens: ["/cases/fttx-1.png"],
    next: { slug: "aspen", title: "ASPEN METHOD" },
  },

  aspen: {
    slug: "aspen",
    eyebrow: "CASE · PRODUTO · EDUCAÇÃO",
    title: "ASPEN METHOD",
    impact:
      "Desenhei, sozinho e em até 3 meses, o produto que ajuda professores a resolver problemas com base em heurísticas. Hoje está em uso em universidades, incluindo a Universidade do Porto.",
    meta: [
      { label: "PAPEL", value: "Product Designer (único)" },
      { label: "DURAÇÃO", value: "Até 3 meses" },
      { label: "DOMÍNIO", value: "Educação · ensino superior" },
      { label: "TIPO", value: "Produto web · UX+UI" },
    ],
    context:
      "O ASPEN METHOD é um sistema de suporte educacional: ajuda professores a diagnosticar e resolver problemas de ensino com base em heurísticas. É um produto web completo, da autenticação à gestão de instituições e turmas, com a análise heurística no centro.",
    did: {
      heading: "Um produto inteiro, ponta a ponta",
      intro:
        "Fui o único designer. Em até 3 meses desenhei todos os fluxos: autenticação, gestão e o núcleo de análise. A prioridade era o professor chegar rápido ao que importa, resolver o problema.",
      cards: [
        { title: "Produto completo", desc: "Da autenticação à gestão de instituições e turmas. Todos os fluxos desenhados." },
        { title: "Núcleo: análise por heurísticas", desc: "O fluxo principal guia o professor do problema ao resultado, passo a passo." },
        { title: "Multi-instituição", desc: "Estrutura para várias instituições e turmas, com histórico de ações." },
      ],
      quote:
        "Tratei o fluxo de análise como o coração do produto. Tudo o mais, gestão e histórico, existe para sustentar esse momento.",
    },
    results: {
      heading: "Onde chegou",
      stats: [
        { value: "Em produção", label: "rodando hoje em universidades" },
        { value: "Univ. do Porto", label: "adoção internacional (Portugal)" },
        { value: "Completo", label: "auth → gestão → análise, sozinho" },
        { value: "Até 3 meses", label: "do zero ao produto" },
      ],
      note: "Sem métricas numéricas, mas o resultado fala por si: o ASPEN METHOD está em uso real em diversas universidades, incluindo a Universidade do Porto.",
    },
    screens: [
      "/cases/aspen-1.png",
      "/cases/aspen-2.png",
      "/cases/aspen-3.png",
      "/cases/aspen-4.png",
    ],
    next: { slug: "pastor", title: "PASTOR" },
  },
};

const casesEN: Record<string, CaseDetail> = {
  pastor: {
    slug: "pastor",
    eyebrow: "CASE · UX · RESEARCH",
    title: "PASTOR",
    impact:
      "With research, I rebuilt the system that ~100 employees use to monitor the GPON network. The redesign was guided by 41 real users and continuous validation with the client.",
    meta: [
      { label: "ROLE", value: "Product Designer (solo)" },
      { label: "DURATION", value: "8 months to MVP" },
      { label: "DOMAIN", value: "GPON network monitoring" },
      { label: "TOOLS", value: "Figma · research" },
    ],
    context:
      "The old monitoring system was confusing and the data was not always reliable. Even so, around 100 internal employees depended on it: monitoring analysts, technical support leads and operators who needed to spot fiber cuts and signal problems and act before the customer felt the drop.",
    did: {
      heading: "Two cycles: validate before scaling",
      intro:
        "I prioritized an MVP because the goal was to validate the hypotheses with real users and deliver value from the start. Scaling comes later. Every interface decision came from an observed pain point.",
      cards: [
        {
          title: "Cycle 1: Discovery + MVP",
          desc: "I studied the old system, the market and the real pain points. Then I defined an MVP focused on the essentials (monitoring and alerts) and reached a high-fidelity prototype validated with the client.",
        },
        {
          title: "Cycle 2: Real users",
          desc: "I released access for real use and adjusted based on feedback. A survey with 41 users and a focus group with key users guided the changes.",
        },
      ],
    },
    results: {
      heading: "The impact",
      stats: [
        { value: "98.06%", label: "detection accuracy (aggregated)" },
        { value: "99.72%", label: "detection accuracy (individual)" },
        { value: "< 1 min", label: "to process and deliver, with ingestion every 15 min" },
        { value: "26,922", label: "customers served via tickets (May–Aug 2025)" },
      ],
      note: "Source: results report from the Pastor project (Brisanet).",
    },
    screens: ["/cases/pastor-1.png"],
    next: { slug: "fttx", title: "FTTX" },
  },

  fttx: {
    slug: "fttx",
    eyebrow: "CASE · UX · FIELD APP",
    title: "FTTX",
    impact:
      "I reworked the app that fiber technicians use ~8h a day. From a tool full of freezes to a faster, safer and more accessible operation.",
    meta: [
      { label: "ROLE", value: "Product Designer (solo)" },
      { label: "DURATION", value: "6 months" },
      { label: "DOMAIN", value: "Fiber optics · field" },
      { label: "TOOLS", value: "Figma · Miro · Maze · Jira" },
    ],
    context:
      "FTTX (Fiber to the X) is the system for planning, monitoring and managing fiber-optic cabling. The internal app technicians use in the field piled up errors, freezes and poorly designed features. And it was used throughout the whole shift, 7–8h a day. I needed to solve equipment management, safety and the work routine.",
    did: {
      heading: "Research before designing",
      intro:
        "I chose a quantitative survey because the technicians are geographically dispersed and I needed volume fast. In one week, 71 responses showed where it hurt most.",
      bullets: [
        "~75% used the system 7–8h a day, the whole shift.",
        "~13% reported visual impairment (myopia/astigmatism). The system had no accessibility features at all.",
        "Errors, freezes and bugs were the number one frustration.",
        "An offline mode for areas without coverage was missing.",
      ],
      cardsHeading: "Priority: impact × effort (Quick Wins)",
      cards: [
        { title: "Offline mode", desc: "Work without internet in poor-coverage areas." },
        { title: "Accessibility", desc: "Contrast, font size and icons, designed for the 13%." },
        { title: "Stabilization", desc: "Fixing the critical bugs and freezes." },
        { title: "Simplification", desc: "Clearer menus, button visibility and flows." },
      ],
      quote:
        "In the rework, I avoided big structural changes so I would not impose a learning curve on someone who uses the app 8h a day. I adjusted the existing flows so the technician would recognize the path.",
    },
    results: {
      heading: "What changed",
      stats: [
        { value: "71", label: "responses guided the decisions" },
        { value: "4", label: "Quick Wins delivered" },
        { value: "Offline", label: "the top request, made possible" },
        { value: "In use", label: "by technicians, in the field" },
      ],
      note: "I don't have a numeric impact metric, and it's fine to be honest: the result is adoption. The reworked app went into production and today it's the technicians' day-to-day tool, with accessibility, offline mode and more stability.",
    },
    screens: ["/cases/fttx-1.png"],
    next: { slug: "aspen", title: "ASPEN METHOD" },
  },

  aspen: {
    slug: "aspen",
    eyebrow: "CASE · PRODUCT · EDUCATION",
    title: "ASPEN METHOD",
    impact:
      "On my own and in under 3 months, I designed the product that helps teachers solve problems based on heuristics. Today it's in use at universities, including the University of Porto.",
    meta: [
      { label: "ROLE", value: "Product Designer (solo)" },
      { label: "DURATION", value: "Under 3 months" },
      { label: "DOMAIN", value: "Education · higher education" },
      { label: "TYPE", value: "Web product · UX+UI" },
    ],
    context:
      "ASPEN METHOD is an educational support system: it helps teachers diagnose and solve teaching problems based on heuristics. It's a complete web product, from authentication to managing institutions and classes, with heuristic analysis at the center.",
    did: {
      heading: "A whole product, end to end",
      intro:
        "I was the only designer. In under 3 months I designed every flow: authentication, management and the analysis core. The priority was getting the teacher quickly to what matters, solving the problem.",
      cards: [
        { title: "Complete product", desc: "From authentication to managing institutions and classes. Every flow designed." },
        { title: "Core: heuristic analysis", desc: "The main flow guides the teacher from problem to result, step by step." },
        { title: "Multi-institution", desc: "Structure for several institutions and classes, with an action history." },
      ],
      quote:
        "I treated the analysis flow as the heart of the product. Everything else, management and history, exists to support that moment.",
    },
    results: {
      heading: "Where it landed",
      stats: [
        { value: "In production", label: "running today at universities" },
        { value: "Univ. of Porto", label: "international adoption (Portugal)" },
        { value: "Complete", label: "auth → management → analysis, solo" },
        { value: "Under 3 months", label: "from zero to product" },
      ],
      note: "No numeric metrics, but the result speaks for itself: ASPEN METHOD is in real use at several universities, including the University of Porto.",
    },
    screens: [
      "/cases/aspen-1.png",
      "/cases/aspen-2.png",
      "/cases/aspen-3.png",
      "/cases/aspen-4.png",
    ],
    next: { slug: "pastor", title: "PASTOR" },
  },
};

export function getCaseDetail(slug: string, locale: string): CaseDetail | undefined {
  const set = locale === "en" ? casesEN : casesPT;
  return set[slug];
}
