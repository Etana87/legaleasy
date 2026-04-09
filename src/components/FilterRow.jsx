const FILTERS = ['General', 'Alquiler', 'Multa', 'Banco', 'Laboral', 'Divorcio']

export default function FilterRow({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`chip ${filter === f ? 'active' : ''}`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
