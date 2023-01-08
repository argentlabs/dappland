import Card from "../../components/Card/Card"
import Categories from "../../components/Categories/Categories"
import Layout from "../../components/Layout"
import {
  allCategories,
  categories,
  changeTagsToCategoriesSlug,
  reputation,
} from "../../data/categories"
import { getAllDapps } from "../../hooks/getAllDapps"
import { useCategoryStore } from "../../hooks/useCategoryStore"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
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
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const setFilters = useCategoryStore((state) => state.setFilters)
  const selectedFilters = useCategoryStore((state) => state.selectedFilters)
  useEffect(() => {
    const allFilters = selectedFilters.join(",")
    if (selectedCategory !== "all") {
      const url = `/category/${selectedCategory}${
        selectedFilters.length ? `?filters=${allFilters}` : ``
      }`
      router.push(url)
    }
  }, [selectedFilters])

  useEffect(() => {
    changeCategory((router?.query?.category as string) || "all")
    return () => {
      setFilters([])
      changeCategory("all")
    }
  }, [])

  const categoryDapps = dappCards.filter((dapp) => {
    if (category === "dotw") {
      return dapp.featured
    }
    if (category === "doxxed") {
      return !dapp.annonymous
    }
    if (category === "audited") {
      return dapp.audits && dapp.audits.length > 0
    }
    return dapp.categories.includes(category)
  })

  // Check if all filters apply to a category
  const filteredDapps = categoryDapps.filter((dapp) => {
    return (
      selectedFilters.reduce((acc, val) => {
        if (val === "dotw" && dapp.featured) {
          acc = acc + 1
        }
        if (val === "doxxed" && !dapp.annonymous) {
          acc = acc + 1
        }
        if (val === "audited" && dapp.audits && dapp.audits.length > 0) {
          acc = acc + 1
        }
        if (dapp.categories.includes(val)) {
          acc = acc + 1
        }
        return acc
      }, 0) === selectedFilters.length
    )
  })

  return (
    <Layout>
      <div className="container px-4 mx-auto mb-16 lg:mb-32">
        <StyledSection className="lg:grid lg:mt-20">
          <Categories className="categories" dappCards={dappCards} />
          <div className="cards">
            <h3 className="lg:hidden font-semibold text-xl leading-none mb-5">
              {
                allCategories.find((item) => item.key === selectedCategory)
                  ?.name
              }{" "}
              dapps
            </h3>
            <div className="grid grid-cols-1 w-full gap-y-8 justify-center md:grid-cols-2 lg:grid-cols-1 lg:mx-0 gap-x-8 lg:gap-y-20 xl:grid-cols-2 2xl:grid-cols-3 lg:">
              {filteredDapps.map((card) => (
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
