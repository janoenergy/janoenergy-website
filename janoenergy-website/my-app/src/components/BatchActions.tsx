'use client';

import { useState } from 'react';
import { Trash2, Download, CheckSquare, Square, X } from 'lucide-react';

interface BatchActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDelete: () => void;
  onExport: () => void;
  itemName?: string;
}

export default function BatchActions({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDelete,
  onExport,
  itemName = '项目',
}: BatchActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (selectedCount === 0) return;
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  if (selectedCount === 0) {
    return (
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAll}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <Square className="w-5 h-5" />
            <span className="text-sm">全选</span>
          </button>
          <span className="text-sm text-gray-500">共 {totalCount} 个{itemName}</span>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          导出全部
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-lg mb-4 border border-emerald-200">
        <div className="flex items-center gap-4">
          <button
            onClick={onClearSelection}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-sm font-medium">已选 {selectedCount} 个{itemName}</span>
          </button>
          <button
            onClick={onClearSelection}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            取消选择
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            导出选中
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            删除选中
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">确认删除</h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              确定要删除选中的 {selectedCount} 个{itemName}吗？此操作不可恢复。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
