import crossCircle from "../../assets/icons/crossCircle.svg"
import crossCircleLight from "../../assets/icons/crossCircleLight.svg"
import star from "../../assets/icons/star.svg"
import { categories, reputation, ratings } from "../../data/categories"
import { checkIfCategoryExists, generateUrl } from "../../helpers/category"
import { filterDappcardsByRating } from "../../helpers/rating"
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
  isHome?: boolean
  dappRatings: { [key: string]: string[] }
}

const Categories = ({
  className,
  dappCards,
  dappRatings,
  isHome,
}: CategoriesProps) => {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const { currentTheme } = useDarkMode()

  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const selectedSort = useCategoryStore((state) => state.selectedSort)
  const selectedFilters = useCategoryStore((state) => state.selectedFilters)
  const addFilter = useCategoryStore((state) => state.addFilter)
  const setFilters = useCategoryStore((state) => state.setFilters)
  const selectedRatings = useCategoryStore((state) => state.selectedRatings)
  const addRating = useCategoryStore((state) => state.addRating)
  const setRatings = useCategoryStore((state) => state.setRatings)
  const setSelectedSort = useCategoryStore((state) => state.setSelectedSort)

  useEffect(() => {
    if (router.isReady) {
      const filters = (router?.query?.filters as string)?.split(",") || []
      const sortBy = router?.query?.sort as string
      const category = (router?.query?.category as string) || "all"
      const ratings = (router?.query?.ratings as string)?.split(",") || []
      setFilters(filters)
      setRatings(ratings)
      setSelectedSort(sortBy && sortBy.length ? sortBy : null)
      changeCategory(category)
    }
  }, [
    router.isReady,
    router?.query?.filters,
    router?.query?.sort,
    router?.query?.category,
    router?.query?.ratings,
  ])

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

  const checkIfAnyCategoryIsActive = () =>
    [...categories, ...reputation, ...ratings].some(
      (category) => category.key === selectedCategory,
    )

  const checkIfCategoryHasDapps = (
    category: Array<{ key: string; name: string; icon: any }>,
    isMainCategory?: boolean,
    isRatingCategory?: boolean,
  ) => {
    let activeCategories = 0
    category.forEach((item) => {
      if (
        renderCategoryCount(item.name, isMainCategory, isRatingCategory) > 0 &&
        (isMainCategory ||
          (!selectedFilters.includes(item.key) &&
            !selectedRatings.includes(item.key)))
      ) {
        activeCategories++
      }
    })
    return Boolean(activeCategories)
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
    <CategoryContainer
      className={["mb-4", className ? className : ""].join(" ")}
    >
      {filteredCategories.length > 0 && (
        <>
          <h3 className="hidden lg:block font-semibold text-xl leading-none pt-8 pb-4 lg:text-[22px] lg:font-bold">
            Active filters
          </h3>
          <ul
            className={`hidden lg:block ${hovered ? "hovered" : ""}`}
            onMouseOver={(e) => !hovered && setHovered(true)}
            onMouseLeave={(e) => hovered && setHovered(false)}
          >
            {filteredCategories.map((category) => (
              <li
                className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mr-2 min-w-[108px] cursor-pointer flex-row mb-2 justify-start active
                    } ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
                key={category.name}
                tabIndex={0}
                onClick={() => {
                  if (category.key === selectedCategory) {
                    changeCategory("all")
                    router.push(
                      generateUrl({
                        selectedSort: selectedSort,
                        selectedFilters: selectedFilters,
                        selectedRatings: selectedRatings,
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
                        {[...Array(parseInt(category.name))].map((val, i) => (
                          <Image
                            src={
                              currentTheme === "dark"
                                ? category.iconDark
                                : category.icon
                            }
                            key={i}
                            alt={category.name}
                          />
                        ))}
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
                        currentTheme === "dark" ? crossCircleLight : crossCircle
                      }
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {checkIfCategoryHasDapps(categories, true) && (
        <h3 className="font-semibold text-xl leading-none pt-8 pb-4 lg:text-[22px] lg:font-bold">
          Categories
        </h3>
      )}
      <ul
        className={`flex overflow-x-scroll lg:flex-col lg:overflow-auto pb-2 lg:pb-0 ${
          hovered ? "hovered" : ""
        }`}
        onMouseOver={(e) => !hovered && setHovered(true)}
        onMouseLeave={(e) => hovered && setHovered(false)}
      >
        {categories
          .filter((category) => category.key !== selectedCategory)
          .map(
            (category) =>
              (renderCategoryCount(category.name, true) > 0 ||
                selectedFilters.length ||
                selectedRatings.length ||
                selectedCategory !== "all") && (
                <Link
                  href={generateUrl({
                    selectedCategory: category.key,
                    selectedRatings,
                    selectedSort,
                    selectedFilters,
                  })}
                  key={category.key}
                >
                  <a>
                    <li
                      className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mr-2 min-w-[108px] cursor-pointer lg:flex-row lg:mb-2 lg:justify-start ${
                        selectedCategory === category.key ? "active" : ""
                      } ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
                      key={category.name}
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-center w-full lg:justify-between py-4 px-4">
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
                          {!selectedFilters.length && !selectedRatings.length
                            ? renderCategoryCount(category.name, true)
                            : ""}
                        </p>
                      </div>
                    </li>
                  </a>
                </Link>
              ),
          )}
      </ul>
      {checkIfCategoryHasDapps(reputation) ||
      checkIfCategoryHasDapps(ratings, false, true) ? (
        <h3 className="hidden lg:block font-semibold text-xl leading-none pt-8 pb-4 lg:text-[22px] lg:font-bold">
          Reputation
        </h3>
      ) : null}
      <ul
        className={`hidden lg:block pb-5 ${hovered ? "hovered" : ""}`}
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
        {ratings
          .filter((rating) => !selectedRatings.includes(rating.key))
          .map(
            (category, i) =>
              renderCategoryCount(category.name, false, true) > 0 && (
                <li
                  className={`flex flex-col items-center justify-center bg-white dark:bg-white/10 shadow-box-image-shadow rounded-lg mr-2 min-w-[108px] cursor-pointer lg:flex-row lg:mb-2 lg:justify-start ${
                    selectedCategory === category.key ? "active" : ""
                  } ${checkIfAnyCategoryIsActive() ? "with-blur" : ""}`}
                  key={category.name}
                  tabIndex={0}
                  onClick={() => {
                    addRating(category.key)
                  }}
                >
                  <div className="flex items-center justify-between w-full py-4 px-4">
                    <div className="flex items-center">
                      <div className="flex items-center gap-1.5">
                        {[...Array(parseInt(category.name))].map((val, i) => (
                          <Image
                            src={star}
                            alt={`${category.name}-star`}
                            key={`${category.name}-${i}-star`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-light-charcoal dark:text-clay text-sm font-semibold leading-none ml-auto hidden lg:block">
                      {renderCategoryCount(category.name, false, true)}
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
