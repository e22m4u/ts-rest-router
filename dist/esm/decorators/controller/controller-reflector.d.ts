import { Constructor } from '../../types.js';
import { ControllerMetadata } from './controller-metadata.js';
/**
 * Controller reflector.
 */
export declare class ControllerReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata: ControllerMetadata, target: Constructor): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): ControllerMetadata | undefined;
}
