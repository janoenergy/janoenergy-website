'use client';

import { useState } from 'react';
import { Clock, User, FileText, Trash2, Edit, Plus, X } from 'lucide-react';

interface LogEntry {
  id: string;
  action: 'create' | 'update' | 'delete' | 'export';
  target: string;
  targetName: string;
  user: string;
  timestamp: string;
  details?: string;
}

interface OperationLogProps {
  logs: LogEntry[];
  onClear?: () => void;
}

const actionIcons = {
  create: Plus,
  update: Edit,
  delete: Trash2,
  export: FileText,
};

const actionLabels = {
  create: '创建',
  update: '修改',
  delete: '删除',
  export: '导出',
};

const actionColors = {
  create: 'text-green-600 bg-green-100',
  update: 'text-blue-600 bg-blue-100',
  delete: 'text-red-600 bg-red-100',
  export: 'text-gray-600 bg-gray-100',
};

export default function OperationLog({ logs, onClear }: OperationLogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-full hover:shadow-xl transition-shadow"
      >
        <Clock className="w-4 h-4 text-emerald-600" />
        <span className="text-sm text-gray-700">操作日志</span>
        {logs.length > 0 && (
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
            {logs.length}
          </span>
        )}
      </button>

      {/* Log Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg max-h-[80vh] rounded-t-xl sm:rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">操作日志</h3>
              <div className="flex items-center gap-2">
                {onClear && logs.length > 0 && (
                  <button
                    onClick={onClear}
                    className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    清空
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Log List */}
            <div className="overflow-y-auto max-h-[60vh]">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>暂无操作记录</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {logs.map((log) => {
                    const Icon = actionIcons[log.action];
                    return (
                      <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${actionColors[log.action]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-gray-900">
                                {actionLabels[log.action]}
                              </span>
                              <span className="text-gray-600">{log.target}</span>
                              <span className="font-medium text-gray-900 truncate">
                                {log.targetName}
                              </span>
                            </div>
                            {log.details && (
                              <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {log.user}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTime(log.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
