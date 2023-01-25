import filter from "../../assets/icons/filter.svg"
import filterLight from "../../assets/icons/filterLight.svg"
import { useDarkMode } from "../../hooks/useDarkMode"
import Image from "next/image"
import React from "react"

const FilterButton = ({
  filterCount,
  onClick,
}: {
  filterCount: number
  onClick: () => void
}) => {
  const { currentTheme } = useDarkMode()

  return (
    <button
      onClick={onClick}
      className="lg:hidden px-4 mr-4 bg-white dark:bg-[#333] shadow-box-image-shadow rounded-lg cursor-pointer relative w-[100px] h-[40px] flex justify-between items-center"
    >
      <Image
        src={currentTheme === "dark" ? filterLight : filter}
        alt="filter-icon"
        className="w-[20px] h-[20px]"
      />
      <div className="text-[14px] leading-[14px] color-black dark:color-white font-semibold">
        Filter {filterCount > 0 ? `(${filterCount})` : null}
      </div>
    </button>
  )
}

export default FilterButton
