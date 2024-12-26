import { Constructor } from '../../types.js';
import { BeforeMetadata } from './before-metadata.js';
/**
 * Before reflector.
 */
export declare class BeforeReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static addMetadata(metadata: BeforeMetadata, target: Constructor, propertyKey?: string): void;
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target: Constructor, propertyKey?: string): BeforeMetadata[];
}
