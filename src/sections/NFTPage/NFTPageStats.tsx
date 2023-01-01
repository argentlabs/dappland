import Button from "../../components/Button/Button"
import TooltipIconButton from "../../components/Tooltip/TooltipIconButton"
import Image from "next/image"
import React from "react"

const NFTPageStats = ({
  data,
  nftCollectionPreview,
}: {
  data: NFTData | null
  nftCollectionPreview?: { name: string; image_url: string }[]
}) => {
  if (!nftCollectionPreview) {
    return null
  }
  const totalVolume = data?.total_volume_all_time
    ? Math.round((data?.total_volume_all_time / 1e18) * 1000 + Number.EPSILON) /
      1000
    : "N/A"
  let floorPrice = null
  if (data?.floor_list_price) {
    const displayFloorPrice = data?.floor_list_price / 1e18
    if (displayFloorPrice < 0.001) {
      floorPrice = "< 0.001"
    } else {
      floorPrice = displayFloorPrice.toFixed(3)
    }
  } else {
    floorPrice = "N/A"
  }

  return (
    <section className="mt-24 mb-12">
      <div className="mb-8">
        <div className="mb-12">
          <h2 className="text-center font-bold text-5xl leading-10 mb-2">
            {data?.name}
          </h2>
          <h3 className="text-center font-bold text-2xl">NFT Collection</h3>
        </div>
      </div>
      {data ? (
        <div className="lg:grid xl:grid-cols-4 gap-y-8 lg:gap-x-16 xl:justify-between bg-white lg:grid-cols-2 dark:bg-white/10 p-8 rounded-xl flex flex-col shadow-box-image-shadow mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1 flex-wrap">
              Items
              <TooltipIconButton text={"Total number of NFTS"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {data?.number_of_assets
                ? parseInt(data?.number_of_assets).toLocaleString("en-US")
                : "N/A"}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Owners
              <TooltipIconButton text={"Total number of owners"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {data?.number_of_owners
                ? parseInt(data?.number_of_owners).toLocaleString("en-US")
                : "N/A"}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Floor price
              <TooltipIconButton
                text={"Lowest price of the collection item (ETH)"}
              />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {floorPrice}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Total volume
              <TooltipIconButton text={"Total Volume"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              {totalVolume}
            </div>
          </div>
        </div>
      ) : null}
      <div className="mb-12 grid xl:grid-cols-4 gap-4 xl:justify-between xl:mt-4 lg:grid-cols-4 grid-cols-2 rounded-xl">
        {nftCollectionPreview.map((nft) => (
          <div
            key={nft.name}
            className="bg-white dark:bg-white/10 rounded-xl flex flex-col shadow-box-image-shadow overflow-hidden relative"
          >
            <Image
              src={nft.image_url}
              alt={`NFT image - nft.name`}
              width="100%"
              height="100%"
              layout="responsive"
            />
            <div className="text-[16px] text-tooltip-dark dark:text-white p-3 font-semibold">
              {nft.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">
        <Button variant="primary">Explore Full Collection</Button>
      </div>
    </section>
  )
}

export default NFTPageStats
