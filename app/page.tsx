"use client";
import { Suspense } from 'react'
import { SearchBar } from "@/components/search-bar"
import { CreatorCarousel } from "@/components/creator-carousel"
import { CreatorGrid } from "@/components/creator-grid"
import { FilterSort } from "@/components/filter-sort"
import { ErrorMessage } from "@/components/error-message"
import { LoadingSpinner } from "@/components/loading-spinner"

async function getCreators() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/creators`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch creators');
  }
  return res.json();
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        <Suspense fallback={<LoadingSpinner />}>
          <CreatorsContent />
        </Suspense>
      </main>
    </div>
  )
}

async function CreatorsContent() {
  try {
    const creators = await getCreators();
    return (
      <>
        <CreatorCarousel creators={creators.slice(0, 5)} />
        <div className="flex justify-between items-center my-8">
          <h2 className="text-2xl font-bold text-foreground">Top Creators</h2>
          <FilterSort />
        </div>
        <CreatorGrid creators={creators} />
      </>
    );
  } catch (error) {
    return <ErrorMessage message="Failed to load creators. Please try again later." />;
  }
}

