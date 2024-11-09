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
import { get } from './decorators/index.js';
import { post } from './decorators/index.js';
import { HookName } from '@e22m4u/js-trie-router';
import { controller } from './decorators/index.js';
import { TrieRouter } from '@e22m4u/js-trie-router';
import { HttpMethod } from '@e22m4u/js-trie-router';
import { RouteRegistry } from '@e22m4u/js-trie-router';
import { createRequestMock } from '@e22m4u/js-trie-router';
import { ControllerReflector } from './decorators/index.js';
import { ControllerRegistry } from './controller-registry.js';
const PRE_HANDLER_1 = () => undefined;
const PRE_HANDLER_2 = () => undefined;
const PRE_HANDLER_3 = () => undefined;
const PRE_HANDLER_4 = () => undefined;
const POST_HANDLER_1 = () => undefined;
const POST_HANDLER_2 = () => undefined;
const POST_HANDLER_3 = () => undefined;
const POST_HANDLER_4 = () => undefined;
describe('ControllerRegistry', function () {
    it('has a public property with set of controllers', function () {
        const s = new ControllerRegistry();
        expect(s).to.have.property('controllers');
        expect(s.controllers).to.be.instanceof(Set);
    });
    describe('addController', function () {
        it('returns itself', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            const res = s.addController(MyController);
            expect(res).to.be.eq(s);
        });
        it('adds a given controller to controllers set', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            expect(s.hasController(MyController)).to.be.false;
            s.addController(MyController);
            expect(s.hasController(MyController)).to.be.true;
        });
        it('passes action method and path of a given controller to the route', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
                foo() { }
            };
            __decorate([
                get('/myAction'),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyController.prototype, "foo", null);
            MyController = __decorate([
                controller()
            ], MyController);
            s.addController(MyController);
            const reg = s.getService(TrieRouter).getService(RouteRegistry);
            const req = createRequestMock({
                method: HttpMethod.GET,
                path: '/myAction',
            });
            const matching = reg.matchRouteByRequest(req);
            expect(matching).to.be.not.empty;
            expect(matching.route.method).to.be.eq(HttpMethod.GET);
            expect(matching.route.path).to.be.eq('/myAction');
        });
        it('creates routes for multiple actions of a given controller', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
                foo() { }
                bar() { }
            };
            __decorate([
                get('/foo'),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyController.prototype, "foo", null);
            __decorate([
                post('/bar'),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyController.prototype, "bar", null);
            MyController = __decorate([
                controller()
            ], MyController);
            s.addController(MyController);
            const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
            const fooReq = createRequestMock({
                method: HttpMethod.GET,
                path: '/foo',
            });
            const fooMatching = routeReg.matchRouteByRequest(fooReq);
            expect(fooMatching).to.be.not.empty;
            const barReq = createRequestMock({
                method: HttpMethod.POST,
                path: '/bar',
            });
            const barMatching = routeReg.matchRouteByRequest(barReq);
            expect(barMatching).to.be.not.empty;
        });
        describe('single pre-handler', function () {
            it('passes pre-handler of a given options to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController, { before: PRE_HANDLER_1 });
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
                expect(res).to.be.eql([PRE_HANDLER_1]);
            });
            it('passes pre-handler of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller({ before: PRE_HANDLER_1 })
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
                expect(res).to.be.eql([PRE_HANDLER_1]);
            });
            it('passes action pre-handler of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction', { before: PRE_HANDLER_1 }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
                expect(res).to.be.eql([PRE_HANDLER_1]);
            });
        });
        describe('multiple pre-handlers', function () {
            it('passes pre-handlers of a given options to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController, {
                    before: [PRE_HANDLER_1, PRE_HANDLER_2],
                });
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
                expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
            });
            it('passes pre-handlers of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller({
                        before: [PRE_HANDLER_1, PRE_HANDLER_2],
                    })
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
                expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
            });
            it('passes action pre-handlers of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction', {
                        before: [PRE_HANDLER_1, PRE_HANDLER_2],
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
                expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
            });
        });
        describe('single post-handler', function () {
            it('passes post-handler of a given options to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController, { after: POST_HANDLER_1 });
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.POST_HANDLER);
                expect(res).to.be.eql([POST_HANDLER_1]);
            });
            it('passes post-handler of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller({ after: POST_HANDLER_1 })
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.POST_HANDLER);
                expect(res).to.be.eql([POST_HANDLER_1]);
            });
            it('passes action post-handler of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction', { after: POST_HANDLER_1 }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.POST_HANDLER);
                expect(res).to.be.eql([POST_HANDLER_1]);
            });
        });
        describe('multiple post-handlers', function () {
            it('passes post-handlers of a given options to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController, {
                    after: [POST_HANDLER_1, POST_HANDLER_2],
                });
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.POST_HANDLER);
                expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
            });
            it('passes post-handlers of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction'),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller({
                        after: [POST_HANDLER_1, POST_HANDLER_2],
                    })
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.POST_HANDLER);
                expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
            });
            it('passes action post-handlers of a given controller to the route', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                    myAction() { }
                };
                __decorate([
                    get('/myAction', {
                        after: [POST_HANDLER_1, POST_HANDLER_2],
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyController.prototype, "myAction", null);
                MyController = __decorate([
                    controller()
                ], MyController);
                s.addController(MyController);
                const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
                const req = createRequestMock({
                    method: HttpMethod.GET,
                    path: '/myAction',
                });
                const matching = routeReg.matchRouteByRequest(req);
                expect(matching).to.be.not.empty;
                const res = matching.route.hookRegistry.getHooks(HookName.POST_HANDLER);
                expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
            });
        });
    });
    describe('hasController', function () {
        it('returns false if a given controller is not registered', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            expect(s.hasController(MyController)).to.be.false;
        });
        it('returns true if a given controller is registered', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            expect(s.hasController(MyController)).to.be.false;
            s.addController(MyController);
            expect(s.hasController(MyController)).to.be.true;
        });
    });
    describe('getPathPrefixByControllerMetadata', function () {
        it('returns an empty string if no prefix is specified', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            const md = ControllerReflector.getMetadata(MyController);
            const res = s.getPathPrefixByControllerMetadata(md);
            expect(res).to.be.eq('');
        });
        it('returns controller path prefix that starts with slash', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller({ path: 'myPrefix' })
            ], MyController);
            const md = ControllerReflector.getMetadata(MyController);
            const res = s.getPathPrefixByControllerMetadata(md);
            expect(res).to.be.eq('/myPrefix');
        });
        it('returns path prefix from options that starts with slash', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            const md = ControllerReflector.getMetadata(MyController);
            const res = s.getPathPrefixByControllerMetadata(md, {
                pathPrefix: 'myPrefix',
            });
            expect(res).to.be.eq('/myPrefix');
        });
        it('combines a path prefix from options and controller', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller({ path: 'controller' })
            ], MyController);
            const md = ControllerReflector.getMetadata(MyController);
            const res = s.getPathPrefixByControllerMetadata(md, {
                pathPrefix: 'root',
            });
            expect(res).to.be.eq('/root/controller');
        });
    });
    describe('getPreHandlersByControllerMetadata', function () {
        it('returns an empty array if no handlers are specified', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            const md = ControllerReflector.getMetadata(MyController);
            const res = s.getPreHandlersByControllerMetadata(md);
            expect(res).to.be.eql([]);
        });
        describe('single handler', function () {
            it('returns pre-handlers from a given controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        before: PRE_HANDLER_1,
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPreHandlersByControllerMetadata(md);
                expect(res).to.be.eql([PRE_HANDLER_1]);
            });
            it('returns pre-handlers from a given options', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller()
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPreHandlersByControllerMetadata(md, {
                    before: PRE_HANDLER_1,
                });
                expect(res).to.be.eql([PRE_HANDLER_1]);
            });
            it('combines pre-handlers from a given options and controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        before: PRE_HANDLER_2,
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPreHandlersByControllerMetadata(md, {
                    before: PRE_HANDLER_1,
                });
                expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
            });
        });
        describe('multiple handlers', function () {
            it('returns pre-handlers from a given controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        before: [PRE_HANDLER_1, PRE_HANDLER_2],
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPreHandlersByControllerMetadata(md);
                expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
            });
            it('returns pre-handlers from a given options', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller()
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPreHandlersByControllerMetadata(md, {
                    before: [PRE_HANDLER_1, PRE_HANDLER_2],
                });
                expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
            });
            it('combines pre-handlers from a given options and controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        before: [PRE_HANDLER_3, PRE_HANDLER_4],
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPreHandlersByControllerMetadata(md, {
                    before: [PRE_HANDLER_1, PRE_HANDLER_2],
                });
                expect(res).to.be.eql([
                    PRE_HANDLER_1,
                    PRE_HANDLER_2,
                    PRE_HANDLER_3,
                    PRE_HANDLER_4,
                ]);
            });
        });
    });
    describe('getPostHandlersByControllerMetadata', function () {
        it('returns an empty array if no handlers are specified', function () {
            const s = new ControllerRegistry();
            let MyController = class MyController {
            };
            MyController = __decorate([
                controller()
            ], MyController);
            const md = ControllerReflector.getMetadata(MyController);
            const res = s.getPostHandlersByControllerMetadata(md);
            expect(res).to.be.eql([]);
        });
        describe('single handler', function () {
            it('returns pre-handlers from a given controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        after: POST_HANDLER_1,
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPostHandlersByControllerMetadata(md);
                expect(res).to.be.eql([POST_HANDLER_1]);
            });
            it('returns pre-handlers from a given options', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller()
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPostHandlersByControllerMetadata(md, {
                    after: POST_HANDLER_1,
                });
                expect(res).to.be.eql([POST_HANDLER_1]);
            });
            it('combines pre-handlers from a given options and controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        after: POST_HANDLER_2,
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPostHandlersByControllerMetadata(md, {
                    after: POST_HANDLER_1,
                });
                expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
            });
        });
        describe('multiple handlers', function () {
            it('returns pre-handlers from a given controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        after: [POST_HANDLER_1, POST_HANDLER_2],
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPostHandlersByControllerMetadata(md);
                expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
            });
            it('returns pre-handlers from a given options', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller()
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPostHandlersByControllerMetadata(md, {
                    after: [POST_HANDLER_1, POST_HANDLER_2],
                });
                expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
            });
            it('combines pre-handlers from a given options and controller', function () {
                const s = new ControllerRegistry();
                let MyController = class MyController {
                };
                MyController = __decorate([
                    controller({
                        after: [POST_HANDLER_3, POST_HANDLER_4],
                    })
                ], MyController);
                const md = ControllerReflector.getMetadata(MyController);
                const res = s.getPostHandlersByControllerMetadata(md, {
                    after: [POST_HANDLER_1, POST_HANDLER_2],
                });
                expect(res).to.be.eql([
                    POST_HANDLER_1,
                    POST_HANDLER_2,
                    POST_HANDLER_3,
                    POST_HANDLER_4,
                ]);
            });
        });
    });
});
