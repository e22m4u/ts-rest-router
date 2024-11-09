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
 * @param options
 */
export declare function controller<T extends object>(options?: ControllerOptions): (target: Constructor<T>) => void;
