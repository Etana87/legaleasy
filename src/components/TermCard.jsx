import { useState } from 'react'

export default function TermCard({ term }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(o => !o)}
      className={`w-full text-left bg-white border rounded-2xl p-4 shadow-sm transition-colors ${
        open ? 'border-[#fe6e86]/50' : 'border-[#ece4d8] hover:border-[#fe6e86]/30'
      }`}
    >
      <p className="text-sm font-medium text-[#1a1410] mb-1">{term.t}</p>
      {!open && (
        <p className="text-xs text-[#9a8e84] leading-snug">{term.c}</p>
      )}
      {open && (
        <p className="text-xs text-[#4a3f35] leading-relaxed mt-1">{term.d}</p>
      )}
      <p className="text-[10px] text-[#c5b9ae] mt-2">
        {open ? 'Toca para cerrar' : 'Toca para ver más'}
      </p>
    </button>
  )
}
