'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ListSectionProps, ListItem } from './types';
import { Modal } from './Modal';

export function ListSection<T extends ListItem>({ 
  title, 
  data, 
  loading, 
  onCreate, 
  onUpdate, 
  onDelete, 
  onRefresh,
  renderItem,
  formFields,
  emptyText = '暂无数据'
}: ListSectionProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const result = editingItem 
      ? await onUpdate(editingItem.id, formData)
      : await onCreate(formData);
    
    if (result) {
      toast.success(editingItem ? '更新成功' : '创建成功');
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      onRefresh();
    } else {
      toast.error('操作失败');
    }
    setSubmitting(false);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setFormData(item as Record<string, unknown>);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除吗？')) return;
    const result = await onDelete(id);
    if (result) {
      toast.success('删除成功');
      onRefresh();
    } else {
      toast.error('删除失败');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button size="sm" onClick={() => { setEditingItem(null); setFormData({}); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> 添加
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((item) => (
            <div key={item.id}>
              {renderItem({ item, onEdit: () => handleEdit(item), onDelete: () => handleDelete(item.id) })}
            </div>
          ))}
          {(!data || data.length === 0) && (
            <div className="text-center py-8 text-gray-500">{emptyText}</div>
          )}
        </div>
      </CardContent>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? '编辑' : '添加'}
      >
        <div className="space-y-4">
          {formFields({ formData, setFormData })}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>取消</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              保存
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
