import twitter from "../../assets/icons/twitter.svg"
import Button from "../../components/Button/Button"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const PostsContainer = styled.div`
  @media (min-width: 1280px) {
    .twitter-post:last-of-type {
      margin-bottom: 0%;
    }
  }
`

interface DappPageTwitterProps {
  dappInfo: DappInfo
  twitterPosts: TwitterData
}

const DappPageTwitter = ({ dappInfo, twitterPosts }: DappPageTwitterProps) => {
  if (
    !(twitterPosts.data && twitterPosts.data.length > 0) &&
    !dappInfo.links.careers
  )
    return null

  return (
    <section className="mt-16 xl:grid xl:grid-cols-2 xl:gap-x-16 xl:justify-between xl:mt-16">
      {twitterPosts.data && twitterPosts.data.length > 0 && (
        <PostsContainer>
          {twitterPosts.data.slice(0, 2).map((post) => (
            <div
              key={post.created_at}
              className="twitter-post bg-white dark:bg-white/10 p-8 mb-6 rounded-xl flex flex-col shadow-box-image-shadow"
            >
              <div className="flex items-center">
                <Image
                  src={twitterPosts.includes.users[0].profile_image_url}
                  alt="profile image"
                  className="rounded-full w-12 h-12"
                  width={48}
                  height={48}
                />
                <div className="ml-4">
                  <h4 className="text-[17px] leading-[20px] font-semibold">
                    {twitterPosts.includes.users[0].name}
                  </h4>
                  <p className="text-[15px] leading-[18px] font-medium text-light-charcoal">
                    <Link
                      href={`https://twitter.com/${twitterPosts.includes.users[0].username}`}
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        @{twitterPosts.includes.users[0].username}
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="ml-auto cursor-pointer">
                  <Link
                    href={`https://twitter.com/${twitterPosts.includes.users[0].username}/status/${post.id}`}
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <Image src={twitter} alt="icon twitter" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[17px] leading-[22px] font-normal">
                  {post.text}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-light-charcoal text-[16px] leading-[21px]">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </PostsContainer>
      )}
      {dappInfo.links.careers && (
        <div className="p-12 flex flex-col items-center justify-center bg-black dark:bg-white/10 rounded-2xl shadow-box-image-shadow xl:h-full lg:min-h-[350px]">
          <h2 className="font-bold text-[40px] leading-[52px] text-center text-white">
            Work with {dappInfo.name}
          </h2>

          <Link passHref href={dappInfo.links.careers}>
            <Button
              variant="white"
              href={dappInfo.links.careers}
              className="mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              View opportunities
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}

export default DappPageTwitter
