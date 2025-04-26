import { Flatten } from '../../types.js';
import { Constructor } from '../../types.js';
import { RestControllerMetadata } from './rest-controller-metadata.js';
/**
 * Rest controller options.
 */
export type RestControllerOptions = Flatten<Omit<RestControllerMetadata, 'className'>>;
/**
 * Rest controller decorator.
 *
 * @param pathOrOptions
 * @param options
 */
export declare function restController<T extends object>(pathOrOptions?: string | RestControllerOptions, options?: RestControllerOptions): (target: Constructor<T>) => void;
