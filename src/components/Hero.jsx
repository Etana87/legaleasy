export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-[-60px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,168,75,0.10)_0%,transparent_70%)] animate-blob pointer-events-none" />
      <div className="absolute bottom-[0px] left-[-80px] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(10,15,30,0.06)_0%,transparent_70%)] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#c8a84b] font-medium mb-8">
          Tu asistente legal personal
        </p>
        <h1 className="font-display text-[clamp(4rem,14vw,9rem)] leading-[0.95] tracking-tight text-[#0a0f1e] mb-6">
          Legal<em className="text-[#c8a84b] not-italic">Easy</em>
        </h1>
        <p className="text-lg text-[#6b7280] font-light leading-relaxed max-w-md mx-auto mb-12">
          Pega o sube cualquier documento legal y te lo explicamos en lenguaje humano, al instante.
        </p>

        <button onClick={onStart} className="btn-primary">
          Analizar un documento
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center justify-center gap-10 mt-16 pt-10 border-t border-[#ece4d4]">
          {[
            { n: '82%', l: 'firman sin entender' },
            { n: '100+', l: 'usuarios investigados' },
            { n: '6', l: 'tipos de documento' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-3xl text-[#c8a84b] leading-none mb-1">{s.n}</p>
              <p className="text-xs text-[#9a8e84]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
