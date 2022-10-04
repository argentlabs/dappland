import { FC } from "react"

interface FeaturedVideoCardProps {
  videoUrl: string
  className?: string
}

const FeaturedVideoCard: FC<FeaturedVideoCardProps> = ({
  videoUrl,
  className,
}) => {
  return (
    <video
      src={videoUrl}
      className={[
        "rounded-lg max-h-full mb-16 overflow-hidden",
        className ? className : "",
      ].join(" ")}
      autoPlay
      muted
      loop
      playsInline
    />
  )
}

export default FeaturedVideoCard
