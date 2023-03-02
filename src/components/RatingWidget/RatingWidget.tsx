import activeStar from "../../assets/icons/activeStar.svg"
import inactiveStar from "../../assets/icons/inactiveStar.svg"
import logoLight from "../../assets/logo-dappland-light.svg"
import logo from "../../assets/logo-dappland.svg"
import { useDarkMode } from "../../hooks/useDarkMode"
import useRatingData from "../../hooks/useRatingData"
import Loading from "./Loading/Loading"
import Image from "next/image"
import React from "react"
import { ReactElement, useEffect, useState } from "react"

const RatingWidget = (): ReactElement => {
  const [dappName, setDappName] = useState("")
  const { ratingData, isLoading } = useRatingData(dappName)
  const { currentTheme } = useDarkMode()
  const totalStars = 5
  const activeStars = ratingData ? ratingData.averageRating : 0
  const url = `https://www.dappland.com/${dappName}`

  function handleClick() {
    if (window.top) {
      window.top.location.href = url
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get("dappname")
    if (name) {
      setDappName(name.toLowerCase())
    }
  }, [])

  return (
    <div
      className={`${
        currentTheme === "dark" ? "bg-black" : "bg-white "
      } flex flex-col justify-center items-center border-2 border-black rounded-lg cursor-pointer max-w-[260px] min-h-[176px] py-5 px-16`}
      onClick={handleClick}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <a href={url}>
              <h2 className="text-[24px] font-bold">{ratingData?.dappKey}</h2>
            </a>
          </div>
          <div className="mt-2">
            {Array.from({ length: totalStars }).map((_, index) =>
              activeStars && index < activeStars ? (
                <Image src={activeStar} alt="icon active star" />
              ) : (
                <Image src={inactiveStar} alt="icon inactive star" />
              ),
            )}
          </div>
          <div className="mt-1 font-bold">
            <span>{activeStars}</span>
            <span className="text-lightgrey"> / {totalStars}</span>
          </div>
          <div className="mt-2 w-[124px] h-[37px]">
            {currentTheme === "dark" ? (
              <Image src={logoLight} alt="Dappland logo" />
            ) : (
              <Image src={logo} alt="Dappland logo" />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default RatingWidget
