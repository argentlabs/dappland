import crossCircle from "../../assets/icons/crossCircle.svg"
import crossCircleLight from "../../assets/icons/crossCircleLight.svg"
import { categories, reputation } from "../../data/categories"
import { useCategoryStore } from "../../hooks/useCategoryStore"
import { useDarkMode } from "../../hooks/useDarkMode"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"

const CategoryContainer = styled.div`
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

interface CategoriesProps {
  className?: string
  dappCards: DappCard[]
}

const Categories = ({ className, dappCards }: CategoriesProps) => {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const { currentTheme } = useDarkMode()

  const selectedCategory = useCategoryStore((state) => state.selectedCategory)

  const changeCategory = useCategoryStore((state) => state.changeCategory)

  const selectedFilters = useCategoryStore((state) => state.selectedFilters)

  const addFilter = useCategoryStore((state) => state.addFilter)

  const resetFilters = useCategoryStore((state) => state.resetFilters)

  useEffect(() => {
    changeCategory((router?.query?.category as string) || "all")
    resetFilters()
  }, [])

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
      if (currentValue.tags.indexOf(category) !== -1) {
        return prevValue + 1
      }
      return prevValue
    }, 0)

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

  const getFilteredCategories = () => {
    return [...categories, ...reputation].filter((category) =>
      selectedFilters.includes(category.key),
    )
  }

  const filteredCategories = getFilteredCategories()

  return (
    <CategoryContainer
      className={["mb-4", className ? className : ""].join(" ")}
    >
      {filteredCategories.length > 0 && (
        <>
          <h3 className="font-semibold text-xl leading-none lg:text-[22px] lg:font-bold pb-3 lg:pb-4">
            Active Filters
          </h3>
          <ul
            className={`hidden lg:block pt-3 pb-5 pl-1 lg:pt-4 ${
              hovered ? "hovered" : ""
            }`}
            onMouseOver={(e) => !hovered && setHovered(true)}
            onMouseLeave={(e) => hovered && setHovered(false)}
          >
            {filteredCategories.map(
              (category) =>
                renderCategoryCount(category.name) > 0 && (
                  <li
                    className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mr-2 min-w-[108px] cursor-pointer lg:flex-row lg:mb-2 lg:justify-start ${
                      selectedCategory === category.key ? "active" : ""
                    } ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
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
                        <p className="mt-2 font-semibold leading-none text-sm lg:ml-3 lg:mt-0 text-black dark:text-white">
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
      {checkIfCategoryHasDapps(categories) && (
        <h3 className="font-semibold text-xl leading-none lg:text-[22px] lg:font-bold pb-3 lg:pb-4">
          Categories
        </h3>
      )}
      <ul
        className={`flex overflow-x-scroll pl-1 lg:flex-col lg:overflow-auto ${
          hovered ? "hovered" : ""
        }`}
        onMouseOver={(e) => !hovered && setHovered(true)}
        onMouseLeave={(e) => hovered && setHovered(false)}
      >
        {categories.map(
          (category) =>
            renderCategoryCount(category.name) > 0 && (
              <li
                className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mr-2 min-w-[108px] cursor-pointer lg:flex-row lg:mb-2 lg:justify-start ${
                  selectedCategory === category.key ? "active" : ""
                } ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
                key={category.name}
                tabIndex={0}
                onClick={() => changeCategory(category.key)}
              >
                <Link href={`/category/${category.key}`}>
                  <a className="flex items-center justify-center w-full lg:justify-between py-4 px-4">
                    <div className="flex items-center flex-col lg:flex-row">
                      <Image
                        src={
                          currentTheme === "dark"
                            ? category.iconDark
                            : category.icon
                        }
                        alt={category.name}
                      />
                      <p className="mt-2 font-semibold leading-none text-sm lg:ml-3 lg:mt-0 text-black dark:text-white">
                        {category.name}
                      </p>
                    </div>
                    <p className="text-light-charcoal dark:text-clay text-sm font-semibold leading-none ml-auto hidden lg:block">
                      {renderCategoryCount(category.name)}
                    </p>
                  </a>
                </Link>
              </li>
            ),
        )}
      </ul>
      {checkIfCategoryHasDapps(reputation) && (
        <h3 className="hidden lg:block font-semibold text-xl leading-none lg:text-[22px] lg:font-bold pt-5 lg:pt-10">
          Reputation
        </h3>
      )}
      <ul
        className={`hidden lg:block pt-3 pb-5 pl-1 lg:pt-4 ${
          hovered ? "hovered" : ""
        }`}
        onMouseOver={(e) => !hovered && setHovered(true)}
        onMouseLeave={(e) => hovered && setHovered(false)}
      >
        {reputation
          .filter((rep) => !selectedFilters.includes(rep.key))
          .map(
            (category) =>
              renderCategoryCount(category.name) > 0 && (
                <li
                  className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mr-2 min-w-[108px] cursor-pointer lg:flex-row lg:mb-2 lg:justify-start ${
                    selectedCategory === category.key ? "active" : ""
                  } ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
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
                      <p className="mt-2 font-semibold leading-none text-sm lg:ml-3 lg:mt-0 text-black dark:text-white">
                        {category.name}
                      </p>
                    </div>
                    <p className="text-light-charcoal dark:text-clay text-sm font-semibold leading-none ml-auto hidden lg:block">
                      {renderCategoryCount(category.name)}
                    </p>
                  </div>
                </li>
              ),
          )}
      </ul>
    </CategoryContainer>
  )
}

export default Categories
