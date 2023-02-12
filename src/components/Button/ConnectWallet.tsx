import power from "../../assets/icons/power.svg"
import powerLight from "../../assets/icons/powerLight.svg"
import powerPink from "../../assets/icons/powerPink.svg"
import { useDarkMode } from "../../hooks/useDarkMode"
import Image from "next/image"
import React from "react"

const ConnectWallet = () => {
  const { currentTheme } = useDarkMode()

  return (
    <button className="group relative flex items-center justify-between border-solid border border-black dark:border-white bg-none rounded-3xl hover:border-pink dark:hover:border-pink px-4 py-[10.5px] text-black dark:text-white hover:text-pink dark:hover:text-pink">
      <div className="font-semibold mr-[20px]">Connect wallet</div>
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
  )
}

export default ConnectWallet
