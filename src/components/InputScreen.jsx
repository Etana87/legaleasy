import { useState } from 'react'
import FilterRow from './FilterRow.jsx'
import ModeSelector from './ModeSelector.jsx'
import UploadZone from './UploadZone.jsx'
import { EXAMPLES } from '../App.jsx'

function buildPrompt(text, filter, mode) {
  const modeDesc = mode === 'basico'
    ? 'Usa lenguaje muy sencillo, como si hablaras con alguien sin conocimientos legales.'
    : 'Usa terminología más precisa con contexto legal y referencias normativas cuando sea relevante.'
  return `Eres un experto legal que ayuda a ciudadanos españoles. Analiza el siguiente texto legal de tipo "${filter}" y responde ÚNICAMENTE con un objeto JSON válido, sin markdown ni texto adicional.
Modo: ${modeDesc}
Estructura: {"resumen":"2-3 frases en lenguaje llano","alertas":["cláusula que puede perjudicar al usuario"],"terminos":[{"t":"término","c":"definición en menos de 8 palabras","d":"explicación con ejemplo en 2-3 frases"}]}
Si no hay alertas pon []. Detecta entre 3 y 6 términos.
Texto: ${text}`
}

export default function InputScreen({ filter, setFilter, mode, setMode, onResult, onBack }) {
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function analyze() {
    if (!text.trim()) { setError('Por favor introduce algún texto antes de analizar.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: buildPrompt(text, filter, mode) }],
        }),
      })
      if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || `Error ${res.status}`) }
      const data = await res.json()
      const raw  = data.content[0].text.trim().replace(/^```json|```$/g, '').trim()
      let parsed
      try { parsed = JSON.parse(raw) }
      catch { const m = raw.match(/\{[\s\S]*\}/); if (m) parsed = JSON.parse(m[0]); else throw new Error('No se pudo interpretar la respuesta.') }
      onResult({ ...parsed, tipo: filter, modo: mode })
    } catch (e) {
      setError('Error al analizar: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
      <button onClick={onBack} className="btn-back mb-8">← Volver</button>

      <h2 className="font-display text-3xl text-[#0a0f1e] mb-1">Analiza tu documento</h2>
      <p className="text-sm text-[#9a8e84] font-light mb-8">Elige el tipo, el modo y pega o sube el texto.</p>

      <FilterRow filter={filter} setFilter={setFilter} />
      <ModeSelector mode={mode} setMode={setMode} />
      <UploadZone onText={t => setText(t)} />

      <div className="flex items-center gap-3 my-4 text-[#c5b9ae] text-xs">
        <div className="flex-1 h-px bg-[#ece4d4]"></div>
        o escribe el texto
        <div className="flex-1 h-px bg-[#ece4d4]"></div>
      </div>

      <div className="bg-white border border-[#ece4d4] rounded-2xl p-5 mb-3 shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.07em] text-[#9a8e84] mb-2">Texto del documento</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Pega aquí un contrato, cláusula, multa, documento bancario..."
          rows={6}
          className="w-full bg-[#faf7f2] border border-[#ece4d4] rounded-xl px-4 py-3 text-sm text-[#0a0f1e] placeholder:text-[#c5b9ae] resize-y leading-relaxed font-light"
        />
        <button
          onClick={() => setText(EXAMPLES[filter] || EXAMPLES['General'])}
          className="mt-2 text-xs text-[#9a8e84] hover:text-[#c8a84b] transition-colors duration-200"
        >
          Cargar ejemplo de {filter} →
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-3">{error}</div>
      )}

      <button onClick={analyze} disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Analizando...' : 'Analizar documento'}
      </button>
    </div>
  )
}
