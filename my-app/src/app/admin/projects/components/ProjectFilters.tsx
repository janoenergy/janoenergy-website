'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { FormSelect } from '@/components/ui/admin-index';
import type { SelectOption } from '@/components/ui/admin-index';

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'wind', label: '风电' },
  { value: 'solar', label: '光伏' },
  { value: 'storage', label: '储能' },
];

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'planning', label: '规划中' },
  { value: 'construction', label: '建设中' },
  { value: 'operation', label: '运营中' },
];

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onCategoryChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm p-4 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索项目名称或地点..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pl-10 pr-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <FormSelect
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={[{ value: 'all', label: '全部类型' }, ...CATEGORY_OPTIONS]}
          className="min-w-[140px]"
        />
        <FormSelect
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[{ value: 'all', label: '全部状态' }, ...STATUS_OPTIONS]}
          className="min-w-[140px]"
        />
      </div>
    </motion.div>
  );
}
