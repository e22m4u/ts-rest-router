import { Prototype } from '../../types.js';
import { Constructor } from '../../types.js';
import { BeforeActionMetadata } from './before-action-metadata.js';
/**
 * Before action decorator.
 *
 * @param middleware
 */
export declare function beforeAction<T extends object>(middleware: BeforeActionMetadata['middleware']): (target: Constructor<T> | Prototype<T>, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
