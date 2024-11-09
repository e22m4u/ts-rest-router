import {expect} from 'chai';
import {get} from './decorators/index.js';
import {post} from './decorators/index.js';
import {HookName} from '@e22m4u/js-trie-router';
import {controller} from './decorators/index.js';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {RouteRegistry} from '@e22m4u/js-trie-router';
import {createRequestMock} from '@e22m4u/js-trie-router';
import {ControllerReflector} from './decorators/index.js';
import {ControllerRegistry} from './controller-registry.js';

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

    it('passes action method and path of a given controller to the route', function () {
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

    it('creates routes for multiple actions of a given controller', function () {
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

    describe('single pre-handler', function () {
      it('passes pre-handler of a given options to the route', function () {
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

      it('passes pre-handler of a given controller to the route', function () {
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

      it('passes action pre-handler of a given controller to the route', function () {
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
      it('passes pre-handlers of a given options to the route', function () {
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

      it('passes pre-handlers of a given controller to the route', function () {
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

      it('passes action pre-handlers of a given controller to the route', function () {
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
      it('passes post-handler of a given options to the route', function () {
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

      it('passes post-handler of a given controller to the route', function () {
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

      it('passes action post-handler of a given controller to the route', function () {
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
      it('passes post-handlers of a given options to the route', function () {
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

      it('passes post-handlers of a given controller to the route', function () {
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

      it('passes action post-handlers of a given controller to the route', function () {
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

  describe('getPathPrefixByControllerMetadata', function () {
    it('returns an empty string if no prefix is specified', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      const md = ControllerReflector.getMetadata(MyController)!;
      const res = s.getPathPrefixByControllerMetadata(md);
      expect(res).to.be.eq('');
    });

    it('returns controller path prefix that starts with slash', function () {
      const s = new ControllerRegistry();
      @controller({path: 'myPrefix'})
      class MyController {}
      const md = ControllerReflector.getMetadata(MyController)!;
      const res = s.getPathPrefixByControllerMetadata(md);
      expect(res).to.be.eq('/myPrefix');
    });

    it('returns path prefix from options that starts with slash', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      const md = ControllerReflector.getMetadata(MyController)!;
      const res = s.getPathPrefixByControllerMetadata(md, {
        pathPrefix: 'myPrefix',
      });
      expect(res).to.be.eq('/myPrefix');
    });

    it('combines a path prefix from options and controller', function () {
      const s = new ControllerRegistry();
      @controller({path: 'controller'})
      class MyController {}
      const md = ControllerReflector.getMetadata(MyController)!;
      const res = s.getPathPrefixByControllerMetadata(md, {
        pathPrefix: 'root',
      });
      expect(res).to.be.eq('/root/controller');
    });
  });

  describe('getPreHandlersByControllerMetadata', function () {
    it('returns an empty array if no handlers are specified', function () {
      const s = new ControllerRegistry();
      @controller()
      class MyController {}
      const md = ControllerReflector.getMetadata(MyController)!;
      const res = s.getPreHandlersByControllerMetadata(md);
      expect(res).to.be.eql([]);
    });

    describe('single handler', function () {
      it('returns pre-handlers from a given controller', function () {
        const s = new ControllerRegistry();
        @controller({
          before: PRE_HANDLER_1,
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPreHandlersByControllerMetadata(md);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPreHandlersByControllerMetadata(md, {
          before: PRE_HANDLER_1,
        });
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('combines pre-handlers from a given options and controller', function () {
        const s = new ControllerRegistry();
        @controller({
          before: PRE_HANDLER_2,
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPreHandlersByControllerMetadata(md, {
          before: PRE_HANDLER_1,
        });
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });
    });

    describe('multiple handlers', function () {
      it('returns pre-handlers from a given controller', function () {
        const s = new ControllerRegistry();
        @controller({
          before: [PRE_HANDLER_1, PRE_HANDLER_2],
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPreHandlersByControllerMetadata(md);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPreHandlersByControllerMetadata(md, {
          before: [PRE_HANDLER_1, PRE_HANDLER_2],
        });
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('combines pre-handlers from a given options and controller', function () {
        const s = new ControllerRegistry();
        @controller({
          before: [PRE_HANDLER_3, PRE_HANDLER_4],
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
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
      @controller()
      class MyController {}
      const md = ControllerReflector.getMetadata(MyController)!;
      const res = s.getPostHandlersByControllerMetadata(md);
      expect(res).to.be.eql([]);
    });

    describe('single handler', function () {
      it('returns pre-handlers from a given controller', function () {
        const s = new ControllerRegistry();
        @controller({
          after: POST_HANDLER_1,
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPostHandlersByControllerMetadata(md);
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPostHandlersByControllerMetadata(md, {
          after: POST_HANDLER_1,
        });
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('combines pre-handlers from a given options and controller', function () {
        const s = new ControllerRegistry();
        @controller({
          after: POST_HANDLER_2,
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPostHandlersByControllerMetadata(md, {
          after: POST_HANDLER_1,
        });
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });
    });

    describe('multiple handlers', function () {
      it('returns pre-handlers from a given controller', function () {
        const s = new ControllerRegistry();
        @controller({
          after: [POST_HANDLER_1, POST_HANDLER_2],
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPostHandlersByControllerMetadata(md);
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
        const res = s.getPostHandlersByControllerMetadata(md, {
          after: [POST_HANDLER_1, POST_HANDLER_2],
        });
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('combines pre-handlers from a given options and controller', function () {
        const s = new ControllerRegistry();
        @controller({
          after: [POST_HANDLER_3, POST_HANDLER_4],
        })
        class MyController {}
        const md = ControllerReflector.getMetadata(MyController)!;
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
