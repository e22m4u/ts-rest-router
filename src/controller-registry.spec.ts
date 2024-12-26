import {expect} from 'chai';
import {get} from './decorators/index.js';
import {post} from './decorators/index.js';
import {after} from './decorators/index.js';
import {before} from './decorators/index.js';
import {HookName} from '@e22m4u/js-trie-router';
import {controller} from './decorators/index.js';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {RouteRegistry} from '@e22m4u/js-trie-router';
import {createRequestMock} from '@e22m4u/js-trie-router';
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
    const s = new ControllerRegistry();
    expect(s).to.have.property('controllers');
    expect(s.controllers).to.be.instanceof(Set);
  });

  describe('addController', function () {
    it('returns itself', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      const res = s.addController(MyController);
      expect(res).to.be.eq(s);
    });

    it('adds a given controller to controllers set', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      expect(s.hasController(MyController)).to.be.false;
      s.addController(MyController);
      expect(s.hasController(MyController)).to.be.true;
    });

    it('uses http method and action path for a new route', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {
        @get('/myAction')
        foo() {}
      }
      s.addController(MyController);
      const reg = s.getService(TrieRouter).getService(RouteRegistry);
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
      const s = new ControllerRegistry();
      @controller()
      class MyController {
        @get('/foo')
        foo() {}
        @post('/bar')
        bar() {}
      }
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

    it('uses path prefix of controller root options', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {
        @get('/myAction')
        myAction() {}
      }
      s.addController(MyController, {pathPrefix: '/myPrefix'});
      const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myPrefix/myAction',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
    });

    it('uses path prefix of @controller metadata', function () {
      const s = new ControllerRegistry();
      @controller('/myController')
      class MyController {
        @get('/myAction')
        myAction() {}
      }
      s.addController(MyController);
      const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myController/myAction',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
    });

    it('uses path prefix of controller root options and @controller metadata', function () {
      const s = new ControllerRegistry();
      @controller('/myController')
      class MyController {
        @get('/myAction')
        myAction() {}
      }
      s.addController(MyController, {pathPrefix: '/myPrefix'});
      const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
      const req = createRequestMock({
        method: HttpMethod.GET,
        path: '/myPrefix/myController/myAction',
      });
      const matching = routeReg.matchRouteByRequest(req);
      expect(matching).to.be.not.empty;
    });

    describe('single pre-handler', function () {
      it('uses pre-handler of controller root options', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          myAction() {}
        }
        s.addController(MyController, {before: PRE_HANDLER_1});
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
        const req = createRequestMock({
          method: HttpMethod.GET,
          path: '/myAction',
        });
        const matching = routeReg.matchRouteByRequest(req);
        expect(matching).to.be.not.empty;
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('uses pre-handler of @before metadata', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @before(PRE_HANDLER_1)
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller({before: PRE_HANDLER_1})
        class MyController {
          @get('/myAction')
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {before: PRE_HANDLER_1})
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          myAction() {}
        }
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
        const res = matching!.route.hookRegistry.getHooks(HookName.PRE_HANDLER);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('uses pre-handlers of @before metadata', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @before([PRE_HANDLER_1, PRE_HANDLER_2])
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller({
          before: [PRE_HANDLER_1, PRE_HANDLER_2],
        })
        class MyController {
          @get('/myAction')
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {
            before: [PRE_HANDLER_1, PRE_HANDLER_2],
          })
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          myAction() {}
        }
        s.addController(MyController, {after: POST_HANDLER_1});
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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

      it('uses pre-handler of @after metadata', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @after(POST_HANDLER_1)
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller({after: POST_HANDLER_1})
        class MyController {
          @get('/myAction')
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {after: POST_HANDLER_1})
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          myAction() {}
        }
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
        const res = matching!.route.hookRegistry.getHooks(
          HookName.POST_HANDLER,
        );
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('uses pre-handlers of @after metadata', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction')
          @after([POST_HANDLER_1, POST_HANDLER_2])
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller({
          after: [POST_HANDLER_1, POST_HANDLER_2],
        })
        class MyController {
          @get('/myAction')
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
        const s = new ControllerRegistry();
        @controller()
        class MyController {
          @get('/myAction', {
            after: [POST_HANDLER_1, POST_HANDLER_2],
          })
          myAction() {}
        }
        s.addController(MyController);
        const routeReg = s.getService(TrieRouter).getService(RouteRegistry);
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
  });

  describe('hasController', function () {
    it('returns false if a given controller is not registered', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      expect(s.hasController(MyController)).to.be.false;
    });

    it('returns true if a given controller is registered', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      expect(s.hasController(MyController)).to.be.false;
      s.addController(MyController);
      expect(s.hasController(MyController)).to.be.true;
    });
  });
});
