import home from "../../../assets/icons/home.svg"
import homeDark from "../../../assets/icons/home_dark.svg"
import moon from "../../../assets/icons/moon.svg"
import sun from "../../../assets/icons/sun.svg"
import logoLight from "../../../assets/logo-dappland-mobile-light.svg"
import logo from "../../../assets/logo-dappland-mobile.svg"
import { useCategoryStore } from "../../../hooks/useCategoryStore"
import Button from "../../Button/Button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const MenuContainer = styled.div`
  box-shadow: none;
  transition: all 0.2s ease;

  &.navbar-scrolled:not(.is-active-menu) {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }

  ul li {
    border-top: 1px solid rgba(150, 150, 150, 0.2);

    p {
      margin-left: 16px;
    }
  }

  svg {
    max-width: 140px;
  }

  .is-active-menu {
    display: block;
  }
`

interface MobileMenuProps {
  currentTheme?: string
  setTheme: (theme: string) => void
}

const MobileMenu = ({ currentTheme, setTheme }: MobileMenuProps) => {
  const navbarItems = [
    {
      name: "Home",
      href: "/",
      icon: currentTheme === "dark" ? homeDark : home,
    } /*
    {
      name: "About",
      href: "/about/",
      icon: currentTheme === "dark" ? infoDark : info,
    },*/,
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)

  const nav = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = () => {
    const position = window.pageYOffset
    if (nav.current) {
      if (position > 15) {
        setIsNavbarScrolled(true)
      } else {
        setIsNavbarScrolled(false)
      }
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const setFilters = useCategoryStore((state) => state.setFilters)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const setSort = useCategoryStore((state) => state.setSelectedSort)

  return (
    <MenuContainer
      className={[
        "lg:hidden z-[999] fixed top-0 left-0 w-full",
        isNavbarScrolled ? "navbar-scrolled" : "",
        isMobileMenuOpen ? "is-active-menu" : "",
      ].join(" ")}
      ref={nav}
    >
      <div className="flex justify-center py-2 relative z-50 bg-smoked-white dark:bg-light-black">
        <Link href="/">
          <a className="flex items-center">
            <Image
              src={currentTheme === "dark" ? logoLight : logo}
              alt="logo"
              width={133}
              height={40}
              style={{ height: "auto !important" }}
            />
          </a>
        </Link>
        <div className="hamburger-wrapper absolute right-2 top-1/2 -translate-y-1/2">
          <button
            className={[
              "hamburger",
              isMobileMenuOpen ? "is-active" : "",
              mounted && currentTheme === "dark" ? "is-dark" : "",
              "absolute",
            ].join(" ")}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div
        className={[
          "absolute top-0 left-0 w-full h-screen hidden pt-[56px] bg-white dark:bg-light-black",
          isMobileMenuOpen ? "is-active-menu" : "",
        ].join(" ")}
      >
        <ul className="list-none mb-3">
          {navbarItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a
                  className="flex items-center py-3 px-6 bg-white dark:bg-light-black uppercase font-medium font-base"
                  onClick={() => {
                    setFilters([])
                    setSort(null)
                    changeCategory("all")
                  }}
                >
                  <Image src={item.icon} alt={item.name} />
                  <p>{item.name}</p>
                </a>
              </Link>
            </li>
          ))}
          <li className="py-3 px-6 bg-white dark:bg-light-black">
            <button
              type="button"
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="flex items-center uppercase font-medium font-base"
            >
              <Image
                src={currentTheme === "dark" ? sun : moon}
                alt="dark mode icon"
              />
              <p>Dark mode</p>
            </button>
          </li>
        </ul>
        <div className="mx-7">
          <Button
            variant="primary"
            className="w-full"
            withoutMobile
            href="https://github.com/argentlabs/dappland#-add-your-dapp-to-dappland"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add your Dapp
          </Button>
        </div>
      </div>
    </MenuContainer>
  )
}

export default MobileMenu
