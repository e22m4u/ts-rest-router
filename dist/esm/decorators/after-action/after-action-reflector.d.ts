import { Constructor } from '../../types.js';
import { AfterActionMetadata } from './after-action-metadata.js';
/**
 * After action reflector.
 */
export declare class AfterActionReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static addMetadata(metadata: AfterActionMetadata, target: Constructor, propertyKey?: string): void;
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target: Constructor, propertyKey?: string): AfterActionMetadata[];
}
