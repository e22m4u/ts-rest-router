import { Prototype } from '../../types.js';
import { Constructor } from '../../types.js';
import { AfterActionMetadata } from './after-action-metadata.js';
/**
 * After action decorator.
 *
 * @param hook
 */
export declare function afterAction<T extends object>(hook: AfterActionMetadata['hook']): (target: Constructor<T> | Prototype<T>, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
