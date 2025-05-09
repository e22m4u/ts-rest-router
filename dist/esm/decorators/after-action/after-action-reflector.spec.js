import { expect } from 'chai';
import { Reflector } from '@e22m4u/ts-reflector';
import { AfterActionReflector } from './after-action-reflector.js';
import { AFTER_ACTION_METADATA_KEY } from './after-action-metadata.js';
const MIDDLEWARE_1 = () => undefined;
const MIDDLEWARE_2 = () => undefined;
const MIDDLEWARE_3 = () => undefined;
describe('AfterActionReflector', function () {
    describe('class target', function () {
        describe('addMetadata', function () {
            it('adds a given value to the target metadata', function () {
                class Target {
                }
                const md1 = { middleware: MIDDLEWARE_1 };
                const md2 = { middleware: [MIDDLEWARE_2, MIDDLEWARE_3] };
                AfterActionReflector.addMetadata(md1, Target);
                AfterActionReflector.addMetadata(md2, Target);
                const res = Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, Target);
                expect(res).to.be.eql([md2, md1]);
            });
        });
        describe('getMetadata', function () {
            it('returns an empty array if no metadata', function () {
                class Target {
                }
                const res = AfterActionReflector.getMetadata(Target);
                expect(res).to.be.eql([]);
            });
            it('returns existing metadata by the target', function () {
                class Target {
                }
                const md1 = { middleware: MIDDLEWARE_1 };
                const md2 = { middleware: [MIDDLEWARE_2, MIDDLEWARE_3] };
                const mdArray = [md1, md2];
                Reflector.defineMetadata(AFTER_ACTION_METADATA_KEY, mdArray, Target);
                const res = AfterActionReflector.getMetadata(Target);
                expect(res).to.be.eql(mdArray);
            });
        });
    });
    describe('method target', function () {
        describe('addMetadata', function () {
            it('adds a given value to the target metadata', function () {
                class Target {
                }
                const md1 = { middleware: MIDDLEWARE_1 };
                const md2 = { middleware: [MIDDLEWARE_2, MIDDLEWARE_3] };
                AfterActionReflector.addMetadata(md1, Target, 'prop');
                AfterActionReflector.addMetadata(md2, Target, 'prop');
                const res = Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, Target, 'prop');
                expect(res).to.be.eql([md2, md1]);
            });
        });
        describe('getMetadata', function () {
            it('returns an empty array if no metadata', function () {
                class Target {
                }
                const res = AfterActionReflector.getMetadata(Target, 'prop');
                expect(res).to.be.eql([]);
            });
            it('returns existing metadata by the target', function () {
                class Target {
                }
                const md1 = { middleware: MIDDLEWARE_1 };
                const md2 = { middleware: [MIDDLEWARE_2, MIDDLEWARE_3] };
                const mdArray = [md1, md2];
                Reflector.defineMetadata(AFTER_ACTION_METADATA_KEY, mdArray, Target, 'prop');
                const res = AfterActionReflector.getMetadata(Target, 'prop');
                expect(res).to.be.eql(mdArray);
            });
        });
    });
    describe('addMetadata', function () {
        it('can distinguish class and method metadata', function () {
            class Target {
            }
            const md1 = { middleware: MIDDLEWARE_1 };
            const md2 = { middleware: MIDDLEWARE_2 };
            AfterActionReflector.addMetadata(md1, Target);
            AfterActionReflector.addMetadata(md2, Target, 'prop');
            const res1 = Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, Target);
            const res2 = Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, Target, 'prop');
            expect(res1).to.be.eql([md1]);
            expect(res2).to.be.eql([md2]);
        });
    });
    describe('getMetadata', function () {
        it('can distinguish class and method metadata', function () {
            class Target {
            }
            const md1 = { middleware: MIDDLEWARE_1 };
            const md2 = { middleware: MIDDLEWARE_2 };
            Reflector.defineMetadata(AFTER_ACTION_METADATA_KEY, [md1], Target);
            Reflector.defineMetadata(AFTER_ACTION_METADATA_KEY, [md2], Target, 'prop');
            const res1 = AfterActionReflector.getMetadata(Target);
            const res2 = AfterActionReflector.getMetadata(Target, 'prop');
            expect(res1).to.be.eql([md1]);
            expect(res2).to.be.eql([md2]);
        });
    });
});
