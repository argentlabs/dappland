// next page with ssg for every file in `data` folder
import arrow from "../assets/icons/arrowLeft.svg"
import Layout from "../components/Layout"
import DappPageDetails from "../sections/DappPage/DappPageDetails"
import DappPageHeader from "../sections/DappPage/DappPageHeader"
import DappPageTwitter from "../sections/DappPage/DappPageTwitter"
import NFTPageStats from "../sections/NFTPage/NFTPageStats"
import { readdir, readFile } from "fs/promises"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import Router from "next/router"
import { useRouter } from "next/router"
import path from "path"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"

const SwiperContainer = styled.div`
  .swiper-slide {
    width: calc(100% - 32px) !important;
    margin-right: 16px;

    @media (min-width: 768px) {
      width: auto;
      max-width: 588px;

      :first-of-type {
        margin-left: 10vw;
      }
    }

    @media (min-width: 1280px) {
      :first-of-type {
        margin-left: 15vw;
      }
    }

    @media (min-width: 1536px) {
      :first-of-type {
        margin-left: 20vw;
      }
    }
  }
`

interface DappPageProps {
  dappInfo: DappInfo
  twitterPosts: TwitterData
  nftData: NFTData | null
  averageRating: number | null
  userRating: number | null
}

const DappPage: NextPage<DappPageProps> = ({
  dappInfo,
  twitterPosts,
  nftData,
  averageRating,
  userRating,
}) => {
  const [showPrev, setShowPrev] = useState(false)
  const router = useRouter()
  const name = (router?.query?.name as string) || ""
  useEffect(() => {
    // @ts-ignore
    import("swiper/css")
    const pid = setTimeout(() => {
      setShowPrev(!history.state?.options?.shallow)
    }, 40) // need to wait for next router to update
    return () => clearTimeout(pid)
  }, [])

  return (
    <Layout
      title={dappInfo.name}
      description={dappInfo.short_description}
      image={dappInfo.media.previewUrl}
    >
      <div
        className="relative max-h-[380px] min-h-[104px] lg:min-h-[420px] w-full overflow-hidden bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${dappInfo.media.bannerUrl})`,
        }}
      ></div>
      <div className="px-4 md:mx-[10vw] xl:mx-[15vw] 2xl:mx-[20vw] -mt-[40px] mb-6 xl:-mt-[80px] max-w-[1200px]">
        <div className="relative max-w-[80px] min-h-[80px] xl:min-h-[160px] xl:max-w-[160px]">
          <Image
            src={dappInfo.media.logoUrl}
            alt="icon"
            layout="fill"
            className="rounded-full"
          />
        </div>
      </div>
      {showPrev && (
        <div className="px-4 md:mx-[10vw] xl:mx-[15vw] 2xl:mx-[20vw] hidden lg:block max-w-[1200px]">
          <button
            onClick={() => Router.back()}
            className="text-pink text-xl leading-[26px] font-semibold mb-16 mt-2"
          >
            <Image src={arrow} alt="arrow" />{" "}
            <span className="ml-2">Back to search results</span>
          </button>
        </div>
      )}
      <div className="px-4 md:mx-[10vw] xl:mx-[15vw] 2xl:mx-[20vw] max-w-[1200px]">
        <DappPageHeader
          dappInfo={dappInfo}
          dappKey={name}
          averageRating={averageRating}
        />
      </div>
      {((dappInfo.media?.gallery && dappInfo.media.gallery.length > 0) ||
        dappInfo.media.videoUrl) && (
        <div className="pl-4">
          <section className="mt-20 mb-16">
            <SwiperContainer>
              <Swiper
                slidesPerView="auto"
                style={{
                  paddingBottom: "4px",
                }}
              >
                {dappInfo.media.videoUrl && (
                  <SwiperSlide key={dappInfo.media.videoUrl}>
                    <video
                      src={dappInfo.media.videoUrl}
                      className={
                        "rounded-2xl h-[240px] sm:h-[300px] lg:h-[330px] shadow-box-image-shadow object-cover"
                      }
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </SwiperSlide>
                )}
                {dappInfo.media.gallery.map((image, i) => (
                  <SwiperSlide key={image.url}>
                    <div
                      className="rounded-2xl h-[240px] sm:h-[300px] lg:h-[330px] shadow-box-image-shadow bg-no-repeat bg-center bg-cover"
                      style={{ backgroundImage: `url(${image.url})` }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperContainer>
          </section>
        </div>
      )}
      <div className="px-4 md:mx-[10vw] xl:mx-[15vw] 2xl:mx-[20vw] mb-16 lg:mb-32 max-w-[1200px]">
        <NFTPageStats
          data={nftData}
          nftCollectionPreview={dappInfo?.nft?.collectionPreview}
          nftCollectionLink={dappInfo?.nft?.collectionLink}
          nftCollectionName={dappInfo?.nft?.collectionName}
        />
        <DappPageDetails dappInfo={dappInfo} />
        <DappPageTwitter dappInfo={dappInfo} twitterPosts={twitterPosts} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<DappPageProps> = async (
  context,
) => {
  const name = context.params?.name

  if (!name) {
    throw new Error("Name not provided")
  }

  const dappFile = path.join(process.cwd(), "data", `${name}.json`)
  const content = await readFile(dappFile, "utf8")

  const dappInfo: DappInfo = JSON.parse(content)

  const dappRating = await fetch(
    `${process.env.API_URL}tokens/dapps/ratings/${name}`,
  ).then((res) => res.json())

  const nftData =
    dappInfo?.nft && dappInfo?.nft?.collectionContract
      ? await fetch(
          `https://api.aspect.co/api/v0/contract/${dappInfo.nft.collectionContract}`,
        ).then((res) => res.json())
      : null
  const twitterName =
    dappInfo.twitterName ||
    (dappInfo.links?.twitter.length > 0 &&
      dappInfo.links?.twitter.split("/").pop())

  const twitterUserIdUrl = `https://api.twitter.com/2/users/by/username/${twitterName}`

  const twitterUserId =
    twitterName &&
    (await fetch(twitterUserIdUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
      },
    }).then((res) => res.json()))

  const twitterUrl =
    twitterUserId?.data?.id &&
    `https://api.twitter.com/2/users/${twitterUserId.data.id}/tweets?max_results=5&tweet.fields=created_at,public_metrics&expansions=author_id&user.fields=profile_image_url,username,verified`

  const twitterPosts = !twitterUrl
    ? []
    : await fetch(twitterUrl, {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
        },
      }).then((res) => res.json())

  return {
    props: {
      dappInfo,
      averageRating: dappRating?.averageRating || null,
      userRating: dappRating?.userRating || null,
      twitterPosts,
      nftData,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
  const dappsDirectory = path.join(process.cwd(), "data")
  const filenames = await readdir(dappsDirectory)

  return {
    paths: filenames
      .filter((filename) => {
        return filename.endsWith(".json")
      })
      .map((filename) => ({
        params: {
          name: filename.replace(/\.json$/, ""),
        },
      })),
    fallback: false,
  }
}

export default DappPage
