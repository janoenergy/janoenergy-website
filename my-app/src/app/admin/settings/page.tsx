'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SiteSettings {
  siteName: string;
  siteNameEn: string;
  description: string;
  descriptionEn: string;
  keywords: string;
}

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  addressEn: string;
}

interface SEOSettings {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: '江能新能源集团',
    siteNameEn: 'Jano Energy Group',
    description: '专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
    descriptionEn: 'Full-chain service provider focusing on wind, solar, and energy storage development, investment, construction, and operation',
    keywords: '新能源,风电,光伏,储能,EPC,江能集团',
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    email: 'contact@janoenergy.com',
    phone: '+86 400-888-8888',
    address: '天津市滨海新区',
    addressEn: 'Binhai New Area, Tianjin, China',
  });

  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    title: '江能新能源集团 - 清洁能源，绿色未来',
    titleEn: 'Jano Energy Group - Clean Energy, Green Future',
    description: '江能新能源集团专注于风电、光伏、储能等新能源项目的开发、投资、建设和运营',
    descriptionEn: 'Jano Energy Group focuses on the development, investment, construction and operation of wind, solar and energy storage projects',
  });

  // 加载设置
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setLoading(true);
    // 从 localStorage 加载（实际项目应从 API 加载）
    const saved = localStorage.getItem('site_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSiteSettings(parsed.site || siteSettings);
      setContactSettings(parsed.contact || contactSettings);
      setSeoSettings(parsed.seo || seoSettings);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 保存到 localStorage（实际项目应保存到数据库）
      localStorage.setItem('site_settings', JSON.stringify({
        site: siteSettings,
        contact: contactSettings,
        seo: seoSettings,
      }));
      
      toast.success('设置已保存');
    } catch (error) {
      toast.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？')) {
      localStorage.removeItem('site_settings');
      loadSettings();
      toast.success('已重置为默认设置');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            重置
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </div>

      {/* 网站信息 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" /> 网站信息
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">网站名称</label>
            <input
              type="text"
              value={siteSettings.siteName}
              onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">英文名称</label>
            <input
              type="text"
              value={siteSettings.siteNameEn}
              onChange={(e) => setSiteSettings({...siteSettings, siteNameEn: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">网站描述</label>
          <textarea
            value={siteSettings.description}
            onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">英文描述</label>
          <textarea
            value={siteSettings.descriptionEn}
            onChange={(e) => setSiteSettings({...siteSettings, descriptionEn: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">关键词（用逗号分隔）</label>
          <input
            type="text"
            value={siteSettings.keywords}
            onChange={(e) => setSiteSettings({...siteSettings, keywords: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      {/* 联系方式 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-emerald-600" /> 联系方式
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
            <input
              type="email"
              value={contactSettings.email}
              onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
            <input
              type="text"
              value={contactSettings.phone}
              onChange={(e) => setContactSettings({...contactSettings, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
            <input
              type="text"
              value={contactSettings.address}
              onChange={(e) => setContactSettings({...contactSettings, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">英文地址</label>
            <input
              type="text"
              value={contactSettings.addressEn}
              onChange={(e) => setContactSettings({...contactSettings, addressEn: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* SEO 设置 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" /> SEO 设置
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">首页标题</label>
            <input
              type="text"
              value={seoSettings.title}
              onChange={(e) => setSeoSettings({...seoSettings, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">英文标题</label>
            <input
              type="text"
              value={seoSettings.titleEn}
              onChange={(e) => setSeoSettings({...seoSettings, titleEn: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta 描述</label>
          <textarea
            value={seoSettings.description}
            onChange={(e) => setSeoSettings({...seoSettings, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">英文 Meta 描述</label>
          <textarea
            value={seoSettings.descriptionEn}
            onChange={(e) => setSeoSettings({...seoSettings, descriptionEn: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleReset}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          重置
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? '保存中...' : '保存设置'}
        </button>
      </div>
    </div>
  );
}
