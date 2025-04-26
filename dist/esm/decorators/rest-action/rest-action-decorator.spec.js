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
});
