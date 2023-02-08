import starEmpty from "../../assets/icons/empty_star.svg"
import star from "../../assets/icons/star.svg"
import ConnectWalletModal from "../../components/Modal/ConnectWalletModal"
import { connect } from "@argent/get-starknet"
import BigNumber from "bignumber.js"
import { setCookie, getCookie, hasCookie } from "cookies-next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"

type Props = {
  dappKey?: string
  avgRating: number | null
}

const DappPageRating = ({ dappKey = "my_dapp", avgRating }: Props) => {
  const router = useRouter()
  const [averageRating, setAverageRating] = useState(avgRating)
  const [error, setError] = useState<string | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [currentRating, setCurrentRating] = useState<number | null>(
    typeof window !== "undefined"
      ? hasCookie(dappKey)
        ? parseInt((getCookie(dappKey) as string) || "")
        : null
      : null,
  )
  const [isRatingModalOpen, setRatingModalOpen] = useState(false)

  const connectToWalletAndRate = async () => {
    const starknet = await connect({
      showList: true,
    })
    setError(null)
    if (!starknet) {
      setError("User rejected wallet selection or wallet not found")
      throw Error("User rejected wallet selection or wallet not found")
    }
    if (!currentRating) {
      throw Error("Not rated")
    }
    try {
      await starknet.enable()
      if (starknet.isConnected) {
        const signature = await starknet.account.signMessage({
          message: {
            dappKey: dappKey,
            rating: currentRating + 1,
          },
          domain: {
            name: "Dappland",
            chainId: "SN_GOERLI",
            version: "1.0",
          },
          types: {
            StarkNetDomain: [
              { name: "name", type: "felt" },
              { name: "chainId", type: "felt" },
              { name: "version", type: "felt" },
            ],
            Message: [
              { name: "dappKey", type: "felt" },
              { name: "rating", type: "felt" },
            ],
          },
          primaryType: "Message",
        })

        const signatureFirstElement = new BigNumber(signature[0])
        const signatureSecondElement = new BigNumber(signature[1])

        const bodyData = {
          dappKey,
          rating: currentRating + 1,
          signature: {
            r: "0x" + signatureFirstElement.toString(16),
            s: "0x" + signatureSecondElement.toString(16),
          },
          account: starknet.selectedAddress,
        }

        const handleErrors = (response: any) => {
          if (!response.ok) {
            return response.text().then((text: string) => {
              throw new Error(text)
            })
          }
          return response.json()
        }

        await fetch(`${process.env.API_URL}tokens/dapps/ratings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        })
          .then(handleErrors)
          .then((res) => {
            setRatingModalOpen(false)
            setAverageRating(res.averageRating)
            setCookie(dappKey, currentRating)
            setError(null)
          })
          .catch((err) => {
            const parsedMessage = JSON.parse(err.message)
            if (parsedMessage.status) {
              setError("Error: " + parsedMessage.status)
            } else {
              setError("An error occurred.")
            }
          })
      } else {
        setError("Unable to connect")
      }
    } catch (err: any) {
      setError("Error connecting")
    }
  }

  return (
    <div>
      <div className="xl:mt-0 mt-12">
        <h2 className="text-[28px] leading-[34px] font-bold mb-4">Rating</h2>
        <ConnectWalletModal
          isOpen={isRatingModalOpen}
          error={error}
          onClose={() => {
            setCurrentRating(null)
            setError(null)
            setRatingModalOpen(false)
          }}
          onConfirm={() => {
            connectToWalletAndRate()
          }}
        />
        <div className="flex items-end gap-1 mb-6">
          {averageRating ? (
            <>
              <h3 className="text-[64px] leading-[64px] font-bold">
                {averageRating}
              </h3>
              <div className="text-[20px] font-bold dark:text-white text-[#8C8C8C]">
                /
              </div>
              <div className="text-[20px] font-bold dark:text-white text-[#8C8C8C]">
                5
              </div>
            </>
          ) : (
            <h3 className="text-[18px] leading-[24px]">Not rated yet</h3>
          )}
        </div>
        <div className="mb-2">Your Rating</div>
        <div className="flex items-center gap-1">
          {Array.from(Array(5).keys()).map((val) => (
            <button
              key={val}
              onMouseEnter={() => setHoverIndex(val)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                setCurrentRating(val)
                setRatingModalOpen(true)
              }}
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
                className="z-[2]"
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
