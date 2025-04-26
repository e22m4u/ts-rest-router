import { Constructor } from '../../types.js';
import { RestControllerMetadata } from './rest-controller-metadata.js';
/**
 * Rest controller reflector.
 */
export declare class RestControllerReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata: RestControllerMetadata, target: Constructor): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): RestControllerMetadata | undefined;
}
