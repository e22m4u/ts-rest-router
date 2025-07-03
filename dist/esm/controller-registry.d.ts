import { Constructor } from './types.js';
import { RouteHandler } from '@e22m4u/js-trie-router';
import { RoutePreHandler } from '@e22m4u/js-trie-router';
import { RoutePostHandler } from '@e22m4u/js-trie-router';
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
 * В данном Map ключом является контроллер, а значением
 * его опции, которые могут отсутствовать.
 */
export type ControllerRegistryMap = Map<Constructor<object>, ControllerRootOptions | undefined>;
/**
 * Controller registry.
 */
export declare class ControllerRegistry extends DebuggableService {
    /**
     * Controllers.
     */
    controllers: ControllerRegistryMap;
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
     * Get path prefix from controller root options.
     *
     * @param options
     */
    protected getPathPrefixFromControllerRootOptions(options?: ControllerRootOptions): string;
    /**
     * Get path prefix from controller metadata.
     *
     * @param ctor
     */
    protected getPathPrefixFromControllerMetadata<T>(ctor: Constructor<T>): string;
    /**
     * Getting pre-handlers from controller root options.
     *
     * @param options
     */
    protected getPreHandlersFromControllerRootOptions(options?: ControllerRootOptions): RouteHandler[];
    /**
     * Getting post-handlers from controller root options.
     *
     * @param options
     */
    protected getPostHandlersFromControllerRootOptions(options?: ControllerRootOptions): RoutePostHandler[];
    /**
     * Get pre-handlers from before metadata.
     *
     * @param ctor
     * @param actionName
     */
    protected getPreHandlersFromBeforeMetadata<T>(ctor: Constructor<T>, actionName?: string): RouteHandler[];
    /**
     * Get post-handlers from after metadata.
     *
     * @param ctor
     * @param actionName
     */
    protected getPostHandlersFromAfterMetadata<T>(ctor: Constructor<T>, actionName?: string): RoutePostHandler[];
    /**
     * Get pre-handlers from controller metadata.
     *
     * @param ctor
     */
    protected getPreHandlersFromControllerMetadata<T>(ctor: Constructor<T>): RouteHandler[];
    /**
     * Get post-handlers from controller metadata.
     *
     * @param ctor
     */
    protected getPostHandlersFromControllerMetadata<T>(ctor: Constructor<T>): RoutePostHandler[];
    /**
     * Get pre-handlers from action metadata.
     *
     * @param ctor
     * @param actionName
     */
    protected getPreHandlersFromActionMetadata<T>(ctor: Constructor<T>, actionName: string): RouteHandler[];
    /**
     * Get post-handlers from action metadata.
     *
     * @param ctor
     * @param actionName
     */
    protected getPostHandlersFromActionMetadata<T>(ctor: Constructor<T>, actionName: string): RoutePostHandler[];
    /**
     * Create route handler.
     *
     * @param controllerCtor
     * @param actionName
     * @protected
     */
    protected createRouteHandler<T extends object>(controllerCtor: Constructor<T>, actionName: string): RouteHandler;
}
