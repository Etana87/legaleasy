export default function Header({ onHistoryClick, onLogoClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#faf7f2]/92 backdrop-blur-md border-b border-[#ece4d4]">
      <button onClick={onLogoClick} className="logo-btn">
        Legal<span className="text-[#c8a84b]">Easy</span>
      </button>
      <button onClick={onHistoryClick} className="btn-hist">
        Historial
      </button>
    </header>
  )
}
