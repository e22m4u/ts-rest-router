import { Constructor } from '../../types.js';
import { ResponseBodyMetadata } from './response-body-metadata.js';
import { ResponseBodyMetadataMap } from './response-body-metadata.js';
/**
 * Response body reflector.
 */
export declare class ResponseBodyReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: ResponseBodyMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): ResponseBodyMetadataMap;
}
