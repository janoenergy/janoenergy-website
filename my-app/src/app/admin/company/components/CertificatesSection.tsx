'use client';

import { Award, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import type { CertificatesSectionProps } from './types';
import { ListSection } from './ListSection';

export function CertificatesSection(props: CertificatesSectionProps) {
  return (
    <ListSection
      {...props}
      title="资质证书"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <Award className="w-8 h-8 text-emerald-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.issuer}</p>
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
            <Label>证书名称 *</Label>
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
            <Label>颁发日期</Label>
            <Input 
              type="date" 
              value={(formData.issueDate as string) || ''} 
              onChange={(e) => setFormData({...formData, issueDate: e.target.value})} 
            />
          </div>
          <div>
            <Label>证书图片</Label>
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
