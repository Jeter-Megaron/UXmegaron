"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, input, textarea, select, label, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return; // touch / sem hover → cursor nativo

    const dot = dotRef.current;
    if (!dot) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const posEase = reduce ? 1 : 0.18;
    const scaleEase = reduce ? 1 : 0.2;

    // dot teal (scale 0.25 do elemento de 44px ≈ 11px) → anel teal (scale 1).
    // Nunca passa de 1 para o círculo não pixelar.
    const DOT = 0.25;
    const RING = 1;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let scale = DOT;
    let targetScale = DOT;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        x = mouseX;
        y = mouseY;
        dot.style.opacity = "1";
      }
    };
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t?.closest?.(INTERACTIVE)) {
        targetScale = RING;
        dot.classList.add("cursor-ring");
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t?.closest?.(INTERACTIVE)) {
        targetScale = DOT;
        dot.classList.remove("cursor-ring");
      }
    };
    const onLeave = () => {
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      if (visible) dot.style.opacity = "1";
    };

    const loop = () => {
      x += (mouseX - x) * posEase;
      y += (mouseY - y) * posEase;
      scale += (targetScale - scale) * scaleEase;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
