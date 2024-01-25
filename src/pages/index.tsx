import featuredDappImage from "../../public/dapps/ekubo/dotm-ekubo.jpg"
import FilterButton from "../components/Button/FilterButton"
import Card from "../components/Card/Card"
import Categories from "../components/Categories/Categories"
import DappOfTheMonth from "../components/FeaturedCard/DappOfTheMonth"
import FilterMenu from "../components/FilterMenu/FilterMenu"
import Layout from "../components/Layout"
import Select from "../components/Select/Select"
import { getAllDapps } from "../data/getAllDapps"
import { filterDappcardsByRating, getRatings } from "../helpers/rating"
import sortByAttribute from "../helpers/sort"
import { useCategoryStore } from "../hooks/useCategoryStore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"

const StyledSection = styled.section`
  grid-template-areas:
    "list header"
    "list cards";
  grid-template-columns: minmax(300px, 340px) 1fr;
  grid-column-gap: 64px;

  .featured {
    grid-area: header;
  }

  .categories {
    grid-area: list;
  }
`

const Home = ({
  dappCards,
  featuredDapp,
}: {
  dappCards: DappCard[]
  featuredDapp?: DappCard
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [ratings, setRatings] = useState<{ [key: string]: string[] }>({})
  const router = useRouter()
  const selectedFilters = useCategoryStore((state) => state.selectedFilters)
  const selectedRatings = useCategoryStore((state) => state.selectedRatings)
  const selectedSort = useCategoryStore((state) => state.selectedSort)
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const setSelectedSort = useCategoryStore((state) => state.setSelectedSort)

  useEffect(() => {
    const getAllRatings = async () => {
      const ratings = await getRatings()
      setRatings(ratings)
    }
    getAllRatings()
  }, [])

  useEffect(() => {
    const allFilters = selectedFilters.join(",")
    const allRatings = selectedRatings.join(",")
    const sortBy = selectedSort
    let url = "/"
    if (allFilters.length) {
      url += `?filters=${allFilters}`
    }
    if (sortBy && sortBy.length) {
      url += `${allFilters.length ? "&" : "?"}sort=${sortBy}`
    }
    if (selectedRatings.length) {
      url += `${
        allFilters.length || (sortBy && sortBy.length) ? "&" : "?"
      }ratings=${allRatings}`
    }
    if (router.isReady && selectedCategory === "all") {
      router.push(url)
    }
  }, [selectedFilters, selectedSort, selectedCategory, selectedRatings])

  const filteredDapps = dappCards.filter((dapp) => {
    return (
      selectedFilters.reduce((acc, val) => {
        if (val === "featured" && dapp.featured) {
          acc = acc + 1
        }
        if (val === "doxxed" && !dapp.anonymous) {
          acc = acc + 1
        }
        if (val === "audited" && dapp.audits && dapp.audits.length > 0) {
          acc = acc + 1
        }
        if (val === "verified" && dapp.verified) {
          acc = acc + 1
        }
        return acc
      }, 0) === selectedFilters.length
    )
  })
  const dappsByRating = filterDappcardsByRating({
    dappCards: filteredDapps,
    dappRatings: ratings,
    isMainCategory: false,
    selectedRatings,
  })
  const sortedDapps = sortByAttribute(dappsByRating, selectedSort)
  const filterCount = selectedFilters.length + selectedRatings.length
  return (
    <Layout /*isHome*/>
      <div className="container px-4 mx-auto mb-16 lg:mb-32">
        <StyledSection className="lg:grid lg:mt-20">
          <Categories
            isHome
            className="categories lg:max-w-[340px]"
            dappCards={dappCards}
            dappRatings={ratings}
          />
          <div className="cards">
            <DappOfTheMonth
              name="Ekubo"
              image={featuredDappImage}
              url="/ekubo"
              className="featured"
            />
            <h3 className="lg:hidden font-semibold text-xl leading-none mb-5">
              All dapps
            </h3>
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
                dappRatings={ratings}
                dappCards={dappCards}
                isMobileMenuOpen={showMobileFilters}
                setIsMobileMenuOpen={setShowMobileFilters}
              />
            )}
            <div className="grid grid-cols-1 w-full gap-y-8 justify-center md:grid-cols-2 lg:grid-cols-1 lg:mx-0 gap-x-20 lg:gap-y-20 xl:grid-cols-2 2xl:grid-cols-3">
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

export const getStaticProps = async () => {
  const dapps = await getAllDapps()
  const ratingsParsed = await getRatings()

  const parsedDapps = dapps.map((dapp: DappInfo & { url: string }) => ({
    short_description: dapp.short_description,
    title: dapp.name,
    tags: dapp.tags,
    url: dapp.url,
    logo: dapp.media.logoUrl,
    image: dapp.media.previewUrl,
    featured: dapp.dotm,
    anonymous: dapp.teamInfo.anonymous,
    audits: dapp.audits,
    verified: dapp.verified,
  }))

  return {
    props: {
      dappCards: parsedDapps,
      featuredDapp: null, //parsedDapps.filter((dapp) => dapp.featured)[0],
      ratings: ratingsParsed,
    },
  }
}

export default Home
