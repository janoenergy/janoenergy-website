'use client';

import { useState } from 'react';
import { Lock, User, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError('用户名或密码错误');
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError('登录失败，请重试');
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950' 
        : 'bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900'
    }`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
        title={isDark ? '切换到浅色模式' : '切换到深色模式'}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div className={`rounded-2xl shadow-2xl w-full max-w-md p-8 transition-colors duration-300 ${
        isDark ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white font-bold">江</span>
          </div>
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>网站后台管理</h1>
          <p className={`mt-2 transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>江能集团官网管理系统</p>
        </div>

        {error && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            isDark 
              ? 'bg-red-900/20 border-red-800 text-red-400' 
              : 'bg-red-50 border-red-200 text-red-600'
          } border`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>管理员账号</label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-colors duration-300 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="请输入管理员账号"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>密码</label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-colors duration-300 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              '登录'
            )}
          </button>
        </form>

        <div className={`mt-6 text-center text-sm transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>默认账号: admin / 密码: admin123</p>
        </div>
      </div>
    </div>
  );
}
