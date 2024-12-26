/* eslint mocha/no-sibling-hooks: 0 */
import {expect} from 'chai';
import {get} from './decorators/index.js';
import {post} from './decorators/index.js';
import {body} from './decorators/index.js';
import {after} from './decorators/index.js';
import {query} from './decorators/index.js';
import {param} from './decorators/index.js';
import {cookie} from './decorators/index.js';
import {params} from './decorators/index.js';
import {before} from './decorators/index.js';
import {header} from './decorators/index.js';
import {cookies} from './decorators/index.js';
import {queries} from './decorators/index.js';
import {headers} from './decorators/index.js';
import {bodyProp} from './decorators/index.js';
import {HookName} from '@e22m4u/js-trie-router';
import {controller} from './decorators/index.js';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {ParsedQuery} from '@e22m4u/js-trie-router';
import {ParsedCookie} from '@e22m4u/js-trie-router';
import {ParsedParams} from '@e22m4u/js-trie-router';
import {ParsedHeaders} from '@e22m4u/js-trie-router';
import {RouteRegistry} from '@e22m4u/js-trie-router';
import {RequestParser} from '@e22m4u/js-trie-router';
import {RequestContext} from '@e22m4u/js-trie-router';
import {createRequestMock} from '@e22m4u/js-trie-router';
import {createResponseMock} from '@e22m4u/js-trie-router';
import {ControllerRegistry} from './controller-registry.js';

const PRE_HANDLER_1 = () => undefined;
const PRE_HANDLER_2 = () => undefined;
// const PRE_HANDLER_3 = () => undefined;
// const PRE_HANDLER_4 = () => undefined;

const POST_HANDLER_1 = () => undefined;
const POST_HANDLER_2 = () => undefined;
// const POST_HANDLER_3 = () => undefined;
// const POST_HANDLER_4 = () => undefined;

describe('ControllerRegistry', function () {
  it('has a public property with set of controllers', function () {
    const S = new ControllerRegistry();
    expect(S).to.have.property('controllers');
    expect(S.controllers).to.be.instanceof(Set);
  });

  describe('addController', function () {
    it('returns itself', function () {
      const S = new ControllerRegistry();
      @controller()
      class MyController {}
      const res = S.addController(MyController);
      expect(res).to.be.eq(S);
    });

    it('adds a given controller to controllers set', function () {
      const S = new ControllerRegistry();
      @controller()
      class MyController {}
      expect(S.hasController(MyController)).to.be.false;
      S.addController(MyController);
      expect(S.hasController(MyController)).to.be.true;
    });

    it('uses http method and action path for a new route', function () {
      const S = new ControllerRegistry();
      @controller()
      class MyController {
        @get('/myAction')
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
      @controller()
      class MyController {
        @get('/foo')
        foo() {}
        @post('/bar')
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
      @controller()
      class MyController {
        @get('/myAction')
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

    it('uses path prefix of @controller metadata', function () {
      const S = new ControllerRegistry();
      @controller('/myController')
      class MyController {
        @get('/myAction')
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

    it('uses path prefix of controller root options and @controller metadata', function () {
      const S = new ControllerRegistry();
      @controller('/myController')
      class MyController {
        @get('/myAction')
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
        @controller()
        class MyController {
          @get('/myAction')
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @before metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @controller()
        @before(PRE_HANDLER_1)
        class MyController {
          @get('/myAction')
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @before metadata applied to action', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @before(PRE_HANDLER_1)
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @controller metadata', function () {
        const S = new ControllerRegistry();
        @controller({before: PRE_HANDLER_1})
        class MyController {
          @get('/myAction')
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @action metadata', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {before: PRE_HANDLER_1})
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });
    });

    describe('multiple pre-handlers', function () {
      it('uses pre-handlers of controller root options', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @before metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @controller()
        @before([PRE_HANDLER_1, PRE_HANDLER_2])
        class MyController {
          @get('/myAction')
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @before metadata applied to action', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @before([PRE_HANDLER_1, PRE_HANDLER_2])
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @controller metadata', function () {
        const S = new ControllerRegistry();
        @controller({
          before: [PRE_HANDLER_1, PRE_HANDLER_2],
        })
        class MyController {
          @get('/myAction')
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @action metadata', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });
    });

    describe('single post-handler', function () {
      it('uses post-handler of controller root options', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses pre-handler of @after metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @controller()
        @after(POST_HANDLER_1)
        class MyController {
          @get('/myAction')
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses pre-handler of @after metadata applied to action', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @after(POST_HANDLER_1)
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses post-handler of @controller metadata', function () {
        const S = new ControllerRegistry();
        @controller({after: POST_HANDLER_1})
        class MyController {
          @get('/myAction')
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('uses post-handler of @action metadata', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {after: POST_HANDLER_1})
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1]);
      });
    });

    describe('multiple post-handlers', function () {
      it('uses post-handlers of controller root options', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses pre-handlers of @after metadata applied to controller', function () {
        const S = new ControllerRegistry();
        @controller()
        @after([POST_HANDLER_1, POST_HANDLER_2])
        class MyController {
          @get('/myAction')
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses pre-handlers of @after metadata applied to action', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @after([POST_HANDLER_1, POST_HANDLER_2])
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses post-handlers of @controller metadata', function () {
        const S = new ControllerRegistry();
        @controller({
          after: [POST_HANDLER_1, POST_HANDLER_2],
        })
        class MyController {
          @get('/myAction')
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses post-handlers of @action metadata', function () {
        const S = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {
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
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });
    });

    it('injects parsed parameters', async function () {
      let checked = false;
      const S = new ControllerRegistry();
      @controller()
      class MyController {
        @get('/myAction/:id')
        myAction(
          @params()
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
      @controller()
      class MyController {
        @get('/myAction/:id')
        myAction(
          @param('id')
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
      @controller()
      class MyController {
        @get('/myAction')
        myAction(
          @queries()
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
      @controller()
      class MyController {
        @get('/myAction')
        myAction(
          @query('foo')
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
      @controller()
      class MyController {
        @get('/myAction')
        myAction(
          @headers()
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
      @controller()
      class MyController {
        @get('/myAction')
        myAction(
          @header('foo')
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
      @controller()
      class MyController {
        @get('/myAction')
        myAction(
          @cookies()
          cookies: ParsedCookie,
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
      @controller()
      class MyController {
        @get('/myAction')
        myAction(
          @cookie('foo')
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
      @controller()
      class MyController {
        @post('/myAction')
        myAction(
          @body()
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
      @controller()
      class MyController {
        @post('/myAction')
        myAction(
          @bodyProp('foo')
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
      @controller()
      class MyController {}
      expect(S.hasController(MyController)).to.be.false;
    });

    it('returns true if a given controller is registered', function () {
      const S = new ControllerRegistry();
      @controller()
      class MyController {}
      expect(S.hasController(MyController)).to.be.false;
      S.addController(MyController);
      expect(S.hasController(MyController)).to.be.true;
    });
  });
});
