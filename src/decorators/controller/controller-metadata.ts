import {RoutePreHandler} from '@e22m4u/js-trie-router';
import {RoutePostHandler} from '@e22m4u/js-trie-router';
import {MetadataKey} from '@e22m4u/ts-reflector';

/**
 * Controller metadata.
 */
export type ControllerMetadata = {
  className: string;
  path?: string;
  before?: RoutePreHandler | RoutePreHandler[];
  after?: RoutePostHandler | RoutePostHandler[];
  [option: string]: unknown | undefined;
};

/**
 * Controller metadata key.
 */
export const CONTROLLER_METADATA_KEY = new MetadataKey<ControllerMetadata>(
  'controllerMetadataKey',
);
