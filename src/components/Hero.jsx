// Hero.jsx
// Pantalla de bienvenida. El nombre de la app aparece centrado y grande.
// Los blobs de fondo usan los colores de marca pero muy suaves
// para no romper el look claro.

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Blobs decorativos suaves */}
      <div className="absolute top-[-60px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(254,110,134,0.12)_0%,transparent_70%)] animate-blob pointer-events-none" />
      <div className="absolute bottom-[0px] left-[-80px] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(194,14,61,0.07)_0%,transparent_70%)] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Contenido centrado */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">

        {/* Label */}
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#fe6e86] font-medium mb-8">
          Tu asistente legal personal
        </p>

        {/* Nombre grande */}
        <h1 className="font-display text-[clamp(4rem,14vw,9rem)] leading-[0.95] tracking-tight text-[#1a1410] mb-6">
          Legal<em className="text-[#fe6e86] not-italic">Easy</em>
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#9a8e84] font-light leading-relaxed max-w-md mx-auto mb-12">
          Pega o sube cualquier documento legal y te lo explicamos en lenguaje humano, al instante.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-[#c20e3d] hover:bg-[#a50c33] text-white font-medium px-8 py-4 rounded-2xl transition-colors text-sm"
        >
          Analizar un documento
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 mt-16 pt-10 border-t border-[#ece4d8]">
          <div className="text-center">
            <p className="font-display text-3xl text-[#fe6e86] leading-none mb-1">82%</p>
            <p className="text-xs text-[#9a8e84]">firman sin entender</p>
          </div>
          <div className="w-px h-8 bg-[#ece4d8]"></div>
          <div className="text-center">
            <p className="font-display text-3xl text-[#fe6e86] leading-none mb-1">100+</p>
            <p className="text-xs text-[#9a8e84]">usuarios investigados</p>
          </div>
          <div className="w-px h-8 bg-[#ece4d8]"></div>
          <div className="text-center">
            <p className="font-display text-3xl text-[#fe6e86] leading-none mb-1">6</p>
            <p className="text-xs text-[#9a8e84]">tipos de documento</p>
          </div>
        </div>
      </div>

    </section>
  )
}
