import * as XLSX from 'xlsx';
import type { Project, NewsItem, User, ProjectCategory, ProjectStatus, NewsCategory, UserRole } from '@/types';

// 导出数据到 Excel
export function exportToExcel<T extends Record<string, unknown>>(
  data: T[], 
  filename: string, 
  sheetName: string = 'Sheet1'
): void {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// 类别标签映射
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

const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  company: '公司动态',
  industry: '行业资讯',
  policy: '政策法规',
};

const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: '管理员',
  editor: '编辑',
  viewer: '查看者',
};

// 格式化项目数据用于导出
export function formatProjectsForExport(projects: Project[]): Record<string, string>[] {
  return projects.map(p => ({
    '项目名称': p.title,
    '英文名称': p.titleEn || '-',
    '项目类型': CATEGORY_LABELS[p.category],
    '项目状态': STATUS_LABELS[p.status],
    '装机容量': p.capacity,
    '项目地点': p.location,
    '开始日期': p.startDate ? new Date(p.startDate).toLocaleDateString('zh-CN') : '-',
    '结束日期': p.endDate ? new Date(p.endDate).toLocaleDateString('zh-CN') : '-',
    '创建时间': new Date(p.createdAt).toLocaleDateString('zh-CN'),
  }));
}

// 格式化新闻数据用于导出
export function formatNewsForExport(news: NewsItem[]): Record<string, string>[] {
  return news.map(n => ({
    '标题': n.title,
    '分类': NEWS_CATEGORY_LABELS[n.category],
    '状态': n.isPublished ? '已发布' : '草稿',
    '发布时间': n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('zh-CN') : '-',
    '创建时间': new Date(n.createdAt).toLocaleDateString('zh-CN'),
  }));
}

// 格式化用户数据用于导出
export function formatUsersForExport(users: User[]): Record<string, string>[] {
  return users.map(u => ({
    '姓名': u.name,
    '邮箱': u.email,
    '角色': USER_ROLE_LABELS[u.role],
    '部门': u.department || '-',
    '状态': u.status === 'active' ? '启用' : '禁用',
    '创建时间': new Date(u.createdAt).toLocaleDateString('zh-CN'),
  }));
}
