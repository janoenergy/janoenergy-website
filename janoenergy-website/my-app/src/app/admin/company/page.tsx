'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Building2, History, Heart, Users, Briefcase, Award, Trophy, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCompanyApi } from '@/hooks/useApi';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

const SECTIONS = [
  { id: 'intro', label: '公司简介', icon: Building2 },
  { id: 'milestones', label: '发展历程', icon: History },
  { id: 'values', label: '核心价值观', icon: Heart },
  { id: 'team', label: '管理团队', icon: Users },
  { id: 'business', label: '业务板块', icon: Briefcase },
  { id: 'certificates', label: '资质证书', icon: Award },
  { id: 'honors', label: '荣誉奖项', icon: Trophy },
];

function CompanyContent() {
  const [activeTab, setActiveTab] = useState('intro');
  const [data, setData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  
  const {
    loading,
    error,
    getCompanyInfo,
    updateCompanyInfo,
    getMilestones,
    getBusinessSections,
  } = useCompanyApi();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    let result;
    switch (activeTab) {
      case 'intro':
        result = await getCompanyInfo();
        break;
      case 'milestones':
        result = await getMilestones();
        break;
      case 'business':
        result = await getBusinessSections();
        break;
      default:
        result = null;
    }
    if (result) setData(result);
  };

  const handleSaveIntro = async (formData: { intro: string; introEn: string }) => {
    setSaving(true);
    const result = await updateCompanyInfo(formData);
    if (result) {
      toast.success('保存成功');
      loadData();
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

        <TabsContent value="intro" className="mt-6">
          <IntroSection data={data} onSave={handleSaveIntro} saving={saving} />
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <Card>
            <CardHeader><CardTitle>发展历程</CardTitle></CardHeader>
            <CardContent>
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <p>功能开发中...</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader><CardTitle>业务板块</CardTitle></CardHeader>
            <CardContent>
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <p>功能开发中...</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {['values', 'team', 'certificates', 'honors'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card>
              <CardHeader><CardTitle>{SECTIONS.find(s => s.id === tab)?.label}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-500">功能开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function IntroSection({ data, onSave, saving }: { data: any, onSave: (data: any) => void, saving: boolean }) {
  const [formData, setFormData] = useState({ intro: '', introEn: '' });

  useEffect(() => {
    if (data) {
      setFormData({ intro: data.intro || '', introEn: data.introEn || '' });
    }
  }, [data]);

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
          />
        </div>
        <div className="space-y-2">
          <Label>英文简介</Label>
          <Textarea
            value={formData.introEn}
            onChange={(e) => setFormData({ ...formData, introEn: e.target.value })}
            rows={6}
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

export default function CompanyPage() {
  return (
    <ErrorBoundary>
      <CompanyContent />
    </ErrorBoundary>
  );
}
