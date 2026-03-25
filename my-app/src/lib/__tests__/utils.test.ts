// 测试工具函数
import { parseCapacity, extractProvince } from '../../app/[lang]/components/home/types';

describe('Utility Functions', () => {
  describe('parseCapacity', () => {
    it('should parse MW capacity', () => {
      expect(parseCapacity('60MW')).toBe(60);
      expect(parseCapacity('120 MW')).toBe(120);
      expect(parseCapacity('200mw')).toBe(200);
    });

    it('should parse number without unit', () => {
      expect(parseCapacity('100')).toBe(100);
    });

    it('should return 0 for empty string', () => {
      expect(parseCapacity('')).toBe(0);
    });

    it('should return 0 for invalid input', () => {
      expect(parseCapacity('invalid')).toBe(0);
    });
  });

  describe('extractProvince', () => {
    it('should extract province from Chinese address', () => {
      expect(extractProvince('天津市')).toBe('天津');
      expect(extractProvince('河北省')).toBe('河北');
      expect(extractProvince('广东省清远市')).toBe('广东');
    });

    it('should return empty string for empty input', () => {
      expect(extractProvince('')).toBe('');
    });

    it('should handle address without province suffix', () => {
      expect(extractProvince('北京')).toBe('北京');
    });
  });
});
