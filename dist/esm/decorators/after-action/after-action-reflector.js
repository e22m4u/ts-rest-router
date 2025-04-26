import { Reflector } from '@e22m4u/ts-reflector';
import { AFTER_ACTION_METADATA_KEY } from './after-action-metadata.js';
/**
 * After action reflector.
 */
export class AfterActionReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static addMetadata(metadata, target, propertyKey) {
        const oldArray = Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, target, propertyKey) ?? [];
        const newArray = [metadata, ...oldArray];
        Reflector.defineMetadata(AFTER_ACTION_METADATA_KEY, newArray, target, propertyKey);
    }
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target, propertyKey) {
        const metadata = Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, target, propertyKey);
        return metadata ?? [];
    }
}
