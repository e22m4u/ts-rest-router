import { MetadataKey } from '@e22m4u/ts-reflector';
import { HttpMethod } from '@e22m4u/js-trie-router';
import { RoutePreHandler } from '@e22m4u/js-trie-router';
import { RoutePostHandler } from '@e22m4u/js-trie-router';
/**
 * Rest action metadata.
 */
export type RestActionMetadata = {
    propertyKey: string;
    method: HttpMethod;
    path: string;
    before?: RoutePreHandler | RoutePreHandler[];
    after?: RoutePostHandler | RoutePostHandler[];
};
/**
 * Rest action metadata map.
 */
export type RestActionMetadataMap = Map<string, RestActionMetadata>;
/**
 * Rest actions metadata key.
 */
export declare const REST_ACTIONS_METADATA_KEY: MetadataKey<RestActionMetadataMap>;
