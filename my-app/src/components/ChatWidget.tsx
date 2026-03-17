'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, Mail, MessageSquare } from 'lucide-react';

interface ChatWidgetProps {
  lang?: 'zh' | 'en';
}

export default function ChatWidget({ lang = 'zh' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    zh: {
      title: '联系我们',
      subtitle: '专业团队为您服务',
      phone: '电话咨询',
      email: '邮件咨询',
      wechat: '微信咨询',
      phoneNumber: '+86 400-888-9999',
      emailAddress: 'contact@janoenergy.com',
      wechatId: 'JanoEnergy',
      hours: '工作时间：周一至周五 9:00-18:00',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Professional team at your service',
      phone: 'Phone',
      email: 'Email',
      wechat: 'WeChat',
      phoneNumber: '+86 400-888-9999',
      emailAddress: 'contact@janoenergy.com',
      wechatId: 'JanoEnergy',
      hours: 'Working Hours: Mon-Fri 9:00-18:00',
    },
  }[lang];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-80 animate-in slide-in-from-bottom-2 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{t.title}</h3>
                <p className="text-emerald-100 text-sm">{t.subtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Options */}
          <div className="p-4 space-y-3">
            {/* Phone */}
            <a
              href={`tel:${t.phoneNumber.replace(/\s/g, '')}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.phone}</p>
                <p className="text-sm text-gray-600">{t.phoneNumber}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${t.emailAddress}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.email}</p>
                <p className="text-sm text-gray-600">{t.emailAddress}</p>
              </div>
            </a>

            {/* WeChat */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors group">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.wechat}</p>
                <p className="text-sm text-gray-600">{t.wechatId}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">{t.hours}</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
