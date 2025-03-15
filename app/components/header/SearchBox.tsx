'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

export const SearchBox = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setQuery('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered w-full pl-10 pr-10"
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}; 