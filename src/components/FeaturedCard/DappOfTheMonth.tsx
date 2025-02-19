import award from "../../assets/award.svg"
import Button from "../Button/Button"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import styled from "styled-components"

interface FeaturedCardProps {
  image: StaticImageData
  name: string
  url: string
  className?: string
  isHome?: boolean
}

const StyledCard = styled.div<
  { image: StaticImageData } & React.HTMLProps<HTMLDivElement>
>`
  @media (min-width: 1024px) {
    background-image: ${({ image }) => `url(${image?.src})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`

const FeaturedCard = ({
  image,
  name,
  url,
  className,
  isHome,
}: FeaturedCardProps) => {
  return (
    <Link href={url}>
      <StyledCard
        className={[
          "relative mb-16 rounded-xl overflow-hidden",
          className ? className : "",
          isHome ? "hidden" : "",
        ].join(" ")}
        image={image}
      >
        <div className="flex flex-col lg:flex-col-reverse lg:absolute lg:top-8 lg:left-8 lg:z-[1]">
          {
            <p className="mb-1 text-[15px] leading-none text-light-charcoal font-semibold lg:bg-black lg:py-2 lg:px-4 lg:text-white lg:font-normal lg:max-w-max lg:text-[20px]">
              {new Date().toLocaleDateString("en-EN", {
                month: "long",
                year: "numeric",
              })}
            </p>
          }
          <h2 className="font-semibold text-xl leading-none mb-2 lg:bg-black lg:py-2 lg:px-4 lg:font-bold lg:text-[28px] lg:text-white lg:max-w-max">
            Dapp of the Month: {name}
          </h2>
        </div>
        <div className="absolute z-[1] bottom-4 right-4 lg:bottom-auto lg:top-4 max-w-[120px] max-h-[120px] xl:max-w-[214px] xl:max-h-[214px]">
          <Image src={award} alt="award - dapp of the month" />
        </div>
        <div className="w-full rounded-xl">
          <Image src={image} alt={name} layout="responsive" />
        </div>
        <Button
          variant="primary"
          className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 lg:px-8"
          withoutMobile
        >
          View Dapp
        </Button>
        <p className="hidden lg:block absolute bottom-8 right-8 text-[28px] font-bold py-2 px-4 text-white z-10 bg-black">
          {name}
        </p>
      </StyledCard>
    </Link>
  )
}

export default FeaturedCard
