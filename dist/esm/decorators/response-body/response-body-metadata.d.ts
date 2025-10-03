import { MetadataKey } from '@e22m4u/ts-reflector';
import { DataSchemaOrFactory } from '../../data-schema-types.js';
/**
 * Response body metadata.
 */
export type ResponseBodyMetadata = {
    schema?: DataSchemaOrFactory;
};
/**
 * Response body metadata map.
 */
export type ResponseBodyMetadataMap = Map<string, ResponseBodyMetadata>;
/**
 * Response body metadata key.
 */
export declare const RESPONSE_BODY_METADATA_KEY: MetadataKey<ResponseBodyMetadataMap>;
