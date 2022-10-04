import { categories } from "../../data/categories"
import Link from "next/link"
import React from "react"

const Tag = ({ name }: { name: string }) => {
  const getLinkForTag = () => {
    const category = categories.find((cat) => cat.name === name)
    if (category) return `/category/${category.key}`
  }

  const link = getLinkForTag()

  return link ? (
    <Link href={link}>
      <a className="flex items-center justify-center text-white bg-light-charcoal py-2 px-3 text-sm leading-none mr-2 rounded font-semibold">
        {name}
      </a>
    </Link>
  ) : (
    <div className="flex items-center justify-center text-white bg-light-charcoal py-2 px-3 text-sm leading-none mr-2 rounded font-semibold">
      {name}
    </div>
  )
}

export default Tag
