import {expect} from 'chai';
import {controller} from './decorators/index.js';
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
      class Controller {}
      const res = s.addController(Controller);
      expect(res).to.be.eq(s);
    });

    it('adds a given controller to controllers set', function () {
      const s = new ControllerRegistry();
      @controller()
      class Controller {}
      expect(s.hasController(Controller)).to.be.false;
      s.addController(Controller);
      expect(s.hasController(Controller)).to.be.true;
    });
  });

  describe('hasController', function () {
    it('returns false if a given controller is not registered', function () {
      const s = new ControllerRegistry();
      @controller()
      class Controller {}
      expect(s.hasController(Controller)).to.be.false;
    });

    it('returns true if a given controller is registered', function () {
      const s = new ControllerRegistry();
      @controller()
      class Controller {}
      expect(s.hasController(Controller)).to.be.false;
      s.addController(Controller);
      expect(s.hasController(Controller)).to.be.true;
    });
  });

  describe('getPathPrefixByControllerMetadata', function () {
    it('returns an empty string if no prefix is specified', function () {
      const s = new ControllerRegistry();
      @controller()
      class Controller {}
      const md = ControllerReflector.getMetadata(Controller)!;
      const res = s.getPathPrefixByControllerMetadata(md);
      expect(res).to.be.eq('');
    });

    it('returns controller path prefix that starts with slash', function () {
      const s = new ControllerRegistry();
      @controller({path: 'myPrefix'})
      class Controller {}
      const md = ControllerReflector.getMetadata(Controller)!;
      const res = s.getPathPrefixByControllerMetadata(md);
      expect(res).to.be.eq('/myPrefix');
    });

    it('returns path prefix from options that starts with slash', function () {
      const s = new ControllerRegistry();
      @controller()
      class Controller {}
      const md = ControllerReflector.getMetadata(Controller)!;
      const res = s.getPathPrefixByControllerMetadata(md, {
        pathPrefix: 'myPrefix',
      });
      expect(res).to.be.eq('/myPrefix');
    });

    it('combines a path prefix from options and controller', function () {
      const s = new ControllerRegistry();
      @controller({path: 'controller'})
      class Controller {}
      const md = ControllerReflector.getMetadata(Controller)!;
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
      class Controller {}
      const md = ControllerReflector.getMetadata(Controller)!;
      const res = s.getPreHandlersByControllerMetadata(md);
      expect(res).to.be.eql([]);
    });

    describe('single handler', function () {
      it('returns pre-handlers from a given controller', function () {
        const s = new ControllerRegistry();
        @controller({
          before: PRE_HANDLER_1,
        })
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
        const res = s.getPreHandlersByControllerMetadata(md);
        expect(res).to.be.eql([PRE_HANDLER_1]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
        const res = s.getPreHandlersByControllerMetadata(md);
        expect(res).to.be.eql([PRE_HANDLER_1, PRE_HANDLER_2]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
      class Controller {}
      const md = ControllerReflector.getMetadata(Controller)!;
      const res = s.getPostHandlersByControllerMetadata(md);
      expect(res).to.be.eql([]);
    });

    describe('single handler', function () {
      it('returns pre-handlers from a given controller', function () {
        const s = new ControllerRegistry();
        @controller({
          after: POST_HANDLER_1,
        })
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
        const res = s.getPostHandlersByControllerMetadata(md);
        expect(res).to.be.eql([POST_HANDLER_1]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
        const res = s.getPostHandlersByControllerMetadata(md);
        expect(res).to.be.eql([POST_HANDLER_1, POST_HANDLER_2]);
      });

      it('returns pre-handlers from a given options', function () {
        const s = new ControllerRegistry();
        @controller()
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
        class Controller {}
        const md = ControllerReflector.getMetadata(Controller)!;
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
