import { Constructor } from '../../types.js';
import { RestActionMetadata } from './rest-action-metadata.js';
import { RestActionMetadataMap } from './rest-action-metadata.js';
/**
 * Rest action reflector.
 */
export declare class RestActionReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: RestActionMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): RestActionMetadataMap;
}
