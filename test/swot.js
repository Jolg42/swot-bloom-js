import { expect } from 'chai';
import checkEmail from '../src/client';
import defaultDomains from './defaultdomains';

describe('SwotBloom', () => {
  describe('test @hdm-stuttgart.de', () => {
    it('should return true', () => {
      const isInFilter = checkEmail('mv037@hdm-stuttgart.de');
      expect(isInFilter).to.be.equal(true);
    });
  });

  describe('test @test.de', () => {
    it('should return false', () => {
      const isInFilter = checkEmail('mv037@test.de');
      expect(isInFilter).to.be.equal(false);
    });
  });

  describe('test @si.edu (blacklisted)', () => {
    it('should return false', () => {
      const isInFilter = checkEmail('mv037@si.edu');
      expect(isInFilter).to.be.equal(false);
    });
  });

  describe('mailcheck common providers', () => {
    defaultDomains.forEach((domain) => {
      it(domain, () => {
        const isInFilter = checkEmail(`james@${domain}`);
        expect(isInFilter).to.be.equal(false);
      });
    });
  });
});
