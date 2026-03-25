// 测试 API 服务
import { api, projectApi, newsApi, authApi } from '../index';

// Mock global fetch
global.fetch = jest.fn();

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('api core', () => {
    it('should make GET request', async () => {
      const mockData = { code: 200, data: { id: 1 } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.get('/api/test');
      expect(result).toEqual({ id: 1 });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('should make POST request with body', async () => {
      const mockData = { code: 200, data: { id: 1 } };
      const postData = { name: 'Test' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await api.post('/api/test', postData);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
        })
      );
    });

    it('should throw error on failed request', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ code: 500, message: 'Server Error' }),
      });

      await expect(api.get('/api/test')).rejects.toThrow('Server Error');
    });
  });

  describe('projectApi', () => {
    it('should call correct endpoint for getProjects', async () => {
      const mockProjects = { code: 200, data: { items: [], total: 0 } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      });

      await projectApi.getProjects();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/projects'),
        expect.any(Object)
      );
    });

    it('should call correct endpoint for getProject', async () => {
      const mockProject = { code: 200, data: { id: 1, title: 'Test' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProject,
      });

      await projectApi.getProject(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/projects/1'),
        expect.any(Object)
      );
    });
  });

  describe('authApi', () => {
    it('should call correct endpoint for login', async () => {
      const mockResponse = {
        code: 200,
        data: { token: 'test-token', user: { id: 1, name: 'Test' } },
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await authApi.login({ email: 'test@test.com', password: 'password' });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
        })
      );
    });
  });
});
