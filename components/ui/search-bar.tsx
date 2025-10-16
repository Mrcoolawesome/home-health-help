'use client';

import { useState, useEffect } from 'react';

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
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search physicians by name or specialty..."
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
      />
      {loading && <p className="mt-2 text-gray-400">Loading...</p>}
      {results.length > 0 && (
        <ul className="mt-4 space-y-2">
          {results.map((doctor) => (
            <li key={doctor.id} className="bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/20 transition">
              <h3 className="font-semibold text-white">{doctor.name}</h3>
              <p className="text-gray-300 text-sm">
                {doctor.referralStatus ? 'Looking for referral partners' : 'Not accepting referrals'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
