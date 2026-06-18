// Comprime PDFs pesados (revistas/HQs em resolução de impressão) para leitura em tela:
// re-renderiza cada página com MuPDF a ~1300px de largura e remonta com pdf-lib (JPEG q80).
// Uso: node scripts/compress-pdf.mjs <entrada.pdf> <saida.pdf> [larguraPx] [qualidade]
import { readFileSync, writeFileSync } from "node:fs";
import * as mupdf from "mupdf";
import { PDFDocument } from "pdf-lib";

const [, , input, output, targetWidthArg, qualityArg] = process.argv;
if (!input || !output) {
  console.error("Uso: node scripts/compress-pdf.mjs <entrada.pdf> <saida.pdf> [larguraPx] [qualidade]");
  process.exit(1);
}
const TARGET_W = Number(targetWidthArg) || 1300;
const QUALITY = Number(qualityArg) || 80;

const src = mupdf.Document.openDocument(readFileSync(input), "application/pdf");
const pageCount = src.countPages();
const out = await PDFDocument.create();

for (let i = 0; i < pageCount; i++) {
  const page = src.loadPage(i);
  const [x0, y0, x1, y1] = page.getBounds();
  const wPts = x1 - x0;
  const hPts = y1 - y0;
  // escala limitada a 2x (144dpi) — acima disso não ganha nada em tela
  const scale = Math.min(TARGET_W / wPts, 2);
  const pixmap = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
  const jpg = pixmap.asJPEG(QUALITY, false);
  pixmap.destroy();
  page.destroy();

  const img = await out.embedJpg(jpg);
  const p = out.addPage([wPts, hPts]);
  p.drawImage(img, { x: 0, y: 0, width: wPts, height: hPts });
  if ((i + 1) % 10 === 0 || i === pageCount - 1) {
    console.log(`  pagina ${i + 1}/${pageCount}`);
  }
}

const bytes = await out.save();
writeFileSync(output, bytes);
console.log(`OK: ${output} — ${(bytes.length / 1048576).toFixed(1)} MB (${pageCount} paginas)`);
