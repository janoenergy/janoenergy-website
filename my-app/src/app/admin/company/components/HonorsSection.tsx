'use client';

import { Trophy, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import type { HonorsSectionProps } from './types';
import { ListSection } from './ListSection';

export function HonorsSection(props: HonorsSectionProps) {
  return (
    <ListSection
      {...props}
      title="荣誉奖项"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <Trophy className="w-8 h-8 text-amber-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.issuer} · {item.year}</p>
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
          <div>
            <Label>奖项名称 *</Label>
            <Input 
              value={(formData.title as string) || ''} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div>
            <Label>英文名称</Label>
            <Input 
              value={(formData.titleEn as string) || ''} 
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})} 
            />
          </div>
          <div>
            <Label>颁发机构</Label>
            <Input 
              value={(formData.issuer as string) || ''} 
              onChange={(e) => setFormData({...formData, issuer: e.target.value})} 
            />
          </div>
          <div>
            <Label>年份</Label>
            <Input 
              value={(formData.year as string) || ''} 
              onChange={(e) => setFormData({...formData, year: e.target.value})} 
              placeholder="如: 2024" 
            />
          </div>
          <div>
            <Label>奖项图片</Label>
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
