import { Flatten } from '../../types.js';
import { Prototype } from '../../types.js';
import { RestActionMetadata } from './rest-action-metadata.js';
/**
 * Rest action options.
 */
export type RestActionOptions = Flatten<Omit<RestActionMetadata, 'propertyKey'>>;
/**
 * Rest action decorator.
 *
 * @param options
 */
export declare function restAction<T extends object>(options: RestActionOptions): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Rest action method options.
 */
export type RestActionMethodOptions = Flatten<Omit<RestActionOptions, 'method' | 'path'>>;
/**
 * Get action decorator.
 *
 * @param path
 * @param options
 */
export declare const getAction: (path: string, options?: RestActionMethodOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Post action decorator.
 *
 * @param path
 * @param options
 */
export declare const postAction: (path: string, options?: RestActionMethodOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Put action decorator.
 *
 * @param path
 * @param options
 */
export declare const putAction: (path: string, options?: RestActionMethodOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Patch action decorator.
 *
 * @param path
 * @param options
 */
export declare const patchAction: (path: string, options?: RestActionMethodOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Delete action decorator.
 *
 * @param path
 * @param options
 */
export declare const deleteAction: (path: string, options?: RestActionMethodOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
