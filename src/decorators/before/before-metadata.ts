import {MetadataKey} from '@e22m4u/ts-reflector';
import {RoutePreHandler} from '@e22m4u/js-trie-router';

/**
 * Before metadata.
 */
export type BeforeMetadata = {
  propertyKey?: string;
  middleware: RoutePreHandler | RoutePreHandler[];
};

/**
 * Before metadata key.
 */
export const BEFORE_METADATA_KEY = new MetadataKey<BeforeMetadata[]>(
  'beforeMetadataKey',
);
