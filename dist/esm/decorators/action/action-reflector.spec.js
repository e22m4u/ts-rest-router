import { expect } from 'chai';
import { describe } from 'mocha';
import { Reflector } from '@e22m4u/ts-reflector';
import { HttpMethod } from '@e22m4u/js-trie-router';
import { ActionReflector } from './action-reflector.js';
import { ACTIONS_METADATA_KEY } from './action-metadata.js';
describe('ActionReflector', function () {
    describe('setMetadata', function () {
        it('sets a given value as target metadata', function () {
            class Target {
            }
            const md1 = {
                propertyKey: 'propertyKey1',
                method: HttpMethod.GET,
                path: '/foo',
            };
            const md2 = {
                propertyKey: 'propertyKey2',
                method: HttpMethod.GET,
                path: '/bar',
            };
            ActionReflector.setMetadata(md1, Target, 'propertyKey1');
            ActionReflector.setMetadata(md2, Target, 'propertyKey2');
            const res = Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, Target);
            expect(res).to.be.instanceof(Map);
            expect(res.get('propertyKey1')).to.be.eq(md1);
            expect(res.get('propertyKey2')).to.be.eq(md2);
        });
        it('overrides existing metadata', function () {
            class Target {
            }
            const md1 = {
                propertyKey: 'propertyKey',
                method: HttpMethod.GET,
                path: '/foo',
            };
            const md2 = {
                propertyKey: 'propertyKey',
                method: HttpMethod.POST,
                path: '/bar',
            };
            ActionReflector.setMetadata(md1, Target, 'propertyKey');
            const res1 = Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, Target);
            expect(res1).to.be.instanceof(Map);
            expect(res1.get('propertyKey')).to.be.eq(md1);
            ActionReflector.setMetadata(md2, Target, 'propertyKey');
            const res2 = Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, Target);
            expect(res2).to.be.instanceof(Map);
            expect(res2.get('propertyKey')).to.be.eq(md2);
        });
    });
    describe('getMetadata', function () {
        it('returns an existing metadata of the target', function () {
            class Target {
            }
            const md1 = {
                propertyKey: 'propertyKey1',
                method: HttpMethod.GET,
                path: '/foo',
            };
            const md2 = {
                propertyKey: 'propertyKey2',
                method: HttpMethod.GET,
                path: '/bar',
            };
            const mdMap = new Map([
                ['propertyKey1', md1],
                ['propertyKey2', md2],
            ]);
            Reflector.defineMetadata(ACTIONS_METADATA_KEY, mdMap, Target);
            const res = ActionReflector.getMetadata(Target);
            expect(res).to.be.instanceof(Map);
            expect(res.get('propertyKey1')).to.be.eq(md1);
            expect(res.get('propertyKey2')).to.be.eq(md2);
        });
        it('returns an empty map if no metadata', function () {
            class Target {
            }
            const res = ActionReflector.getMetadata(Target);
            expect(res).to.be.instanceof(Map);
            expect(res).to.be.empty;
        });
    });
});
