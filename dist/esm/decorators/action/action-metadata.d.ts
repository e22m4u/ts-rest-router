import { MetadataKey } from '@e22m4u/ts-reflector';
import { HttpMethod } from '@e22m4u/js-trie-router';
import { RoutePreHandler } from '@e22m4u/js-trie-router';
import { RoutePostHandler } from '@e22m4u/js-trie-router';
/**
 * Action metadata.
 */
export type ActionMetadata = {
    propertyKey: string;
    method: HttpMethod;
    path: string;
    before?: RoutePreHandler | RoutePreHandler[];
    after?: RoutePostHandler | RoutePostHandler[];
    [option: string]: unknown | undefined;
};
/**
 * Action metadata map.
 */
export type ActionMetadataMap = Map<string, ActionMetadata>;
/**
 * Actions metadata key.
 */
export declare const ACTIONS_METADATA_KEY: MetadataKey<ActionMetadataMap>;