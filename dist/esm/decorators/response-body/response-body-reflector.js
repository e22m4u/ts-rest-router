import { Reflector } from '@e22m4u/ts-reflector';
import { RESPONSE_BODY_METADATA_KEY } from './response-body-metadata.js';
/**
 * Response body reflector.
 */
export class ResponseBodyReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata, target, propertyKey) {
        const oldMap = Reflector.getOwnMetadata(RESPONSE_BODY_METADATA_KEY, target);
        const newMap = new Map(oldMap);
        newMap.set(propertyKey, metadata);
        Reflector.defineMetadata(RESPONSE_BODY_METADATA_KEY, newMap, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        const metadata = Reflector.getOwnMetadata(RESPONSE_BODY_METADATA_KEY, target);
        return metadata ?? new Map();
    }
}
