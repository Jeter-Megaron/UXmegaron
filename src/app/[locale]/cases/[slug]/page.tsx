import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CASES } from "@/content";
import { getCaseDetail } from "@/casesData";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASES.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const d = getCaseDetail(slug, locale);
  if (!d) return {};
  return { title: `${d.title} · Megaron`, description: d.impact };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const d = getCaseDetail(slug, locale);
  if (!d) notFound();
  const t = await getTranslations("casePage");

  return (
    <div className="flex-1">
      {/* HEADER (escuro) */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-12">
          <Link href="/#cases" className="text-sm text-slate hover:text-white">
            {t("back")}
          </Link>
          <div className="mt-8 flex items-start justify-between gap-10">
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-[0.4em] text-teal-300">
                {d.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
                {d.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-light">{d.impact}</p>
              <div className="mt-8 flex flex-wrap gap-x-14 gap-y-5">
                {d.meta.map((m) => (
                  <div key={m.label}>
                    <p className="text-[11px] font-semibold tracking-[0.3em] text-teal-300">
                      {m.label}
                    </p>
                    <p className="mt-1 text-[15px] font-medium text-white">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/cases/${slug}-logo.svg`}
              alt=""
              aria-hidden
              className="hidden shrink-0 self-center w-28 lg:w-40 md:block"
            />
          </div>
        </div>
      </section>

      {/* CONTEXTO (claro) */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <p className="text-sm font-semibold tracking-[0.4em] text-teal-700">{t("contextEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
            {t("contextHeading")}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-[1.7] text-body">{d.context}</p>
        </div>
      </section>

      {/* O QUE EU FIZ (tint) */}
      <section className="bg-tint">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <p className="text-sm font-semibold tracking-[0.4em] text-teal-700">{t("didEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
            {d.did.heading}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-[1.65] text-body">{d.did.intro}</p>

          {d.did.bullets && (
            <ul className="mt-6 max-w-3xl space-y-3">
              {d.did.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-body">
                  <span className="mt-0.5 font-semibold text-teal">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {d.did.cards && (
            <>
              {d.did.cardsHeading && (
                <h3 className="mt-10 font-display text-xl font-bold text-ink">
                  {d.did.cardsHeading}
                </h3>
              )}
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
                {d.did.cards.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-border bg-white p-6">
                    <h4 className="font-display text-lg font-bold text-ink">{c.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {d.did.quote && (
            <div className="mt-8 max-w-3xl border-l-4 border-teal pl-5">
              <p className="font-display text-xl font-medium leading-snug text-ink">
                {d.did.quote}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RESULTADOS (escuro) */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <p className="text-sm font-semibold tracking-[0.4em] text-teal-300">{t("resultsEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">{d.results.heading}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.results.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border-dark bg-card p-6"
              >
                <p className="font-display text-3xl font-bold tracking-tight text-teal-300">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-slate">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate">{d.results.note}</p>
        </div>
      </section>

      {/* TELAS (claro) */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <p className="text-sm font-semibold tracking-[0.4em] text-teal-700">{t("screensEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
            {t("screensHeading")}
          </h2>
          <div className="mt-8 space-y-5">
            {/* tela em destaque */}
            <div className="overflow-hidden rounded-xl border border-border bg-tint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.screens[0]} alt={`${d.title}, ${t("screenAlt")}`} className="w-full" />
            </div>
            {d.screens.length > 1 && (
              <div className="grid gap-5 sm:grid-cols-3">
                {d.screens.slice(1).map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-border bg-tint">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${d.title}, ${t("screenAlt")} ${i + 2}`} className="w-full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRÓXIMO / RODAPÉ (escuro) */}
      <section className="bg-darker">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12">
          <Link href={`/cases/${d.next.slug}`} className="group">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-teal-300">
              {t("nextCase")}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-white group-hover:text-teal-300">
              {d.next.title} →
            </p>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate hover:text-white">
            {t("home")}
          </Link>
        </div>
      </section>
    </div>
  );
}
