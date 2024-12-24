/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect} from 'chai';
import {requestContext} from './request-context-decorator.js';
import {RequestContextReflector} from './request-context-reflector.js';

describe('requestContext', function () {
  it('does not require options', function () {
    class Target {
      method(
        @requestContext()
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: undefined});
  });

  it('sets a given property to the target metadata', function () {
    class Target {
      method(
        @requestContext('res')
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: 'res'});
  });
});
