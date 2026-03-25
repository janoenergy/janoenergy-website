'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/admin-index';

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ProjectPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        显示 {startItem} - {endItem} 条，共 {totalItems} 条
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
