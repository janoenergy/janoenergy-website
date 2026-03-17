export interface Project {
  id: string;
  title: string;
  category: 'wind' | 'solar' | 'storage';
  categoryName: string;
  location: string;
  capacity: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  imageUrl?: string;
  completionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'company' | 'industry';
  coverImage?: string;
  publishedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export type BusinessType = 'development' | 'investment' | 'epc' | 'operation';

export interface BusinessSection {
  id: BusinessType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
}
