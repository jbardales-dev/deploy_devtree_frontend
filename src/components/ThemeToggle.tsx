import useDarkMode from '../hooks/useDarkMode'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useDarkMode()

  return (
    <button
      onClick={toggleTheme}
      className="w-40 bg-gray-200 dark:bg-gray-800 text-slate-800 dark:text-white p-2 uppercase font-black text-xs rounded-lg cursor-pointer text-center"
    >
      {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  )
}