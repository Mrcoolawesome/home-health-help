"use client"

import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import HospiceCards from "@/components/cards/hospice-display-cards";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Provider Dashboard</h1>
        <p className="text-gray-300 mb-8">Search physicians and manage provider information.</p>
        <SearchBar onSearchChange={handleSearchChange}/>
        <HospiceCards page={0} zip={query} />
      </div>
    </div>
  );
} 
