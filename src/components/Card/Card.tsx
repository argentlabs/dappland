import truncate from "../../helpers/truncate"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import styled from "styled-components"

const CoverImage = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
`

const CardContainer = styled.div`
  grid-template-columns: 64px auto auto;
`

interface CardProps {
  image: string | StaticImageData
  logo: string | StaticImageData
  title: string
  short_description: string
  url: string
  tags: string[]
}

const Card = ({
  image,
  logo,
  title,
  short_description,
  tags,
  url,
}: CardProps) => {
  return (
    <Link href={url || "/"}>
      <a className="w-auto cursor-pointer">
        <div className="relative hidden lg:block">
          <CoverImage
            className="h-[208px] relative"
            style={{ backgroundImage: `url(${image})` }}
          />
          {tags.length > 0 && (
            <div className="absolute bottom-1 left-3 flex flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center justify-center py-1 px-[10px] mr-2 text-[13px] leading-[18px] font-semibold text-black bg-white rounded-lg mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <CardContainer className="lg:mt-4 grid items-center">
          <div className="flex items-center w-16 h-16 shadow-box-image-shadow rounded-lg dark:bg-white relative">
            <Image
              src={logo}
              alt={`${title} - logo`}
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <div className="ml-3 sm:pr-3 lg:pr-0">
            <h5 className="text-xl leading-6 text-light-black font-bold dark:text-white">
              {title}
            </h5>
            <p className="text-sm text-light-charcoal font-semibold whitespace-normal">
              {truncate(short_description, 12)}
            </p>
          </div>
          <div className="lg:hidden flex justify-center items-center bg-accessible-green py-1 px-[10px] text-white font-semibold text-[13px] leading-none rounded-3xl ml-auto">
            View
          </div>
        </CardContainer>
      </a>
    </Link>
  )
}

export default Card
