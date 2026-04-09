import { useState } from 'react'

export default function TermCard({ term }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(o => !o)} className={`term-card ${open ? 'open' : ''}`}>
      <p className="text-sm font-medium text-[#0a0f1e] mb-1">{term.t}</p>
      {!open && <p className="text-xs text-[#6b7280] leading-snug">{term.c}</p>}
      {open  && <p className="text-xs text-[#3d3830] leading-relaxed mt-1">{term.d}</p>}
      <p className="text-[10px] text-[#c8a84b]/70 mt-2">{open ? 'Toca para cerrar' : 'Toca para ver más'}</p>
    </button>
  )
}
