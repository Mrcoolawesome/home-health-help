"use client"

import SearchBar from "@/components/ui/search-bar";
import { useEffect, useState } from "react";
import HospiceCards from "@/components/cards/hospice-display-cards";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SortDropdown from "@/components/ui/sort-by-options";
import { Code } from "@/lib/types";
import { GetCodeDetails } from "@/lib/get-code-details";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [measureCode, setMeasureCode] = useState(searchParams.get('sort') || "");
  const [scoreData, setScoreData] = useState<Code>();

  // Fetch scoreData when component mounts if there's a sort parameter
  useEffect(() => {
    const sortParam = searchParams.get('sort');
    if (sortParam && !scoreData) {
      // Fetch all sorting codes and find the matching one
      GetCodeDetails("opt_sorting").then(codes => {
        const matchingCode = codes.find(code => code.measure_code === sortParam);
        if (matchingCode) {
          setScoreData(matchingCode);
        }
      });
    }
  }, [searchParams, scoreData]);

  // This function now updates the URL.
  const handleSearchChange = (newSearchQuery: string) => {
    // update url params
    setSearchQuery(newSearchQuery);
    const params = new URLSearchParams(searchParams);
    if (newSearchQuery) {
      params.set('search', newSearchQuery);
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

    const params = new URLSearchParams(searchParams);
    if (newSortValue) {
      params.set('sort', newSortValue);
    } else {
      // Only delete 'sort' if we have a value to remove
      params.delete('sort');
    }

    // Use router.replace to update the URL without adding to browser history
    router.replace(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Search Hospices</h1>
        <p className="text-foreground mb-8">Search hospices by the zip code they operate in.</p>
        <div className="flex flex-row justify-center max-w-full">
          <SearchBar value={searchQuery} onSearchChange={handleSearchChange}/>
          <SortDropdown 
              selectedValue={measureCode} 
              onSortChange={handleSortChange}
          />
        </div>
        <HospiceCards page={0} zip={searchQuery} measureCode={measureCode} scoreData={scoreData}/>
      </div>
    </div>
  );
}
