/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect} from 'chai';
import {httpRequest} from './request-context-decorator.js';
import {httpResponse} from './request-context-decorator.js';
import {requestContext} from './request-context-decorator.js';
import {requestContainer} from './request-context-decorator.js';
import {RequestContextReflector} from './request-context-reflector.js';

describe('requestContext', function () {
  it('should not require options', function () {
    class Target {
      method(
        @requestContext()
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: undefined});
  });

  it('should set the given property to target metadata', function () {
    class Target {
      method(
        @requestContext('res')
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: 'res'});
  });

  describe('httpRequest', function () {
    it('should set the "req" property to target metadata', function () {
      class Target {
        method(
          @httpRequest()
          prop: unknown,
        ) {}
      }
      const res = RequestContextReflector.getMetadata(Target, 'method');
      expect(res.get(0)).to.be.eql({property: 'req'});
    });
  });

  describe('httpResponse', function () {
    it('should set the "res" property to target metadata', function () {
      class Target {
        method(
          @httpResponse()
          prop: unknown,
        ) {}
      }
      const res = RequestContextReflector.getMetadata(Target, 'method');
      expect(res.get(0)).to.be.eql({property: 'res'});
    });
  });

  describe('requestContainer', function () {
    it('should set the "cont" property to target metadata', function () {
      class Target {
        method(
          @requestContainer()
          prop: unknown,
        ) {}
      }
      const res = RequestContextReflector.getMetadata(Target, 'method');
      expect(res.get(0)).to.be.eql({property: 'cont'});
    });
  });
});
