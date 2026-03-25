'use client';

import * as React from 'react';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = '图片',
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 同步外部 value 变化
  React.useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }
      
      // 验证文件大小 (最大 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview(undefined);
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('mb-5', className)}>
      <label className="block text-base font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={preview}
              alt="预览"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="删除图片"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">点击上传</span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}
