'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Building2, History, Heart, Users, Briefcase, Award, Trophy, Save, Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { API_BASE_URL } from '@/lib/config';

const SECTIONS = [
  { id: 'intro', label: '公司简介', icon: Building2 },
  { id: 'milestones', label: '发展历程', icon: History },
  { id: 'values', label: '核心价值观', icon: Heart },
  { id: 'team', label: '管理团队', icon: Users },
  { id: 'business', label: '业务板块', icon: Briefcase },
  { id: 'certificates', label: '资质证书', icon: Award },
  { id: 'honors', label: '荣誉奖项', icon: Trophy },
];

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState('intro');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const urls: Record<string, string> = {
        intro: `${API_BASE_URL}/api/company/info`,
        milestones: `${API_BASE_URL}/api/company/milestones`,
        values: `${API_BASE_URL}/api/company/values`,
        team: `${API_BASE_URL}/api/team/members`,
        business: `${API_BASE_URL}/api/business/sections`,
        certificates: `${API_BASE_URL}/api/certificates`,
        honors: `${API_BASE_URL}/api/honors`,
      };
      const res = await fetch(urls[activeTab], { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setData(await res.json());
    } catch (error) {
      toast.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">公司内容管理</h1>
        <p className="text-gray-500 mt-1">管理公司介绍、发展历程、团队等信息</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2">
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

        <TabsContent value="intro" className="mt-6"><IntroSection data={data} onRefresh={fetchData} /></TabsContent>
        <TabsContent value="milestones" className="mt-6"><MilestonesSection data={data} onRefresh={fetchData} loading={loading} /></TabsContent>
        <TabsContent value="values" className="mt-6"><PlaceholderSection title="核心价值观" /></TabsContent>
        <TabsContent value="team" className="mt-6"><PlaceholderSection title="管理团队" /></TabsContent>
        <TabsContent value="business" className="mt-6"><BusinessSection data={data} onRefresh={fetchData} loading={loading} /></TabsContent>
        <TabsContent value="certificates" className="mt-6"><PlaceholderSection title="资质证书" /></TabsContent>
        <TabsContent value="honors" className="mt-6"><PlaceholderSection title="荣誉奖项" /></TabsContent>
      </Tabs>
    </div>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <p className="text-gray-500">该模块正在开发中...</p>
      </CardContent>
    </Card>
  );
}

function IntroSection({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const [formData, setFormData] = useState({ intro: '', introEn: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setFormData({ intro: data.intro || '', introEn: data.introEn || '' });
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/company/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) { toast.success('保存成功'); onRefresh(); } else toast.error('保存失败');
    } catch (error) { toast.error('保存失败'); }
    finally { setSaving(false); }
  };

  return (
    <Card>
      <CardHeader><CardTitle>公司简介</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>中文简介</Label>
          <Textarea value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} rows={6} />
        </div>
        <div className="space-y-2">
          <Label>英文简介</Label>
          <Textarea value={formData.introEn} onChange={(e) => setFormData({ ...formData, introEn: e.target.value })} rows={6} />
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 保存
        </Button>
      </CardContent>
    </Card>
  );
}

function MilestonesSection({ data, onRefresh, loading }: { data: any[], onRefresh: () => void, loading: boolean }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({ year: '', title: '', titleEn: '', description: '', descriptionEn: '', sortOrder: 0 });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `${API_BASE_URL}/api/company/milestones/${editing.id}` : `${API_BASE_URL}/api/company/milestones`;
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) { toast.success(editing ? '更新成功' : '创建成功'); setDialogOpen(false); setEditing(null); onRefresh(); }
      else toast.error('操作失败');
    } catch (error) { toast.error('操作失败'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除吗？')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/company/milestones/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { toast.success('删除成功'); onRefresh(); } else toast.error('删除失败');
    } catch (error) { toast.error('删除失败'); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>发展历程</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setFormData({ year: '', title: '', titleEn: '', description: '', descriptionEn: '', sortOrder: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> 添加里程碑
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editing ? '编辑里程碑' : '添加里程碑'}</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>年份</Label><Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} /></div>
                <div className="space-y-2"><Label>排序</Label><Input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })} /></div>
              </div>
              <div className="space-y-2"><Label>标题</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
              <div className="space-y-2"><Label>英文标题</Label><Input value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} /></div>
              <div className="space-y-2"><Label>描述</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} /></div>
              <div className="space-y-2"><Label>英文描述</Label><Textarea value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} rows={3} /></div>
              <Button onClick={handleSubmit} className="w-full">{editing ? '更新' : '创建'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div> : (
          <div className="space-y-4">
            {(data || []).map((item: any) => (
              <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-20 font-bold text-emerald-600">{item.year}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setFormData(item); setDialogOpen(true); }}><Edit2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BusinessSection({ data, onRefresh, loading }: { data: any[], onRefresh: () => void, loading: boolean }) {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) setSections(data);
  }, [data]);

  const handleUpdate = async (section: any) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/business/sections/${section.sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(section)
      });
      if (res.ok) { toast.success('更新成功'); onRefresh(); } else toast.error('更新失败');
    } catch (error) { toast.error('更新失败'); }
  };

  const updateSection = (id: string, field: string, value: string) => {
    setSections(sections.map(s => s.sectionId === id ? { ...s, [field]: value } : s));
  };

  return (
    <Card>
      <CardHeader><CardTitle>业务板块</CardTitle></CardHeader>
      <CardContent>
        {loading ? <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div> : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.sectionId} className="p-6 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <Button onClick={() => handleUpdate(section)}><Save className="w-4 h-4 mr-2" /> 保存</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>标题</Label><Input value={section.title} onChange={(e) => updateSection(section.sectionId, 'title', e.target.value)} /></div>
                  <div className="space-y-2"><Label>英文标题</Label><Input value={section.titleEn || ''} onChange={(e) => updateSection(section.sectionId, 'titleEn', e.target.value)} /></div>
                  <div className="space-y-2"><Label>副标题</Label><Input value={section.subtitle || ''} onChange={(e) => updateSection(section.sectionId, 'subtitle', e.target.value)} /></div>
                  <div className="space-y-2"><Label>英文副标题</Label><Input value={section.subtitleEn || ''} onChange={(e) => updateSection(section.sectionId, 'subtitleEn', e.target.value)} /></div>
                  <div className="space-y-2 md:col-span-2"><Label>描述</Label><Textarea value={section.description} onChange={(e) => updateSection(section.sectionId, 'description', e.target.value)} rows={3} /></div>
                  <div className="space-y-2 md:col-span-2"><Label>英文描述</Label><Textarea value={section.descriptionEn || ''} onChange={(e) => updateSection(section.sectionId, 'descriptionEn', e.target.value)} rows={3} /></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
