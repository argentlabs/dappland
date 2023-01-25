import crossCircle from "../../assets/icons/crossCircle.svg"
import crossCircleLight from "../../assets/icons/crossCircleLight.svg"
import { categories, reputation } from "../../data/categories"
import { useCategoryStore } from "../../hooks/useCategoryStore"
import { useDarkMode } from "../../hooks/useDarkMode"
import Button from "../Button/Button"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const CategoryContainer = styled.div`
  overflow: auto;
  ul.hovered li {
    transition: opacity 0.2s ease-in-out;
    opacity: 0.6;

    &:hover,
    &.active {
      opacity: 1;
    }
  }

  ul li.with-blur:not(.active):not(:hover) {
    opacity: 0.6;
  }
`

const MenuContainer = styled.div`
  box-shadow: none;
  transition: all 0.2s ease;

  &.navbar-scrolled:not(.is-active-menu) {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }

  ul li {
    p {
      margin-left: 16px;
    }
  }

  svg {
    max-width: 140px;
  }

  .is-active-menu {
    display: flex;
  }
`

const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  dappCards,
}: {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (val: boolean) => void
  dappCards: DappCard[]
}) => {
  const router = useRouter()
  const { currentTheme, setTheme } = useDarkMode()

  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)

  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const selectedFilters = useCategoryStore((state) => state.selectedFilters)
  const addFilter = useCategoryStore((state) => state.addFilter)

  const nav = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = () => {
    const position = window.scrollY
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

  const remainingFilters = reputation.filter(
    (rep) => !selectedFilters.includes(rep.key),
  )

  const checkIfAnyCategoryIsActive = () =>
    [...categories, ...reputation].some(
      (category) => category.key === selectedCategory,
    )

  const checkIfCategoryHasDapps = (
    category: Array<{ key: string; name: string; icon: any }>,
  ) => {
    let activeCategories = 0
    category.forEach((item) => {
      if (renderCategoryCount(item.name) > 0) activeCategories++
    })
    return Boolean(activeCategories)
  }

  const renderCategoryCount = (category: string) =>
    dappCards.reduce((prevValue, currentValue) => {
      if (category === "Dapp of the Week") {
        if (currentValue.featured) {
          return prevValue + 1
        }
      }
      if (category === "Public team") {
        if (!currentValue.annonymous) {
          return prevValue + 1
        }
      }
      if (category === "Audited") {
        if (currentValue.audits && currentValue.audits.length > 0) {
          return prevValue + 1
        }
      }
      if (category === "Verified contracts") {
        if (currentValue.verified) {
          return prevValue + 1
        }
      }
      if (currentValue.tags.indexOf(category) !== -1) {
        return prevValue + 1
      }
      return prevValue
    }, 0)

  const getFilteredCategories = () => {
    return [...categories, ...reputation].filter(
      (category) =>
        selectedFilters.includes(category.key) ||
        category.key === selectedCategory,
    )
  }

  const filteredCategories = getFilteredCategories()

  return (
    <MenuContainer
      className={[
        "lg:hidden z-[999] fixed top-0 left-0 w-full bg-smoked-white dark:bg-light-black",
        isNavbarScrolled ? "navbar-scrolled" : "",
        isMobileMenuOpen ? "is-active-menu" : "",
      ].join(" ")}
      ref={nav}
    >
      <div className="flex justify-center py-4 relative z-50 bg-smoked-white dark:bg-light-black">
        <div className="font-semibold text-[18px]">Filters</div>
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
          "absolute top-0 left-0 w-full h-screen hidden pt-[56px] bg-smoked-white dark:bg-light-black py-3 px-4 flex flex-col justify-between",
          isMobileMenuOpen ? "is-active-menu" : "",
        ].join(" ")}
      >
        <CategoryContainer>
          {filteredCategories.length > 0 && (
            <>
              <h3 className="block font-semibold text-xl leading-none pt-8 pb-4 text-[22px] font-bold">
                Active filters
              </h3>
              <ul
                className={`block ${hovered ? "hovered" : ""}`}
                onMouseOver={(e) => !hovered && setHovered(true)}
                onMouseLeave={(e) => hovered && setHovered(false)}
              >
                {filteredCategories.map(
                  (category) =>
                    renderCategoryCount(category.name) > 0 && (
                      <li
                        className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg min-w-[108px] mx-1 cursor-pointer flex-row mb-2 justify-start active
                    ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
                        key={category.name}
                        tabIndex={0}
                        onClick={() => {
                          if (category.key === selectedCategory) {
                            changeCategory("all")
                            router.push("/")
                          } else {
                            addFilter(category.key)
                          }
                        }}
                      >
                        <div className="flex items-center justify-between w-full py-4 px-4">
                          <div className="flex items-center">
                            <Image
                              src={
                                currentTheme === "dark"
                                  ? category.iconDark
                                  : category.icon
                              }
                              alt={category.name}
                            />
                            <p className="mt-2 font-semibold leading-none text-sm ml-3 mt-0 text-black dark:text-white">
                              {category.name}
                            </p>
                          </div>
                          <button
                            role="button"
                            className="p-0 m-0 outline-0 bg-none border-none flex"
                            onClick={() => {}}
                          >
                            <Image
                              width={16}
                              height={16}
                              alt="remove-button"
                              src={
                                currentTheme === "dark"
                                  ? crossCircleLight
                                  : crossCircle
                              }
                            />
                          </button>
                        </div>
                      </li>
                    ),
                )}
              </ul>
            </>
          )}
          {remainingFilters.length ? (
            <>
              <h3 className="block font-semibold text-xl leading-none pt-8 pb-4 text-[22px] font-semibold">
                Reputation
              </h3>
              <ul
                className={`block pb-5 ${hovered ? "hovered" : ""}`}
                onMouseOver={(e) => !hovered && setHovered(true)}
                onMouseLeave={(e) => hovered && setHovered(false)}
              >
                {remainingFilters.map((category) => (
                  <li
                    className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mx-1 min-w-[108px] cursor-pointer flex-row mb-2 justify-start ${
                      selectedCategory === category.key ? "active" : ""
                    }`}
                    key={category.name}
                    tabIndex={0}
                    onClick={() => {
                      addFilter(category.key)
                    }}
                  >
                    <div className="flex items-center justify-between w-full py-4 px-4">
                      <div className="flex items-center">
                        <Image
                          src={
                            currentTheme === "dark"
                              ? category.iconDark
                              : category.icon
                          }
                          alt={category.name}
                        />
                        <p className="mt-2 font-semibold leading-none text-sm ml-3 mt-0 text-black dark:text-white">
                          {category.name}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </CategoryContainer>
        <Button
          variant="primary"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
          style={{ width: "100%", marginBottom: 10 }}
        >
          Filter Dapps
        </Button>
      </div>
    </MenuContainer>
  )
}

export default MobileMenu
