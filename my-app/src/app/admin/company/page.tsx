'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Building2, History, Heart, Users, Award, Trophy, Save, Loader2, Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCompanyApi } from '@/hooks/useApi';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUpload } from '@/components/ui/image-upload';
import type { 
  CompanyInfo, 
  Milestone, 
  CompanyValue, 
  TeamMember, 
  Certificate, 
  Honor 
} from '@/types';

const SECTIONS = [
  { id: 'intro', label: '公司简介', icon: Building2 },
  { id: 'milestones', label: '发展历程', icon: History },
  { id: 'values', label: '核心价值观', icon: Heart },
  { id: 'team', label: '管理团队', icon: Users },
  { id: 'certificates', label: '资质证书', icon: Award },
  { id: 'honors', label: '荣誉奖项', icon: Trophy },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

// 弹窗组件
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// 公司简介表单数据类型
interface IntroFormData {
  intro: string;
  introEn: string;
}

// 通用列表项类型
interface ListItem {
  id: number;
  [key: string]: unknown;
}

// 通用列表管理组件 Props
interface ListSectionProps<T extends ListItem> {
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

function CompanyContent() {
  const [activeTab, setActiveTab] = useState<SectionId>('intro');
  const [saving, setSaving] = useState(false);
  
  const {
    loading,
    error,
    companyInfo,
    milestones,
    values,
    teamMembers,
    certificates,
    honors,
    fetchCompanyInfo,
    fetchMilestones,
    fetchValues,
    fetchTeamMembers,
    fetchCertificates,
    fetchHonors,
    updateCompanyInfo,
    createMilestone,
    updateMilestone,
    deleteMilestone,
    createValue,
    updateValue,
    deleteValue,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    createHonor,
    updateHonor,
    deleteHonor,
  } = useCompanyApi();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    switch (activeTab) {
      case 'intro':
        await fetchCompanyInfo();
        break;
      case 'milestones':
        await fetchMilestones();
        break;
      case 'values':
        await fetchValues();
        break;
      case 'team':
        await fetchTeamMembers();
        break;
      case 'certificates':
        await fetchCertificates();
        break;
      case 'honors':
        await fetchHonors();
        break;
    }
  };

  const handleSaveIntro = async (formData: IntroFormData) => {
    setSaving(true);
    const result = await updateCompanyInfo(formData);
    if (result) {
      toast.success('保存成功');
    } else {
      toast.error('保存失败');
    }
    setSaving(false);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          加载失败: {error}
          <button 
            onClick={loadData}
            className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-sm"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">公司内容管理</h1>
        <p className="text-gray-500 mt-1">管理公司介绍、发展历程、团队等信息</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SectionId)}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{section.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="intro" className="mt-6">
          <IntroSection 
            data={companyInfo} 
            onSave={handleSaveIntro} 
            saving={saving} 
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <MilestonesSection 
            data={milestones}
            loading={loading}
            onCreate={createMilestone}
            onUpdate={updateMilestone}
            onDelete={deleteMilestone}
            onRefresh={fetchMilestones}
          />
        </TabsContent>

        <TabsContent value="values" className="mt-6">
          <ValuesSection 
            data={values}
            loading={loading}
            onCreate={createValue}
            onUpdate={updateValue}
            onDelete={deleteValue}
            onRefresh={fetchValues}
          />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamSection 
            data={teamMembers}
            loading={loading}
            onCreate={createTeamMember}
            onUpdate={updateTeamMember}
            onDelete={deleteTeamMember}
            onRefresh={fetchTeamMembers}
          />
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <CertificatesSection 
            data={certificates}
            loading={loading}
            onCreate={createCertificate}
            onUpdate={updateCertificate}
            onDelete={deleteCertificate}
            onRefresh={fetchCertificates}
          />
        </TabsContent>

        <TabsContent value="honors" className="mt-6">
          <HonorsSection 
            data={honors}
            loading={loading}
            onCreate={createHonor}
            onUpdate={updateHonor}
            onDelete={deleteHonor}
            onRefresh={fetchHonors}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 公司简介
interface IntroSectionProps {
  data: CompanyInfo | null;
  onSave: (data: IntroFormData) => void;
  saving: boolean;
  loading: boolean;
}

function IntroSection({ data, onSave, saving, loading }: IntroSectionProps) {
  const [formData, setFormData] = useState<IntroFormData>({ intro: '', introEn: '' });

  useEffect(() => {
    if (data) {
      setFormData({ intro: data.intro || '', introEn: data.introEn || '' });
    }
  }, [data]);

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>公司简介</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle>公司简介</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>中文简介</Label>
          <Textarea
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            rows={6}
            placeholder="请输入公司中文简介..."
          />
        </div>
        <div className="space-y-2">
          <Label>英文简介</Label>
          <Textarea
            value={formData.introEn}
            onChange={(e) => setFormData({ ...formData, introEn: e.target.value })}
            rows={6}
            placeholder="请输入公司英文简介..."
          />
        </div>
        <Button onClick={() => onSave(formData)} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          保存
        </Button>
      </CardContent>
    </Card>
  );
}

// 通用列表管理组件
function ListSection<T extends ListItem>({ 
  title, 
  data, 
  loading, 
  onCreate, 
  onUpdate, 
  onDelete, 
  onRefresh,
  renderItem,
  formFields,
  emptyText = '暂无数据'
}: ListSectionProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const result = editingItem 
      ? await onUpdate(editingItem.id, formData)
      : await onCreate(formData);
    
    if (result) {
      toast.success(editingItem ? '更新成功' : '创建成功');
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      onRefresh();
    } else {
      toast.error('操作失败');
    }
    setSubmitting(false);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setFormData(item as Record<string, unknown>);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除吗？')) return;
    const result = await onDelete(id);
    if (result) {
      toast.success('删除成功');
      onRefresh();
    } else {
      toast.error('删除失败');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button size="sm" onClick={() => { setEditingItem(null); setFormData({}); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> 添加
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((item) => (
            <div key={item.id}>
              {renderItem({ item, onEdit: () => handleEdit(item), onDelete: () => handleDelete(item.id) })}
            </div>
          ))}
          {(!data || data.length === 0) && (
            <div className="text-center py-8 text-gray-500">{emptyText}</div>
          )}
        </div>
      </CardContent>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? '编辑' : '添加'}>
        <div className="space-y-4">
          {formFields({ formData, setFormData })}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>取消</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              保存
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

// 发展历程
interface MilestonesSectionProps {
  data: Milestone[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

function MilestonesSection(props: MilestonesSectionProps) {
  return (
    <ListSection<Milestone>
      {...props}
      title="发展历程"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-600">{item.year}</span>
              <span className="font-medium">{item.title}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div><Label>年份 *</Label><Input value={(formData.year as string) || ''} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="如: 2024" /></div>
          <div><Label>标题 *</Label><Input value={(formData.title as string) || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="中文标题" /></div>
          <div><Label>英文标题</Label><Input value={(formData.titleEn as string) || ''} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} placeholder="English Title" /></div>
          <div><Label>描述</Label><Textarea value={(formData.description as string) || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} /></div>
          <div><Label>英文描述</Label><Textarea value={(formData.descriptionEn as string) || ''} onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})} /></div>
          <div><Label>排序</Label><Input type="number" value={(formData.sortOrder as number) || 0} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} /></div>
        </>
      )}
    />
  );
}

// 核心价值观
interface ValuesSectionProps {
  data: CompanyValue[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

function ValuesSection(props: ValuesSectionProps) {
  return (
    <ListSection<CompanyValue>
      {...props}
      title="核心价值观"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-emerald-600">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
          </div>
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div><Label>标题 *</Label><Input value={(formData.title as string) || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
          <div><Label>英文标题</Label><Input value={(formData.titleEn as string) || ''} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} /></div>
          <div><Label>描述</Label><Textarea value={(formData.description as string) || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} /></div>
          <div><Label>英文描述</Label><Textarea value={(formData.descriptionEn as string) || ''} onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})} /></div>
          <div><Label>排序</Label><Input type="number" value={(formData.sortOrder as number) || 0} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} /></div>
        </>
      )}
    />
  );
}

// 管理团队
interface TeamSectionProps {
  data: TeamMember[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

function TeamSection(props: TeamSectionProps) {
  return (
    <ListSection<TeamMember>
      {...props}
      title="管理团队"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-emerald-600">{item.name?.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-emerald-600">{item.title}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>姓名 *</Label><Input value={(formData.name as string) || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
            <div><Label>英文姓名</Label><Input value={(formData.nameEn as string) || ''} onChange={(e) => setFormData({...formData, nameEn: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>职位 *</Label><Input value={(formData.title as string) || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
            <div><Label>英文职位</Label><Input value={(formData.titleEn as string) || ''} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} /></div>
          </div>
          <div>
            <Label>照片</Label>
            <ImageUpload
              value={(formData.imageUrl as string) || ''}
              onChange={(url) => setFormData({...formData, imageUrl: url})}
              className="mt-2"
            />
          </div>
          <div><Label>排序</Label><Input type="number" value={(formData.sortOrder as number) || 0} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} /></div>
        </>
      )}
    />
  );
}

// 资质证书
interface CertificatesSectionProps {
  data: Certificate[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

function CertificatesSection(props: CertificatesSectionProps) {
  return (
    <ListSection<Certificate>
      {...props}
      title="资质证书"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <Award className="w-8 h-8 text-emerald-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.issuer}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div><Label>证书名称 *</Label><Input value={(formData.title as string) || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
          <div><Label>英文名称</Label><Input value={(formData.titleEn as string) || ''} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} /></div>
          <div><Label>颁发机构</Label><Input value={(formData.issuer as string) || ''} onChange={(e) => setFormData({...formData, issuer: e.target.value})} /></div>
          <div><Label>颁发日期</Label><Input type="date" value={(formData.issueDate as string) || ''} onChange={(e) => setFormData({...formData, issueDate: e.target.value})} /></div>
          <div>
            <Label>证书图片</Label>
            <ImageUpload
              value={(formData.imageUrl as string) || ''}
              onChange={(url) => setFormData({...formData, imageUrl: url})}
              className="mt-2"
            />
          </div>
          <div><Label>排序</Label><Input type="number" value={(formData.sortOrder as number) || 0} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} /></div>
        </>
      )}
    />
  );
}

// 荣誉奖项
interface HonorsSectionProps {
  data: Honor[] | null;
  loading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<boolean>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => Promise<void>;
}

function HonorsSection(props: HonorsSectionProps) {
  return (
    <ListSection<Honor>
      {...props}
      title="荣誉奖项"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <Trophy className="w-8 h-8 text-amber-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.issuer} · {item.year}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div><Label>奖项名称 *</Label><Input value={(formData.title as string) || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
          <div><Label>英文名称</Label><Input value={(formData.titleEn as string) || ''} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} /></div>
          <div><Label>颁发机构</Label><Input value={(formData.issuer as string) || ''} onChange={(e) => setFormData({...formData, issuer: e.target.value})} /></div>
          <div><Label>年份</Label><Input value={(formData.year as string) || ''} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="如: 2024" /></div>
          <div>
            <Label>奖项图片</Label>
            <ImageUpload
              value={(formData.imageUrl as string) || ''}
              onChange={(url) => setFormData({...formData, imageUrl: url})}
              className="mt-2"
            />
          </div>
          <div><Label>排序</Label><Input type="number" value={(formData.sortOrder as number) || 0} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} /></div>
        </>
      )}
    />
  );
}

export default function CompanyPage() {
  return (
    <ErrorBoundary>
      <CompanyContent />
    </ErrorBoundary>
  );
}
