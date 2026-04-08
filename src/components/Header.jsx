export default function Header({ onHistoryClick, onLogoClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#ece4d8]">
      <button
        onClick={onLogoClick}
        className="font-display text-lg text-[#1a1410] tracking-tight hover:text-[#fe6e86] transition-colors"
      >
        Legal<span className="text-[#fe6e86]">Easy</span>
      </button>
      <button
        onClick={onHistoryClick}
        className="text-xs text-[#9a8e84] hover:text-[#fe6e86] transition-colors bg-[#f3ede4] border border-[#ece4d8] rounded-full px-4 py-1.5"
      >
        Historial
      </button>
    </header>
  )
}
