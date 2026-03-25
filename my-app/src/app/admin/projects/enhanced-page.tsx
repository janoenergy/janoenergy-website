'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import LoadingSpinner from '@/components/Loading';
import { toast } from 'sonner';
import GlobalSearch from '@/components/GlobalSearch';
import TableFilter from '@/components/TableFilter';
import BatchActions from '@/components/BatchActions';
import OperationLog, { LogEntry } from '@/components/OperationLog';
import MobileTable from '@/components/MobileTable';

// 使用统一的 Project 类型
import type { Project } from '@/types';

// 扩展本地使用的 Project 类型
interface LocalProject extends Project {
  createdAt: string;
}

// 定义可排序的字段类型
type SortableField = 'title' | 'category' | 'status' | 'capacity' | 'location';

export default function EnhancedProjectsPage() {
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<LocalProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 获取项目数据
  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.projects);
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      toast.error('获取项目失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 搜索功能
  useEffect(() => {
    let result = projects;
    
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProjects(result);
  }, [searchQuery, projects]);

  // 排序功能
  const handleSort = (column: SortableField, direction: 'asc' | 'desc') => {
    const sorted = [...filteredProjects].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (direction === 'asc') {
          return aValue.localeCompare(bValue);
        }
        return bValue.localeCompare(aValue);
      }
      
      // 对于非字符串类型，转换为字符串比较
      const aStr = String(aValue);
      const bStr = String(bValue);
      if (direction === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
    setFilteredProjects(sorted);
  };

  // 筛选功能
  const handleFilter = (column: SortableField, value: string) => {
    if (!value) {
      setFilteredProjects(projects);
      return;
    }
    const filtered = projects.filter((p) => p[column] === value);
    setFilteredProjects(filtered);
  };

  // 全选
  const handleSelectAll = () => {
    if (selectedIds.size === filteredProjects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProjects.map(p => p.id)));
    }
  };

  // 单个选择
  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // 批量删除
  const handleBatchDelete = async () => {
    try {
      for (const id of selectedIds) {
        await fetch(`${API_ENDPOINTS.projects}/${id}`, { method: 'DELETE' });
      }
      
      // 添加日志
      const newLog: LogEntry = {
        id: Date.now().toString(),
        action: 'delete',
        target: '项目',
        targetName: `批量删除 ${selectedIds.size} 个项目`,
        user: '管理员',
        timestamp: new Date().toISOString(),
      };
      setLogs(prev => [newLog, ...prev]);
      
      setSelectedIds(new Set());
      fetchProjects();
      toast.success(`成功删除 ${selectedIds.size} 个项目`);
    } catch (error) {
      toast.error('删除失败');
    }
  };

  // 批量导出
  const handleBatchExport = () => {
    const selectedProjects = projects.filter(p => selectedIds.has(p.id));
    const csv = convertToCSV(selectedProjects);
    downloadCSV(csv, 'projects.csv');
    
    const newLog: LogEntry = {
      id: Date.now().toString(),
      action: 'export',
      target: '项目',
      targetName: `导出 ${selectedIds.size} 个项目`,
      user: '管理员',
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
    
    toast.success('导出成功');
  };

  // CSV转换
  const convertToCSV = (data: LocalProject[]) => {
    const headers = ['ID', '标题', '类型', '状态', '容量', '地点'];
    const rows = data.map(p => [p.id, p.title, p.category, p.status, p.capacity, p.location]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  // 下载CSV
  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
        <button className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus className="w-5 h-5" />
          新建项目
        </button>
      </div>

      {/* Global Search */}
      <div className="mb-4">
        <GlobalSearch 
          onSearch={setSearchQuery}
          placeholder="搜索项目名称或地点..."
        />
      </div>

      {/* Filter & Sort */}
      <TableFilter
        columns={[
          { key: 'title', label: '标题' },
          { key: 'category', label: '类型' },
          { key: 'status', label: '状态' },
        ]}
        onFilter={(column, value) => handleFilter(column as SortableField, value)}
        onSort={(column, direction) => handleSort(column as SortableField, direction)}
        filters={[
          { key: 'category', label: '项目类型', options: ['wind', 'solar', 'storage'] },
          { key: 'status', label: '项目状态', options: ['planning', 'construction', 'operation'] },
        ]}
      />

      {/* Batch Actions */}
      <BatchActions
        selectedCount={selectedIds.size}
        totalCount={filteredProjects.length}
        onSelectAll={handleSelectAll}
        onClearSelection={() => setSelectedIds(new Set())}
        onDelete={handleBatchDelete}
        onExport={handleBatchExport}
        itemName="项目"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.size === filteredProjects.length && filteredProjects.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">标题</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">类型</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">容量</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">地点</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(project.id)}
                    onChange={() => toggleSelect(project.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{project.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{project.category}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{project.status}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{project.capacity}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{project.location}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <MobileTable
        data={filteredProjects}
        columns={[
          { key: 'title', label: '标题' },
          { key: 'category', label: '类型' },
          { key: 'status', label: '状态' },
          { key: 'capacity', label: '容量' },
          { key: 'location', label: '地点' },
        ]}
        actions={() => (
          <div className="flex items-center gap-2">
            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Operation Log */}
      <OperationLog logs={logs} onClear={() => setLogs([])} />
    </div>
  );
}
