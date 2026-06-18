"use client";

// Retrato em ASCII do "Sobre" — a arte senta direto no fundo da seção (sem painel).
// Carrega /ascii-art.html (grande demais p/ o código), remove o fundo preto do <pre>
// e escala pela LARGURA da coluna, com a altura seguindo a proporção real da arte.
import { useCallback, useEffect, useRef, useState } from "react";

export default function AsciiArt() {
  const [html, setHtml] = useState<string | null>(null);
  // escala em X e Y separadas: a arte preenche um QUADRADO perfeito,
  // independente do line-height herdado da página
  const [scale, setScale] = useState<{ x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/ascii-art.html")
      .then((r) => (r.ok ? r.text() : null))
      .then((t) => {
        if (!cancelled && t && /<(pre|b)\b/i.test(t)) setHtml(t);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const fit = useCallback(() => {
    const box = boxRef.current;
    const art = artRef.current;
    if (!box || !art) return;
    // o arquivo traz background-color preto inline no <pre> — neutralizar
    const pre = art.querySelector("pre");
    if (pre) {
      pre.style.background = "transparent";
      pre.style.padding = "0";
    }
    const w = art.scrollWidth;
    const h = art.scrollHeight;
    if (!w || !h) return;
    const side = box.clientWidth;
    const sx = side / w;
    const sy = side / h;
    if (sx > 0 && sy > 0 && Number.isFinite(sx) && Number.isFinite(sy)) {
      setScale({ x: sx, y: sy });
    }
  }, []);

  useEffect(() => {
    if (!html) return;
    const id = requestAnimationFrame(fit);
    const ro = new ResizeObserver(fit);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [html, fit]);

  return (
    <div ref={boxRef} className="relative aspect-square w-full overflow-hidden">
      {html ? (
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            transform: `scale(${scale?.x ?? 0.001}, ${scale?.y ?? 0.001})`,
            opacity: scale ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div ref={artRef} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-mono text-[13px] tracking-[0.3em] text-teal-700/40">
              1011 0010 1101
            </p>
            <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-teal-700">
              RETRATO EM ASCII
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
