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
import { DataType } from '@e22m4u/ts-data-schema';
import { body } from './request-data-decorator.js';
import { param } from './request-data-decorator.js';
import { query } from './request-data-decorator.js';
import { field } from './request-data-decorator.js';
import { cookie } from './request-data-decorator.js';
import { header } from './request-data-decorator.js';
import { params } from './request-data-decorator.js';
import { queries } from './request-data-decorator.js';
import { cookies } from './request-data-decorator.js';
import { headers } from './request-data-decorator.js';
import { requestData } from './request-data-decorator.js';
import { RequestDataSource } from './request-data-metadata.js';
import { RequestDataReflector } from './request-data-reflector.js';
describe('requestData', function () {
    it('sets given options to the target metadata', function () {
        const options = {
            source: RequestDataSource.BODY,
            schema: { type: DataType.STRING },
            property: 'prop',
            customOption: 'myOption',
        };
        class Target {
            myMethod(prop) { }
        }
        __decorate([
            __param(0, requestData(options)),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "myMethod", null);
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql(options);
    });
    describe('request data by a given source', function () {
        describe('params', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, params()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.PARAMS,
                    schema: { type: DataType.OBJECT },
                });
            });
        });
        describe('queries', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, queries()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.QUERY,
                    schema: { type: DataType.OBJECT },
                });
            });
        });
        describe('headers', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, headers()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.HEADERS,
                    schema: { type: DataType.OBJECT },
                });
            });
        });
        describe('cookies', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, cookies()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIE,
                    schema: { type: DataType.OBJECT },
                });
            });
        });
        describe('body', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, body()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema: { type: DataType.ANY },
                });
            });
            it('sets a given DataType to the target metadata', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, body(DataType.STRING)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema: { type: DataType.STRING },
                });
            });
            it('set a given DataSchema to the target metadata', function () {
                const schema = { type: DataType.STRING, required: true };
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, body(schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema,
                });
            });
        });
    });
    describe('request data piece by a given property key', function () {
        describe('param', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, param('myPropertyKey')),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.PARAMS,
                    schema: { type: DataType.OBJECT },
                    property: 'myPropertyKey',
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, param(propertyKey, propertyType)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.PARAMS,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: {
                                type: propertyType,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataSchema as property schema', function () {
                const schema = {
                    type: DataType.STRING,
                    required: true,
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, param(propertyKey, schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.PARAMS,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: schema,
                        },
                    },
                    property: propertyKey,
                });
            });
        });
        describe('query', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, query('myPropertyKey')),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.QUERY,
                    schema: { type: DataType.OBJECT },
                    property: 'myPropertyKey',
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, query(propertyKey, propertyType)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.QUERY,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: {
                                type: propertyType,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataSchema as property schema', function () {
                const schema = {
                    type: DataType.STRING,
                    required: true,
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, query(propertyKey, schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.QUERY,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: schema,
                        },
                    },
                    property: propertyKey,
                });
            });
        });
        describe('header', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, header('myPropertyKey')),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.HEADERS,
                    schema: { type: DataType.OBJECT },
                    property: 'myPropertyKey',
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, header(propertyKey, propertyType)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.HEADERS,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: {
                                type: propertyType,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataSchema as property schema', function () {
                const schema = {
                    type: DataType.STRING,
                    required: true,
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, header(propertyKey, schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.HEADERS,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: schema,
                        },
                    },
                    property: propertyKey,
                });
            });
        });
        describe('cookie', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, cookie('myPropertyKey')),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIE,
                    schema: { type: DataType.OBJECT },
                    property: 'myPropertyKey',
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, cookie(propertyKey, propertyType)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIE,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: {
                                type: propertyType,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataSchema as property schema', function () {
                const schema = {
                    type: DataType.STRING,
                    required: true,
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, cookie(propertyKey, schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIE,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: schema,
                        },
                    },
                    property: propertyKey,
                });
            });
        });
        describe('field', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, field('myPropertyKey')),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema: { type: DataType.OBJECT },
                    property: 'myPropertyKey',
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, field(propertyKey, propertyType)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: {
                                type: propertyType,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataSchema as property schema', function () {
                const schema = {
                    type: DataType.STRING,
                    required: true,
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, field(propertyKey, schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: schema,
                        },
                    },
                    property: propertyKey,
                });
            });
        });
    });
});
