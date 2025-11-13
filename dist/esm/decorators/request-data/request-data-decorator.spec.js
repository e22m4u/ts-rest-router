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
import { requestData } from './request-data-decorator.js';
import { requestBody } from './request-data-decorator.js';
import { requestField } from './request-data-decorator.js';
import { requestParam } from './request-data-decorator.js';
import { requestQuery } from './request-data-decorator.js';
import { requestCookie } from './request-data-decorator.js';
import { requestHeader } from './request-data-decorator.js';
import { requestParams } from './request-data-decorator.js';
import { requestQueries } from './request-data-decorator.js';
import { requestHeaders } from './request-data-decorator.js';
import { requestCookies } from './request-data-decorator.js';
import { RequestDataSource } from './request-data-metadata.js';
import { RequestDataReflector } from './request-data-reflector.js';
describe('requestData', function () {
    it('has aliases', function () {
        expect(requestParams).to.be.instanceOf(Function);
        expect(requestParam).to.be.instanceOf(Function);
        expect(requestQueries).to.be.instanceOf(Function);
        expect(requestQuery).to.be.instanceOf(Function);
        expect(requestHeaders).to.be.instanceOf(Function);
        expect(requestHeader).to.be.instanceOf(Function);
        expect(requestCookies).to.be.instanceOf(Function);
        expect(requestCookie).to.be.instanceOf(Function);
        expect(requestField).to.be.instanceOf(Function);
        expect(requestBody).to.be.instanceOf(Function);
    });
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
                    __param(0, requestParams()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.PARAMS,
                    schema: { type: DataType.ANY },
                });
            });
        });
        describe('queries', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestQueries()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.QUERY,
                    schema: { type: DataType.ANY },
                });
            });
        });
        describe('headers', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestHeaders()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.HEADERS,
                    schema: { type: DataType.ANY },
                });
            });
        });
        describe('cookies', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestCookies()),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIES,
                    schema: { type: DataType.ANY },
                });
            });
        });
        describe('body', function () {
            it('sets metadata with specified source and schema', function () {
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestBody()),
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
                    __param(0, requestBody(DataType.STRING)),
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
            it('sets a given DataSchema to the target metadata', function () {
                const schema = { type: DataType.STRING, required: true };
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestBody(schema)),
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
            it('sets a given DataSchemaFactory to the target metadata', function () {
                const factory = () => ({ type: DataType.STRING, required: true });
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestBody(factory)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.BODY,
                    schema: factory,
                });
            });
        });
    });
    describe('request data piece by a given property key', function () {
        describe('param', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestParam(propertyKey)),
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
                                type: DataType.ANY,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestParam(propertyKey, propertyType)),
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
                    __param(0, requestParam(propertyKey, schema)),
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
            it('sets a given DataSchemaFactory to the target metadata', function () {
                const container = {};
                const factory = sc => {
                    expect(sc).to.be.eq(container);
                    return { type: DataType.STRING, required: true };
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestParam(propertyKey, factory)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const mdMap = RequestDataReflector.getMetadata(Target, 'myMethod');
                const md = mdMap.get(0);
                expect(md.source).to.be.eq(RequestDataSource.PARAMS);
                expect(md.schema).to.be.a('function');
                expect(md.property).to.be.eq(propertyKey);
                const res1 = md.schema;
                const res2 = res1(container);
                expect(res2).to.be.eql({
                    type: DataType.OBJECT,
                    properties: {
                        [propertyKey]: {
                            type: DataType.STRING,
                            required: true,
                        },
                    },
                });
            });
        });
        describe('query', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestQuery(propertyKey)),
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
                                type: DataType.ANY,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestQuery(propertyKey, propertyType)),
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
                    __param(0, requestQuery(propertyKey, schema)),
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
            it('sets a given DataSchemaFactory to the target metadata', function () {
                const container = {};
                const factory = sc => {
                    expect(sc).to.be.eq(container);
                    return { type: DataType.STRING, required: true };
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestQuery(propertyKey, factory)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const mdMap = RequestDataReflector.getMetadata(Target, 'myMethod');
                const md = mdMap.get(0);
                expect(md.source).to.be.eq(RequestDataSource.QUERY);
                expect(md.schema).to.be.a('function');
                expect(md.property).to.be.eq(propertyKey);
                const res1 = md.schema;
                const res2 = res1(container);
                expect(res2).to.be.eql({
                    type: DataType.OBJECT,
                    properties: {
                        [propertyKey]: {
                            type: DataType.STRING,
                            required: true,
                        },
                    },
                });
            });
        });
        describe('header', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestHeader(propertyKey)),
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
                                type: DataType.ANY,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestHeader(propertyKey, propertyType)),
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
                    __param(0, requestHeader(propertyKey, schema)),
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
            it('sets a given DataSchemaFactory to the target metadata', function () {
                const container = {};
                const factory = sc => {
                    expect(sc).to.be.eq(container);
                    return { type: DataType.STRING, required: true };
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestHeader(propertyKey, factory)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const mdMap = RequestDataReflector.getMetadata(Target, 'myMethod');
                const md = mdMap.get(0);
                expect(md.source).to.be.eq(RequestDataSource.HEADERS);
                expect(md.schema).to.be.a('function');
                expect(md.property).to.be.eq(propertyKey);
                const res1 = md.schema;
                const res2 = res1(container);
                expect(res2).to.be.eql({
                    type: DataType.OBJECT,
                    properties: {
                        [propertyKey]: {
                            type: DataType.STRING,
                            required: true,
                        },
                    },
                });
            });
        });
        describe('cookie', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestCookie(propertyKey)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIES,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: {
                                type: DataType.ANY,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestCookie(propertyKey, propertyType)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIES,
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
                    __param(0, requestCookie(propertyKey, schema)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const res = RequestDataReflector.getMetadata(Target, 'myMethod');
                expect(res.get(0)).to.be.eql({
                    source: RequestDataSource.COOKIES,
                    schema: {
                        type: DataType.OBJECT,
                        properties: {
                            [propertyKey]: schema,
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataSchemaFactory to the target metadata', function () {
                const container = {};
                const factory = sc => {
                    expect(sc).to.be.eq(container);
                    return { type: DataType.STRING, required: true };
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestCookie(propertyKey, factory)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const mdMap = RequestDataReflector.getMetadata(Target, 'myMethod');
                const md = mdMap.get(0);
                expect(md.source).to.be.eq(RequestDataSource.COOKIES);
                expect(md.schema).to.be.a('function');
                expect(md.property).to.be.eq(propertyKey);
                const res1 = md.schema;
                const res2 = res1(container);
                expect(res2).to.be.eql({
                    type: DataType.OBJECT,
                    properties: {
                        [propertyKey]: {
                            type: DataType.STRING,
                            required: true,
                        },
                    },
                });
            });
        });
        describe('field', function () {
            it('sets a given "propertyKey" to the target metadata', function () {
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestField(propertyKey)),
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
                                type: DataType.ANY,
                            },
                        },
                    },
                    property: propertyKey,
                });
            });
            it('sets a given DataType as property type', function () {
                const propertyKey = 'myPropertyKey';
                const propertyType = DataType.STRING;
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestField(propertyKey, propertyType)),
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
                    __param(0, requestField(propertyKey, schema)),
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
            it('sets a given DataSchemaFactory to the target metadata', function () {
                const container = {};
                const factory = sc => {
                    expect(sc).to.be.eq(container);
                    return { type: DataType.STRING, required: true };
                };
                const propertyKey = 'myPropertyKey';
                class Target {
                    myMethod(prop) { }
                }
                __decorate([
                    __param(0, requestField(propertyKey, factory)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "myMethod", null);
                const mdMap = RequestDataReflector.getMetadata(Target, 'myMethod');
                const md = mdMap.get(0);
                expect(md.source).to.be.eq(RequestDataSource.BODY);
                expect(md.schema).to.be.a('function');
                expect(md.property).to.be.eq(propertyKey);
                const res1 = md.schema;
                const res2 = res1(container);
                expect(res2).to.be.eql({
                    type: DataType.OBJECT,
                    properties: {
                        [propertyKey]: {
                            type: DataType.STRING,
                            required: true,
                        },
                    },
                });
            });
        });
    });
});
