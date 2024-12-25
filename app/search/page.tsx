"use client";

import { Suspense } from 'react'
import { CreatorGrid } from "@/components/creator-grid"
import { FilterSort } from "@/components/filter-sort"
import { ErrorMessage } from "@/components/error-message"
import { LoadingSpinner } from "@/components/loading-spinner"

async function searchCreators(query: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/creators/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to search creators');
  }
  return res.json();
}

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults query={query} />
        </Suspense>
      </main>
    </div>
  )
}

async function SearchResults({ query }: { query: string }) {
  try {
    const creators = await searchCreators(query);
    return (
      <>
        <div className="flex justify-end mb-4">
          <FilterSort />
        </div>
        <CreatorGrid creators={creators} />
      </>
    );
  } catch (error) {
    return <ErrorMessage message="Failed to load search results. Please try again later." />;
  }
}

