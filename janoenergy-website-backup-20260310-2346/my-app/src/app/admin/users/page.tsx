import { Plus, Edit, Trash2, Shield, User } from 'lucide-react';

const users = [
  { id: '1', name: '管理员', email: 'admin@janoenergy.cn', role: 'admin', status: 'active' },
  { id: '2', name: '编辑员', email: 'editor@janoenergy.cn', role: 'editor', status: 'active' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">用户信息</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">角色</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">状态</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      <Shield className="w-3 h-3" />
                      {user.role === 'admin' ? '管理员' : '编辑员'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status === 'active' ? '正常' : '禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600 transition-colors" title="编辑">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Description */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">权限说明</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">管理员</h3>
            </div>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• 所有内容的增删改查</li>
              <li>• 用户管理</li>
              <li>• 系统设置</li>
              <li>• 媒体库管理</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">编辑员</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 项目和文章的增删改查</li>
              <li>• 媒体库上传</li>
              <li>• 查看统计数据</li>
              <li>• 不能管理用户</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
