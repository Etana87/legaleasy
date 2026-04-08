export default function History({ items, onBack, onSelect }) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
      <button
        onClick={onBack}
        className="text-sm text-[#9a8e84] hover:text-[#fe6e86] transition-colors mb-6 flex items-center gap-1"
      >
        ← Volver
      </button>

      <h2 className="font-display text-3xl text-[#1a1410] mb-1">Historial</h2>
      <p className="text-sm text-[#9a8e84] font-light mb-8">Tus análisis anteriores.</p>

      {items.length === 0 ? (
        <div className="text-center py-16 text-[#c5b9ae] text-sm bg-white border border-[#ece4d8] rounded-2xl">
          Aún no has analizado ningún documento.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => onSelect(item)}
              className="w-full text-left bg-white border border-[#ece4d8] hover:border-[#fe6e86]/40 rounded-2xl px-5 py-4 shadow-sm transition-colors flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium text-[#1a1410] mb-1">
                  {item.tipo} · <span className="text-[#9a8e84] font-normal">{item.modo === 'basico' ? 'Básico' : 'Experto'}</span>
                </p>
                <p className="text-xs text-[#9a8e84] leading-snug">
                  {item.date} · {item.resumen?.substring(0, 70)}...
                </p>
              </div>
              <span className="text-[#c5b9ae] text-lg flex-shrink-0">›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
