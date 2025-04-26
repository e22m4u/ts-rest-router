import {MetadataKey} from '@e22m4u/ts-reflector';
import {RoutePreHandler} from '@e22m4u/js-trie-router';
import {RoutePostHandler} from '@e22m4u/js-trie-router';

/**
 * Rest controller metadata.
 */
export type RestControllerMetadata = {
  className: string;
  path?: string;
  before?: RoutePreHandler | RoutePreHandler[];
  after?: RoutePostHandler | RoutePostHandler[];
};

/**
 * Rest controller metadata key.
 */
export const REST_CONTROLLER_METADATA_KEY =
  new MetadataKey<RestControllerMetadata>('restControllerMetadataKey');
