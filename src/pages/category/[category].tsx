import FilterButton from "../../components/Button/FilterButton"
import Card from "../../components/Card/Card"
import Categories from "../../components/Categories/Categories"
import FilterMenu from "../../components/FilterMenu/FilterMenu"
import Layout from "../../components/Layout"
import Select from "../../components/Select/Select"
import {
  allCategories,
  categories,
  changeTagsToCategoriesSlug,
  reputation,
} from "../../data/categories"
import {
  filterCategoryDapps,
  filterDapps,
  generateUrl,
} from "../../helpers/category"
import {
  filterDappcardsByRating,
  getRatings,
  getRatingsFromUser,
} from "../../helpers/rating"
import sortByAttribute from "../../helpers/sort"
import { getAllDapps } from "../../hooks/getAllDapps"
import { useCategoryStore } from "../../hooks/useCategoryStore"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"

const StyledSection = styled.section`
  grid-template-areas:
    "list cards"
    "list cards";
  grid-template-columns: minmax(300px, 340px) 1fr;
  grid-column-gap: 64px;

  .featured {
    grid-area: header;
  }

  .cards {
    grid-area: cards;
  }
`

const CategoryPage = ({
  dappCards,
  category,
}: {
  dappCards: Array<DappCard & { categories: string[] }>
  category: string
}) => {
  const router = useRouter()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [dappRatings, setDappRatings] = useState<{ [key: string]: string[] }>(
    {},
  )
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const setFilters = useCategoryStore((state) => state.setFilters)
  const setRatings = useCategoryStore((state) => state.setRatings)
  const selectedFilters = useCategoryStore((state) => state.selectedFilters)
  const selectedSort = useCategoryStore((state) => state.selectedSort)
  const setSelectedSort = useCategoryStore((state) => state.setSelectedSort)
  const selectedRatings = useCategoryStore((state) => state.selectedRatings)
  useEffect(() => {
    const getAllRatings = async () => {
      const ratings = await getRatings()
      setDappRatings(ratings)
    }
    getAllRatings()
  })
  useEffect(() => {
    const url = generateUrl({
      selectedCategory,
      selectedSort,
      selectedFilters,
      selectedRatings,
    })
    if (router.isReady && selectedCategory !== "all" && router.asPath !== url) {
      router.push(url)
    }
  }, [selectedFilters, selectedSort, selectedRatings])

  useEffect(() => {
    changeCategory((router?.query?.category as string) || "all")
    return () => {
      setFilters([])
      setSelectedSort(null)
      setRatings([])
      changeCategory("all")
    }
  }, [])

  const categoryDapps = filterCategoryDapps({ dappCards, category })

  // Check if all filters apply to a category
  const filteredDapps = filterDapps({
    dappCards: categoryDapps,
    filters: selectedFilters,
  })

  const getFilterCount = () => {
    let count = 0
    if (selectedCategory !== "all") {
      count++
    }
    count += selectedFilters.length + selectedRatings.length
    return count
  }

  const filterCount = getFilterCount()
  const dappCardsByRating = filterDappcardsByRating({
    dappRatings,
    dappCards: filteredDapps,
    selectedRatings,
    isMainCategory: false,
  })
  const sortedDapps = sortByAttribute(dappCardsByRating, selectedSort)
  return (
    <Layout>
      <div className="container px-4 mx-auto mb-16 lg:mb-32">
        <StyledSection className="lg:grid lg:mt-20">
          <Categories
            className="categories"
            dappCards={dappCards}
            dappRatings={dappRatings}
          />
          <div className="cards">
            <h1 className="lg:hidden font-semibold text-xl leading-none mb-5 mt-8">
              {"Starknet " +
                allCategories.find((item) => item.key === selectedCategory)
                  ?.name}
            </h1>
            <div className="lg:block flex w-full">
              <FilterButton
                onClick={() => setShowMobileFilters(true)}
                filterCount={filterCount}
              />
              <div className="w-[164px] float-left lg:float-right">
                <Select
                  defaultValue={selectedSort}
                  placeholder="Sort By"
                  options={[
                    { label: "A-Z", value: "A-Z" },
                    { label: "Z-A", value: "Z-A" },
                  ]}
                  onChange={(sortBy) => setSelectedSort(sortBy)}
                />
              </div>
            </div>
            {showMobileFilters && (
              <FilterMenu
                dappRatings={dappRatings}
                dappCards={dappCards}
                isMobileMenuOpen={showMobileFilters}
                setIsMobileMenuOpen={setShowMobileFilters}
              />
            )}
            <div className="grid grid-cols-1 w-full gap-y-8 justify-center md:grid-cols-2 lg:grid-cols-1 lg:mx-0 gap-x-8 lg:gap-y-20 xl:grid-cols-2 2xl:grid-cols-3 lg:">
              {sortedDapps.map((card) => (
                <Card key={card.url} {...card} />
              ))}
            </div>
          </div>
        </StyledSection>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ dappCards: DappCard[] }> = async (
  context,
) => {
  const category = context?.params?.category as string

  const dapps = await getAllDapps()

  const parsedDapps = dapps.map((dapp: DappInfo & { url: string }) => ({
    short_description: dapp.short_description,
    title: dapp.name,
    tags: dapp.tags,
    url: `/${dapp.url}`,
    logo: dapp.media.logoUrl,
    image: dapp.media.previewUrl,
    categories: changeTagsToCategoriesSlug(dapp.tags),
    featured: dapp.dotw,
    annonymous: dapp.teamInfo.anonymous,
    audits: dapp.audits,
    verified: dapp.verified,
  }))

  return {
    props: {
      dappCards: parsedDapps,
      category,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{
  category: string
}> = () => {
  return {
    paths: [...categories, ...reputation].map((item) => ({
      params: {
        category: item.key,
      },
    })),
    fallback: false,
  }
}

export default CategoryPage
