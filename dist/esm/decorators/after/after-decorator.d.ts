import { Prototype } from '../../types.js';
import { Constructor } from '../../types.js';
import { AfterMetadata } from './after-metadata.js';
/**
 * After decorator.
 *
 * @param options
 */
export declare function after<T extends object>(middleware: AfterMetadata['middleware']): (target: Constructor<T> | Prototype<T>, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
