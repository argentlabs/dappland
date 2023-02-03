import crossCircle from "../../assets/icons/crossCircle.svg"
import crossCircleLight from "../../assets/icons/crossCircleLight.svg"
import star from "../../assets/icons/star.svg"
import { categories, ratings, reputation } from "../../data/categories"
import { checkIfCategoryExists, generateUrl } from "../../helpers/category"
import { filterDappcardsByRating } from "../../helpers/rating"
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
  dappRatings,
}: {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (val: boolean) => void
  dappCards: DappCard[]
  dappRatings: { [key: string]: string[] }
}) => {
  const router = useRouter()
  const { currentTheme, setTheme } = useDarkMode()

  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)

  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const selectedRatings = useCategoryStore((state) => state.selectedRatings)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const selectedFilters = useCategoryStore((state) => state.selectedFilters)
  const selectedSort = useCategoryStore((state) => state.selectedSort)
  const addFilter = useCategoryStore((state) => state.addFilter)
  const addRating = useCategoryStore((state) => state.addRating)

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

  const remainingRatings = ratings.filter(
    (rating) => !selectedRatings.includes(rating.key),
  )

  const combinedFilters = [...remainingFilters, ...remainingRatings]

  const checkIfAnyCategoryIsActive = () =>
    [...categories, ...reputation, ...ratings].some(
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

  const renderCategoryCount = (
    category: string,
    isMainCategory?: boolean,
    isRatingCategory?: boolean,
  ) => {
    const dappCardsFilteredByRating = !isRatingCategory
      ? filterDappcardsByRating({
          dappCards,
          dappRatings,
          selectedRatings,
          isMainCategory,
        })
      : dappCards
    const selectedCategoryName =
      selectedCategory !== "all"
        ? categories.find((cat) => cat.key === selectedCategory)?.name
        : null
    const allFilters =
      selectedCategoryName && !isMainCategory
        ? [selectedCategoryName, category, ...selectedFilters]
        : [category, ...selectedFilters]
    return dappCardsFilteredByRating.reduce((prevValue, currentValue) => {
      const filtersCount = allFilters.reduce((prevFiltersCount, nextFilter) => {
        const filterMatched = checkIfCategoryExists(
          currentValue,
          nextFilter,
          dappRatings,
        )
        return filterMatched ? prevFiltersCount + 1 : prevFiltersCount
      }, 0)
      return filtersCount === allFilters.length ? prevValue + 1 : prevValue
    }, 0)
  }

  const getFilteredCategories = () => {
    return [...categories, ...reputation, ...ratings]
      .filter(
        (category) =>
          selectedFilters.includes(category.key) ||
          selectedRatings.includes(category.key) ||
          category.key === selectedCategory,
      )
      .map((category) => ({
        ...category,
        isRating: selectedRatings.includes(category.key),
      }))
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
                {filteredCategories.map((category) => (
                  <li
                    className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg min-w-[108px] mx-1 cursor-pointer flex-row mb-2 justify-start active
                    ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
                    key={category.name}
                    tabIndex={0}
                    onClick={() => {
                      if (category.key === selectedCategory) {
                        changeCategory("all")
                        router.push(
                          generateUrl({
                            selectedSort,
                            selectedRatings,
                            selectedFilters,
                            selectedCategory: "all",
                          }),
                        )
                      } else {
                        if (category.isRating) {
                          addRating(category.key)
                        } else {
                          addFilter(category.key)
                        }
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full py-4 px-4">
                      <div className="flex items-center">
                        {category.isRating ? (
                          <div className="flex items-center gap-1.5">
                            {[...Array(parseInt(category.name))].map(
                              (val, i) => (
                                <Image
                                  src={
                                    currentTheme === "dark"
                                      ? category.iconDark
                                      : category.icon
                                  }
                                  key={i}
                                  alt={category.name}
                                />
                              ),
                            )}
                          </div>
                        ) : (
                          <Image
                            src={
                              currentTheme === "dark"
                                ? category.iconDark
                                : category.icon
                            }
                            alt={category.name}
                          />
                        )}
                        <p className="mt-2 font-semibold leading-none text-sm ml-3 mt-0 text-black dark:text-white">
                          {category.isRating ? "" : category.name}
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
                ))}
              </ul>
            </>
          )}
          {combinedFilters.length ? (
            <>
              {checkIfCategoryHasDapps(combinedFilters) && (
                <h3 className="block font-semibold text-xl leading-none pt-8 pb-4 lg:text-[22px] lg:font-bold">
                  Reputation
                </h3>
              )}
              <ul
                className={`block pb-5 ${hovered ? "hovered" : ""}`}
                onMouseOver={(e) => !hovered && setHovered(true)}
                onMouseLeave={(e) => hovered && setHovered(false)}
              >
                {remainingFilters.map(
                  (category) =>
                    renderCategoryCount(category.name) > 0 && (
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
                          <p className="text-light-charcoal dark:text-clay text-sm font-semibold leading-none ml-auto block">
                            {renderCategoryCount(category.name)}
                          </p>
                        </div>
                      </li>
                    ),
                )}
                {remainingRatings.map(
                  (category) =>
                    renderCategoryCount(category.name, false, true) > 0 && (
                      <li
                        className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mx-1 min-w-[108px] cursor-pointer flex-row mb-2 justify-start ${
                          selectedCategory === category.key ? "active" : ""
                        }`}
                        key={category.name}
                        tabIndex={0}
                        onClick={() => {
                          addRating(category.key)
                        }}
                      >
                        <div className="flex items-center justify-between w-full py-4 px-4">
                          <div className="flex items-center">
                            <div className="flex items-center gap-1.5">
                              {[...Array(parseInt(category.name))].map(
                                (val, i) => (
                                  <Image
                                    src={star}
                                    alt={`${category.name}-star`}
                                    key={`${category.name}-${i}-star`}
                                  />
                                ),
                              )}
                            </div>
                          </div>
                          <p className="text-light-charcoal dark:text-clay text-sm font-semibold leading-none ml-auto block">
                            {renderCategoryCount(category.name, false, true)}
                          </p>
                        </div>
                      </li>
                    ),
                )}
              </ul>
            </>
          ) : null}
          <Button
            variant="primary"
            withoutMobile
            className="w-full"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
          >
            Filter Dapps
          </Button>
        </CategoryContainer>
      </div>
    </MenuContainer>
  )
}

export default MobileMenu
