// ============================================
// 公司管理 - 类型定义
// ============================================

import type { 
  CompanyInfo, 
  Milestone, 
  CompanyValue, 
  TeamMember, 
  Certificate, 
  Honor 
} from '@/types';

// 弹窗组件 Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// 公司简介表单数据
export interface IntroFormData {
  intro: string;
  introEn: string;
}

// 通用列表项类型
export interface ListItem {
  id: number;
  [key: string]: unknown;
}

// 通用列表管理组件 Props
export interface ListSectionProps<T extends ListItem> {
  title: string;
  data: T[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
  renderItem: (props: { item: T; onEdit: () => void; onDelete: () => void }) => React.ReactNode;
  formFields: (props: { formData: Record<string, unknown>; setFormData: (data: Record<string, unknown>) => void }) => React.ReactNode;
  emptyText?: string;
}

// 各 Section 的 Props 类型
export interface IntroSectionProps {
  data: CompanyInfo | null;
  onSave: (data: IntroFormData) => void;
  saving: boolean;
  loading: boolean;
}

export interface MilestonesSectionProps {
  data: Milestone[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

export interface ValuesSectionProps {
  data: CompanyValue[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

export interface TeamSectionProps {
  data: TeamMember[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

export interface CertificatesSectionProps {
  data: Certificate[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

export interface HonorsSectionProps {
  data: Honor[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

// Tab 配置
export const SECTIONS = [
  { id: 'intro', label: '公司简介', icon: 'Building2' },
  { id: 'milestones', label: '发展历程', icon: 'History' },
  { id: 'values', label: '核心价值观', icon: 'Heart' },
  { id: 'team', label: '管理团队', icon: 'Users' },
  { id: 'certificates', label: '资质证书', icon: 'Award' },
  { id: 'honors', label: '荣誉奖项', icon: 'Trophy' },
] as const;

export type SectionId = typeof SECTIONS[number]['id'];
