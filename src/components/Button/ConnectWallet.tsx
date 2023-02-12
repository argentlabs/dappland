import power from "../../assets/icons/power.svg"
import powerLight from "../../assets/icons/powerLight.svg"
import powerPink from "../../assets/icons/powerPink.svg"
import { useDarkMode } from "../../hooks/useDarkMode"
import { useWalletStore } from "../../hooks/useWalletStore"
import ConnectWalletModal from "../Modal/ConnectWalletModal"
import { connect, disconnect } from "@argent/get-starknet"
import Image from "next/image"
import React, { useState } from "react"

const ConnectWallet = () => {
  const { currentTheme } = useDarkMode()
  const [ratingsModalOpen, setRatingModalOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const connectedWallet = useWalletStore((state) => state.connectedWallet)
  const setConnectedWallet = useWalletStore((state) => state.setConnectedWallet)

  const onConfirm = async () => {
    const starknet = await connect({
      showList: true,
    })
    if (!starknet) {
      setError("User rejected wallet selection or wallet not found")
      throw Error("User rejected wallet selection or wallet not found")
    }
    await starknet.enable()
    if (!starknet.account) {
      setError("User rejected wallet selection or wallet not found")
      throw Error("User rejected wallet selection or wallet not found")
    }
    if (starknet && starknet.account) {
      setConnectedWallet(starknet)
      setError(null)
      setRatingModalOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={async () => {
          if (connectedWallet) {
            await disconnect()
            setConnectedWallet(null)
          } else {
            setRatingModalOpen(true)
          }
        }}
        className="group relative flex items-center justify-between border-solid border border-black dark:border-white bg-none rounded-3xl hover:border-pink dark:hover:border-pink px-4 py-[12.5px] lg:py-[10.5px] text-black dark:text-white hover:text-pink dark:hover:text-pink w-full lg:w-auto"
      >
        <div className="font-semibold mr-[20px] flex justify-center lg:justify-start items-center lg:items-start w-full lg:w-auto">
          {connectedWallet ? "Disconnect" : "Connect wallet"}
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
