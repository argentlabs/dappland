import Card from "../components/Card/Card"
import Categories from "../components/Categories/Categories"
import FeaturedCard from "../components/FeaturedCard/FeaturedVideoCard"
import Layout from "../components/Layout"
import { getAllDapps } from "../hooks/getAllDapps"
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

  .cards {
    grid-area: cards;
  }
`

const Home = ({
  dappCards,
  featuredDapp,
}: {
  dappCards: DappCard[]
  featuredDapp?: DappCard
}) => {
  return (
    <Layout isHome>
      <div className="container px-4 mx-auto mb-16 lg:mb-32">
        <StyledSection className="lg:grid lg:mt-20">
          <Categories
            className="categories lg:max-w-[340px]"
            dappCards={dappCards}
          />
          <div className="cards">
            <h3 className="lg:hidden font-semibold text-xl leading-none mb-5">
              All dapps
            </h3>
            <div className="grid grid-cols-1 w-full gap-y-8 justify-center md:grid-cols-2 lg:grid-cols-1 lg:mx-0 gap-x-8 lg:gap-y-20 xl:grid-cols-2 2xl:grid-cols-3 lg:">
              {dappCards.map((card) => (
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

  const parsedDapps = dapps.map((dapp: DappInfo & { url: string }) => ({
    short_description: dapp.short_description,
    title: dapp.name,
    tags: dapp.tags,
    url: dapp.url,
    logo: dapp.media.logoUrl,
    image: dapp.media.previewUrl,
    featured: dapp.dotw,
    annonymous: dapp.teamInfo.anonymous,
    audits: dapp.audits,
    date_added: dapp.date_added || null,
  }))

  return {
    props: {
      dappCards: parsedDapps,
      featuredDapp: null, //parsedDapps.filter((dapp) => dapp.featured)[0],
    },
  }
}

export default Home
