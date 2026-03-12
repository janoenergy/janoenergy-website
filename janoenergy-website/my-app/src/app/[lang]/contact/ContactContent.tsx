'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Loader2 } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';

// Formspree 表单 ID
const FORMSPREE_FORM_ID = 'mqakvnje';

export default function ContactContent({ lang }: { lang: Lang }) {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', content: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `江能集团网站留言 - ${formData.name}`,
          _language: lang,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', content: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(lang === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again later');
      }
    } catch {
      setError(lang === 'zh' ? '网络错误，请检查网络连接' : 'Network error, please check your connection');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-emerald-100">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.info.title}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.info.address}</h3>
                  <p className="text-gray-600">{lang === 'zh' ? '天津市滨海新区开发区第三大街' : '3rd Avenue, Binhai Development Zone, Tianjin'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.info.phone}</h3>
                  <p className="text-gray-600">+86 400-888-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.info.email}</h3>
                  <p className="text-gray-600">contact@janoenergy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.info.hours}</h3>
                  <p className="text-gray-600">{t.info.hoursValue}</p>
                </div>
              </div>
            </div>

            {/* 地图 */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '公司位置' : 'Our Location'}</h3>
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="400" height="300" fill="url(#grid)" />
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#cbd5e1" strokeWidth="8" />
                      <line x1="200" y1="0" x2="200" y2="300" stroke="#cbd5e1" strokeWidth="8" />
                      <circle cx="200" cy="150" r="15" fill="#10b981" opacity="0.3" />
                      <circle cx="200" cy="150" r="8" fill="#10b981" />
                      <text x="220" y="145" fontSize="12" fill="#374151">JanoEnergy</text>
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Tianjin, China</p>
                    <a 
                      href="https://maps.google.com/?q=Tianjin,China" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block"
                    >
                      {lang === 'zh' ? '在 Google 地图中打开' : 'Open in Google Maps'} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.form.title}</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {lang === 'zh' ? '提交成功！' : 'Submitted Successfully!'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'zh' ? '我们会尽快与您联系' : 'We will contact you soon'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.name}</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        disabled={submitting}
                        className="w-full px-4 h-11 py-0 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:bg-gray-100"
                        placeholder={t.form.namePlaceholder}
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.phone}</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        disabled={submitting}
                        className="w-full px-4 h-11 py-0 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:bg-gray-100"
                        placeholder={t.form.phonePlaceholder}
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.email}</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      disabled={submitting}
                      className="w-full px-4 h-11 py-0 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:bg-gray-100"
                      placeholder={t.form.emailPlaceholder}
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.content}</label>
                    <textarea 
                      name="content"
                      rows={4} 
                      required
                      disabled={submitting}
                      className="w-full px-4 h-11 py-0 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none disabled:bg-gray-100"
                      placeholder={t.form.contentPlaceholder}
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {lang === 'zh' ? '提交中...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.form.submit}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* 在线客服 */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{lang === 'zh' ? '需要即时帮助？' : 'Need immediate help?'}</h3>
                  <p className="text-emerald-100 text-sm">
                    {lang === 'zh' ? '工作时间：周一至周五 9:00-18:00' : 'Working hours: Mon-Fri 9:00-18:00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
