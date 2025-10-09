import { Constructor } from './types.js';
import { HookType } from '@e22m4u/js-trie-router';
import { RouterHook } from '@e22m4u/js-trie-router';
import { DebuggableService } from './debuggable-service.js';
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
    addHook(type: HookType, hook: RouterHook): this;
}
