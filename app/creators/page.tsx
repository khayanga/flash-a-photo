import { SearchBar } from "@/components/search-bar"
import { CreatorGrid } from "@/components/creator-grid"
import { FilterSort } from "@/components/filter-sort"

export default function Creators() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Find Your Perfect Creator</h1>
        <SearchBar />
        <div className="flex justify-end my-4">
          <FilterSort />
        </div>
        <CreatorGrid />
      </main>
    </div>
  )
}

