'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { MilestonesSectionProps } from './types';
import { ListSection } from './ListSection';

export function MilestonesSection(props: MilestonesSectionProps) {
  return (
    <ListSection
      {...props}
      title="发展历程"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-600">{item.year}</span>
              <span className="font-medium">{item.title}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </div>
          <div className="flex gap-2">
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
            <Label>年份 *</Label>
            <Input 
              value={(formData.year as string) || ''} 
              onChange={(e) => setFormData({...formData, year: e.target.value})} 
              placeholder="如: 2024" 
            />
          </div>
          <div>
            <Label>标题 *</Label>
            <Input 
              value={(formData.title as string) || ''} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="中文标题" 
            />
          </div>
          <div>
            <Label>英文标题</Label>
            <Input 
              value={(formData.titleEn as string) || ''} 
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})} 
              placeholder="English Title" 
            />
          </div>
          <div>
            <Label>描述</Label>
            <Textarea 
              value={(formData.description as string) || ''} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div>
            <Label>英文描述</Label>
            <Textarea 
              value={(formData.descriptionEn as string) || ''} 
              onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})} 
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
