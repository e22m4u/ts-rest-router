import { MetadataKey } from '@e22m4u/ts-reflector';
import { RequestContext } from '@e22m4u/js-trie-router';
/**
 * Request context metadata.
 */
export type RequestContextMetadata = {
    property?: keyof RequestContext;
};
/**
 * Request context metadata map.
 */
export type RequestContextMetadataMap = Map<number, RequestContextMetadata>;
/**
 * Request context metadata key.
 */
export declare const REQUEST_CONTEXT_METADATA_KEY: MetadataKey<RequestContextMetadataMap>;
