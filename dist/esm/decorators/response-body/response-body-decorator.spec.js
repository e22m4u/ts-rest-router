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
import { DataType } from '@e22m4u/ts-data-schema';
import { responseBody } from './response-body-decorator.js';
import { ResponseBodyReflector } from './response-body-reflector.js';
describe('responseBody', function () {
    it('does not require arguments', function () {
        class Target {
            myMethod() { }
        }
        __decorate([
            responseBody(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "myMethod", null);
        const res = ResponseBodyReflector.getMetadata(Target);
        expect(res.get('myMethod')).to.be.eql({});
    });
    it('sets the given DataType to the target metadata', function () {
        class Target {
            myMethod() { }
        }
        __decorate([
            responseBody(DataType.STRING),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "myMethod", null);
        const res = ResponseBodyReflector.getMetadata(Target);
        expect(res.get('myMethod')).to.be.eql({ schema: { type: DataType.STRING } });
    });
    it('sets the given DataSchema to the target metadata', function () {
        const schema = {
            type: DataType.OBJECT,
            properties: {
                foo: { type: DataType.STRING },
                bar: { type: DataType.NUMBER },
            },
        };
        class Target {
            myMethod() { }
        }
        __decorate([
            responseBody(schema),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "myMethod", null);
        const res = ResponseBodyReflector.getMetadata(Target);
        expect(res.get('myMethod')).to.be.eql({ schema });
    });
    it('sets the given DataSchemaFactory to the target metadata', function () {
        const factory = () => ({
            type: DataType.OBJECT,
            properties: {
                foo: { type: DataType.STRING },
                bar: { type: DataType.NUMBER },
            },
        });
        class Target {
            myMethod() { }
        }
        __decorate([
            responseBody(factory),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "myMethod", null);
        const res = ResponseBodyReflector.getMetadata(Target);
        expect(res.get('myMethod')).to.be.eql({ schema: factory });
    });
});
