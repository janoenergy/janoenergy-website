// ============================================
// 文件上传 API
// ============================================

import { api } from './api';

interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

export const uploadApi = {
  // 上传图片
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload<UploadResponse>('/api/upload/image', formData);
  },

  // 上传多个图片
  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return api.upload<UploadResponse[]>('/api/upload/images', formData);
  },

  // 上传文档
  uploadDocument: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload<UploadResponse>('/api/upload/document', formData);
  },
};
