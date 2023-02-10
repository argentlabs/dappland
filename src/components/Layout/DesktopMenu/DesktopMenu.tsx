import moon from "../../../assets/icons/moon.svg"
import sun from "../../../assets/icons/sun.svg"
import logoDarkLottie from "../../../assets/logo-dark-lottie.json"
import logoLightLottie from "../../../assets/logo-light-lottie.json"
import { useCategoryStore } from "../../../hooks/useCategoryStore"
import { useWalletStore } from "../../../hooks/useWalletStore"
import { AnnouncementBar } from "../../AnnouncementBar"
import Button from "../../Button/Button"
import { connect, disconnect } from "@argent/get-starknet"
import Lottie from "lottie-react"
import Image from "next/image"
import Link from "next/link"

interface DesktopMenuProps {
  currentTheme?: string
  setTheme: (theme: string) => void
}

const DesktopMenu = ({ currentTheme, setTheme }: DesktopMenuProps) => {
  const setFilters = useCategoryStore((state) => state.setFilters)
  const changeCategory = useCategoryStore((state) => state.changeCategory)
  const setSort = useCategoryStore((state) => state.setSelectedSort)
  const connectedWallet = useWalletStore((state) => state.connectedWallet)
  const setConnectedWallet = useWalletStore((state) => state.setConnectedWallet)
  return (
    <div className="hidden lg:block bg-white dark:bg-light-black">
      <AnnouncementBar>
        The best StarkNet Dapps. Built by{" "}
        <a href="https://www.argent.xyz/?utm_source=dappland">Argent</a>
      </AnnouncementBar>
      <div className="relative w-full flex justify-between items-center pr-6 border-t border-b border-border-grey dark:border-white/10">
        <div className="flex">
          <button
            type="button"
            className="p-6 flex justify-center items-center border-r border-border-grey dark:border-white/10"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {currentTheme === "dark" ? (
              <Image src={sun} alt="sun icon" />
            ) : (
              <Image src={moon} alt="moon icon" />
            )}
          </button>
          <Link href="/">
            <a
              className="p-6 flex justify-center items-center uppercase font-medium font-base border-r border-border-grey dark:border-white/10"
              onClick={() => {
                setFilters([])
                setSort(null)
                changeCategory("all")
              }}
            >
              HOME
            </a>
          </Link>
          <Link href="https://github.com/argentlabs/dappland#-add-your-dapp-to-dappland">
            <a
              className="p-6 flex justify-center items-center uppercase font-medium font-base border-r border-border-grey dark:border-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              ADD YOUR DAPP
            </a>
          </Link>
        </div>
        <Link href="/">
          <div
            onClick={() => {
              setFilters([])
              setSort(null)
              changeCategory("all")
            }}
          >
            <Lottie
              style={{
                transform: "scale(0.5) translateY(-50%)",
                maxHeight: "56px",
                cursor: "pointer",
              }}
              loop={false}
              initialSegment={[0, 150]}
              animationData={
                currentTheme === "dark" ? logoDarkLottie : logoLightLottie
              }
            />
          </div>
        </Link>
        <Button
          variant="primary"
          className="h-min"
          style={{ padding: "13px 24px", lineHeight: "normal" }}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {
            if (!connectedWallet) {
              const starknet = await connect({
                showList: true,
              })
              setConnectedWallet(starknet)
            } else {
              await disconnect()
              setConnectedWallet(null)
            }
          }}
        >
          {!connectedWallet ? "Connect Wallet" : "Disconnect Wallet"}
        </Button>
      </div>
    </div>
  )
}

export default DesktopMenu
