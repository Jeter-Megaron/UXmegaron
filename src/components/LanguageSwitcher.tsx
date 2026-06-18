"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const base = "transition-colors";
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
      <Link
        href={pathname}
        locale="pt"
        className={`${base} ${locale === "pt" ? "font-semibold text-teal" : "text-light hover:text-white"}`}
      >
        PT
      </Link>
      <span className="text-slate">/</span>
      <Link
        href={pathname}
        locale="en"
        className={`${base} ${locale === "en" ? "font-semibold text-teal" : "text-light hover:text-white"}`}
      >
        EN
      </Link>
    </span>
  );
}
