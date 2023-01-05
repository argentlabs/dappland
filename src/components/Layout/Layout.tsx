import Footer from "./Footer"
import Header from "./Header"
import HomeHeader from "./HomeHeader"
import Head from "next/head"
import styled from "styled-components"

const MainContainer = styled.main<{ isHome?: boolean }>`
  padding-top: ${(p) => (p.isHome ? "196px" : "56px")};
  @media (min-width: 1024px) {
    padding-top: 0;
  }
`

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  isHome?: boolean
}

export const Layout = ({
  children,
  title,
  description,
  image,
  isHome,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {title
            ? `${title} on Dappland – The best dapps on StarkNet`
            : `Dappland | The best dapps on StarkNet`}
        </title>
        <meta
          name="description"
          content={
            description
              ? `${description}`
              : `Dappland | The best dapps on StarkNet`
          }
        />

        <meta property="og:site_name" content="dappland.com" />
        <meta
          property="og:title"
          content={
            title
              ? `Discover ${title} on Dappland – The best dapps on StarkNet`
              : `Dappland | The best dapps on StarkNet`
          }
        />
        {description && <meta name="og:description" content={description} />}
        <meta
          name="og:image"
          content={image ?? "https://www.dappland.com/share-preview.png"}
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={
            title
              ? `Discover ${title} on Dappland – The best dapps on StarkNet`
              : `Dappland | The best dapps on StarkNet`
          }
        />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        {image && <meta name="twitter:image" content={image} />}
        <meta name="twitter:site" content="@argentHQ" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {!isHome ? <Header /> : <HomeHeader />}
      <MainContainer isHome={isHome}>{children}</MainContainer>
      <Footer />
    </>
  )
}
