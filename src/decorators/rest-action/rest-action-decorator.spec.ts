import {expect} from 'chai';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {getAction} from './rest-action-decorator.js';
import {putAction} from './rest-action-decorator.js';
import {restAction} from './rest-action-decorator.js';
import {postAction} from './rest-action-decorator.js';
import {patchAction} from './rest-action-decorator.js';
import {deleteAction} from './rest-action-decorator.js';
import {RestActionReflector} from './rest-action-reflector.js';

describe('restAction', function () {
  it('hasAliases', function () {
    expect(getAction).to.be.instanceOf(Function);
    expect(postAction).to.be.instanceOf(Function);
    expect(putAction).to.be.instanceOf(Function);
    expect(patchAction).to.be.instanceOf(Function);
    expect(deleteAction).to.be.instanceOf(Function);
  });

  it('sets given options to the target metadata', function () {
    const options = {
      method: HttpMethod.GET,
      path: 'myPath',
      before: () => undefined,
      after: () => undefined,
      customOption: 'customOption',
    };
    class Target {
      @restAction(options)
      method() {}
    }
    const res = RestActionReflector.getMetadata(Target);
    expect(res.get('method')).to.be.eql({
      ...options,
      propertyKey: 'method',
    });
  });

  it('overrides a given "propertyKey" option by the target method name', function () {
    const options = {
      propertyKey: 'myMethod',
      method: HttpMethod.GET,
      path: 'myPath',
    };
    class Target {
      @restAction(options)
      method() {}
    }
    const res = RestActionReflector.getMetadata(Target);
    expect(res.get('method')).to.be.eql({
      ...options,
      propertyKey: 'method',
    });
  });

  describe('getAction', function () {
    it('allows no arguments', function () {
      class Target {
        @getAction()
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        propertyKey: 'method',
        method: HttpMethod.GET,
        path: '',
      });
    });

    it('allows options as first argument', function () {
      const options = {
        path: 'myPath',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @getAction(options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.GET,
      });
    });

    it('allows path and options arguments', function () {
      const options = {
        path: 'myPath2',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @getAction('myPath1', options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.GET,
        path: 'myPath1',
      });
    });
  });

  describe('postAction', function () {
    it('allows no arguments', function () {
      class Target {
        @postAction()
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        propertyKey: 'method',
        method: HttpMethod.POST,
        path: '',
      });
    });

    it('allows options as first argument', function () {
      const options = {
        path: 'myPath',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @postAction(options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.POST,
      });
    });

    it('allows path and options arguments', function () {
      const options = {
        path: 'myPath2',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @postAction('myPath1', options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.POST,
        path: 'myPath1',
      });
    });
  });

  describe('putAction', function () {
    it('allows no arguments', function () {
      class Target {
        @putAction()
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        propertyKey: 'method',
        method: HttpMethod.PUT,
        path: '',
      });
    });

    it('allows options as first argument', function () {
      const options = {
        path: 'myPath',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @putAction(options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.PUT,
      });
    });

    it('allows path and options arguments', function () {
      const options = {
        path: 'myPath2',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @putAction('myPath1', options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.PUT,
        path: 'myPath1',
      });
    });
  });

  describe('patchAction', function () {
    it('allows no arguments', function () {
      class Target {
        @patchAction()
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        propertyKey: 'method',
        method: HttpMethod.PATCH,
        path: '',
      });
    });

    it('allows options as first argument', function () {
      const options = {
        path: 'myPath',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @patchAction(options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.PATCH,
      });
    });

    it('allows path and options arguments', function () {
      const options = {
        path: 'myPath2',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @patchAction('myPath1', options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.PATCH,
        path: 'myPath1',
      });
    });
  });

  describe('deleteAction', function () {
    it('allows no arguments', function () {
      class Target {
        @deleteAction()
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        propertyKey: 'method',
        method: HttpMethod.DELETE,
        path: '',
      });
    });

    it('allows options as first argument', function () {
      const options = {
        path: 'myPath',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @deleteAction(options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.DELETE,
      });
    });

    it('allows path and options arguments', function () {
      const options = {
        path: 'myPath2',
        before: () => undefined,
        after: () => undefined,
        customOption: 'customOption',
      };
      class Target {
        @deleteAction('myPath1', options)
        method() {}
      }
      const res = RestActionReflector.getMetadata(Target);
      expect(res.get('method')).to.be.eql({
        ...options,
        propertyKey: 'method',
        method: HttpMethod.DELETE,
        path: 'myPath1',
      });
    });
  });
});
