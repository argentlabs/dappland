export const filterCategoryDapps = ({
  dappCards,
  category,
}: {
  dappCards: Array<DappCard & { categories: string[] }>
  category: string
}) => {
  return dappCards.filter((dapp) => {
    if (category === "dotw") {
      return dapp.featured
    }
    if (category === "doxxed") {
      return !dapp.annonymous
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
        if (val === "dotw" && dapp.featured) {
          acc = acc + 1
        }
        if (val === "doxxed" && !dapp.annonymous) {
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
