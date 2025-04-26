var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { expect } from 'chai';
import { HttpMethod } from '@e22m4u/js-trie-router';
import { getAction } from './rest-action-decorator.js';
import { putAction } from './rest-action-decorator.js';
import { restAction } from './rest-action-decorator.js';
import { postAction } from './rest-action-decorator.js';
import { patchAction } from './rest-action-decorator.js';
import { deleteAction } from './rest-action-decorator.js';
import { RestActionReflector } from './rest-action-reflector.js';
describe('restAction', function () {
    it('hasAliases', function () {
        expect(getAction).to.be.instanceOf(Function);
        expect(postAction).to.be.instanceOf(Function);
        expect(putAction).to.be.instanceOf(Function);
        expect(patchAction).to.be.instanceOf(Function);
        expect(deleteAction).to.be.instanceOf(Function);
    });
    it('sets given options to the target metadata', function () {
        const options = {
            method: HttpMethod.GET,
            path: 'myPath',
            before: () => undefined,
            after: () => undefined,
            customOption: 'customOption',
        };
        class Target {
            method() { }
        }
        __decorate([
            restAction(options),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
        const res = RestActionReflector.getMetadata(Target);
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
            method() { }
        }
        __decorate([
            restAction(options),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
        const res = RestActionReflector.getMetadata(Target);
        expect(res.get('method')).to.be.eql({
            ...options,
            propertyKey: 'method',
        });
    });
    describe('getAction', function () {
        it('allows no arguments', function () {
            class Target {
                method() { }
            }
            __decorate([
                getAction(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                propertyKey: 'method',
                method: HttpMethod.GET,
                path: '',
            });
        });
        it('allows options as first argument', function () {
            const options = {
                path: 'myPath',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                getAction(options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.GET,
            });
        });
        it('allows path and options arguments', function () {
            const options = {
                path: 'myPath2',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                getAction('myPath1', options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.GET,
                path: 'myPath1',
            });
        });
    });
    describe('postAction', function () {
        it('allows no arguments', function () {
            class Target {
                method() { }
            }
            __decorate([
                postAction(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                propertyKey: 'method',
                method: HttpMethod.POST,
                path: '',
            });
        });
        it('allows options as first argument', function () {
            const options = {
                path: 'myPath',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                postAction(options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.POST,
            });
        });
        it('allows path and options arguments', function () {
            const options = {
                path: 'myPath2',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                postAction('myPath1', options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.POST,
                path: 'myPath1',
            });
        });
    });
    describe('putAction', function () {
        it('allows no arguments', function () {
            class Target {
                method() { }
            }
            __decorate([
                putAction(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                propertyKey: 'method',
                method: HttpMethod.PUT,
                path: '',
            });
        });
        it('allows options as first argument', function () {
            const options = {
                path: 'myPath',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                putAction(options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.PUT,
            });
        });
        it('allows path and options arguments', function () {
            const options = {
                path: 'myPath2',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                putAction('myPath1', options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.PUT,
                path: 'myPath1',
            });
        });
    });
    describe('patchAction', function () {
        it('allows no arguments', function () {
            class Target {
                method() { }
            }
            __decorate([
                patchAction(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                propertyKey: 'method',
                method: HttpMethod.PATCH,
                path: '',
            });
        });
        it('allows options as first argument', function () {
            const options = {
                path: 'myPath',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                patchAction(options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.PATCH,
            });
        });
        it('allows path and options arguments', function () {
            const options = {
                path: 'myPath2',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                patchAction('myPath1', options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.PATCH,
                path: 'myPath1',
            });
        });
    });
    describe('deleteAction', function () {
        it('allows no arguments', function () {
            class Target {
                method() { }
            }
            __decorate([
                deleteAction(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                propertyKey: 'method',
                method: HttpMethod.DELETE,
                path: '',
            });
        });
        it('allows options as first argument', function () {
            const options = {
                path: 'myPath',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                deleteAction(options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.DELETE,
            });
        });
        it('allows path and options arguments', function () {
            const options = {
                path: 'myPath2',
                before: () => undefined,
                after: () => undefined,
                customOption: 'customOption',
            };
            class Target {
                method() { }
            }
            __decorate([
                deleteAction('myPath1', options),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = RestActionReflector.getMetadata(Target);
            expect(res.get('method')).to.be.eql({
                ...options,
                propertyKey: 'method',
                method: HttpMethod.DELETE,
                path: 'myPath1',
            });
        });
    });
});
