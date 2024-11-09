import { Reflector } from '@e22m4u/ts-reflector';
import { REQUEST_CONTEXT_METADATA_KEY } from './request-context-metadata.js';
/**
 * Request context reflector.
 */
export class RequestContextReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param index
     * @param propertyKey
     */
    static setMetadata(metadata, target, index, propertyKey) {
        const oldMap = Reflector.getOwnMetadata(REQUEST_CONTEXT_METADATA_KEY, target, propertyKey);
        const newMap = new Map(oldMap);
        newMap.set(index, metadata);
        Reflector.defineMetadata(REQUEST_CONTEXT_METADATA_KEY, newMap, target, propertyKey);
    }
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target, propertyKey) {
        const metadata = Reflector.getOwnMetadata(REQUEST_CONTEXT_METADATA_KEY, target, propertyKey);
        return metadata ?? new Map();
    }
}
