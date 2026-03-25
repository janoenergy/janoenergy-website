// 测试图片配置
import { projectImages, businessImages, teamImages, getProjectImage } from '../images';

describe('Images Configuration', () => {
  describe('projectImages', () => {
    it('should have wind project images', () => {
      expect(projectImages.wind).toBeDefined();
      expect(projectImages.wind.farm).toBe('/images/projects/wind-farm.jpg');
    });

    it('should have solar project images', () => {
      expect(projectImages.solar).toBeDefined();
      expect(projectImages.solar.farm).toBe('/images/projects/solar-farm.jpg');
    });

    it('should have storage project images', () => {
      expect(projectImages.storage).toBeDefined();
      expect(projectImages.storage.facility).toBe('/images/projects/storage-facility.jpg');
    });

    it('should have project images by ID', () => {
      expect(projectImages.byId[1]).toBe('/images/projects/wind-farm.jpg');
      expect(projectImages.byId[2]).toBe('/images/projects/solar-farm.jpg');
    });
  });

  describe('businessImages', () => {
    it('should have all business images', () => {
      expect(businessImages.development).toBe('/images/business/development.jpg');
      expect(businessImages.investment).toBe('/images/business/investment.jpg');
      expect(businessImages.epc).toBe('/images/business/epc.jpg');
      expect(businessImages.operation).toBe('/images/business/operation.jpg');
    });
  });

  describe('teamImages', () => {
    it('should have all team member images', () => {
      expect(teamImages.member1).toBe('/images/team/member-1.jpg');
      expect(teamImages.member2).toBe('/images/team/member-2.jpg');
      expect(teamImages.member3).toBe('/images/team/member-3.jpg');
      expect(teamImages.member4).toBe('/images/team/member-4.jpg');
    });
  });

  describe('getProjectImage', () => {
    it('should return correct image for existing project ID', () => {
      expect(getProjectImage(1)).toBe('/images/projects/wind-farm.jpg');
      expect(getProjectImage(2)).toBe('/images/projects/solar-farm.jpg');
    });

    it('should return placeholder for non-existing project ID', () => {
      expect(getProjectImage(999)).toBe('/images/placeholder-project.jpg');
    });
  });
});
