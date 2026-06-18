"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { STAMPS } from "@/content";
import PublicationsModal from "@/components/PublicationsModal";
import CordelModal from "@/components/CordelModal";

const COL_STEP = 208; // largura do selo (188) + gap (20)
const ROW_STEP = 270; // altura do selo (250) + gap (20)

// Nº de colunas da folha conforme o viewport (4 no desktop só com 5+ selos).
function useColumns(count: number) {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () =>
      setCols(lg.matches && count >= 5 ? 4 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, [count]);
  return cols;
}

// Progresso em que todos os selos chegam à posição final — o restante do scrub
// (até o pin soltar) é a "pausa" que garante a folha completa antes da próxima seção.
const SETTLE = 0.6;

// Animação atrelada ao progresso do scroll (scrub): cada selo emerge do CENTRO
// da folha até sua posição na grade — genérico p/ N selos e qualquer nº de colunas
// (deslocamento limitado a meio passo, p/ não exagerar no mobile de 1 coluna).
function ScrollStamp({
  progress,
  index,
  cols,
  count,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  cols: number;
  count: number;
  children: React.ReactNode;
}) {
  // último selo sozinho na fileira (count % cols === 1) é centralizado no grid
  const orphan = cols > 1 && index === count - 1 && count % cols === 1;
  const col = orphan ? (cols - 1) / 2 : index % cols;
  const row = Math.floor(index / cols);
  const rows = Math.ceil(count / cols);
  const half = (v: number) => Math.max(-0.5, Math.min(0.5, v));
  const fromX = half((cols - 1) / 2 - col) * COL_STEP;
  const fromY = half((rows - 1) / 2 - row) * ROW_STEP;
  const x = useTransform(progress, [0, SETTLE], [fromX, 0]);
  const y = useTransform(progress, [0, SETTLE], [fromY, 0]);
  const opacity = useTransform(progress, [0, 0.25, SETTLE], [0, 0.6, 1]);
  const scale = useTransform(progress, [0, SETTLE], [0.8, 1]);
  return <motion.div style={{ x, y, opacity, scale }}>{children}</motion.div>;
}

// Proporções do protótipo (Figma 11:2, selo 316×420) reduzidas p/ 188×250 —
// folha de 4 colunas no desktop. Imagem em object-contain sobre branco,
// legenda curta itálica, [ CATEGORIA ] + código teal.
const STAMP_CLASS =
  "stamp-perf group flex h-[250px] w-[188px] max-w-full flex-col bg-white p-[17px] text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal";

function Stamp({
  onClick,
  href,
  title,
  blurb,
  category,
  code,
  image,
}: {
  onClick?: () => void;
  /** link externo: abre em nova aba em vez do modal */
  href?: string;
  title: string;
  blurb: string;
  category: string;
  code: string;
  image: string;
}) {
  const inner = (
    <>
      <div className="h-[135px] w-full shrink-0 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="h-full w-full object-contain" />
      </div>
      <h3 className="mt-2 font-serif text-[14px] leading-tight text-ink">{title}</h3>
      <p className="mt-1 font-serif text-[10.5px] italic leading-snug text-muted">
        {blurb}
      </p>
      {/* mt-auto ancora no rodapé — absorve a variação de linhas da legenda */}
      <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
        <span className="whitespace-nowrap text-[8px] font-semibold tracking-[0.08em] text-teal-700">
          [ {category} ]
        </span>
        <span className="shrink-0 font-serif text-[17px] font-bold leading-none text-teal-700">
          {code}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={STAMP_CLASS}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={STAMP_CLASS}>
      {inner}
    </button>
  );
}

export default function StampGallery() {
  const t = useTranslations("stamps");
  const [open, setOpen] = useState<number | null>(null);
  // imagem da galeria expandida (lightbox sobre o modal)
  const [zoom, setZoom] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const cols = useColumns(STAMPS.length);

  // progresso: 0 quando o wrapper encosta no rodapé da viewport, 1 quando o
  // wrapper termina (= momento em que o pin solta). Os selos assentam em SETTLE;
  // o trecho final é retenção: a próxima seção só chega com a folha completa.
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start end", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // Esc fecha primeiro o lightbox; só depois o modal
        if (zoom !== null) setZoom(null);
        else setOpen(null);
      }
    }
    if (open !== null) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, zoom]);

  // trocar/fechar o modal descarta o lightbox
  useEffect(() => {
    setZoom(null);
  }, [open]);

  const stamp = open !== null ? STAMPS[open] : null;

  function scrollBy(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  return (
    <>
      {/* trava de scroll (lg+): wrapper mais alto que a tela + folha sticky.
          A próxima seção só fica alcançável quando o wrapper acaba (pin solta),
          já com a folha completa (SETTLE < 1). Mobile/tablet seguem fluxo normal
          (folha mais alta que a viewport, pin não se aplica). */}
      <div ref={pinRef} className={reduce ? undefined : "lg:h-[130vh]"}>
        <div
          className={
            reduce
              ? undefined
              : "lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center"
          }
        >
          {/* folha de selos: 1 col (mobile) / 2 (sm+) / 4 no lg+ com 5+ selos */}
          <div
            className={`mx-auto grid w-fit grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 ${
              STAMPS.length >= 5 ? "lg:grid-cols-4" : ""
            }`}
          >
        {STAMPS.map((s, i) => {
          const stamp = (
            <Stamp
              title={t(`items.${s.key}.title`)}
              blurb={t(`items.${s.key}.blurb`)}
              category={t(`items.${s.key}.category`)}
              code={s.code}
              image={s.image}
              href={s.href}
              onClick={s.href ? undefined : () => setOpen(i)}
            />
          );
          // última fileira incompleta com 1 selo → centraliza na folha
          const orphan =
            cols > 1 && i === STAMPS.length - 1 && STAMPS.length % cols === 1;
          const place = orphan
            ? cols === 3
              ? { gridColumnStart: 2 }
              : { gridColumn: "1 / -1", justifySelf: "center" as const }
            : undefined;
          return (
            <div key={s.key} style={place}>
              {reduce ? (
                stamp
              ) : (
                <ScrollStamp
                  progress={progress}
                  index={i}
                  cols={cols}
                  count={STAMPS.length}
                >
                  {stamp}
                </ScrollStamp>
              )}
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {stamp && stamp.modal === "pubs" && (
        <PublicationsModal onClose={() => setOpen(null)} />
      )}

      {stamp && stamp.modal === "cordel" && (
        <CordelModal onClose={() => setOpen(null)} />
      )}

      {stamp && !stamp.modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-[720px] rounded-2xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.3em] text-teal-700">
                  {t("modalKicker")}
                </span>
                <h3 className="font-serif text-2xl text-ink">{t(`items.${stamp.key}.title`)}</h3>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="×"
                className="grid h-9 w-9 place-items-center rounded-full bg-tint text-muted hover:bg-border"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {t(`items.${stamp.key}.caption`)}
            </p>

            {/* botões de ação (compra, PDF…) — 1º em destaque, demais outline */}
            {stamp.links && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {stamp.links.map((l, i) => (
                  <a
                    key={l.key}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      i === 0
                        ? "rounded-lg bg-teal px-3.5 py-2 text-xs font-semibold text-dark transition-colors hover:bg-teal-300"
                        : "rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-tint"
                    }
                  >
                    {t(`items.${stamp.key}.links.${l.key}`)}
                  </a>
                ))}
              </div>
            )}

            <div className="relative mt-5">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x"
              >
                {(stamp.gallery ?? [stamp.image]).map((src) => (
                  <button
                    key={src}
                    onClick={() => setZoom(src)}
                    aria-label={`${t(`items.${stamp.key}.title`)}, ${t("imageLabel")}`}
                    className="snap-start shrink-0 h-[240px] w-auto cursor-zoom-in transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-auto object-contain" />
                  </button>
                ))}
                {/* sem galeria real ainda → completa com placeholders */}
                {!stamp.gallery &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="snap-start shrink-0 grid h-[240px] w-[208px] place-items-center rounded-lg border border-border bg-tint text-sm text-muted"
                    >
                      {t("imageLabel")} {i + 2}
                    </div>
                  ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button onClick={() => scrollBy(-1)} aria-label="‹" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink hover:bg-tint">‹</button>
                <span className="text-xs text-muted">{t("dragHint")}</span>
                <button onClick={() => scrollBy(1)} aria-label="›" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink hover:bg-tint">›</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* lightbox: imagem da galeria expandida acima do modal */}
      {stamp && !stamp.modal && zoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-6"
          onClick={() => setZoom(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={zoom}
            alt={t(`items.${stamp.key}.title`)}
            initial={reduce ? false : { scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18 }}
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
          <button
            onClick={() => setZoom(null)}
            aria-label="✕"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            ✕
          </button>
        </motion.div>
      )}
    </>
  );
}
