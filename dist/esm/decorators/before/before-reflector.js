import { Reflector } from '@e22m4u/ts-reflector';
import { BEFORE_METADATA_KEY } from './before-metadata.js';
/**
 * Before reflector.
 */
export class BeforeReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static addMetadata(metadata, target, propertyKey) {
        const oldArray = Reflector.getOwnMetadata(BEFORE_METADATA_KEY, target, propertyKey) ?? [];
        const newArray = [metadata, ...oldArray];
        Reflector.defineMetadata(BEFORE_METADATA_KEY, newArray, target, propertyKey);
    }
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target, propertyKey) {
        const metadata = Reflector.getOwnMetadata(BEFORE_METADATA_KEY, target, propertyKey);
        return metadata ?? [];
    }
}
