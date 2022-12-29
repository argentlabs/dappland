import React, { useRef } from "react"

type Props = {
  text: string
  children: any
}

const Tooltip = ({ children, text }: Props) => {
  const ref = useRef<any>(null)

  const handleMouseEnter = () => {
    if (ref.current) {
      ref.current.style.opacity = 1
      ref.current.style.marginBottom = "14px"
    }
  }
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.opacity = 0
      ref.current.style.marginBottom = "7px"
    }
  }
  return (
    <div className="relative flex flex-col items-center m-[2px]" role="tooltip">
      <button
        role="button"
        className="p-0 m-0 outline-0 bg-none border-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </button>
      <div
        className="max-w-xs absolute text-base whitespace-no-wrap bg-tooltip-dark dark:bg-white text-white dark:text-tooltip-dark px-4 py-4 rounded flex items-center justify-center bottom-full transition-all duration-150 opacity-0"
        ref={ref}
        style={{
          width: "max-content",
          maxWidth: "238px",
        }}
      >
        <div className="bg-tooltip-dark dark:bg-white h-3 w-3 absolute transform rotate-45 -bottom-1.5 " />
        {text}
      </div>
    </div>
  )
}

export default Tooltip
