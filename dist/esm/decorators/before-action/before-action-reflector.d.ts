import { Constructor } from '../../types.js';
import { BeforeActionMetadata } from './before-action-metadata.js';
/**
 * Before action reflector.
 */
export declare class BeforeActionReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static addMetadata(metadata: BeforeActionMetadata, target: Constructor, propertyKey?: string): void;
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target: Constructor, propertyKey?: string): BeforeActionMetadata[];
}
