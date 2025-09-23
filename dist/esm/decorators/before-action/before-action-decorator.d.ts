import { Prototype } from '../../types.js';
import { Constructor } from '../../types.js';
import { BeforeActionMetadata } from './before-action-metadata.js';
/**
 * Before action decorator.
 *
 * @param hook
 */
export declare function beforeAction<T extends object>(hook: BeforeActionMetadata['hook']): (target: Constructor<T> | Prototype<T>, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
