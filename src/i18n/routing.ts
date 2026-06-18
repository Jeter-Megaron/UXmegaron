import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // pt em "/", en em "/en"
  localePrefix: "as-needed",
});
