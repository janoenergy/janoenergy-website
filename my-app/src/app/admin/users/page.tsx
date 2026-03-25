'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormSelect } from '@/components/ui/admin-select';
import type { User, UserRole } from '@/types';

const ROLE_LABELS: Record<UserRole, string> = {
  admin: '管理员',
  editor: '编辑',
  viewer: '访客',
};

const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-700',
  editor: 'bg-blue-100 text-blue-700',
  viewer: 'bg-gray-100 text-gray-700',
};

const ROLE_OPTIONS = [
  { value: 'admin', label: '管理员' },
  { value: 'editor', label: '编辑' },
  { value: 'viewer', label: '访客' },
];

interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'viewer',
    phone: '',
    department: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.users);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'viewer',
      phone: '',
      department: '',
    });
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const url = editingUser
        ? `${API_ENDPOINTS.users}/${editingUser.id}`
        : API_ENDPOINTS.users;
      const res = await fetch(url, {
        method: editingUser ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        resetForm();
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除此用户？')) return;
    try {
      const res = await fetch(`${API_ENDPOINTS.users}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      department: user.department || '',
    });
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> 添加用户
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索用户名或邮箱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[30%]">
                  用户
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[25%]">
                  邮箱
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                  部门
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                  角色
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-600 font-bold">
                          {user.name[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {user.department || '-'}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                        ROLE_COLORS[user.role]
                      }`}
                    >
                      {ROLE_LABELS[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">暂无用户数据</div>
        )}
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? '编辑用户' : '添加用户'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="请输入姓名"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱 *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="请输入邮箱"
              />
            </div>
            <FormSelect
              label="角色 *"
              options={ROLE_OPTIONS}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as UserRole })
              }
              required
            />
            <div className="space-y-2">
              <Label htmlFor="department">部门</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                placeholder="请输入部门"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">电话</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="请输入电话"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && (
                <span className="mr-2 animate-spin">⏳</span>
              )}
              {editingUser ? '保存' : '创建'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
