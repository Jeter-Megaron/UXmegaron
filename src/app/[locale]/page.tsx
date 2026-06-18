import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroMedia from "@/components/HeroMedia";
import AsciiArt from "@/components/AsciiArt";
import StampGallery from "@/components/StampGallery";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CASES } from "@/content";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="flex-1">
      {/* ===== HERO (escuro) ===== */}
      <section className="relative overflow-hidden bg-dark text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-12">
          <span className="flex items-center gap-[7px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.png" alt="" aria-hidden className="h-[41px] w-auto" />
            <span className="font-display text-xl font-bold tracking-tight">Megaron</span>
          </span>
          <div className="hidden items-center gap-7 text-sm text-light md:flex">
            <a href="#cases" className="hover:text-white">{t("nav.cases")}</a>
            <a href="#tambem-faco" className="hover:text-white">{t("nav.gallery")}</a>
            <a href="#sobre" className="hover:text-white">{t("nav.about")}</a>
            <a href="#contato" className="hover:text-white">{t("nav.contact")}</a>
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-28 pt-10 md:grid-cols-2 md:px-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.4em] text-teal">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-[68px]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{t("hero.sub")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#cases" className="rounded-[10px] bg-teal px-6 py-3.5 font-semibold text-dark transition-colors hover:bg-teal-300">
                {t("hero.ctaCases")}
              </a>
              <a href="#sobre" className="rounded-[10px] border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/5">
                {t("hero.ctaAbout")}
              </a>
            </div>
          </div>
          <div className="relative">
            <HeroMedia className="mx-auto w-full max-w-[520px]" />
          </div>
        </div>
      </section>

      {/* ===== CASES (claro) ===== */}
      <section id="cases" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
          <p className="text-sm font-semibold tracking-[0.4em] text-teal-700">{t("cases.eyebrow")}</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
            {t("cases.title")}
          </h2>
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{t("cases.sub")}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CASES.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-teal/50 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.18)]"
              >
                {/* thumbs 400×196: imagem inteira, sem recorte (respeita as bordas da arte) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} className="h-auto w-full" />
                <div className="p-6">
                  <span className="inline-block rounded-full bg-teal-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-teal-700">
                    {t(`cases.cards.${c.slug}.tag`)}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-teal-700">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {t(`cases.cards.${c.slug}.desc`)}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-teal-700">
                    {t(`cases.cards.${c.slug}.metric`)}
                    <span
                      aria-hidden
                      className="inline-block opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TAMBÉM FAÇO / selos (escuro) ===== */}
      <section id="tambem-faco" className="bg-dark">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
          <p className="text-sm font-semibold tracking-[0.4em] text-teal-300">{t("stamps.eyebrow")}</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-white">
            {t("stamps.title")}
          </h2>
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-slate">{t("stamps.sub")}</p>
          <div className="mt-12">
            <StampGallery />
          </div>
        </div>
      </section>

      {/* ===== SOBRE + CONTATO (claro) ===== */}
      <section id="sobre" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12">
          <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:items-start">
            {/* self-stretch + mt-auto: a citação alinha com a base do ASCII */}
            <div className="flex flex-col md:self-stretch">
              <p className="text-sm font-semibold tracking-[0.4em] text-teal-700">{t("about.eyebrow")}</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
                {t("about.heading")}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-[1.7] text-body">{t("about.paragraph")}</p>
              <div className="mt-6 border-l-4 border-teal pl-5 md:mt-auto">
                <p className="font-display text-2xl font-medium leading-snug text-ink">
                  {t("about.quote")}
                </p>
              </div>
            </div>
            <AsciiArt />
          </div>

          <div id="contato" className="mt-24 border-t-2 border-teal pt-16">
            <p className="text-sm font-semibold tracking-[0.4em] text-teal-700">{t("contact.eyebrow")}</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
              {t("contact.heading")}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{t("contact.sub")}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="mailto:jetermegaronmonteiro@gmail.com"
                className="rounded-[10px] bg-teal px-6 py-3.5 font-semibold text-dark transition-colors hover:bg-teal-300"
              >
                jetermegaronmonteiro@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/jeter-megaron/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] border border-border px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-tint"
              >
                {t("contact.linkedin")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RODAPÉ (escuro) ===== */}
      <footer className="bg-darker">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 text-sm md:px-12">
          <span className="text-slate">{t("footer.rights")}</span>
          <LanguageSwitcher />
        </div>
      </footer>
    </div>
  );
}
