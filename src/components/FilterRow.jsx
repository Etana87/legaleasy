const FILTERS = ['General', 'Alquiler', 'Multa', 'Banco', 'Laboral', 'Divorcio']

export default function FilterRow({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`text-xs px-4 py-1.5 rounded-full border transition-all ${
            filter === f
              ? 'bg-[#c20e3d] border-[#c20e3d] text-white'
              : 'border-[#ece4d8] text-[#9a8e84] bg-white hover:border-[#fe6e86]/40 hover:text-[#fe6e86]'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
