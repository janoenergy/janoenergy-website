'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ValuesSectionProps } from './types';
import { ListSection } from './ListSection';

export function ValuesSection(props: ValuesSectionProps) {
  return (
    <ListSection
      {...props}
      title="核心价值观"
      renderItem={({ item, onEdit, onDelete }) => (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-emerald-600">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
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
        </div>
      )}
      formFields={({ formData, setFormData }) => (
        <>
          <div>
            <Label>标题 *</Label>
            <Input 
              value={(formData.title as string) || ''} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div>
            <Label>英文标题</Label>
            <Input 
              value={(formData.titleEn as string) || ''} 
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})} 
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
