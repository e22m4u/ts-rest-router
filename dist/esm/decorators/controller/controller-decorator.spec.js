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
    it('does not require options', function () {
        let Target = class Target {
        };
        Target = __decorate([
            controller()
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({ className: 'Target' });
    });
    it('sets given options to the target metadata', function () {
        const options = {
            path: 'myPath',
            before: () => undefined,
            after: () => undefined,
            extraOption: 'extraOption',
        };
        let Target = class Target {
        };
        Target = __decorate([
            controller(options)
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({
            ...options,
            className: 'Target',
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
    it('allows to pass the path option to the first parameter', function () {
        let Target = class Target {
        };
        Target = __decorate([
            controller('myPath')
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({ className: 'Target', path: 'myPath' });
    });
    it('merges two given arguments in the target metadata', function () {
        const before = () => undefined;
        let Target = class Target {
        };
        Target = __decorate([
            controller('myPath', { before })
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({ className: 'Target', path: 'myPath', before });
    });
    it('overrides the path option by the first argument', function () {
        let Target = class Target {
        };
        Target = __decorate([
            controller('myPath1', { path: 'myPath2' })
        ], Target);
        const res = ControllerReflector.getMetadata(Target);
        expect(res).to.be.eql({ className: 'Target', path: 'myPath1' });
    });
});
