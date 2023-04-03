import infoCircle from "../../assets/icons/info-circle_gray.svg"
import Tooltip from "./Tooltip"
import Image from "next/image"
import React from "react"

type Props = {
  text: string
  icon?: string
}

const TooltipIconButton = ({ text, icon = infoCircle }: Props) => {
  return (
    <Tooltip text={text}>
      <Image src={icon} alt="info-circle" width={16} height={16} />
    </Tooltip>
  )
}

export default TooltipIconButton
