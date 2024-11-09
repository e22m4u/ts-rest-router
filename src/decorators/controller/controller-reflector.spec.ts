import {expect} from 'chai';
import {describe} from 'mocha';
import {Reflector} from '@e22m4u/ts-reflector';
import {ControllerReflector} from './controller-reflector.js';
import {CONTROLLER_METADATA_KEY} from './controller-metadata.js';

describe('ControllerReflector', function () {
  describe('setMetadata', function () {
    it('sets a given value as target metadata', function () {
      class Target {}
      const md = {className: 'Target'};
      ControllerReflector.setMetadata(md, Target);
      const res = Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, Target);
      expect(res).to.be.eq(md);
    });

    it('overrides existing metadata', function () {
      class Target {}
      const md1 = {className: 'Target', path: 'path1'};
      const md2 = {className: 'Target', path: 'path2'};
      ControllerReflector.setMetadata(md1, Target);
      const res1 = Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, Target);
      expect(res1).to.be.eq(md1);
      ControllerReflector.setMetadata(md2, Target);
      const res2 = Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, Target);
      expect(res2).to.be.eq(md2);
    });
  });

  describe('getMetadata', function () {
    it('returns an existing metadata of the target', function () {
      class Target {}
      const md = {className: 'Target'};
      Reflector.defineMetadata(CONTROLLER_METADATA_KEY, md, Target);
      const res = ControllerReflector.getMetadata(Target);
      expect(res).to.be.eq(md);
    });

    it('returns undefined if no metadata', function () {
      class Target {}
      const res = ControllerReflector.getMetadata(Target);
      expect(res).to.be.undefined;
    });
  });
});
