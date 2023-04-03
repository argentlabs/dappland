import moon from "../../../assets/icons/moon.svg"
import sun from "../../../assets/icons/sun.svg"
import logoDarkLottie from "../../../assets/logo-dark-lottie.json"
import logoLightLottie from "../../../assets/logo-light-lottie.json"
import { AnnouncementBar } from "../../AnnouncementBar"
import Button from "../../Button/Button"
import ConnectWallet from "../../Button/ConnectWallet"
import Lottie from "lottie-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface DesktopMenuProps {
  currentTheme?: string
  setTheme: (theme: string) => void
}

const HomeDesktopMenu = ({ currentTheme, setTheme }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:block bg-white dark:bg-hero-dark ">
      <div className="relative w-full flex justify-between items-center pr-6">
        <div className="flex">
          <button
            type="button"
            className="p-6 flex justify-center items-center"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {currentTheme === "dark" ? (
              <Image src={sun} alt="sun icon" />
            ) : (
              <Image src={moon} alt="moon icon" />
            )}
          </button>
        </div>
        <div className="flex gap-2.5">
          <ConnectWallet />
          <Button
            variant="primary"
            className="h-min"
            style={{ padding: "13px 24px", lineHeight: "normal" }}
            href="https://github.com/argentlabs/dappland#-add-your-dapp-to-dappland"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add your Dapp
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center pb-[86px]">
        <Link href="/">
          <Lottie
            style={{
              transform: "scale(0.75)",
              maxHeight: "200px",
              cursor: "pointer",
            }}
            loop={false}
            initialSegment={[0, 150]}
            animationData={
              currentTheme === "dark" ? logoDarkLottie : logoLightLottie
            }
          />
        </Link>
        <h1 className="bg-black dark:bg-white text-white dark:text-black pl-4 pr-4 pt-1 pb-2 text-center text-[32px] font-bold leading-[38px] rounded-md mb-6">
          Discover the best dapps on Starknet
        </h1>
        <h2 className="text-black dark:text-white text-[28px] leading-[34px] font-lighter">
          Games, NFTs, DeFi, DAOs and more.
        </h2>
        <p className="text-center font-normal text-base leading-[16px] mt-16">
          Built with ❤️ by{" "}
          <a href="https://www.argent.xyz/?utm_source=dappland">Argent</a>
        </p>
      </div>
    </div>
  )
}

export default HomeDesktopMenu
