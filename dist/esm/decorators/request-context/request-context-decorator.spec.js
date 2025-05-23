var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { httpRequest } from './request-context-decorator.js';
import { httpResponse } from './request-context-decorator.js';
import { requestContext } from './request-context-decorator.js';
import { RequestContextReflector } from './request-context-reflector.js';
describe('requestContext', function () {
    it('has aliases', function () {
        expect(httpRequest).to.be.instanceOf(Function);
        expect(httpResponse).to.be.instanceOf(Function);
    });
    it('does not require options', function () {
        class Target {
            method(prop) { }
        }
        __decorate([
            __param(0, requestContext()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
        const res = RequestContextReflector.getMetadata(Target, 'method');
        expect(res.get(0)).to.be.eql({ property: undefined });
    });
    it('sets a given property to the target metadata', function () {
        class Target {
            method(prop) { }
        }
        __decorate([
            __param(0, requestContext('res')),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
        const res = RequestContextReflector.getMetadata(Target, 'method');
        expect(res.get(0)).to.be.eql({ property: 'res' });
    });
});
