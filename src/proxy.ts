import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Pula api, assets internos e arquivos com extensão (ex.: hero.gif)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
