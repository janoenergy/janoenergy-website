'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/admin-index';
import type { Project, ProjectCategory, ProjectStatus } from '@/types';

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  wind: '风电',
  solar: '光伏',
  storage: '储能',
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: '规划中',
  construction: '建设中',
  operation: '运营中',
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: 'bg-gray-100 text-gray-700 border-gray-200',
  construction: 'bg-amber-50 text-amber-700 border-amber-200',
  operation: 'bg-green-50 text-green-700 border-green-200',
};

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export function ProjectTable({ projects, onEdit, onDelete }: ProjectTableProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-base">没有找到匹配的项目</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '35%' }}>项目信息</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '12%' }}>类型</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>容量</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '18%' }}>状态</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '20%' }}>操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 text-xs">无图</span>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 text-base truncate">{project.title}</div>
                      <div className="text-sm text-gray-500 truncate">{project.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-base whitespace-nowrap">
                    {CATEGORY_LABELS[project.category]}
                  </span>
                </td>
                <td className="px-4 py-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {project.capacity}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border whitespace-nowrap ${STATUS_COLORS[project.status]}`}>
                    {STATUS_LABELS[project.status]}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(project)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(project.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
