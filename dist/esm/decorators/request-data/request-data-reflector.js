import { Reflector } from '@e22m4u/ts-reflector';
import { REQUEST_DATA_METADATA_KEY } from './request-data-metadata.js';
/**
 * Request data reflector.
 */
export class RequestDataReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param index
     * @param propertyKey
     */
    static setMetadata(metadata, target, index, propertyKey) {
        const oldMap = Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
        const newMap = new Map(oldMap);
        newMap.set(index, metadata);
        Reflector.defineMetadata(REQUEST_DATA_METADATA_KEY, newMap, target, propertyKey);
    }
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target, propertyKey) {
        const metadata = Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
        return metadata ?? new Map();
    }
}
