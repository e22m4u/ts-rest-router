import {MetadataKey} from '@e22m4u/ts-reflector';
import {RequestContext} from '@e22m4u/js-trie-router';

/**
 * Request context metadata.
 */
export type RequestContextMetadata = {
  property?: keyof RequestContext;
  [option: string]: unknown | undefined;
};

/**
 * Request context metadata map.
 */
export type RequestContextMetadataMap = Map<number, RequestContextMetadata>;

/**
 * Request context metadata key.
 */
export const REQUEST_CONTEXT_METADATA_KEY =
  new MetadataKey<RequestContextMetadataMap>('requestContextMetadataKey');
