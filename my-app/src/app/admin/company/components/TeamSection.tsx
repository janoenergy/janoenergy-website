'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import type { TeamSectionProps } from './types';
import { ListSection } from './ListSection';

export function TeamSection(props: TeamSectionProps) {
  return (
    <ListSection
      {...props}
      title="管理团队"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-emerald-600">{item.name?.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-emerald-600">{item.title}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>姓名 *</Label>
              <Input 
                value={(formData.name as string) || ''} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div>
              <Label>英文姓名</Label>
              <Input 
                value={(formData.nameEn as string) || ''} 
                onChange={(e) => setFormData({...formData, nameEn: e.target.value})} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>职位 *</Label>
              <Input 
                value={(formData.title as string) || ''} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
            </div>
            <div>
              <Label>英文职位</Label>
              <Input 
                value={(formData.titleEn as string) || ''} 
                onChange={(e) => setFormData({...formData, titleEn: e.target.value})} 
              />
            </div>
          </div>
          <div>
            <Label>照片</Label>
            <ImageUpload
              value={(formData.imageUrl as string) || ''}
              onChange={(url) => setFormData({...formData, imageUrl: url})}
              className="mt-2"
            />
          </div>
          <div>
            <Label>排序</Label>
            <Input 
              type="number" 
              value={(formData.sortOrder as number) || 0} 
              onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} 
            />
          </div>
        </>
      )}
    />
  );
}
