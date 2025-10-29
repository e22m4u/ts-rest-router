import {Constructor} from './types.js';
import {DebuggableService} from './debuggable-service.js';

import {
  TrieRouter,
  RouterHook,
  HookType,
  PostHandlerHook,
  PreHandlerHook,
} from '@e22m4u/js-trie-router';

import {
  ControllerRegistry,
  ControllerRootOptions,
} from './controller-registry.js';

/**
 * Rest router.
 */
export class RestRouter extends DebuggableService {
  /**
   * Request listener.
   */
  get requestListener() {
    return this.getService(TrieRouter).requestListener;
  }

  /**
   * Add controller.
   *
   * @param ctor
   * @param options
   */
  addController<T extends object>(
    ctor: Constructor<T>,
    options?: ControllerRootOptions,
  ): this {
    this.getService(ControllerRegistry).addController(ctor, options);
    return this;
  }

  /**
   * Add hook.
   *
   * @param type
   * @param hook
   */
  addHook(type: typeof HookType.PRE_HANDLER, hook: PreHandlerHook): this;

  /**
   * Add hook.
   *
   * @param type
   * @param hook
   */
  addHook(type: typeof HookType.POST_HANDLER, hook: PostHandlerHook): this;

  /**
   * Add hook.
   *
   * @param type
   * @param hook
   */
  addHook(type: HookType, hook: RouterHook) {
    this.getService(TrieRouter).addHook(type, hook);
    return this;
  }
}
