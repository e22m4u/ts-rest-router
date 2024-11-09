import { Constructor } from '../../types.js';
import { ActionMetadata } from './action-metadata.js';
import { ActionMetadataMap } from './action-metadata.js';
/**
 * Action reflector.
 */
export declare class ActionReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: ActionMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): ActionMetadataMap;
}
