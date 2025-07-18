import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return { isDark, toggleTheme: () => setIsDark(!isDark) }
}