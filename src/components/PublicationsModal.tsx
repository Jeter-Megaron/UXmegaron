"use client";

// Modal de publicações do selo "Página Após Página" — fiel ao protótipo
// (Figma: Modal / Página Após Página — Publicações · Desktop 106:240 / Mobile 111:240).
import { useTranslations } from "next-intl";
import { PUBLICATIONS } from "@/content";

export default function PublicationsModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("stamps");

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
              {t("items.hqs.title")}
            </h3>
            <p className="mt-1 font-serif text-sm italic text-muted">
              {t("pubs.subtitle")}
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

        {/* lista de publicações */}
        <div className="mt-5 space-y-4">
          {PUBLICATIONS.map((p) => (
            <article
              key={p.key}
              className="grid grid-cols-[72px_1fr] gap-x-3.5 gap-y-3 rounded-xl border border-border bg-tint p-4 sm:grid-cols-[96px_1fr] sm:gap-x-[18px] sm:p-5"
            >
              {/* capa 3:4 — moldura branca + sombra leve; ocupa as 2 linhas no desktop */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={t(`pubs.items.${p.key}.title`)}
                className="h-24 w-[72px] self-start rounded border border-border bg-white object-cover shadow-md sm:row-span-2 sm:h-32 sm:w-24"
              />

              {/* eyebrow + título */}
              <div className="min-w-0 self-center sm:self-start">
                <p className="text-[10px] font-semibold tracking-[0.15em] text-teal-700">
                  {t(`pubs.items.${p.key}.eyebrow`)}
                </p>
                <h4 className="mt-1 font-serif text-xl font-semibold leading-snug text-ink">
                  {t(`pubs.items.${p.key}.title`)}
                </h4>
              </div>

              {/* corpo: descrição, detalhes, rodapé (mobile: largura cheia abaixo da capa) */}
              <div className="col-span-2 sm:col-span-1 sm:col-start-2">
                <p className="text-[13px] leading-relaxed text-body">
                  {t(`pubs.items.${p.key}.desc`)}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {t(`pubs.items.${p.key}.details`)}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
                  <span className="text-[9px] font-semibold tracking-[0.16em] text-teal-700">
                    [ {t(`pubs.items.${p.key}.tag`)} ]
                  </span>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-teal px-3.5 py-2 text-xs font-semibold text-dark transition-colors hover:bg-teal-300"
                    >
                      {t("pubs.view")}
                    </a>
                  ) : (
                    <span
                      title={t("pubs.soon")}
                      aria-disabled
                      className="cursor-not-allowed rounded-lg bg-border px-3.5 py-2 text-xs font-semibold text-muted"
                    >
                      {t("pubs.view")}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
