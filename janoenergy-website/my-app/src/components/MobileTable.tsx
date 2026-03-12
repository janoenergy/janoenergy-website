'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

interface MobileTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }[];
  actions?: (item: any) => React.ReactNode;
  keyExtractor: (item: any) => string;
}

export default function MobileTable({ data, columns, actions, keyExtractor }: MobileTableProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无数据
      </div>
    );
  }

  return (
    <div className="space-y-3 md:hidden">
      {data.map((item) => {
        const id = keyExtractor(item);
        const isExpanded = expandedItems.has(id);
        
        return (
          <div
            key={id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Main Row - Always Visible */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpand(id)}
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {columns[0].render 
                    ? columns[0].render(item[columns[0].key], item)
                    : item[columns[0].key]
                  }
                </div>
                {columns[1] && (
                  <div className="text-sm text-gray-500 mt-1">
                    {columns[1].render 
                      ? columns[1].render(item[columns[1].key], item)
                      : item[columns[1].key]
                    }
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {actions && (
                  <div onClick={(e) => e.stopPropagation()}>
                    {actions(item)}
                  </div>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                {columns.slice(2).map((col) => (
                  <div key={col.key} className="flex justify-between py-2">
                    <span className="text-sm text-gray-500">{col.label}</span>
                    <span className="text-sm text-gray-900">
                      {col.render 
                        ? col.render(item[col.key], item)
                        : item[col.key]
                      }
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Hook for responsive table
export function useResponsiveTable() {
  const [isMobile, setIsMobile] = useState(false);

  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  });

  return isMobile;
}
