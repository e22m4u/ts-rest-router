/* eslint mocha/no-sibling-hooks: 0 */
import {expect} from 'chai';
import {afterAction} from './after-action-decorator.js';
import {AfterActionReflector} from './after-action-reflector.js';

const MIDDLEWARE_1 = () => undefined;
const MIDDLEWARE_2 = () => undefined;
const MIDDLEWARE_3 = () => undefined;

describe('afterAction', function () {
  describe('class target', function () {
    it('sets given middleware to the target metadata', function () {
      @afterAction(MIDDLEWARE_1)
      class Target {
        method() {}
      }
      const res = AfterActionReflector.getMetadata(Target);
      expect(res).to.be.eql([{middleware: MIDDLEWARE_1}]);
    });

    it('sets multiple middlewares to the target metadata', function () {
      @afterAction([MIDDLEWARE_1, MIDDLEWARE_2])
      class Target {
        method() {}
      }
      const res = AfterActionReflector.getMetadata(Target);
      expect(res).to.be.eql([{middleware: [MIDDLEWARE_1, MIDDLEWARE_2]}]);
    });

    it('allows to use the decorator multiple times', function () {
      @afterAction(MIDDLEWARE_1)
      @afterAction([MIDDLEWARE_2, MIDDLEWARE_3])
      class Target {
        method() {}
      }
      const res = AfterActionReflector.getMetadata(Target);
      expect(res).to.be.eql([
        {middleware: MIDDLEWARE_1},
        {middleware: [MIDDLEWARE_2, MIDDLEWARE_3]},
      ]);
    });
  });

  describe('method target', function () {
    it('sets given middleware to the target metadata', function () {
      class Target {
        @afterAction(MIDDLEWARE_1)
        method() {}
      }
      const res = AfterActionReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: MIDDLEWARE_1,
        },
      ]);
    });

    it('sets multiple middlewares to the target metadata', function () {
      class Target {
        @afterAction([MIDDLEWARE_1, MIDDLEWARE_2])
        method() {}
      }
      const res = AfterActionReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: [MIDDLEWARE_1, MIDDLEWARE_2],
        },
      ]);
    });

    it('allows to use the decorator multiple times', function () {
      class Target {
        @afterAction(MIDDLEWARE_1)
        @afterAction([MIDDLEWARE_2, MIDDLEWARE_3])
        method() {}
      }
      const res = AfterActionReflector.getMetadata(Target, 'method');
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
