import { useDarkMode } from "../../hooks/useDarkMode"
import HomeDesktopMenu from "./HomeMenu/DesktopMenu"
import HomeMobileMenu from "./HomeMenu/MobileMenu"
import React from "react"

const HomeHeader = () => {
  const { currentTheme, setTheme } = useDarkMode()

  return (
    <header>
      <HomeMobileMenu currentTheme={currentTheme} setTheme={setTheme} />
      <HomeDesktopMenu currentTheme={currentTheme} setTheme={setTheme} />
    </header>
  )
}

export default HomeHeader
