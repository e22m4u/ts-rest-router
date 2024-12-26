/* eslint mocha/no-sibling-hooks: 0 */
import {expect} from 'chai';
import {before} from './before-decorator.js';
import {BeforeReflector} from './before-reflector.js';

const MIDDLEWARE_1 = () => undefined;
const MIDDLEWARE_2 = () => undefined;
const MIDDLEWARE_3 = () => undefined;

describe('before', function () {
  describe('class target', function () {
    it('sets given middleware to the target metadata', function () {
      @before(MIDDLEWARE_1)
      class Target {
        method() {}
      }
      const res = BeforeReflector.getMetadata(Target);
      expect(res).to.be.eql([{middleware: MIDDLEWARE_1}]);
    });

    it('sets miltiple middlewares to the target metadata', function () {
      @before([MIDDLEWARE_1, MIDDLEWARE_2])
      class Target {
        method() {}
      }
      const res = BeforeReflector.getMetadata(Target);
      expect(res).to.be.eql([{middleware: [MIDDLEWARE_1, MIDDLEWARE_2]}]);
    });

    it('allows to use the decorator multiple times', function () {
      @before(MIDDLEWARE_1)
      @before([MIDDLEWARE_2, MIDDLEWARE_3])
      class Target {
        method() {}
      }
      const res = BeforeReflector.getMetadata(Target);
      expect(res).to.be.eql([
        {middleware: MIDDLEWARE_1},
        {middleware: [MIDDLEWARE_2, MIDDLEWARE_3]},
      ]);
    });
  });

  describe('method target', function () {
    it('sets given middleware to the target metadata', function () {
      class Target {
        @before(MIDDLEWARE_1)
        method() {}
      }
      const res = BeforeReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: MIDDLEWARE_1,
        },
      ]);
    });

    it('sets miltiple middlewares to the target metadata', function () {
      class Target {
        @before([MIDDLEWARE_1, MIDDLEWARE_2])
        method() {}
      }
      const res = BeforeReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: [MIDDLEWARE_1, MIDDLEWARE_2],
        },
      ]);
    });

    it('allows to use the decorator multiple times', function () {
      class Target {
        @before(MIDDLEWARE_1)
        @before([MIDDLEWARE_2, MIDDLEWARE_3])
        method() {}
      }
      const res = BeforeReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: MIDDLEWARE_1,
        },
        {
          propertyKey: 'method',
          middleware: [MIDDLEWARE_2, MIDDLEWARE_3],
        },
      ]);
    });
  });
});
