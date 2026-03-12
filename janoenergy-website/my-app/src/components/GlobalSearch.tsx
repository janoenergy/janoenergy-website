'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface GlobalSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounce?: number;
}

export default function GlobalSearch({ 
  onSearch, 
  placeholder = '搜索...',
  debounce = 300 
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounce);

    return () => clearTimeout(timer);
  }, [query, debounce, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative flex items-center transition-all duration-200 ${
      isFocused ? 'ring-2 ring-emerald-500' : ''
    }`}>
      <Search className="absolute left-3 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}
