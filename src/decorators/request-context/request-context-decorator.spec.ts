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
        @requestContext('response')
        prop: unknown,
      ) {}
    }
    const res = RequestContextReflector.getMetadata(Target, 'method');
    expect(res.get(0)).to.be.eql({property: 'response'});
  });

  describe('httpRequest', function () {
    it('should set the "request" property to target metadata', function () {
      class Target {
        method(
          @httpRequest()
          prop: unknown,
        ) {}
      }
      const res = RequestContextReflector.getMetadata(Target, 'method');
      expect(res.get(0)).to.be.eql({property: 'request'});
    });
  });

  describe('httpResponse', function () {
    it('should set the "response" property to target metadata', function () {
      class Target {
        method(
          @httpResponse()
          prop: unknown,
        ) {}
      }
      const res = RequestContextReflector.getMetadata(Target, 'method');
      expect(res.get(0)).to.be.eql({property: 'response'});
    });
  });

  describe('requestContainer', function () {
    it('should set the "container" property to target metadata', function () {
      class Target {
        method(
          @requestContainer()
          prop: unknown,
        ) {}
      }
      const res = RequestContextReflector.getMetadata(Target, 'method');
      expect(res.get(0)).to.be.eql({property: 'container'});
    });
  });
});
