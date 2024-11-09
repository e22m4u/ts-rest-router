import {expect} from 'chai';
import {action} from './action-decorator.js';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {ActionReflector} from './action-reflector.js';

describe('action', function () {
  it('sets given options to the target metadata', function () {
    const method = HttpMethod.GET;
    const path = 'myPath';
    const before = () => undefined;
    const after = () => undefined;
    const customOption = 'customOption';
    class Target {
      @action({method, path, before, after, customOption})
      method() {}
    }
    const res = ActionReflector.getMetadata(Target);
    expect(res.get('method')).to.be.eql({
      propertyKey: 'method',
      method,
      path,
      before,
      after,
      customOption,
    });
  });

  it('overrides a given "propertyKey" option by the target method name', function () {
    const method = HttpMethod.GET;
    const path = 'myPath';
    class Target {
      @action({propertyKey: 'myMethod', method, path})
      method() {}
    }
    const res = ActionReflector.getMetadata(Target);
    expect(res.get('method')).to.be.eql({
      propertyKey: 'method',
      method,
      path,
    });
  });
});
