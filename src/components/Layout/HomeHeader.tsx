import { useDarkMode } from "../../hooks/useDarkMode"
import HomeDesktopMenu from "./HomeMenu/DesktopMenu"
import React from "react"

const HomeHeader = () => {
  const { currentTheme, setTheme } = useDarkMode()

  return (
    <header>
      <HomeDesktopMenu currentTheme={currentTheme} setTheme={setTheme} />
    </header>
  )
}

export default HomeHeader
