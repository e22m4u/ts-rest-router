import { MetadataKey } from '@e22m4u/ts-reflector';
import { DataSchema } from '@e22m4u/ts-data-schema';
/**
 * Response body metadata.
 */
export type ResponseBodyMetadata = {
    schema?: DataSchema;
};
/**
 * Response body metadata map.
 */
export type ResponseBodyMetadataMap = Map<string, ResponseBodyMetadata>;
/**
 * Response body metadata key.
 */
export declare const RESPONSE_BODY_METADATA_KEY: MetadataKey<ResponseBodyMetadataMap>;
