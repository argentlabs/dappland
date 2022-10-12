import discordIcon from "../../assets/icons/socials/icon-discord.icon.svg"
import githubIcon from "../../assets/icons/socials/icon-github.icon.svg"
import mediumIcon from "../../assets/icons/socials/icon-medium.icon.svg"
import mirrorIcon from "../../assets/icons/socials/icon-mirror.icon.svg"
import telegramIcon from "../../assets/icons/socials/icon-telegram.icon.svg"
import twitterIcon from "../../assets/icons/socials/icon-twitter.icon.svg"
import youtubeIcon from "../../assets/icons/socials/icon-youtube.icon.svg"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const Icon = styled.a`
  &.active-icon {
    svg path {
      fill: #ff5b81;
    }
  }
`

interface SocialLinkProps {
  name: keyof Links
  link: string
}

const icons: {
  [key in keyof Partial<Links>]: any
} = {
  discord: (
    <Image src={discordIcon} alt="discord icon" height={24} width={24} />
  ),
  github: <Image src={githubIcon} alt="github icon" height={24} width={24} />,
  medium: <Image src={mediumIcon} alt="medium icon" height={24} width={24} />,
  mirror: <Image src={mirrorIcon} alt="mirror icon" height={24} width={24} />,
  telegram: (
    <Image src={telegramIcon} alt="telegram icon" height={24} width={24} />
  ),
  twitter: (
    <Image src={twitterIcon} alt="twitter icon" height={24} width={24} />
  ),
  youtube: (
    <Image src={youtubeIcon} alt="youtube icon" height={24} width={24} />
  ),
}

const SocialLink = ({ name, link }: SocialLinkProps) => {
  if (name === "website" || name === "careers") return null
  return link.length > 0 ? (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <a className="mr-6" aria-label={name}>
        <Icon className="active-icon cursor-pointer" as="i">
          {icons[name]}
        </Icon>
      </a>
    </Link>
  ) : (
    <span className="mr-6 cursor-not-allowed opacity-50">{icons[name]}</span>
  )
}

export default SocialLink
