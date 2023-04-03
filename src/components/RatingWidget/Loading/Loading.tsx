import loadingAnimation from "../../../assets/dappland-icon-only.json"
import Lottie from "lottie-react"
import { ReactElement } from "react"

export default function Loading(): ReactElement {
  return <Lottie animationData={loadingAnimation} />
}
