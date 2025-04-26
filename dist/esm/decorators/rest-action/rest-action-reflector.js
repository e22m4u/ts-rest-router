import { Reflector } from '@e22m4u/ts-reflector';
import { REST_ACTIONS_METADATA_KEY } from './rest-action-metadata.js';
/**
 * Rest action reflector.
 */
export class RestActionReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata, target, propertyKey) {
        const oldMap = Reflector.getOwnMetadata(REST_ACTIONS_METADATA_KEY, target);
        const newMap = new Map(oldMap);
        newMap.set(propertyKey, metadata);
        Reflector.defineMetadata(REST_ACTIONS_METADATA_KEY, newMap, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        const metadata = Reflector.getOwnMetadata(REST_ACTIONS_METADATA_KEY, target);
        return metadata ?? new Map();
    }
}
