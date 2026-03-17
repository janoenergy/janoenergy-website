import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

// 使用 Cloudflare Images 或类似服务
// 这里使用免费的图片托管服务作为示例
const UPLOAD_API = 'https://api.imgbb.com/1/upload';
const API_KEY = 'YOUR_IMGBB_API_KEY'; // 需要替换为实际的 API key

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请选择图片文件');
      return;
    }

    // 验证文件大小（最大 5MB）
    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过 5MB');
      return;
    }

    setLoading(true);

    try {
      // 创建本地预览
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // 上传到图片托管服务
      // 注意：这里使用 Base64 作为示例，实际应该上传到云存储
      const base64 = await fileToBase64(file);
      
      // 实际项目中，这里应该调用上传 API
      // const formData = new FormData();
      // formData.append('image', base64.split(',')[1]);
      // const response = await fetch(`${UPLOAD_API}?key=${API_KEY}`, {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // onChange(data.data.url);

      // 临时方案：使用 Base64（不推荐用于生产环境）
      onChange(base64);
      toast.success('图片上传成功');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('图片上传失败');
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
        >
          {loading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">点击上传</span>
            </>
          )}
        </label>
      )}
      
      <p className="text-xs text-gray-500 mt-2">
        支持 JPG、PNG、GIF，最大 5MB
      </p>
    </div>
  );
}
