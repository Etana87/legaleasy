import { useState } from 'react'
import TermCard from './TermCard.jsx'

export default function ResultView({ result, onBack }) {
  const [copied, setCopied] = useState(false)

  function share() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(result.resumen)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">

      {/* Barra superior */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="text-sm text-[#9a8e84] hover:text-[#fe6e86] transition-colors flex items-center gap-1"
        >
          ← Nuevo análisis
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-3 py-1 rounded-full bg-[#f3ede4] border border-[#ece4d8] text-[#9a8e84]">
            {result.tipo}
          </span>
          <span className="text-[11px] px-3 py-1 rounded-full bg-[#c20e3d] text-white">
            {result.modo === 'basico' ? 'Básico' : 'Experto'}
          </span>
        </div>
      </div>

      {/* Compartir */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={share}
          className="text-xs text-[#9a8e84] hover:text-[#fe6e86] transition-colors border border-[#ece4d8] bg-white rounded-xl px-4 py-2 shadow-sm"
        >
          {copied ? 'Copiado ✓' : 'Compartir resumen'}
        </button>
      </div>

      {/* Resumen */}
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#fe6e86] mb-2">Resumen</p>
        <div className="bg-white border border-[#ece4d8] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#4a3f35] leading-relaxed font-light">{result.resumen}</p>
        </div>
      </div>

      {/* Alertas */}
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#fe6e86] mb-2">Alertas</p>
        {result.alertas && result.alertas.length > 0 ? (
          <div className="bg-[#fff8ec] border border-[#e8c06a] rounded-2xl p-5 space-y-3">
            {result.alertas.map((a, i) => (
              <div key={i} className="flex gap-3 items-start text-sm text-[#633806] font-light leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] mt-1.5 flex-shrink-0"></div>
                {a}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#eaf3de] border border-[#c0dd97] rounded-xl px-4 py-3 text-sm text-[#3b6d11]">
            No se detectaron cláusulas problemáticas destacables.
          </div>
        )}
      </div>

      {/* Términos */}
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#fe6e86] mb-3">Términos explicados</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(result.terminos || []).map((t, i) => (
            <TermCard key={i} term={t} />
          ))}
        </div>
      </div>

    </div>
  )
}
