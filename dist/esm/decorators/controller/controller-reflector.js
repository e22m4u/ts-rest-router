import { Reflector } from '@e22m4u/ts-reflector';
import { CONTROLLER_METADATA_KEY } from './controller-metadata.js';
/**
 * Controller reflector.
 */
export class ControllerReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata, target) {
        return Reflector.defineMetadata(CONTROLLER_METADATA_KEY, metadata, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        return Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, target);
    }
}
