import { Flatten } from '../../types.js';
import { Constructor } from '../../types.js';
import { ControllerMetadata } from './controller-metadata.js';
/**
 * Controller options.
 */
export type ControllerOptions = Flatten<Omit<ControllerMetadata, 'className'>>;
/**
 * Controller decorator.
 *
 * @param pathOrOptions
 * @param options
 */
export declare function controller<T extends object>(pathOrOptions?: string | ControllerOptions, options?: ControllerOptions): (target: Constructor<T>) => void;
