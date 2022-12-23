declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGElement>>
  const src: string
  export default src
}

interface DappInfo {
  description: string
  short_description: string
  name: string
  tags: string[]
  contracts?: Contract[]
  goerliContracts?: Contract[]
  audits: Audit[]
  links: Links
  teamInfo: TeamInfo
  tokens: Token[]
  media: Media
  dotw: boolean
  twitterName: string
  date_added?: string
}

interface Audit {
  name: string
  url: string
}

interface Contract {
  name: string
  address: string
}

interface Links {
  website: string
  mirror: string
  twitter: string
  telegram: string
  discord: string
  github: string
  youtube: string
  medium: string
  careers: string
}

interface Media {
  logoUrl: string
  bannerUrl: string
  previewUrl: string
  videoUrl?: string
  gallery: Gallery[]
}

interface Gallery {
  url: string
  description: string
}

interface TeamInfo {
  founded: string
  anonymous: boolean
  name: string
}

interface Token {
  symbol: string
  address: string
}

interface TwitterData {
  data: Array<{
    author_id: string
    created_at: string
    id: string
    text: string
  }>
  includes: {
    users: Array<{
      id: string
      name: string
      username: string
      profile_image_url: string
    }>
  }
  meta: {
    oldest_id: string
    newest_id: string
    result_count: number
    next_token: string
  }
}

interface DappCard {
  short_description: string
  title: string
  tags: string[]
  url: string
  image: string
  logo: string
  featured: boolean
  annonymous: boolean
  audits: Audit[]
  date_added: string
}
