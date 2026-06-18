// Conteúdo central do portfólio (PT). Estrutura pronta para i18n depois.

export type CaseItem = {
  slug: string;
  title: string;
  /** cor de fundo do thumb (fallback) */
  thumb: string;
  /** imagem real do thumb (em public/) */
  image: string;
};

export const CASES: CaseItem[] = [
  { slug: "pastor", title: "PASTOR", thumb: "#0b1220", image: "/cases/pastor.png" },
  { slug: "fttx", title: "FTTX", thumb: "#1e293b", image: "/cases/fttx.png" },
  { slug: "aspen", title: "ASPEN METHOD", thumb: "#0a2540", image: "/cases/aspen.png" },
];

// Texto (title/category/caption) vem de messages/*.json (i18n).
// Aqui só o estrutural: key, código de duração e imagem real (em public/).
//
// ── Receita: ADICIONAR UM SELO ──────────────────────────────────────────────
// 1. Capa → public/stamps/<key>.png (sem hairline escuro nas bordas).
// 2. Conteúdo do clique:
//    · PDF          → arquivo em public/docs/<key>.pdf  + href: "/docs/<key>.pdf"
//    · link externo → href completo (ex.: Issuu)
//    · galeria/modal→ sem href; imagens em public/gallery/<key>/ + gallery: [...]
//      (sem gallery, o modal mostra a capa + placeholders)
//    · botões no modal → links: [{ key, href }] + labels em
//      messages stamps.items.<key>.links.<key> (1º link = botão teal, demais outline)
// 3. Entry abaixo: { key, code (duração, ex. "3M"), image, href? }.
// 4. messages/pt.json + en.json → stamps.items.<key>:
//    { title, category, blurb (≤ ~45 caracteres = 2 linhas no selo 208px), caption }.
// A grade e a animação são genéricas: 1 col (mobile) / 2 (sm+) / 3 (lg+ com 5+).
// ────────────────────────────────────────────────────────────────────────────
export type Stamp = {
  key: string;
  code: string; // duração; "—" enquanto pendente
  image: string;
  /** link externo ou PDF local — quando presente, o clique abre em nova aba (sem modal) */
  href?: string;
  /** modal especial: "pubs" = lista de publicações (HQs); "cordel" = dossiê do game */
  modal?: "pubs" | "cordel";
  /** imagens reais da galeria do modal genérico (em public/) */
  gallery?: string[];
  /** botões de ação do modal genérico (label em messages: items.<key>.links.<key>) */
  links?: { key: string; href: string }[];
};

// Ordem = layout da folha (4 col no desktop): linha 1 = Ilustrações, TCC,
// Página Após Página, Palavras · linha 2 = Mapeando, Cordel, Histórias.
export const STAMPS: Stamp[] = [
  {
    key: "ilustracoes",
    code: "—",
    image: "/stamps/ilustracoes.png",
    href: "https://www.behance.net/jetermegaron",
  },
  { key: "tcc", code: "—", image: "/stamps/tcc.png", href: "/docs/tcc.pdf" },
  { key: "hqs", code: "—", image: "/stamps/hqs.png", modal: "pubs" },
  {
    key: "palavras",
    code: "—",
    image: "/stamps/palavras.png",
    gallery: [
      "/gallery/palavras/animal.webp",
      "/gallery/palavras/mal-algum.webp",
      "/gallery/palavras/maldito.webp",
      "/gallery/palavras/morto.webp",
      "/gallery/palavras/trovao.webp",
    ],
  },
  {
    key: "mapeando",
    code: "—",
    image: "/stamps/mapeando.png",
    href: "https://issuu.com/bdlf/docs/2020_mapeando_sensi_veis",
  },
  { key: "cordel", code: "—", image: "/stamps/cordel.png", modal: "cordel" },
  {
    key: "historias",
    code: "—",
    image: "/stamps/historias.png",
    gallery: ["/gallery/historias/hc-1.webp", "/gallery/historias/hc-2.webp"],
    links: [
      { key: "buy", href: "https://www.amazon.com.br/dp/B0H1SB1KJC" },
      { key: "pdf", href: "/docs/historias-conceito-da-capa.pdf" },
    ],
  },
];

// Publicações do modal "Página Após Página" (texto em messages: stamps.pubs.items.<key>).
// url: link da publicação (PDF em /docs/ ou externo) — botão fica "em breve" até existir.
export type Publication = {
  key: string;
  image: string;
  url?: string;
};

export const PUBLICATIONS: Publication[] = [
  { key: "limiar", image: "/pubs/limiar.png", url: "/docs/limiar.pdf" },
  { key: "linha", image: "/pubs/linha.png", url: "/docs/linha-alternativa-3.pdf" },
  { key: "fruta", image: "/pubs/fruta.png", url: "/docs/fruta-bruta-jan-2021.pdf" },
];
