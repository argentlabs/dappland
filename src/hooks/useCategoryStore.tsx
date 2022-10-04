import { useRouter } from "next/router"
import create from "zustand"

interface CategoryState {
  selectedCategory: string
  changeCategory: (category: string) => void
}

export const useCategoryStore = () => {
  const router = useRouter()
  return create<CategoryState>((set) => ({
    selectedCategory: (router?.query?.category as string) || "all",
    changeCategory: (category) => set(() => ({ selectedCategory: category })),
  }))
}
