import power from "../../assets/icons/power.svg"
import powerLight from "../../assets/icons/powerLight.svg"
import powerPink from "../../assets/icons/powerPink.svg"
import { useWalletConnectionContext } from "../../context/useWalletConnectionContext"
import { useDarkMode } from "../../hooks/useDarkMode"
import { UseWalletConnectionProps } from "../../hooks/useWalletConnection"
import ConnectWalletModal from "../Modal/ConnectWalletModal"
import Image from "next/image"
import React, { useState } from "react"

const ConnectWallet = () => {
  const { currentTheme } = useDarkMode()
  const [ratingsModalOpen, setRatingModalOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const { connectedWallet, connectWallet, disconnectWallet } =
    useWalletConnectionContext() as UseWalletConnectionProps

  const onConfirm = async () => {
    if (connectedWallet?.isConnected && connectedWallet?.id === "argentX") {
      setError(null)
      setRatingModalOpen(false)
    } else {
      connectWallet()
        .then(() => {
          setError(null)
          setRatingModalOpen(false)
        })
        .catch(() => {
          setError("User rejected wallet selection or wallet not found")
          throw Error("User rejected wallet selection or wallet not found")
        })
    }
  }

  return (
    <>
      <button
        onClick={async () => {
          if (connectedWallet?.isConnected) {
            disconnectWallet()
          } else {
            setRatingModalOpen(true)
          }
        }}
        className="group relative flex items-center justify-between border-solid border border-black dark:border-white bg-none rounded-3xl hover:border-pink dark:hover:border-pink px-4 py-[12.5px] lg:py-[10.5px] text-black dark:text-white hover:text-pink dark:hover:text-pink w-full lg:w-auto"
      >
        <div className="font-semibold mr-[20px] flex justify-center lg:justify-start items-center lg:items-start w-full lg:w-auto">
          {connectedWallet?.isConnected ? "Disconnect" : "Connect wallet"}
        </div>
        <div className="absolute w-[1px] h-full bg-black dark:bg-white right-10 group-hover:bg-pink" />
        <div>
          <div className="flex group-hover:hidden">
            <Image
              src={currentTheme === "dark" ? powerLight : power}
              alt="power-icon"
              className="text-pink"
              color="pink"
            />
          </div>
          <div className="hidden group-hover:flex">
            <Image
              src={powerPink}
              alt="power-icon"
              className="text-pink"
              color="pink"
            />
          </div>
        </div>
      </button>
      <ConnectWalletModal
        isOpen={ratingsModalOpen}
        onClose={() => {
          setRatingModalOpen(false)
        }}
        fromNav
        onConfirm={onConfirm}
        error={error}
      />
    </>
  )
}

export default ConnectWallet
