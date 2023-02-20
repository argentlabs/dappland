import Button from "../../components/Button/Button"
import TooltipIconButton from "../../components/Tooltip/TooltipIconButton"
import Image from "next/future/image"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

const ButtonsContainer = styled.div`
  .visit-button {
    padding: 10px 24px;
    line-height: normal;
  }
`

const ImageContainer = styled.div``

const NFTPageStats = ({
  data,
  nftCollectionPreview,
  nftCollectionLink,
  nftCollectionName,
}: {
  data: NFTData | null
  nftCollectionPreview?: { name: string; image_url: string }[]
  nftCollectionLink?: string
  nftCollectionName?: string
}) => {
  if (!nftCollectionPreview) {
    return null
  }
  const totalVolume = data?.total_volume_all_time
    ? Math.floor((data?.total_volume_all_time / 1e18) * 1000 + Number.EPSILON) /
      1000
    : "N/A"
  let floorPrice = null
  if (data?.floor_list_price) {
    const displayFloorPrice = data?.floor_list_price / 1e18
    if (displayFloorPrice < 0.001) {
      floorPrice = "< 0.001"
    } else {
      floorPrice =
        Math.round(displayFloorPrice * 10000 + Number.EPSILON) / 10000
    }
  } else {
    floorPrice = "N/A"
  }
  return (
    <section className="lg:mt-24 lg:mb-24 mt-12 mb-12">
      <div className="mb-8">
        <div className="mb-12">
          <h2 className="text-center font-bold text-5xl leading-10 mb-2">
            {data?.name_custom || data?.name || nftCollectionName}
          </h2>
          <h3 className="text-center font-bold text-2xl">NFT Collection</h3>
        </div>
      </div>
      {data ? (
        <div className="lg:grid xl:grid-cols-4 gap-y-8 lg:gap-x-16 xl:justify-between bg-white lg:grid-cols-2 dark:bg-white/10 p-8 rounded-xl flex flex-col shadow-box-image-shadow mb-8">
          <div className="flex flex-col gap-1">
            <div className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1 flex-wrap">
              Items
              <TooltipIconButton text={"Total NFTs in collection"} />
            </div>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {data?.number_of_assets
                ? parseInt(data?.number_of_assets).toLocaleString("en-US")
                : "N/A"}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Owners
              <TooltipIconButton text={"Total number of owners"} />
            </div>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {data?.number_of_owners
                ? parseInt(data?.number_of_owners).toLocaleString("en-US")
                : "N/A"}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Floor price
              <TooltipIconButton
                text={"Lowest price of an item in collection (ETH)"}
              />
            </div>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {floorPrice} ETH
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Total volume
              <TooltipIconButton
                text={"Total value of all trades for this collection"}
              />
            </div>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {totalVolume} ETH
            </div>
          </div>
        </div>
      ) : null}
      <div className="mb-8 grid xl:grid-cols-4 gap-8 xl:justify-between xl:mt-4 lg:grid-cols-4 grid-cols-2 rounded-xl">
        {nftCollectionPreview.map((nft) => (
          <ImageContainer
            key={nft.name}
            className="image-container bg-white dark:bg-white/10 rounded-xl flex flex-col shadow-box-image-shadow overflow-hidden relative"
          >
            <Image
              src={nft.image_url}
              alt={`NFT image - nft.name`}
              width={484}
              height={644}
              layout="responsive"
              sizes="15vw"
            />
            <div className="text-[16px] text-tooltip-dark dark:text-white p-3 font-semibold">
              {nft.name}
            </div>
          </ImageContainer>
        ))}
      </div>
      <ButtonsContainer>
        <div className="flex items-center lg:justify-center w-full justify-items-start">
          <Link href={nftCollectionLink || "/"} passHref>
            <Button variant="primary" className="visit-button">
              Explore Full Collection
            </Button>
          </Link>
        </div>
      </ButtonsContainer>
    </section>
  )
}

export default NFTPageStats
