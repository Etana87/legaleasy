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

Modo de explicación: ${modeDesc}

Estructura exacta:
{"resumen":"2-3 frases en lenguaje llano explicando qué dice el documento y qué implica","alertas":["cláusula o condición que puede perjudicar al usuario"],"terminos":[{"t":"término legal","c":"definición en menos de 8 palabras","d":"explicación completa con ejemplo práctico en 2-3 frases"}]}

Si no hay alertas importantes, pon alertas como array vacío []. Detecta entre 3 y 6 términos complejos.

Texto: ${text}`
}

export default function InputScreen({ filter, setFilter, mode, setMode, onResult, onBack }) {
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  function loadExample() {
    setText(EXAMPLES[filter] || EXAMPLES['General'])
  }

  async function analyze() {
    if (!text.trim()) {
      setError('Por favor introduce algún texto antes de analizar.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          ...(import.meta.env.VITE_ANTHROPIC_API_KEY
            ? { 'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY }
            : {}),
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: buildPrompt(text, filter, mode) }],
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || `Error ${res.status}`)
      }

      const data = await res.json()
      const raw  = data.content[0].text.trim().replace(/^```json|```$/g, '').trim()

      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        const match = raw.match(/\{[\s\S]*\}/)
        if (match) parsed = JSON.parse(match[0])
        else throw new Error('No se pudo interpretar la respuesta.')
      }

      onResult({ ...parsed, tipo: filter, modo: mode, texto: text })

    } catch (e) {
      setError('Error al analizar: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">

      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm text-[#9a8e84] hover:text-[#fe6e86] transition-colors mb-8 flex items-center gap-1"
      >
        ← Volver
      </button>

      {/* Título de sección */}
      <h2 className="font-display text-3xl text-[#1a1410] mb-1">Analiza tu documento</h2>
      <p className="text-sm text-[#9a8e84] font-light mb-8">Elige el tipo, el modo y pega o sube el texto.</p>

      <FilterRow filter={filter} setFilter={setFilter} />
      <ModeSelector mode={mode} setMode={setMode} />

      <UploadZone onText={text => setText(text)} />

      <div className="flex items-center gap-3 my-4 text-[#c5b9ae] text-xs">
        <div className="flex-1 h-px bg-[#ece4d8]"></div>
        o escribe el texto
        <div className="flex-1 h-px bg-[#ece4d8]"></div>
      </div>

      <div className="bg-white border border-[#ece4d8] rounded-2xl p-5 mb-3 shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.07em] text-[#9a8e84] mb-2">Texto del documento</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Pega aquí un contrato, cláusula, multa, documento bancario..."
          rows={6}
          className="w-full bg-[#faf7f2] border border-[#ece4d8] rounded-xl px-4 py-3 text-sm text-[#1a1410] placeholder:text-[#c5b9ae] resize-y outline-none focus:border-[#fe6e86]/50 leading-relaxed font-light"
        />
        <button
          onClick={loadExample}
          className="mt-2 text-xs text-[#9a8e84] hover:text-[#fe6e86] transition-colors"
        >
          Cargar ejemplo de {filter} →
        </button>
      </div>

      {error && (
        <div className="bg-[#ffcdd4]/30 border border-[#fe6e86]/30 rounded-xl px-4 py-3 text-sm text-[#c20e3d] mb-3">
          {error}
        </div>
      )}

      <button
        onClick={analyze}
        disabled={loading}
        className="w-full py-3.5 bg-[#c20e3d] hover:bg-[#a50c33] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors text-sm"
      >
        {loading ? 'Analizando...' : 'Analizar documento'}
      </button>

    </div>
  )
}
