import loadingAnimation from "../../../assets/dappland-icon-only.json"
import { ReactElement } from "react"
import dynamic from "next/dynamic"

// Disable server-side rendering for this component
// old method worked on vercel but not locally. This should work on both
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
})

export default function Loading(): ReactElement {
  return <Lottie animationData={loadingAnimation} />
}
