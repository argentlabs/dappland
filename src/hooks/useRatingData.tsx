import { useEffect, useState } from "react"

interface RatingWidgetData {
  averageRating: number
  dappKey: string
  voteCount: number
  ratings: number
}

type ResponseData = {
  isLoading: boolean
  ratingData?: RatingWidgetData
}

const useRatingData = (dappName: string): ResponseData => {
  const [ratingData, setRatingData] = useState<RatingWidgetData>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async (): Promise<any> => {
      try {
        const response = await fetch(
          `${process.env.API_URL}tokens/dapps/ratings/${dappName}`,
        )
        const data = (await response.json()) as RatingWidgetData
        setRatingData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (dappName) {
      void fetchReviews()
    }
  }, [dappName])
  return { ratingData, isLoading }
}

export default useRatingData
