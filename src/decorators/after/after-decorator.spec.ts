/* eslint mocha/no-sibling-hooks: 0 */
import {expect} from 'chai';
import {after} from './after-decorator.js';
import {AfterReflector} from './after-reflector.js';

const MIDDLEWARE_1 = () => undefined;
const MIDDLEWARE_2 = () => undefined;
const MIDDLEWARE_3 = () => undefined;

describe('after', function () {
  describe('class target', function () {
    it('sets given middleware to the target metadata', function () {
      @after(MIDDLEWARE_1)
      class Target {
        method() {}
      }
      const res = AfterReflector.getMetadata(Target);
      expect(res).to.be.eql([{middleware: MIDDLEWARE_1}]);
    });

    it('sets miltiple middlewares to the target metadata', function () {
      @after([MIDDLEWARE_1, MIDDLEWARE_2])
      class Target {
        method() {}
      }
      const res = AfterReflector.getMetadata(Target);
      expect(res).to.be.eql([{middleware: [MIDDLEWARE_1, MIDDLEWARE_2]}]);
    });

    it('allows to use the decorator multiple times', function () {
      @after(MIDDLEWARE_1)
      @after([MIDDLEWARE_2, MIDDLEWARE_3])
      class Target {
        method() {}
      }
      const res = AfterReflector.getMetadata(Target);
      expect(res).to.be.eql([
        {middleware: MIDDLEWARE_1},
        {middleware: [MIDDLEWARE_2, MIDDLEWARE_3]},
      ]);
    });
  });

  describe('method target', function () {
    it('sets given middleware to the target metadata', function () {
      class Target {
        @after(MIDDLEWARE_1)
        method() {}
      }
      const res = AfterReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: MIDDLEWARE_1,
        },
      ]);
    });

    it('sets miltiple middlewares to the target metadata', function () {
      class Target {
        @after([MIDDLEWARE_1, MIDDLEWARE_2])
        method() {}
      }
      const res = AfterReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          middleware: [MIDDLEWARE_1, MIDDLEWARE_2],
        },
      ]);
    });

    it('allows to use the decorator multiple times', function () {
      class Target {
        @after(MIDDLEWARE_1)
        @after([MIDDLEWARE_2, MIDDLEWARE_3])
        method() {}
      }
      const res = AfterReflector.getMetadata(Target, 'method');
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
