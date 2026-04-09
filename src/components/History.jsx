export default function History({ items, onBack, onSelect }) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
      <button onClick={onBack} className="btn-back mb-6">← Volver</button>

      <h2 className="font-display text-3xl text-[#0a0f1e] mb-1">Historial</h2>
      <p className="text-sm text-[#9a8e84] font-light mb-8">Tus análisis anteriores.</p>

      {items.length === 0 ? (
        <div className="text-center py-16 text-[#9a8e84] text-sm bg-white border border-[#ece4d4] rounded-2xl shadow-sm">
          Aún no has analizado ningún documento.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <button key={i} onClick={() => onSelect(item)} className="history-card">
              <div>
                <p className="text-sm font-medium text-[#0a0f1e] mb-1">
                  {item.tipo} · <span className="text-[#9a8e84] font-normal">{item.modo === 'basico' ? 'Básico' : 'Experto'}</span>
                </p>
                <p className="text-xs text-[#9a8e84] leading-snug">
                  {item.date} · {item.resumen?.substring(0, 70)}...
                </p>
              </div>
              <span className="text-[#c8a84b] text-lg flex-shrink-0">›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
