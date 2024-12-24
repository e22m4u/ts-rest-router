import { Prototype } from '../../types.js';
import { RequestContext } from '@e22m4u/js-trie-router';
/**
 * Request context decorator.
 *
 * @param propertyName
 */
export declare function requestContext<T extends object>(propertyName?: keyof RequestContext): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * Request decorator.
 */
export declare function request(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * Response decorator.
 */
export declare function response(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
