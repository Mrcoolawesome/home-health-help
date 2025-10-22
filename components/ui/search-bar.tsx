'use client';

import { useState } from 'react';

type SearchBarProps = {
  onSearchChange: (newQuery: string) => void;
};

export default function SearchBar({ onSearchChange } : SearchBarProps ) {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search hospices by a zipcode they serve"
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
      />
    </div>
  );
}
