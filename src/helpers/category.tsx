export const filterCategoryDapps = ({
  dappCards,
  category,
}: {
  dappCards: Array<DappCard & { categories: string[] }>
  category: string
}) => {
  return dappCards.filter((dapp) => {
    if (category === "featured") {
      return dapp.featured
    }
    if (category === "doxxed") {
      return !dapp.anonymous
    }
    if (category === "audited") {
      return dapp.audits && dapp.audits.length > 0
    }
    if (category === "verified") {
      return dapp.verified
    }
    return dapp.categories.includes(category)
  })
}

export const filterDapps = ({
  dappCards,
  filters,
}: {
  dappCards: Array<DappCard & { categories: string[] }>
  filters: string[]
}) => {
  return dappCards.filter((dapp) => {
    return (
      filters.reduce((acc, val) => {
        if (val === "featured" && dapp.featured) {
          acc = acc + 1
        }
        if (val === "doxxed" && !dapp.anonymous) {
          acc = acc + 1
        }
        if (val === "audited" && dapp.audits && dapp.audits.length > 0) {
          acc = acc + 1
        }
        if (val === "verified" && dapp.verified) {
          acc = acc + 1
        }
        if (dapp.categories.includes(val)) {
          acc = acc + 1
        }
        return acc
      }, 0) === filters.length
    )
  })
}

export const generateUrl = ({
  selectedSort,
  selectedFilters,
  selectedCategory,
  selectedRatings = [],
}: {
  selectedCategory: string
  selectedSort: string | null
  selectedFilters: string[]
  selectedRatings?: string[]
}) => {
  const allFilters = selectedFilters.join(",")
  const allRatings = selectedRatings.join(",")
  const categoryUrl =
    selectedCategory === "all" ? "/" : `/category/${selectedCategory}`
  const url = `${categoryUrl}${
    selectedFilters.length
      ? `?filters=${allFilters}${selectedSort ? `&sort=${selectedSort}` : ""}${
          selectedRatings.length ? `&ratings=${allRatings}` : ""
        }`
      : selectedSort
        ? `${selectedSort ? `?sort=${selectedSort}` : ""}${
            selectedRatings.length ? `&ratings=${allRatings}` : ""
          }`
        : `${selectedRatings.length ? `?ratings=${allRatings}` : ""}`
  }`
  return url
}

export const checkIfCategoryExists = (
  dappCard: DappCard,
  category: string,
  dappRatings?: { [key: string]: string[] },
) => {
  switch (category) {
    case "Dapp of the Month":
    case "featured":
      return dappCard.featured
    case "Public team":
    case "doxxed":
      return !dappCard.anonymous
    case "Audited":
    case "audited":
      return dappCard.audits && dappCard.audits.length
    case "Verified contracts":
    case "verified":
      return dappCard.verified
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
      return (
        dappRatings &&
        dappRatings[category]?.includes(dappCard.url.replace("/", ""))
      )
    default:
      return dappCard.tags.indexOf(category) !== -1
  }
}
