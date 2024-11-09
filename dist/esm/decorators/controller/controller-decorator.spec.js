var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect } from 'chai';
import { controller } from './controller-decorator.js';
import { ControllerReflector } from './controller-reflector.js';
describe('controller', function () {
    it('does not requires options', function () {
        let Target = class Target {
        };
        Target = __decorate([
            controller()
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({ className: 'Target' });
    });
    it('sets given options to the target metadata', function () {
        const path = 'myPath';
        const before = () => undefined;
        const after = () => undefined;
        const extraOption = 'extraOption';
        let Target = class Target {
        };
        Target = __decorate([
            controller({
                path,
                before,
                after,
                extraOption,
            })
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({
            className: 'Target',
            path,
            before,
            after,
            extraOption,
        });
    });
    it('overrides given "className" option by the target class name', function () {
        let Target = class Target {
        };
        Target = __decorate([
            controller({ className: 'myClassName' })
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({ className: 'Target' });
    });
});
