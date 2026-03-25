'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Building2, History, Heart, Users, Award, Trophy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCompanyApi } from '@/hooks/useApi';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { SectionId } from './components/types';
import { IntroSection } from './components/IntroSection';
import { MilestonesSection } from './components/MilestonesSection';
import { ValuesSection } from './components/ValuesSection';
import { TeamSection } from './components/TeamSection';
import { CertificatesSection } from './components/CertificatesSection';
import { HonorsSection } from './components/HonorsSection';

const SECTIONS = [
  { id: 'intro' as const, label: '公司简介', icon: Building2 },
  { id: 'milestones' as const, label: '发展历程', icon: History },
  { id: 'values' as const, label: '核心价值观', icon: Heart },
  { id: 'team' as const, label: '管理团队', icon: Users },
  { id: 'certificates' as const, label: '资质证书', icon: Award },
  { id: 'honors' as const, label: '荣誉奖项', icon: Trophy },
];

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

  const handleSaveIntro = async (formData: { intro: string; introEn: string }) => {
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

export default function CompanyPage() {
  return (
    <ErrorBoundary>
      <CompanyContent />
    </ErrorBoundary>
  );
}
