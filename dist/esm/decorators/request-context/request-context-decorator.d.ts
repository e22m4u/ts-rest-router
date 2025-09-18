import { Prototype } from '../../types.js';
import { RequestContext } from '@e22m4u/js-trie-router';
/**
 * Request context decorator.
 *
 * @param propertyName
 */
export declare function requestContext<T extends object>(propertyName?: keyof RequestContext): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * HttpRequest decorator.
 */
export declare function httpRequest(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * HttpResponse decorator.
 */
export declare function httpResponse(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * RequestContainer decorator.
 */
export declare function requestContainer(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
