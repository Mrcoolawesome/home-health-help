"use client"

import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import HospiceCards from "@/components/cards/hospice-display-cards";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SortDropdown from "@/components/ui/sort-by-options";
import { Code } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || "");
  const [measureCode, setMeasureCode] = useState('');
  const [scoreData, setScoreData] = useState<Code>();

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

  // this handles sorting the stuff by specific values
  const handleSortChange = (newSortValue: string, newCode: Code) => {
    setMeasureCode(newSortValue);
    setScoreData(newCode);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Search Hospices</h1>
        <p className="text-foreground mb-8">Search hospices by the zip code they operate in.</p>
          <SearchBar value={query} onSearchChange={handleSearchChange}/>
          <SortDropdown 
              selectedValue={measureCode} 
              onSortChange={handleSortChange}
          />
        <HospiceCards page={0} zip={query} measureCode={measureCode} scoreData={scoreData}/>
      </div>
    </div>
  );
}
