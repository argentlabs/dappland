import starEmpty from "../../assets/icons/empty_star.svg"
import star from "../../assets/icons/star.svg"
import ConnectWalletModal from "../../components/Modal/ConnectWalletModal"
import { getRatingsFromUser } from "../../helpers/rating"
import { useWalletStore } from "../../hooks/useWalletStore"
import BigNumber from "bignumber.js"
import { setCookie, getCookie, hasCookie } from "cookies-next"
import { connect } from "get-starknet"
import sn from "get-starknet-core"
import Image from "next/image"
import React, { useEffect, useState } from "react"

type Props = {
  dappKey?: string
  avgRating: number | null
}

const DappPageRating = ({ dappKey = "my_dapp", avgRating }: Props) => {
  const [averageRating, setAverageRating] = useState(avgRating)
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

  const connectedWallet = useWalletStore((state) => state.connectedWallet)
  const setConnectedWallet = useWalletStore((state) => state.setConnectedWallet)

  useEffect(() => {
    const getUserOldRatings = async ({ account }: { account: string }) => {
      const rating = await getRatingsFromUser({ account, dappKey })
      if (rating !== null) {
        setCurrentRating(rating - 1)
      }
    }
    if (connectedWallet) {
      debugger
      getUserOldRatings({ account: connectedWallet.selectedAddress })
    }
  }, [connectedWallet])

  const connectToWalletAndRate = async (rating?: number) => {
    let starknet = null
    let ratingValue = rating || currentRating
    if (connectedWallet) {
      starknet = connectedWallet
    } else {
      const wallets = await sn.getAvailableWallets()
      const argentWallet = wallets.find((wallet) => wallet.id === "argentX")
      if (argentWallet) {
        try {
          const res = await sn.enable(argentWallet)
          setConnectedWallet(res)
          starknet = res
          setError(null)
        } catch {
          setError("User rejected wallet selection or wallet not found")
          throw Error("User rejected wallet selection or wallet not found")
        }
      } else {
        try {
          const res = await connect()
          setConnectedWallet(res)
          starknet = res
          setError(null)
        } catch {
          setError("User rejected wallet selection or wallet not found")
          throw Error("User rejected wallet selection or wallet not found")
        }
      }
    }
    setError(null)
    if (ratingValue === null || ratingValue === undefined) {
      throw Error("Not rated")
    }
    ratingValue++
    try {
      await starknet.enable()
      if (starknet.account) {
        setConnectedWallet(starknet)
      } else {
        setError("User rejected wallet selection or wallet not found")
        throw Error("User rejected wallet selection or wallet not found")
      }
      if (starknet.isConnected) {
        const signature = await starknet.account.signMessage({
          message: {
            dappKey: dappKey,
            rating: ratingValue,
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
          rating: ratingValue,
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
            setAverageRating(res.averageRating)
            if (ratingValue) {
              setCookie(dappKey, ratingValue - 1)
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
        setConnectedWallet(null)
      }
    } catch (err: any) {
      setError("Error connecting")
      setCurrentRating(cookieValue ? parseInt(cookieValue || "") : null)
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
