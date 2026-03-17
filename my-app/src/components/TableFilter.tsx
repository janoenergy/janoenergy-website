'use client';

import { useState } from 'react';
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';

interface TableFilterProps {
  columns: { key: string; label: string }[];
  onFilter: (column: string, value: string) => void;
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  filters?: { key: string; label: string; options: string[] }[];
}

export default function TableFilter({ columns, onFilter, onSort, filters = [] }: TableFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeSort, setActiveSort] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (column: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (activeSort?.column === column && activeSort.direction === 'asc') {
      direction = 'desc';
    }
    setActiveSort({ column, direction });
    onSort(column, direction);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">排序:</span>
          {columns.map((col) => (
            <button
              key={col.key}
              onClick={() => handleSort(col.key)}
              className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                activeSort?.column === col.key
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {col.label}
              <ArrowUpDown className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            筛选
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && filters.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          {filters.map((filter) => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </label>
              <select
                onChange={(e) => onFilter(filter.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">全部</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
