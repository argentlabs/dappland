import { FC } from "react"

export const DappStoreButton: FC<{
  iconUrl: string
  name: string
  href: string
}> = ({ iconUrl, name, href }) => {
  return (
    <a
      href={href}
      className="flex flex-row items-start px-5 py-4 gap-2 bg-black border border-solid border-white rounded-lg min-w-[215px] h-[72px] overflow-hidden"
    >
      <img src={iconUrl} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <p className="text-[13px] font-extralight mt-[-1px]">
          Explore Web3 with
        </p>
        <p className="font-bold text-lg mt-[-5px] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </p>
      </div>
    </a>
  )
}
