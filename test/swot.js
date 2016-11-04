import { expect } from 'chai';
import { createFilter } from '../src/lib/swot';
import checkEmail from '../src/lib/checkEmail';

describe('SwotBloom', function test() {
  this.timeout(5000);

  describe('test @hdm-stuttgart.de', () => {
    it('should return true', (done) => {
      createFilter().then((bloom) => {
        const isInFilter = checkEmail(bloom)('mv037@hdm-stuttgart.de');
        expect(isInFilter).to.be.equal(true);
        done();
      });
    });
  });

  describe('test @test.de', () => {
    it('should return false', (done) => {
      createFilter().then((bloom) => {
        const isInFilter = checkEmail(bloom)('mv037@test.de');
        expect(isInFilter).to.be.equal(false);
        done();
      });
    });
  });

  describe('test @si.edu (blacklisted)', () => {
    it('should return false', (done) => {
      createFilter().then((bloom) => {
        const isInFilter = checkEmail(bloom)('mv037@si.edu');
        expect(isInFilter).to.be.equal(false);
        done();
      });
    });
  });
});
