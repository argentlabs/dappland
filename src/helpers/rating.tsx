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
  const ratingEntries: {
    [key: string]: Rating[]
  } = Object.fromEntries(ratingsMap)
  const dappsByRating: {
    [key: string]: string[]
  } = {}

  Object.keys(ratingEntries).forEach((key) => {
    const dappKeys = ratingEntries[key].map((obj) => obj.dappKey)
    dappsByRating[key] = dappKeys
  })
  return dappsByRating
}

export const filterDappcardsByRating = ({
  dappRatings,
  dappCards,
  selectedRatings,
  isMainCategory,
}: {
  dappCards: DappCard[]
  dappRatings: { [key: string]: string[] }
  selectedRatings: string[]
  isMainCategory?: boolean
}) => {
  if (!selectedRatings.length) {
    return dappCards
  }
  const availableRatings = Object.fromEntries(
    Object.entries(dappRatings).filter(([key]) =>
      selectedRatings.includes(key),
    ),
  )
  return dappCards.filter((dappCard) =>
    Object.values(availableRatings).some(
      (array) =>
        array.includes(dappCard.url.replace("/", "")) || isMainCategory,
    ),
  )
}
