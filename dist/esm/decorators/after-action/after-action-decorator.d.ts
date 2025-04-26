import { Prototype } from '../../types.js';
import { Constructor } from '../../types.js';
import { AfterActionMetadata } from './after-action-metadata.js';
/**
 * After action decorator.
 *
 * @param middleware
 */
export declare function afterAction<T extends object>(middleware: AfterActionMetadata['middleware']): (target: Constructor<T> | Prototype<T>, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
