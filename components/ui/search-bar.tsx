'use client';

import { useState, useEffect } from 'react';

// Define a type for your post/result object
type Doctor = {
  id: number;
  name: string;
  referralStatus: boolean;
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // A simple debounce implementation
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to fetch');
          setResults(data);
        } catch (error: any) {
          if (error.name !== 'AbortError') {
            console.error(error);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300); // Wait for 300ms after user stops typing

    // Cleanup function to cancel the fetch if the query changes
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for posts..."
        className="w-full p-2 border rounded"
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((doctor) => (
          <li key={doctor.id}>
            <h3>{doctor.name}</h3>
            <h3>{doctor.referralStatus}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}