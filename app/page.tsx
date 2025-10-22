"use client"

import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import HospiceCards from "@/components/cards/hospice-display-cards";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Initialize state from the URL's 'search' parameter, or an empty string.
  const [query, setQuery] = useState(searchParams.get('search') || "");

  // This function now updates the URL.
  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set('search', newQuery);
    } else {
      params.delete('search');
    }
    // Use router.replace to update the URL without adding to browser history
    router.replace(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Provider Dashboard</h1>
        <p className="text-gray-300 mb-8">Search physicians and manage provider information.</p>
        <SearchBar value={query} onSearchChange={handleSearchChange}/>
        <HospiceCards page={0} zip={query} />
      </div>
    </div>
  );
} 
