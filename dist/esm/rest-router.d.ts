import { Constructor } from './types.js';
import { DebuggableService } from './debuggable-service.js';
import { RouterHookType, PostHandlerHook, PreHandlerHook } from '@e22m4u/js-trie-router';
import { ControllerRootOptions } from './controller-registry.js';
/**
 * Rest router.
 */
export declare class RestRouter extends DebuggableService {
    /**
     * Request listener.
     */
    get requestListener(): import("http").RequestListener;
    /**
     * Add controller.
     *
     * @param ctor
     * @param options
     */
    addController<T extends object>(ctor: Constructor<T>, options?: ControllerRootOptions): this;
    /**
     * Add hook.
     *
     * @param type
     * @param hook
     */
    addHook(type: typeof RouterHookType.PRE_HANDLER, hook: PreHandlerHook): this;
    /**
     * Add hook.
     *
     * @param type
     * @param hook
     */
    addHook(type: typeof RouterHookType.POST_HANDLER, hook: PostHandlerHook): this;
}
