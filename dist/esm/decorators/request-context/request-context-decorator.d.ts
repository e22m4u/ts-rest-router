import { Prototype } from '../../types.js';
import { RequestContext } from '@e22m4u/js-trie-router';
import { RequestContextMetadata } from './request-context-metadata.js';
/**
 * Request context decorator.
 *
 * @param propertyOrMetadata
 */
export declare function requestContext<T extends object>(propertyOrMetadata?: keyof RequestContext | RequestContextMetadata): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * Request decorator.
 */
export declare function request(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * Response decorator.
 */
export declare function response(): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
