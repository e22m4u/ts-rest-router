var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* eslint mocha/no-sibling-hooks: 0 */
import { expect } from 'chai';
import { before } from './before-decorator.js';
import { BeforeReflector } from './before-reflector.js';
const MIDDLEWARE_1 = () => undefined;
const MIDDLEWARE_2 = () => undefined;
const MIDDLEWARE_3 = () => undefined;
describe('before', function () {
    describe('class target', function () {
        it('sets given middleware to the target metadata', function () {
            let Target = class Target {
                method() { }
            };
            Target = __decorate([
                before(MIDDLEWARE_1)
            ], Target);
            const res = BeforeReflector.getMetadata(Target);
            expect(res).to.be.eql([{ middleware: MIDDLEWARE_1 }]);
        });
        it('sets miltiple middlewares to the target metadata', function () {
            let Target = class Target {
                method() { }
            };
            Target = __decorate([
                before([MIDDLEWARE_1, MIDDLEWARE_2])
            ], Target);
            const res = BeforeReflector.getMetadata(Target);
            expect(res).to.be.eql([{ middleware: [MIDDLEWARE_1, MIDDLEWARE_2] }]);
        });
        it('allows to use the decorator multiple times', function () {
            let Target = class Target {
                method() { }
            };
            Target = __decorate([
                before(MIDDLEWARE_1),
                before([MIDDLEWARE_2, MIDDLEWARE_3])
            ], Target);
            const res = BeforeReflector.getMetadata(Target);
            expect(res).to.be.eql([
                { middleware: MIDDLEWARE_1 },
                { middleware: [MIDDLEWARE_2, MIDDLEWARE_3] },
            ]);
        });
    });
    describe('method target', function () {
        it('sets given middleware to the target metadata', function () {
            class Target {
                method() { }
            }
            __decorate([
                before(MIDDLEWARE_1),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = BeforeReflector.getMetadata(Target, 'method');
            expect(res).to.be.eql([
                {
                    propertyKey: 'method',
                    middleware: MIDDLEWARE_1,
                },
            ]);
        });
        it('sets miltiple middlewares to the target metadata', function () {
            class Target {
                method() { }
            }
            __decorate([
                before([MIDDLEWARE_1, MIDDLEWARE_2]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = BeforeReflector.getMetadata(Target, 'method');
            expect(res).to.be.eql([
                {
                    propertyKey: 'method',
                    middleware: [MIDDLEWARE_1, MIDDLEWARE_2],
                },
            ]);
        });
        it('allows to use the decorator multiple times', function () {
            class Target {
                method() { }
            }
            __decorate([
                before(MIDDLEWARE_1),
                before([MIDDLEWARE_2, MIDDLEWARE_3]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Target.prototype, "method", null);
            const res = BeforeReflector.getMetadata(Target, 'method');
            expect(res).to.be.eql([
                {
                    propertyKey: 'method',
                    middleware: MIDDLEWARE_1,
                },
                {
                    propertyKey: 'method',
                    middleware: [MIDDLEWARE_2, MIDDLEWARE_3],
                },
            ]);
        });
    });
});
