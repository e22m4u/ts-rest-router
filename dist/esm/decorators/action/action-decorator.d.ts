import { Flatten } from '../../types.js';
import { Prototype } from '../../types.js';
import { ActionMetadata } from './action-metadata.js';
/**
 * Action options.
 */
export type ActionOptions = Flatten<Omit<ActionMetadata, 'propertyKey'>>;
/**
 * Action decorator.
 *
 * @param options
 */
export declare function action<T extends object>(options: ActionOptions): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Action alias options.
 */
type ActionAliasOptions = Flatten<Omit<ActionOptions, 'method' | 'path'>>;
/**
 * Get decorator.
 *
 * @param path
 * @param options
 */
export declare const get: (path: string, options?: ActionAliasOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Post decorator.
 *
 * @param path
 * @param options
 */
export declare const post: (path: string, options?: ActionAliasOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Put decorator.
 *
 * @param path
 * @param options
 */
export declare const put: (path: string, options?: ActionAliasOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Patch decorator.
 *
 * @param path
 * @param options
 */
export declare const patch: (path: string, options?: ActionAliasOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Del decorator.
 *
 * @param path
 * @param options
 */
export declare const del: (path: string, options?: ActionAliasOptions) => (target: Prototype<object>, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
