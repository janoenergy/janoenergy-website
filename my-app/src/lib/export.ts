import * as XLSX from 'xlsx';

// 导出数据到 Excel
export function exportToExcel(data: any[], filename: string, sheetName: string = 'Sheet1') {
  // 创建工作簿
  const wb = XLSX.utils.book_new();
  
  // 创建工作表
  const ws = XLSX.utils.json_to_sheet(data);
  
  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  // 下载文件
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// 格式化项目数据用于导出
export function formatProjectsForExport(projects: any[]) {
  return projects.map(p => ({
    '项目名称': p.title,
    '英文名称': p.titleEn || '-',
    '项目类型': p.category === 'wind' ? '风电' : p.category === 'solar' ? '光伏' : '储能',
    '项目状态': p.status === 'operation' ? '运营中' : p.status === 'construction' ? '建设中' : '规划中',
    '装机容量': p.capacity,
    '项目地点': p.location,
    '开始日期': p.startDate ? new Date(p.startDate).toLocaleDateString('zh-CN') : '-',
    '结束日期': p.endDate ? new Date(p.endDate).toLocaleDateString('zh-CN') : '-',
    '创建时间': new Date(p.createdAt).toLocaleDateString('zh-CN'),
  }));
}

// 格式化新闻数据用于导出
export function formatNewsForExport(news: any[]) {
  return news.map(n => ({
    '标题': n.title,
    '分类': n.category === 'company' ? '公司动态' : n.category === 'industry' ? '行业资讯' : '政策法规',
    '状态': n.isPublished ? '已发布' : '草稿',
    '发布时间': n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('zh-CN') : '-',
    '创建时间': new Date(n.createdAt).toLocaleDateString('zh-CN'),
  }));
}

// 格式化用户数据用于导出
export function formatUsersForExport(users: any[]) {
  return users.map(u => ({
    '姓名': u.name,
    '用户名': u.username,
    '邮箱': u.email,
    '角色': u.role === 'admin' ? '管理员' : u.role === 'manager' ? '经理' : '员工',
    '部门': u.department || '-',
    '状态': u.isActive ? '启用' : '禁用',
    '创建时间': new Date(u.createdAt).toLocaleDateString('zh-CN'),
  }));
}
