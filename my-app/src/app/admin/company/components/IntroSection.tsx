'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { IntroSectionProps, IntroFormData } from './types';

export function IntroSection({ data, onSave, saving, loading }: IntroSectionProps) {
  const [formData, setFormData] = useState<IntroFormData>({ intro: '', introEn: '' });

  useEffect(() => {
    if (data) {
      setFormData({ intro: data.intro || '', introEn: data.introEn || '' });
    }
  }, [data]);

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>公司简介</CardTitle></CardHeader>
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
      <CardHeader><CardTitle>公司简介</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>中文简介</Label>
          <Textarea
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            rows={6}
            placeholder="请输入公司中文简介..."
          />
        </div>
        <div className="space-y-2">
          <Label>英文简介</Label>
          <Textarea
            value={formData.introEn}
            onChange={(e) => setFormData({ ...formData, introEn: e.target.value })}
            rows={6}
            placeholder="请输入公司英文简介..."
          />
        </div>
        <Button onClick={() => onSave(formData)} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          保存
        </Button>
      </CardContent>
    </Card>
  );
}
