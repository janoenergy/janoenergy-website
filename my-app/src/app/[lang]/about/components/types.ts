// About 页面类型定义

export interface CompanyInfo {
  id: number;
  intro: string;
  introEn: string;
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

export interface Project {
  id: number;
  capacity: string;
  location: string;
}

export interface Stats {
  capacity: number;
  projects: number;
  provinces: number;
  year: number;
}
