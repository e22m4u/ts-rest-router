import { Constructor } from '../../types.js';
import { RequestContextMetadata } from './request-context-metadata.js';
import { RequestContextMetadataMap } from './request-context-metadata.js';
/**
 * Request context reflector.
 */
export declare class RequestContextReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param index
     * @param propertyKey
     */
    static setMetadata(metadata: RequestContextMetadata, target: Constructor, index: number, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target: Constructor, propertyKey: string): RequestContextMetadataMap;
}
