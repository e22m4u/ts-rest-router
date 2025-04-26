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
});
