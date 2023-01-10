import starEmpty from "../../assets/icons/empty_star.svg"
import star from "../../assets/icons/star.svg"
import { connect } from "@argent/get-starknet"
import Image from "next/image"
import React, { useState } from "react"

type Props = {
  dappKey?: string
  rating?: number
  avgRating: number | null
}

const DappPageRating = ({
  dappKey = "my_dapp",
  rating,
  avgRating = 4.8,
}: Props) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [currentRating, setCurrentRating] = useState<number | null>(
    rating || null,
  )

  const connectToWalletAndRate = async (rating: number) => {
    const starknet = await connect()
    if (!starknet) {
      throw Error("User rejected wallet selection or wallet not found")
    }
    setCurrentRating(rating)
    try {
      await starknet.enable()
      if (starknet.isConnected) {
        const signature = await starknet.account.signMessage({
          message: {
            dappKey: dappKey,
            rating,
          },
          domain: {
            name: "Example DApp",
            chainId: "SN_GOERLI",
            version: "0.0.1",
          },
          types: {
            StarkNetDomain: [
              { name: "name", type: "felt" },
              { name: "chainId", type: "felt" },
              { name: "version", type: "felt" },
            ],
            Message: [
              { name: "dappKey", type: "string" },
              { name: "rating", type: "number" },
            ],
          },
          primaryType: "Message",
        })

        const bodyData = {
          dappKey,
          rating,
          signature,
          signer: starknet.selectedAddress,
        }

        console.log(bodyData)
        /*
        const response = await fetch(
          "https://cloud-dev.argent-api.com/v1/tokens/dapps/ratings",
          {
            method: "POST",
            body: JSON.stringify(bodyData),
          },
        )
        
       */
      }
    } catch (err) {
      setCurrentRating(null)
    }
  }

  return (
    <div>
      <div className="xl:mt-0 mt-12">
        <h2 className="text-[28px] leading-[34px] font-bold mb-4">Rating</h2>
        <div className="flex items-end gap-1 mb-6">
          <h3 className="text-[64px] leading-[64px] font-bold">{avgRating}</h3>
          <div>/</div>
          <div>5</div>
        </div>
        <div className="mb-2">Your Rating</div>
        <div className="flex items-center gap-1">
          {Array.from(Array(5).keys()).map((val) => (
            <button
              key={val}
              onMouseEnter={() => setHoverIndex(val)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => connectToWalletAndRate(val)}
            >
              <Image
                width={28}
                height={28}
                src={
                  hoverIndex !== null
                    ? hoverIndex >= val
                      ? star
                      : starEmpty
                    : currentRating !== null && currentRating >= val
                    ? star
                    : starEmpty
                }
                alt="star-empty"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DappPageRating
