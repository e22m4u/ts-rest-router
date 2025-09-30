/* eslint mocha/no-sibling-hooks: 0 */
import {
  createRequestMock,
  createResponseMock,
  HookType,
  HttpMethod,
  ParsedCookies,
  ParsedHeaders,
  ParsedParams,
  ParsedQuery,
  RequestContext,
  RequestParser,
  RouteRegistry,
  TrieRouter,
} from '@e22m4u/js-trie-router';

import {
  afterAction,
  beforeAction,
  getAction,
  postAction,
  requestBody,
  requestCookie,
  requestCookies,
  requestField,
  requestHeader,
  requestHeaders,
  requestParam,
  requestParams,
  requestQueries,
  requestQuery,
  restController,
} from './decorators/index.js';

import {expect} from 'chai';
import {DataType} from '@e22m4u/ts-data-schema';
import {ControllerRegistry} from './controller-registry.js';
import {Service, ServiceContainer} from '@e22m4u/js-service';

const PRE_HANDLER_1 = () => undefined;
const PRE_HANDLER_2 = () => undefined;

const POST_HANDLER_1 = () => undefined;
const POST_HANDLER_2 = () => undefined;

describe('ControllerRegistry', function () {
  it('has a public property `controllerMap` with an empty Map', function () {
    const S = new ControllerRegistry();
    expect(S).to.have.property('controllerMap');
    expect(S.controllerMap).to.be.instanceof(Map);
    expect(S.controllerMap).to.be.empty;
  });

  describe('addController', function () {
    it('returns itself', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {}
      const res = S.addController(MyController);
      expect(res).to.be.eq(S);
    });

    it('adds a given controller to controllers map', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {}
      expect(S.hasController(MyController)).to.be.false;
      S.addController(MyController);
      expect(S.hasController(MyController)).to.be.true;
    });

    it('uses http method and action path for a new route', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        foo() {}
      }
      S.addController(MyController);
      const reg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction',
      });
      const matching = reg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      expect(matching!.route.method).to.be.eq(HttpMethod.GET);
      expect(matching!.route.path).to.be.eq('/myAction');
    });

    it('adds multiple routes by the given controller', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/foo')
        foo() {}
        @postAction('/bar')
        bar() {}
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
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

    it('uses path prefix of controller root options', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction() {}
      }
      S.addController(MyController, {pathPrefix: '/myPrefix'});
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myPrefix/myAction',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
    });

    it('uses path prefix of @restController metadata', function () {
      const S = new ControllerRegistry();
      @restController('/myController')
      class MyController {
        @getAction('/myAction')
        myAction() {}
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myController/myAction',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
    });

    it('uses path prefix of controller root options and @restController metadata', function () {
      const S = new ControllerRegistry();
      @restController('/myController')
      class MyController {
        @getAction('/myAction')
        myAction() {}
      }
      S.addController(MyController, {pathPrefix: '/myPrefix'});
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myPrefix/myController/myAction',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
    });

    describe('single pre-handler', function () {
      it('uses pre-handler of controller root options', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController, {before: PRE_HANDLER_1});
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @beforeAction metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @restController()
        @beforeAction(PRE_HANDLER_1)
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @beforeAction metadata applied to action', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          @beforeAction(PRE_HANDLER_1)
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @restController metadata', function () {
        const S = new ControllerRegistry();
        @restController({before: PRE_HANDLER_1})
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @action metadata', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction', {before: PRE_HANDLER_1})
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });
    });

    describe('multiple pre-handlers', function () {
      it('uses pre-handlers of controller root options', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController, {
          before: [PRE_HANDLER_1, PRE_HANDLER_2],
        });
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @beforeAction metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @restController()
        @beforeAction([PRE_HANDLER_1, PRE_HANDLER_2])
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @beforeAction metadata applied to action', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          @beforeAction([PRE_HANDLER_1, PRE_HANDLER_2])
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @restController metadata', function () {
        const S = new ControllerRegistry();
        @restController({
          before: [PRE_HANDLER_1, PRE_HANDLER_2],
        })
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @action metadata', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction', {
            before: [PRE_HANDLER_1, PRE_HANDLER_2],
          })
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookType.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });
    });

    describe('single post-handler', function () {
      it('uses post-handler of controller root options', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController, {after: POST_HANDLER_1});
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses pre-handler of @afterAction metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @restController()
        @afterAction(POST_HANDLER_1)
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses pre-handler of @afterAction metadata applied to action', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          @afterAction(POST_HANDLER_1)
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses post-handler of @restController metadata', function () {
        const S = new ControllerRegistry();
        @restController({after: POST_HANDLER_1})
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses post-handler of @action metadata', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction', {after: POST_HANDLER_1})
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });
    });

    describe('multiple post-handlers', function () {
      it('uses post-handlers of controller root options', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController, {
          after: [POST_HANDLER_1, POST_HANDLER_2],
        });
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses pre-handlers of @afterAction metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @restController()
        @afterAction([POST_HANDLER_1, POST_HANDLER_2])
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses pre-handlers of @afterAction metadata applied to action', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction')
          @afterAction([POST_HANDLER_1, POST_HANDLER_2])
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses post-handlers of @restController metadata', function () {
        const S = new ControllerRegistry();
        @restController({
          after: [POST_HANDLER_1, POST_HANDLER_2],
        })
        class MyController {
          @getAction('/myAction')
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses post-handlers of @action metadata', function () {
        const S = new ControllerRegistry();
        @restController()
        class MyController {
          @getAction('/myAction', {
            after: [POST_HANDLER_1, POST_HANDLER_2],
          })
          myAction() {}
        }
        S.addController(MyController);
        const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(
          HookType.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });
    });

    it('injects parsed parameters', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction/:id')
        myAction(
          @requestParams()
          params: ParsedParams,
        ) {
          expect(params).to.be.eql({id: '123'});
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction/123',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      ctx.params = matching!.params;
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed parameter', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction/:id')
        myAction(
          @requestParam('id')
          param: string,
        ) {
          expect(param).to.be.eq('123');
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction/123',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      ctx.params = matching!.params;
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed queries', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction(
          @requestQueries()
          queries: ParsedQuery,
        ) {
          expect(queries).to.be.eql({foo: 'bar'});
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction?foo=bar',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed query', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction(
          @requestQuery('foo')
          foo: string,
        ) {
          expect(foo).to.be.eql('bar');
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction?foo=bar',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed headers', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction(
          @requestHeaders()
          headers: ParsedHeaders,
        ) {
          expect(headers).to.be.eql({
            host: 'localhost',
            foo: 'bar',
          });
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        host: 'localhost',
        method: HttpMethod.GET,
        path: '/myAction',
        headers: {foo: 'bar'},
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed header', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction(
          @requestHeader('foo')
          foo: string,
        ) {
          expect(foo).to.be.eq('bar');
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction',
        headers: {foo: 'bar'},
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed cookies', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction(
          @requestCookies()
          cookies: ParsedCookies,
        ) {
          expect(cookies).to.be.eql({foo: 'bar'});
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction',
        headers: {cookie: 'foo=bar;'},
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed cookie', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @getAction('/myAction')
        myAction(
          @requestCookie('foo')
          foo: string,
        ) {
          expect(foo).to.be.eq('bar');
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myAction',
        headers: {cookie: 'foo=bar;'},
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed body', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @postAction('/myAction')
        myAction(
          @requestBody()
          body: object,
        ) {
          expect(body).to.be.eql({foo: 'bar'});
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.POST,
        path: '/myAction',
        headers: {'content-type': 'application/json'},
        body: '{"foo":"bar"}',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });

    it('injects parsed body parameter', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @restController()
      class MyController {
        @postAction('/myAction')
        myAction(
          @requestField('foo')
          foo: object,
        ) {
          expect(foo).to.be.eq('bar');
          checked = true;
        }
      }
      S.addController(MyController);
      const routeReg = S.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.POST,
        path: '/myAction',
        headers: {'content-type': 'application/json'},
        body: '{"foo":"bar"}',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const reqData = await S.getService(RequestParser).parse(req);
      Object.assign(ctx, reqData);
      await matching!.route.handler(ctx);
      expect(checked).to.be.true;
    });
  });

  describe('hasController', function () {
    it('returns false if a given controller is not registered', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {}
      expect(S.hasController(MyController)).to.be.false;
    });

    it('returns true if a given controller is registered', function () {
      const S = new ControllerRegistry();
      @restController()
      class MyController {}
      expect(S.hasController(MyController)).to.be.false;
      S.addController(MyController);
      expect(S.hasController(MyController)).to.be.true;
    });
  });

  describe('createRouteHandler', function () {
    it('uses default values from schema as copy', async function () {
      let invoked = false;
      const defaultValue = {foo: 'bar'};
      class MyController {
        myAction(
          @requestBody({
            type: DataType.OBJECT,
            default: defaultValue,
          })
          body: object,
        ) {
          expect(body).to.be.not.eq(defaultValue);
          expect(body).to.be.eql(defaultValue);
          invoked = true;
        }
      }
      const S = new ControllerRegistry();
      const req = createRequestMock();
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const handler = S['createRouteHandler'](MyController, 'myAction');
      await handler(ctx);
      expect(invoked).to.be.true;
    });

    it('uses default values from factory function that defined in schema as copy', async function () {
      let invoked = false;
      const defaultValue = {foo: 'bar'};
      class MyController {
        myAction(
          @requestBody({
            type: DataType.OBJECT,
            default: () => defaultValue,
          })
          body: object,
        ) {
          expect(body).to.be.not.eq(defaultValue);
          expect(body).to.be.eql(defaultValue);
          invoked = true;
        }
      }
      const S = new ControllerRegistry();
      const req = createRequestMock();
      const res = createResponseMock();
      const ctx = new RequestContext(S.container, req, res);
      const handler = S['createRouteHandler'](MyController, 'myAction');
      await handler(ctx);
      expect(invoked).to.be.true;
    });

    it('should create a new controller instance for each request', async function () {
      @restController()
      class MyStatefulController {
        public readonly instanceId: number;
        constructor() {
          this.instanceId = Math.random();
        }
        @getAction('/test')
        myAction() {
          return this;
        }
      }
      const S = new ControllerRegistry();
      S.addController(MyStatefulController);
      // поиск обработчика
      const router = S.getService(RouteRegistry);
      const req = createRequestMock({method: HttpMethod.GET, path: '/test'});
      const matching = router.matchRouteByRequest(req);
      const handler = matching!.route.handler;
      // симуляция первого запроса
      const req1 = createRequestMock();
      const res1 = createResponseMock();
      const cont1 = new ServiceContainer(S.container);
      const ctx1 = new RequestContext(cont1, req1, res1);
      const controllerInstance1 = (await handler(ctx1)) as MyStatefulController;
      // симуляция второго запроса
      const req2 = createRequestMock();
      const res2 = createResponseMock();
      const cont2 = new ServiceContainer(S.container);
      const ctx2 = new RequestContext(cont2, req2, res2);
      const controllerInstance2 = (await handler(ctx2)) as MyStatefulController;
      // проверка, что это два разных экземпляра
      expect(controllerInstance1).to.be.instanceOf(MyStatefulController);
      expect(controllerInstance2).to.be.instanceOf(MyStatefulController);
      expect(controllerInstance1).to.not.equal(controllerInstance2);
      expect(controllerInstance1.instanceId).to.not.equal(
        controllerInstance2.instanceId,
        'Controller instance IDs should be different',
      );
    });

    it('should create controller using a request-scoped container parented by the application container', async function () {
      let counter = 0;
      const appContainer = new ServiceContainer();
      @restController()
      class MyStatefulController extends Service {
        @getAction('/test')
        myAction() {
          expect(this.container).to.be.not.eq(appContainer);
          expect(this.container.getParent()).to.be.eq(appContainer);
          counter++;
        }
      }
      const S = new ControllerRegistry(appContainer);
      S.addController(MyStatefulController);
      // поиск обработчика
      const router = S.getService(RouteRegistry);
      const req = createRequestMock({method: HttpMethod.GET, path: '/test'});
      const matching = router.matchRouteByRequest(req);
      const handler = matching!.route.handler;
      // симуляция запроса
      const res = createResponseMock();
      const cont1 = new ServiceContainer(S.container);
      const ctx1 = new RequestContext(cont1, req, res);
      await handler(ctx1);
      expect(counter).to.be.eq(1);
    });
  });
});
