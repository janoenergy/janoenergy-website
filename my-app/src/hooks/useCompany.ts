import { useState, useCallback } from 'react';
import { companyService, authService, projectService, newsService } from '@/services/company';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useCompanyApi() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async <T,>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (err: any) {
      setState({ data: null, loading: false, error: err.message });
      return null;
    }
  }, []);

  return {
    ...state,
    getCompanyInfo: () => execute(companyService.getInfo),
    updateCompanyInfo: (data: any) => execute(() => companyService.updateInfo(data)),
    getMilestones: () => execute(companyService.getMilestones),
    getBusinessSections: () => execute(companyService.getBusinessSections),
    updateBusinessSection: (id: string, data: any) => 
      execute(() => companyService.updateBusinessSection(id, data)),
  };
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authService.login(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }, []);

  return { login, logout, loading, error };
}
