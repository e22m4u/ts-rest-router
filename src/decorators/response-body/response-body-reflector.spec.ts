import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {ResponseBodyMetadata} from './response-body-metadata.js';
import {ResponseBodyReflector} from './response-body-reflector.js';
import {RESPONSE_BODY_METADATA_KEY} from './response-body-metadata.js';

describe('ResponseBodyReflector', function () {
  describe('setMetadata', function () {
    it('sets a given value as target metadata', function () {
      class Target {}
      const md1 = {};
      const md2 = {};
      ResponseBodyReflector.setMetadata(md1, Target, 'propertyKey1');
      ResponseBodyReflector.setMetadata(md2, Target, 'propertyKey2');
      const res = Reflector.getOwnMetadata(RESPONSE_BODY_METADATA_KEY, Target);
      expect(res).to.be.instanceof(Map);
      expect(res!.get('propertyKey1')).to.be.eq(md1);
      expect(res!.get('propertyKey2')).to.be.eq(md2);
    });

    it('overrides existing metadata', function () {
      class Target {}
      const md1 = {};
      const md2 = {};
      ResponseBodyReflector.setMetadata(md1, Target, 'propertyKey');
      const res1 = Reflector.getOwnMetadata(RESPONSE_BODY_METADATA_KEY, Target);
      expect(res1).to.be.instanceof(Map);
      expect(res1!.get('propertyKey')).to.be.eq(md1);
      ResponseBodyReflector.setMetadata(md2, Target, 'propertyKey');
      const res2 = Reflector.getOwnMetadata(RESPONSE_BODY_METADATA_KEY, Target);
      expect(res2).to.be.instanceof(Map);
      expect(res2!.get('propertyKey')).to.be.eq(md2);
    });
  });

  describe('getMetadata', function () {
    it('returns an existing metadata of the target', function () {
      class Target {}
      const md1 = {};
      const md2 = {};
      const mdMap = new Map<string, ResponseBodyMetadata>([
        ['propertyKey1', md1],
        ['propertyKey2', md2],
      ]);
      Reflector.defineMetadata(RESPONSE_BODY_METADATA_KEY, mdMap, Target);
      const res = ResponseBodyReflector.getMetadata(Target);
      expect(res).to.be.instanceof(Map);
      expect(res!.get('propertyKey1')).to.be.eq(md1);
      expect(res!.get('propertyKey2')).to.be.eq(md2);
    });

    it('returns an empty map if no metadata', function () {
      class Target {}
      const res = ResponseBodyReflector.getMetadata(Target);
      expect(res).to.be.instanceof(Map);
      expect(res).to.be.empty;
    });
  });
});
