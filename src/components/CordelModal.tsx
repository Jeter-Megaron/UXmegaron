"use client";

// Modal do selo "Cordel Encantado" — dossiê de pesquisa do game.
// Fiel ao protótipo do Figma (nó 125:240): seção "Pesquisa de Campo" (3 imagens
// da pesquisa + Ver pesquisa) e "Site do Game" (preview do site + Ver site, em breve).
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// pesquisa hospedada no board do Miro (precisa estar público para visitantes)
const RESEARCH_URL = "https://miro.com/app/board/uXjVKJqD4Uw=/";
const RESEARCH_IMAGES = [
  "/gallery/cordel/cordel-arquitetura.webp",
  "/gallery/cordel/cordel-moodboard.webp",
  "/gallery/cordel/cordel-caatinga.webp",
];
const SITE_IMAGE = "/gallery/cordel/cordel-site.webp";

export default function CordelModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("stamps");
  const [zoom, setZoom] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/55 p-4"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-[720px] rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-teal-700">
              {t("modalKicker")}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">
              {t("items.cordel.title")}
            </h3>
            <p className="mt-1 font-serif text-sm italic text-muted">
              {t("cordelModal.subtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="✕"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tint text-muted hover:bg-border"
          >
            ✕
          </button>
        </div>

        {/* Pesquisa de Campo */}
        <section className="mt-5 rounded-xl border border-border bg-tint p-4 sm:p-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-teal-700">
            {t("cordelModal.researchLabel")}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-body">
            {t("cordelModal.researchIntro")}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {RESEARCH_IMAGES.map((src) => (
              <button
                key={src}
                onClick={() => setZoom(src)}
                aria-label={t("cordelModal.researchLabel")}
                className="aspect-[4/3] cursor-zoom-in overflow-hidden rounded-lg border border-border bg-white transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href={RESEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-teal px-3.5 py-2 text-xs font-semibold text-dark transition-colors hover:bg-teal-300"
            >
              {t("cordelModal.researchCta")}
            </a>
          </div>
        </section>

        {/* Site do Game */}
        <section className="mt-4 rounded-xl border border-border bg-tint p-4 sm:p-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-teal-700">
            {t("cordelModal.siteLabel")}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-body">
            {t("cordelModal.siteIntro")}
          </p>
          <button
            onClick={() => setZoom(SITE_IMAGE)}
            aria-label={t("cordelModal.siteLabel")}
            className="mt-3 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            {/* chrome do navegador */}
            <span className="flex h-7 items-center gap-1.5 border-b border-border bg-tint px-3">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_IMAGE} alt="" className="block w-full" />
          </button>
          <div className="mt-4 flex justify-end">
            <span
              aria-disabled
              title={t("cordelModal.siteCta")}
              className="cursor-not-allowed rounded-lg bg-border px-3.5 py-2 text-xs font-semibold text-muted"
            >
              {t("cordelModal.siteCta")}
            </span>
          </div>
        </section>
      </div>

      {/* lightbox: imagem expandida acima do modal */}
      {zoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={(e) => {
            e.stopPropagation();
            setZoom(null);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom}
            alt=""
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoom(null);
            }}
            aria-label="✕"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            ✕
          </button>
        </motion.div>
      )}
    </div>
  );
}
