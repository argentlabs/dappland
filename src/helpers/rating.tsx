import React from "react"

export const getRatings = async () => {
  const data = await fetch(
    "https://cloud-dev.argent-api.com/v1/tokens/dapps/ratings?pageSize=5&page=0",
  ).then((res) => res.json())

  const ratings: Rating[] = data?.ratings || []

  const ratingsMap = new Map()

  ratings.forEach((rating) => {
    const key = Math.round(rating.averageRating)
    if (!ratingsMap.get(key)) {
      ratingsMap.set(key, [])
    }
    ratingsMap.set(key, [...ratingsMap.get(key), rating])
  })
  return Object.fromEntries(ratingsMap)
}
