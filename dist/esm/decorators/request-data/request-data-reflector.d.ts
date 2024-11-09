import { Constructor } from '../../types.js';
import { RequestDataMetadata } from './request-data-metadata.js';
import { RequestDataMetadataMap } from './request-data-metadata.js';
/**
 * Request data reflector.
 */
export declare class RequestDataReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param index
     * @param propertyKey
     */
    static setMetadata(metadata: RequestDataMetadata, target: Constructor, index: number, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     * @param propertyKey
     */
    static getMetadata(target: Constructor, propertyKey: string): RequestDataMetadataMap;
}
