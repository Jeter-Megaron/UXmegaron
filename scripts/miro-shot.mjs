// Abre um board do Miro no Chromium (Playwright) e captura screenshot + texto visível do DOM.
// Uso: node scripts/miro-shot.mjs <url> <saida.png>
import { chromium } from "playwright";

const url = process.argv[2];
const out = process.argv[3] || "miro.png";
if (!url) {
  console.error("Uso: node scripts/miro-shot.mjs <url> <saida.png>");
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});
const page = await ctx.newPage();
try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
} catch (e) {
  console.log("goto aviso:", e.message);
}
// dá tempo para o SPA/canvas montar
await page.waitForTimeout(9000);

const title = await page.title();
const bodyText = (await page.evaluate(() => document.body?.innerText || ""))
  .replace(/\s+\n/g, "\n")
  .trim()
  .slice(0, 1500);
const canvases = await page.evaluate(() => document.querySelectorAll("canvas").length);

console.log("=== TITLE ===");
console.log(title);
console.log("=== CANVAS COUNT ===", canvases);
console.log("=== BODY TEXT (DOM, ate 1500 chars) ===");
console.log(bodyText || "(vazio)");

await page.screenshot({ path: out, fullPage: false });
console.log("=== SCREENSHOT ===", out);

await browser.close();
