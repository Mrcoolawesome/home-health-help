"use client"

import SearchBar from "@/components/ui/search-bar";
import HospiceCards from "@/components/cards/hospice-display-cards";
import SortDropdown from "@/components/ui/sort-by-options";
import { Code } from "@/lib/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  initialSearch: string;
  initialSort: string;
  initialScoreData?: Code;
};

export default function HomeClient({ initialSearch, initialSort, initialScoreData }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [measureCode, setMeasureCode] = useState(initialSort || "");
  const [scoreData, setScoreData] = useState<Code | undefined>(initialScoreData);

  // Keep sort in sync if URL changes due to navigation (back/forward)
  useEffect(() => {
    const spSort = searchParams.get("sort") || "";
    if (spSort !== measureCode) setMeasureCode(spSort);
    // We intentionally do NOT sync search text from URL while typing to avoid rubber-banding.
  }, [searchParams, measureCode]);

  const handleSearchChange = (newSearchQuery: string) => {
    // Update local state immediately; URL will update via debounce below
    setSearchQuery(newSearchQuery);
  };

  // Debounce URL updates for search to prevent input focus jitter
  useEffect(() => {
    const spSearch = searchParams.get("search") || "";
    // If URL already matches our local state, do nothing
    if (spSearch === searchQuery) return;

    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(t);
  }, [searchQuery, searchParams, pathname, router]);

  const handleSortChange = (newSortValue: string, newCode: Code) => {
    setMeasureCode(newSortValue);
    setScoreData(newCode);

    const params = new URLSearchParams(searchParams);
    if (newSortValue) {
      params.set("sort", newSortValue);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Search Hospices</h1>
        <p className="text-foreground mb-8">Search hospices by the zip code they operate in.</p>
        <div className="flex flex-row justify-center max-w-full">
          <SearchBar value={searchQuery} onSearchChange={handleSearchChange} />
          <SortDropdown selectedValue={measureCode} onSortChange={handleSortChange} />
        </div>
        <HospiceCards page={0} zip={searchQuery} measureCode={measureCode} scoreData={scoreData} />
      </div>
    </div>
  );
}
