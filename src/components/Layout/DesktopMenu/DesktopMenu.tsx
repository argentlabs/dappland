import moon from "../../../assets/icons/moon.svg"
import sun from "../../../assets/icons/sun.svg"
import logoDarkLottie from "../../../assets/logo-dark-lottie.json"
import logoLightLottie from "../../../assets/logo-light-lottie.json"
import { AnnouncementBar } from "../../AnnouncementBar"
import Button from "../../Button/Button"
import Lottie from "lottie-react"
import Image from "next/image"
import Link from "next/link"

interface DesktopMenuProps {
  currentTheme?: string
  setTheme: (theme: string) => void
}

const DesktopMenu = ({ currentTheme, setTheme }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:block bg-white dark:bg-light-black">
      <AnnouncementBar>
        Built with ❤️ by{" "}
        <a href="https://www.argent.xyz/?utm_source=dappland">Argent</a>
      </AnnouncementBar>
      <div className="relative w-full flex justify-between items-center pr-6 border-t border-b border-border-grey dark:border-dark-charcoal">
        <div className="flex">
          <Link href="/">
            <a className="p-6 flex justify-center items-center uppercase font-medium font-base border-r border-border-grey dark:border-dark-charcoal">
              HOME
            </a>
          </Link>
          <button
            type="button"
            className="p-6 flex justify-center items-center border-r border-border-grey dark:border-dark-charcoal"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {currentTheme === "dark" ? (
              <Image src={sun} alt="sun icon" />
            ) : (
              <Image src={moon} alt="moon icon" />
            )}
          </button>
        </div>
        <Link href="/">
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
        </Link>
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
  )
}

export default DesktopMenu
