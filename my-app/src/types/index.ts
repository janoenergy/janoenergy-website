// ============================================
// 统一类型定义文件
// 所有 API 相关的类型都在这里定义
// ============================================

// ============================================
// 项目相关类型
// ============================================

export type ProjectCategory = 'wind' | 'solar' | 'storage';
export type ProjectStatus = 'planning' | 'construction' | 'operation';

export interface Project {
  id: number;
  title: string;
  titleEn?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  capacity: string;
  location: string;
  locationEn?: string;
  description?: string;
  descriptionEn?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

// 项目表单数据类型
export interface ProjectFormData {
  title: string;
  titleEn: string;
  category: ProjectCategory;
  status: ProjectStatus;
  capacity: string;
  location: string;
  locationEn: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
}

// ============================================
// 新闻相关类型
// ============================================

export type NewsCategory = 'company' | 'industry' | 'policy';

export interface NewsItem {
  id: number;
  title: string;
  titleEn?: string;
  summary?: string;
  content?: string;
  category: NewsCategory;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

// 新闻表单数据类型
export interface NewsFormData {
  title: string;
  titleEn: string;
  summary: string;
  content: string;
  category: NewsCategory;
  isPublished: boolean;
}

// ============================================
// 用户相关类型
// ============================================

export type UserRole = 'admin' | 'editor' | 'viewer';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

// 用户表单数据类型
export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
}

// ============================================
// 公司信息相关类型
// ============================================

export interface CompanyInfo {
  id: number;
  intro: string;
  introEn: string;
  mission?: string;
  vision?: string;
  updatedAt?: string;
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  sortOrder: number;
}

export interface CompanyValue {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  sortOrder: number;
}

export interface TeamMember {
  id: number;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  imageUrl: string;
  education: string;
  educationEn: string;
  experience: string;
  experienceEn: string;
  description: string;
  descriptionEn: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  issueDate: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Honor {
  id: number;
  title: string;
  titleEn: string;
  year: string;
  issuer: string;
  imageUrl?: string;
  sortOrder: number;
}

// ============================================
// 业务相关类型
// ============================================

export type BusinessType = 'development' | 'investment' | 'epc' | 'operation';

export interface BusinessSection {
  id: BusinessType;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn?: string[];
  icon: string;
}

// ============================================
// ESG 相关类型
// ============================================

export interface ESGData {
  carbonTarget: {
    peak: { year: number; progress: number };
    neutral: { year: number; progress: number };
  };
  environment: {
    totalReduction: number;
    coalSaved: number;
    co2Reduced: number;
    treesEquivalent: number;
  };
  social: {
    jobsCreated: number;
    ruralInvestment: number;
    communityEvents: number;
    scholarships: number;
  };
  governance: {
    esgCommittee: boolean;
    transparency: string;
    compliance: string;
  };
}

// ============================================
// 统计数据类型
// ============================================

export interface Stats {
  capacity: number;
  projects: number;
  provinces: number;
  year: number;
}

export interface RealTimeData {
  todayGeneration: number;
  totalReduction: number;
  activeProjects: number;
  onlineRate: string;
  co2Saved: number;
  homesPowered: number;
}

// ============================================
// 系统设置类型
// ============================================

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  icp?: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

// ============================================
// API 响应类型
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  code: number;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, string[]>;
}

// ============================================
// 通用类型
// ============================================

export interface SelectOption {
  value: string;
  label: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// 语言类型
export type Lang = 'zh' | 'en';

// 主题类型
export type Theme = 'light' | 'dark';
