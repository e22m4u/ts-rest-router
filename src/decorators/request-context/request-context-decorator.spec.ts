/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect} from 'chai';
import {requestContext} from './request-context-decorator.js';
import {RequestContextReflector} from './request-context-reflector.js';

describe('requestContext', function () {
  it('does not requires options', function () {
    class Target {
      method(
        @requestContext()
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: undefined});
  });

  it('sets a given key of RequestContext as "propertyKey" of the target metadata', function () {
    class Target {
      method(
        @requestContext('res')
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: 'res'});
  });

  it('sets a given RequestContextMetadata as the target metadata', function () {
    const property = 'res';
    const customOption = 'customOption';
    class Target {
      method(
        @requestContext({property, customOption})
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property, customOption});
  });
});
