// Animação do hero (vídeo de linhas brancas sobre preto, convertido do GIF).
// mix-blend-mode: screen → o fundo preto some e só as linhas brancas aparecem,
// fundindo no fundo escuro do hero. WebM (menor) + MP4 (fallback).
export default function HeroMedia({ className = "" }: { className?: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className={`mix-blend-screen select-none pointer-events-none h-auto w-full ${className}`}
    >
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
