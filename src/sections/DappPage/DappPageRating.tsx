import starEmpty from "../../assets/icons/starEmpty.svg"
import starFilled from "../../assets/icons/starFilled.svg"
import ConnectWalletModal from "../../components/Modal/ConnectWalletModal"
import { useWalletConnectionContext } from "../../contexts/WalletConnectionProvider"
import { getRatingForDapp, getRatingsFromUser } from "../../helpers/rating"
import { UseWalletConnectionProps } from "../../hooks/useWalletConnection"
import { setCookie, getCookie, hasCookie } from "cookies-next"
import chunk from "lodash.chunk"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { num, TypedData } from "starknet"

type Props = {
  dappKey?: string
}

const DappPageRating = ({ dappKey = "my_dapp" }: Props) => {
  const [averageRating, setAverageRating] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const cookieValue = getCookie(dappKey) as string
  const [currentRating, setCurrentRating] = useState<number | null>(
    typeof window !== "undefined"
      ? hasCookie(dappKey)
        ? parseInt(cookieValue || "")
        : null
      : null,
  )
  const [isRatingModalOpen, setRatingModalOpen] = useState(false)
  useEffect(() => {
    const getRatingsData = async () => {
      const dappRatings = await getRatingForDapp(dappKey)
      setAverageRating(dappRatings?.averageRating || null)
    }
    getRatingsData()
  }, [])

  const { connectedWallet, connectWallet } =
    useWalletConnectionContext() as UseWalletConnectionProps

  useEffect(() => {
    const getUserOldRatings = async ({ account }: { account: string }) => {
      const rating = await getRatingsFromUser({ account, dappKey })
      if (rating !== null) {
        setCurrentRating(rating - 1)
      }
    }
    if (connectedWallet && connectedWallet.isConnected) {
      getUserOldRatings({ account: connectedWallet.selectedAddress })
    }
  }, [connectedWallet])

  const determineIfMainnet = () => {
    if (typeof window !== "undefined") {
      const { hostname } = window.location
      return (
        hostname.includes("dappland.com") || hostname.includes("substack.com")
      )
    } else {
      return false
    }
  }

  const connectToWalletAndRate = async (rating?: number) => {
    let ratingValue = rating ?? currentRating

    if (connectedWallet?.isConnected && connectedWallet?.id === "argentX") {
      setError(null)
    } else {
      connectWallet()
        .then(() => {
          setRatingModalOpen(false)
          setError(null)
        })
        .catch((err) => {
          setError("User rejected wallet selection or wallet not found")
          throw Error("User rejected wallet selection or wallet not found", err)
        })
    }
    setError(null)
    if (ratingValue === null || ratingValue === undefined) {
      throw Error("Not rated")
    }
    ratingValue++
    if (connectedWallet && connectedWallet.isConnected) {
      const types: TypedData = {
        types: {
          // IMPORTANT: Do not change StarkNetDomain to StarknetDomain
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
        message: {
          dappKey: dappKey,
          rating: ratingValue,
        },
        domain: {
          name: "Dappland",
          chainId: connectedWallet.chainId,
          version: "1.0",
        },
      }

      const signature = await connectedWallet.account.signMessage(types)
      console.log("signature", signature)
      const numSigners = parseInt(signature[0])
      let signatures = []
      if (numSigners === 1) {
        signatures = [
          {
            r: num.toHexString(String(signature[3])),
            s: num.toHexString(String(signature[4])),
          },
        ]
      } else if (numSigners === 2) {
        // Smart account with two signers
        signatures = [
          {
            r: num.toHexString(String(signature[3])),
            s: num.toHexString(String(signature[4])),
          },
          {
            r: num.toHexString(String(signature[7])),
            s: num.toHexString(String(signature[8])),
          },
        ]
      } else {
        throw new Error(`Sig format not recognised.`)
      }

      const bodyData = {
        dappKey: dappKey,
        account: connectedWallet.selectedAddress,
        signatures: signatures,
        rating: ratingValue,
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
          setAverageRating(res.averageRating)
          if (ratingValue) {
            setCookie(dappKey, ratingValue - 1)
            setCurrentRating(ratingValue - 1)
          }
          setError(null)
          setRatingModalOpen(false)
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
      setCurrentRating(cookieValue ? parseInt(cookieValue || "") : null)
    }
  }

  return (
    <div>
      <div className="mt-12 xl:mt-0">
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
                {averageRating - Math.floor(averageRating) !== 0
                  ? (Math.round(averageRating * 10) / 10).toFixed(1)
                  : averageRating}
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
        <div className="relative flex items-center gap-1">
          {Array.from(Array(5).keys()).map((val) => (
            <button
              key={val}
              onMouseEnter={() => setHoverIndex(val)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                setCurrentRating(val)
                if (!connectedWallet) {
                  setRatingModalOpen(true)
                } else {
                  connectToWalletAndRate(val)
                }
              }}
            >
              <Image
                width={28}
                height={28}
                src={
                  hoverIndex !== null
                    ? hoverIndex >= val
                      ? starFilled
                      : starEmpty
                    : currentRating !== null && currentRating >= val
                      ? starFilled
                      : starEmpty
                }
                className="z-[1]"
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
