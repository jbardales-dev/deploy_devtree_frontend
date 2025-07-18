import useDarkMode from '../hooks/useDarkMode'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useDarkMode()

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-lg transition"
    >
      {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  )
}