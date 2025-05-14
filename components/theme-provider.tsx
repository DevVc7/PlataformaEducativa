"use client"

import { useEffect, useState } from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: "light" | "dark"
}

export const ThemeProvider = ({ children, defaultTheme = "light" }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const activeTheme = savedTheme || defaultTheme

    document.documentElement.setAttribute("data-theme", activeTheme)
    document.documentElement.style.colorScheme = activeTheme

    setTheme(activeTheme)
  }, [defaultTheme])

  if (!theme) return null

  return <>{children}</>
}
