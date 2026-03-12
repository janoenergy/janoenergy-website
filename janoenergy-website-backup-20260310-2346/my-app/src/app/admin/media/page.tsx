import { Upload, Image as ImageIcon, File, Trash2, Copy, ExternalLink } from 'lucide-react';

const mediaFiles = [
  { id: '1', name: 'project-wind-1.jpg', type: 'image', size: '2.4 MB', date: '2024-06-15' },
  { id: '2', name: 'project-solar-1.jpg', type: 'image', size: '1.8 MB', date: '2024-06-14' },
  { id: '3', name: 'company-logo.png', type: 'image', size: '156 KB', date: '2024-06-10' },
  { id: '4', name: 'brochure-2024.pdf', type: 'pdf', size: '4.2 MB', date: '2024-06-08' },
];

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">媒体库</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Upload className="w-4 h-4" />
          上传文件
        </button>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 border-dashed">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">拖拽文件到此处上传</h3>
          <p className="text-gray-500 mb-4">支持 JPG、PNG、GIF、PDF 等格式，单个文件最大 10MB</p>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            选择文件
          </button>
        </div>
      </div>

      {/* Files Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">文件列表</h2>
          <span className="text-sm text-gray-500">共 {mediaFiles.length} 个文件</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {mediaFiles.map((file) => (
            <div key={file.id} className="group relative">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                {file.type === 'image' ? (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                ) : (
                  <File className="w-12 h-12 text-gray-400" />
                )}
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-emerald-600" title="复制链接">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-emerald-600" title="查看">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-600" title="删除">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{file.size} · {file.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
