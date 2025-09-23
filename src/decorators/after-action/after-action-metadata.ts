import {MetadataKey} from '@e22m4u/ts-reflector';
import {RoutePostHandler} from '@e22m4u/js-trie-router';

/**
 * After action metadata.
 */
export type AfterActionMetadata = {
  propertyKey?: string;
  hook: RoutePostHandler | RoutePostHandler[];
};

/**
 * After action metadata key.
 */
export const AFTER_ACTION_METADATA_KEY = new MetadataKey<AfterActionMetadata[]>(
  'afterActionMetadataKey',
);
