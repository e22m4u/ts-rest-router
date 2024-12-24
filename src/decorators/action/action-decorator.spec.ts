import {expect} from 'chai';
import {action} from './action-decorator.js';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {ActionReflector} from './action-reflector.js';

describe('action', function () {
  it('sets given options to the target metadata', function () {
    const options = {
      method: HttpMethod.GET,
      path: 'myPath',
      before: () => undefined,
      after: () => undefined,
      customOption: 'customOption',
    };
    class Target {
      @action(options)
      method() {}
    }
    const res = ActionReflector.getMetadata(Target);
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
      @action(options)
      method() {}
    }
    const res = ActionReflector.getMetadata(Target);
    expect(res.get('method')).to.be.eql({
      ...options,
      propertyKey: 'method',
    });
  });
});
