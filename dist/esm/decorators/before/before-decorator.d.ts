import { Prototype } from '../../types.js';
import { Constructor } from '../../types.js';
import { BeforeMetadata } from './before-metadata.js';
/**
 * Before decorator.
 *
 * @param options
 */
export declare function before<T extends object>(middleware: BeforeMetadata['middleware']): (target: Constructor<T> | Prototype<T>, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
