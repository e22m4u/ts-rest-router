import { expect } from 'chai';
import { Reflector } from '@e22m4u/ts-reflector';
import { RequestDataSource } from './request-data-metadata.js';
import { RequestDataReflector } from './request-data-reflector.js';
import { REQUEST_DATA_METADATA_KEY } from './request-data-metadata.js';
describe('RequestDataReflector', function () {
    describe('setMetadata', function () {
        it('sets a given value as target metadata', function () {
            class Target {
            }
            const md1 = { source: RequestDataSource.PARAMS };
            const md2 = { source: RequestDataSource.QUERY };
            RequestDataReflector.setMetadata(md1, Target, 0, 'propertyKey');
            RequestDataReflector.setMetadata(md2, Target, 1, 'propertyKey');
            const res = Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, Target, 'propertyKey');
            expect(res).to.be.instanceof(Map);
            expect(res.get(0)).to.be.eq(md1);
            expect(res.get(1)).to.be.eq(md2);
        });
        it('overrides existing metadata', function () {
            class Target {
            }
            const md1 = { source: RequestDataSource.PARAMS };
            const md2 = { source: RequestDataSource.QUERY };
            RequestDataReflector.setMetadata(md1, Target, 0, 'propertyKey');
            const res1 = Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, Target, 'propertyKey');
            expect(res1).to.be.instanceof(Map);
            expect(res1.get(0)).to.be.eq(md1);
            RequestDataReflector.setMetadata(md2, Target, 0, 'propertyKey');
            const res2 = Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, Target, 'propertyKey');
            expect(res2).to.be.instanceof(Map);
            expect(res2.get(0)).to.be.eq(md2);
        });
    });
    describe('getMetadata', function () {
        it('returns an existing metadata of the target', function () {
            class Target {
            }
            const md1 = { source: RequestDataSource.PARAMS };
            const md2 = { source: RequestDataSource.QUERY };
            const mdMap = new Map([
                [0, md1],
                [1, md2],
            ]);
            Reflector.defineMetadata(REQUEST_DATA_METADATA_KEY, mdMap, Target, 'propertyKey');
            const res = RequestDataReflector.getMetadata(Target, 'propertyKey');
            expect(res).to.be.instanceof(Map);
            expect(res.get(0)).to.be.eq(md1);
            expect(res.get(1)).to.be.eq(md2);
        });
        it('returns an empty map if no metadata', function () {
            class Target {
            }
            const res = RequestDataReflector.getMetadata(Target, 'propertyKey');
            expect(res).to.be.instanceof(Map);
            expect(res).to.be.empty;
        });
    });
});
