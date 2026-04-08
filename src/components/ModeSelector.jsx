const MODES = {
  basico:  'Explicaciones simples, como si no supieras nada de leyes.',
  experto: 'Terminología precisa con contexto legal y referencias normativas.',
}

export default function ModeSelector({ mode, setMode }) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        {Object.keys(MODES).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
              mode === m
                ? 'bg-[#c20e3d] border-[#c20e3d] text-white'
                : 'bg-white border-[#ece4d8] text-[#9a8e84] hover:border-[#fe6e86]/40'
            }`}
          >
            {m === 'basico' ? 'Básico' : 'Experto'}
          </button>
        ))}
      </div>
      <p className="text-xs text-[#9a8e84]">{MODES[mode]}</p>
    </div>
  )
}
