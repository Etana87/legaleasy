import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function UploadZone({ onText }) {
  const [loading, setLoading]   = useState(false)
  const [filename, setFilename] = useState('')

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setFilename(file.name)
    setLoading(true)
    try {
      if (file.type === 'application/pdf') {
        const buffer = await file.arrayBuffer()
        const pdf    = await pdfjsLib.getDocument({ data: buffer }).promise
        let text = ''
        for (let i = 1; i <= pdf.numPages; i++) {
          const page    = await pdf.getPage(i)
          const content = await page.getTextContent()
          text += content.items.map(item => item.str).join(' ') + '\n'
        }
        onText(text.trim())
      } else {
        onText('')
        alert('Las imágenes aún no tienen OCR. Por ahora pega el texto manualmente.')
      }
    } catch (err) {
      alert('Error al leer el PDF: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <label className="upload-zone block">
      <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleFile} />
      <div className="flex flex-col items-center gap-2">
        {loading ? (
          <p className="text-sm text-[#6b7280]">Extrayendo texto del PDF...</p>
        ) : filename ? (
          <>
            <p className="text-sm text-[#c8a84b] font-medium">{filename}</p>
            <p className="text-xs text-[#9a8e84]">Click para cambiar</p>
          </>
        ) : (
          <>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-[#c8a84b]/50">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-[#6b7280] font-medium">Sube un PDF</p>
            <p className="text-xs text-[#9a8e84]">El texto se extrae automáticamente</p>
          </>
        )}
      </div>
    </label>
  )
}
