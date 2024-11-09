import { Constructor } from './types.js';
import { RouteHandler } from '@e22m4u/js-trie-router';
import { RoutePreHandler } from '@e22m4u/js-trie-router';
import { RoutePostHandler } from '@e22m4u/js-trie-router';
import { ControllerMetadata } from './decorators/index.js';
import { DebuggableService } from './debuggable-service.js';
/**
 * Controller root options.
 */
export type ControllerRootOptions = {
    pathPrefix?: string;
    before?: RoutePreHandler | RoutePreHandler[];
    after?: RoutePostHandler | RoutePostHandler[];
};
/**
 * Controller registry.
 */
export declare class ControllerRegistry extends DebuggableService {
    /**
     * Controllers.
     */
    controllers: Set<unknown>;
    /**
     * Add controller.
     *
     * @param ctor
     * @param options
     */
    addController<T extends object>(ctor: Constructor<T>, options?: ControllerRootOptions): this;
    /**
     * Has controller.
     *
     * @param ctor
     */
    hasController<T extends object>(ctor: Constructor<T>): boolean;
    /**
     * Get path prefix by controller metadata.
     *
     * @param controllerMd
     * @param options
     */
    getPathPrefixByControllerMetadata(controllerMd: ControllerMetadata, options?: ControllerRootOptions): string;
    /**
     * Get pre-handlers by controller metadata.
     *
     * @param controllerMd
     * @param options
     */
    getPreHandlersByControllerMetadata(controllerMd: ControllerMetadata, options?: ControllerRootOptions): RouteHandler[];
    /**
     * Get post-handlers by controller metadata.
     *
     * @param controllerMd
     * @param options
     */
    getPostHandlersByControllerMetadata(controllerMd: ControllerMetadata, options?: ControllerRootOptions): RoutePostHandler[];
    /**
     * Create route handler.
     *
     * @param controllerCtor
     * @param actionName
     * @protected
     */
    createRouteHandler<T extends object>(controllerCtor: Constructor<T>, actionName: string): RouteHandler;
}
