declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGElement>>
  const src: string
  export default src
}

interface NFTData {
  name: string
  name_custom: string
  total_volume_all_time: number
  total_volume_720_hours?: number
  total_volume_168_hours?: number
  total_volume_24_hours?: number
  volume_change_basis_points_720_hours?: number | string
  volume_change_basis_points_168_hours?: number | string
  volume_change_basis_points_24_hours?: number | string
  number_of_owners: string
  number_of_assets: string
  floor_list_price: number
}

interface DappInfo {
  description: string
  short_description: string
  name: string
  tags: string[]
  contracts?: Contract[]
  goerliContracts?: Contract[]
  audits: Audit[]
  verified: boolean
  links: Links
  teamInfo: TeamInfo
  tokens: Token[]
  media: Media
  dotw: boolean
  twitterName: string
  nft?: {
    collectionLink: string
    collectionContract: string
    collectionName: string
    collectionPreview: {
      image_url: string
      name: string
    }[]
  }
}

interface Audit {
  name: string
  url: string
}

interface Verified {
  name: string
  url: string
}

interface Contract {
  name: string
  address: string
}

interface Rating {
  voteCount: number
  averageRating: number
  dappKey: string
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
  verified: boolean
}
