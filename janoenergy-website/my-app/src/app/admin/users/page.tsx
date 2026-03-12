'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Search } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';

interface UserItem {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
  createdAt: string;
}

// 组件
function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false }: any) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
  const variants = { primary: 'bg-emerald-600 hover:bg-emerald-700 text-white', secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800', danger: 'bg-red-600 hover:bg-red-700 text-white', ghost: 'hover:bg-gray-100 text-gray-700' };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3' };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${disabled ? 'opacity-50' : ''}`}>{children}</button>;
}

function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button></div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder = '', required = false }: any) {
  return <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" /></div>;
}

function Select({ label, value, onChange, options, required = false }: any) {
  return <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label><select value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">{options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select></div>;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    username: '', name: '', email: '', password: '', role: 'employee', department: ''
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try { const res = await fetch(API_ENDPOINTS.users); if (res.ok) setUsers(await res.json()); setLoading(false); }
    catch (error) { console.error(error); setLoading(false); }
  };

  const resetForm = () => {
    setFormData({ username: '', name: '', email: '', password: '', role: 'employee', department: '' });
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    try {
      const url = editingUser ? `${API_ENDPOINTS.users}/${editingUser.id}` : API_ENDPOINTS.users;
      const data = editingUser ? { ...formData, password: formData.password || undefined } : formData;
      const res = await fetch(url, { method: editingUser ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setIsModalOpen(false); resetForm(); fetchUsers(); }
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除此用户？')) return;
    try { const res = await fetch(`${API_ENDPOINTS.users}/${id}`, { method: 'DELETE' }); if (res.ok) fetchUsers(); }
    catch (error) { console.error(error); }
  };

  const handleEdit = (user: UserItem) => {
    setEditingUser(user);
    setFormData({ username: user.username, name: user.name, email: user.email, password: '', role: user.role, department: user.department || '' });
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase()));
  const getRoleLabel = (role: string) => ({ admin: '管理员', manager: '经理', employee: '员工' }[role] || role);
  const getRoleColor = (role: string) => ({ admin: 'bg-red-100 text-red-700', manager: 'bg-blue-100 text-blue-700', employee: 'bg-gray-100 text-gray-700' }[role] || 'bg-gray-100');

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin h-8 w-8 border-b-2 border-emerald-600"></div></div>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}><Plus className="w-4 h-4 mr-2" /> 添加用户</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="搜索用户名或姓名..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[30%]">用户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">账号</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">部门</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">角色</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-emerald-600 font-bold">{user.name[0]}</span></div>
                      <div className="min-w-0"><div className="font-medium text-gray-900 truncate">{user.name}</div><div className="text-sm text-gray-500 truncate">{user.email}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{user.username}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{user.department || '-'}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && <div className="text-center py-12 text-gray-500">暂无用户数据</div>}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={editingUser ? '编辑用户' : '添加用户'}>
        <Input label="用户名" value={formData.username} onChange={(v: string) => setFormData({...formData, username: v})} required />
        <Input label="姓名" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} required />
        <Input label="邮箱" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} required />
        <Input label={editingUser ? "密码 (留空不修改)" : "密码"} type="password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} required={!editingUser} />
        <Select label="角色" value={formData.role} onChange={(v: string) => setFormData({...formData, role: v})} options={[{value:'admin',label:'管理员'},{value:'manager',label:'经理'},{value:'employee',label:'员工'}]} required />
        <Input label="部门" value={formData.department} onChange={(v: string) => setFormData({...formData, department: v})} />
        <div className="flex justify-end gap-3 mt-6"><Button variant="secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>取消</Button><Button onClick={handleSubmit}>{editingUser ? '保存' : '创建'}</Button></div>
      </Modal>
    </div>
  );
}
