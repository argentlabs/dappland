import DiscordIcon from "../../assets/icons/socials/icon-discord.icon.svg"
import GithubIcon from "../../assets/icons/socials/icon-github.icon.svg"
import MediumIcon from "../../assets/icons/socials/icon-medium.icon.svg"
import MirrorIcon from "../../assets/icons/socials/icon-mirror.icon.svg"
import TelegramIcon from "../../assets/icons/socials/icon-telegram.icon.svg"
import TwitterIcon from "../../assets/icons/socials/icon-twitter.icon.svg"
import YoutubeIcon from "../../assets/icons/socials/icon-youtube.icon.svg"
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
  discord: <DiscordIcon />,
  github: <GithubIcon />,
  mirror: <MirrorIcon />,
  medium: <MediumIcon />,
  twitter: <TwitterIcon />,
  youtube: <YoutubeIcon />,
  telegram: <TelegramIcon />,
}

const SocialLink = ({ name, link }: SocialLinkProps) => {
  if (name === "website" || name === "careers") return null
  return link.length > 0 ? (
    <Link href={link}>
      <a
        className="mr-6"
        aria-label={name}
        target="_blank"
        rel="noopener noreferrer"
      >
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
