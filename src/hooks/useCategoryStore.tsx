import { useRouter } from "next/router"
import create from "zustand"

interface CategoryState {
  selectedCategory: string
  changeCategory: (category: string) => void
  selectedFilters: string[]
  addFilter: (category: string) => void
  setFilters: (s: string[]) => void
  selectedSort: string | null
  setSelectedSort: (sortBy: string | null) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: "all",
  changeCategory: (category) =>
    set(() => ({
      selectedCategory: category,
    })),
  selectedSort: null,
  setSelectedSort: (sortBy) =>
    set(() => ({
      selectedSort: sortBy,
    })),
  selectedFilters: [],
  setFilters: (s) =>
    set(() => ({
      selectedFilters: s,
    })),
  addFilter: (category) =>
    set((state) => {
      const foundFilter = state.selectedFilters.find(
        (filter) => filter === category,
      )
      if (!foundFilter) {
        return {
          selectedFilters: [...state.selectedFilters, category],
        }
      } else {
        return {
          selectedFilters: state.selectedFilters.filter(
            (filter) => filter !== category,
          ),
        }
      }
    }),
}))
