import { useTheme } from "next-themes"

export const useDarkMode = () => {
  const { systemTheme, theme, setTheme } = useTheme()

  const currentTheme = theme === "system" ? systemTheme : theme

  return { currentTheme, setTheme }
}
