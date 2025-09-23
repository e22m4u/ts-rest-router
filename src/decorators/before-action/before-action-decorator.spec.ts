/* eslint mocha/no-sibling-hooks: 0 */
import {expect} from 'chai';
import {beforeAction} from './before-action-decorator.js';
import {BeforeActionReflector} from './before-action-reflector.js';

const HOOK_1 = () => undefined;
const HOOK_2 = () => undefined;
const HOOK_3 = () => undefined;

describe('beforeAction', function () {
  describe('class target', function () {
    it('sets given hook to the target metadata', function () {
      @beforeAction(HOOK_1)
      class Target {
        method() {}
      }
      const res = BeforeActionReflector.getMetadata(Target);
      expect(res).to.be.eql([{hook: HOOK_1}]);
    });

    it('sets multiple hooks to the target metadata', function () {
      @beforeAction([HOOK_1, HOOK_2])
      class Target {
        method() {}
      }
      const res = BeforeActionReflector.getMetadata(Target);
      expect(res).to.be.eql([{hook: [HOOK_1, HOOK_2]}]);
    });

    it('allows to use the decorator multiple times', function () {
      @beforeAction(HOOK_1)
      @beforeAction([HOOK_2, HOOK_3])
      class Target {
        method() {}
      }
      const res = BeforeActionReflector.getMetadata(Target);
      expect(res).to.be.eql([{hook: HOOK_1}, {hook: [HOOK_2, HOOK_3]}]);
    });
  });

  describe('method target', function () {
    it('sets given hook to the target metadata', function () {
      class Target {
        @beforeAction(HOOK_1)
        method() {}
      }
      const res = BeforeActionReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          hook: HOOK_1,
        },
      ]);
    });

    it('sets multiple hooks to the target metadata', function () {
      class Target {
        @beforeAction([HOOK_1, HOOK_2])
        method() {}
      }
      const res = BeforeActionReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          hook: [HOOK_1, HOOK_2],
        },
      ]);
    });

    it('allows to use the decorator multiple times', function () {
      class Target {
        @beforeAction(HOOK_1)
        @beforeAction([HOOK_2, HOOK_3])
        method() {}
      }
      const res = BeforeActionReflector.getMetadata(Target, 'method');
      expect(res).to.be.eql([
        {
          propertyKey: 'method',
          hook: HOOK_1,
        },
        {
          propertyKey: 'method',
          hook: [HOOK_2, HOOK_3],
        },
      ]);
    });
  });
});
