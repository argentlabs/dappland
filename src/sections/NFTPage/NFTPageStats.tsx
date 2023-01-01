import Button from "../../components/Button/Button"
import TooltipIconButton from "../../components/Tooltip/TooltipIconButton"
import React from "react"

const NFTPageStats = () => {
  return (
    <section className="mt-24">
      <div className="mb-24">
        <h2 className="text-center font-bold text-5xl mb-12">Last 7 Days</h2>
        <div className="lg:grid xl:grid-cols-4 gap-y-8 lg:gap-x-16 xl:justify-between bg-white lg:grid-cols-2 dark:bg-white/10 p-8 rounded-xl flex flex-col shadow-box-image-shadow">
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1 flex-wrap">
              Items
              <TooltipIconButton text={"Total number of NFTS"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              776
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Owners
              <TooltipIconButton text={"Total number of owners"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              476
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
              0.11
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Total volume
              <TooltipIconButton text={"Total Volume"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              1.05
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-12">
          <h2 className="text-center font-bold text-5xl leading-10 mb-2">
            Star Monsterz
          </h2>
          <h3 className="text-center font-bold text-2xl">NFT Collection</h3>
        </div>
        <div className="lg:grid xl:grid-cols-4 lg:gap-x-16 gap-y-8 xl:justify-between bg-white lg:grid-cols-2 dark:bg-white/10 p-8 rounded-xl flex flex-col shadow-box-image-shadow">
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1 flex-wrap">
              Items
              <TooltipIconButton text={"Total number of NFTS"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              776
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Owners
              <TooltipIconButton text={"Total number of owners"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              476
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Floor price
              <TooltipIconButton text={"Lowest price of the collection item"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              0.11
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 flex gap-1">
              Total volume
              <TooltipIconButton text={"Total Volume"} />
            </p>
            <div className="text-black dark:text-white font-bold text-[34px] leading-9">
              1.05
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12 grid xl:grid-cols-4 gap-4 xl:justify-between xl:mt-4 lg:grid-cols-4 grid-cols-2 rounded-xl">
        <div className="bg-white dark:bg-white/10 rounded-xl flex flex-col shadow-box-image-shadow overflow-hidden">
          <img
            src={
              "https://mintsquare.sfo3.cdn.digitaloceanspaces.com/mintsquare/assets/0x059df550c89bebee3808b2256d76001e1a3703817e04781c17bd75b17b4959f2/QmcXQBTqPrchbvWBV35qnqR3YHQFU4KkjyhkGduMsef9Gf"
            }
          />
          <div className="text-[16px] text-tooltip-dark dark:text-white p-3 font-semibold">
            Star Monsterz #51
          </div>
        </div>
        <div className="bg-white dark:bg-white/10 rounded-xl flex flex-col shadow-box-image-shadow overflow-hidden">
          <img
            src={
              "https://mintsquare.sfo3.cdn.digitaloceanspaces.com/mintsquare/assets/0x059df550c89bebee3808b2256d76001e1a3703817e04781c17bd75b17b4959f2/QmS1aZh8NDcULS4rKLJQYAx1aseygU6s1GuxEenz4Pi1tr"
            }
          />
          <div className="text-[16px] text-tooltip-dark dark:text-white p-3 font-semibold">
            Star Monsterz #51
          </div>
        </div>
        <div className="bg-white dark:bg-white/10 rounded-xl flex flex-col shadow-box-image-shadow overflow-hidden">
          <img
            src={
              "https://mintsquare.sfo3.cdn.digitaloceanspaces.com/mintsquare/assets/0x059df550c89bebee3808b2256d76001e1a3703817e04781c17bd75b17b4959f2/QmThmPoGdro8dgBUXAy43NrBmURvRkDf4echH64ZH6VuiK"
            }
          />
          <div className="text-[16px] text-tooltip-dark dark:text-white p-3 font-semibold">
            Star Monsterz #51
          </div>
        </div>
        <div className="bg-white dark:bg-white/10 rounded-xl flex flex-col shadow-box-image-shadow overflow-hidden">
          <img
            src={
              "https://mintsquare.sfo3.cdn.digitaloceanspaces.com/mintsquare/assets/0x059df550c89bebee3808b2256d76001e1a3703817e04781c17bd75b17b4959f2/QmTaQgNoLaxqNJjNbpLeXBNKP1SBwEP2siuAjBJn5X1Pbm"
            }
          />
          <div className="text-[16px] text-tooltip-dark dark:text-white p-3 font-semibold">
            Star Monsterz #51
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button variant="primary">Explore Full Collection</Button>
      </div>
    </section>
  )
}

export default NFTPageStats
