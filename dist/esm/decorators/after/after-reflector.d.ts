import { Constructor } from '../../types.js';
import { AfterMetadata } from './after-metadata.js';
/**
 * After reflector.
 */
export declare class AfterReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static addMetadata(metadata: AfterMetadata, target: Constructor, propertyKey?: string): void;
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target: Constructor, propertyKey?: string): AfterMetadata[];
}
