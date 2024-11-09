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
import { action } from './action-decorator.js';
import { HttpMethod } from '@e22m4u/js-trie-router';
import { ActionReflector } from './action-reflector.js';
describe('action', function () {
    it('sets given options to the target metadata', function () {
        const method = HttpMethod.GET;
        const path = 'myPath';
        const before = () => undefined;
        const after = () => undefined;
        const customOption = 'customOption';
        class Target {
            method() { }
        }
        __decorate([
            action({ method, path, before, after, customOption }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
        const res = ActionReflector.getMetadata(Target);
        expect(res.get('method')).to.be.eql({
            propertyKey: 'method',
            method,
            path,
            before,
            after,
            customOption,
        });
    });
    it('overrides a given "propertyKey" option by the target method name', function () {
        const method = HttpMethod.GET;
        const path = 'myPath';
        class Target {
            method() { }
        }
        __decorate([
            action({ propertyKey: 'myMethod', method, path }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
        const res = ActionReflector.getMetadata(Target);
        expect(res.get('method')).to.be.eql({
            propertyKey: 'method',
            method,
            path,
        });
    });
});
