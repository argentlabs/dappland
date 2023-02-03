import React from "react"

const sortByAttribute = (data: DappCard[], sortBy: string | null) => {
  if (sortBy === "A-Z") {
    return data.sort((a, b) => a.title.localeCompare(b.title))
  }
  if (sortBy === "Z-A") {
    return data.sort((a, b) => b.title.localeCompare(a.title))
  }
  if (sortBy === "new") {
  }
  return data
}

export default sortByAttribute
