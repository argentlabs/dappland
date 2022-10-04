import { useDarkMode } from "../../hooks/useDarkMode"
import DesktopMenu from "./DesktopMenu/DesktopMenu"
import MobileMenu from "./MobileMenu/MobileMenu"

const Header = () => {
  const { currentTheme, setTheme } = useDarkMode()

  return (
    <header>
      <DesktopMenu currentTheme={currentTheme} setTheme={setTheme} />
      <MobileMenu currentTheme={currentTheme} setTheme={setTheme} />
    </header>
  )
}

export default Header
