import { Flatten, PartialBy } from '../../types.js';
import { Prototype } from '../../types.js';
import { RestActionMetadata } from './rest-action-metadata.js';
/**
 * Rest action options.
 */
export type RestActionOptions = Flatten<Omit<RestActionMetadata, 'propertyKey'>>;
/**
 * Rest action decorator.
 */
type RestActionDecorator = ReturnType<typeof restAction>;
/**
 * Rest action decorator factory.
 *
 * @param options
 */
export declare function restAction<T extends object>(options: RestActionOptions): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Rest action method options.
 */
export type RestActionAliasOptions = Flatten<PartialBy<Omit<RestActionOptions, 'method'>, 'path'>>;
/**
 * Get action decorator.
 */
export declare function getAction(): RestActionDecorator;
export declare function getAction(path: string): RestActionDecorator;
export declare function getAction(options: RestActionAliasOptions): RestActionDecorator;
export declare function getAction(path: string, options: RestActionAliasOptions): RestActionDecorator;
/**
 * Post action decorator.
 */
export declare function postAction(): RestActionDecorator;
export declare function postAction(path: string): RestActionDecorator;
export declare function postAction(options: RestActionAliasOptions): RestActionDecorator;
export declare function postAction(path: string, options: RestActionAliasOptions): RestActionDecorator;
/**
 * Put action decorator.
 */
export declare function putAction(): RestActionDecorator;
export declare function putAction(path: string): RestActionDecorator;
export declare function putAction(options: RestActionAliasOptions): RestActionDecorator;
export declare function putAction(path: string, options: RestActionAliasOptions): RestActionDecorator;
/**
 * Patch action decorator.
 */
export declare function patchAction(): RestActionDecorator;
export declare function patchAction(path: string): RestActionDecorator;
export declare function patchAction(options: RestActionAliasOptions): RestActionDecorator;
export declare function patchAction(path: string, options: RestActionAliasOptions): RestActionDecorator;
/**
 * Delete action decorator.
 */
export declare function deleteAction(): RestActionDecorator;
export declare function deleteAction(path: string): RestActionDecorator;
export declare function deleteAction(options: RestActionAliasOptions): RestActionDecorator;
export declare function deleteAction(path: string, options: RestActionAliasOptions): RestActionDecorator;
export {};
