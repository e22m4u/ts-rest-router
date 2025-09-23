import { MetadataKey } from '@e22m4u/ts-reflector';
import { RoutePreHandler } from '@e22m4u/js-trie-router';
/**
 * Before action metadata.
 */
export type BeforeActionMetadata = {
    propertyKey?: string;
    hook: RoutePreHandler | RoutePreHandler[];
};
/**
 * Before action metadata key.
 */
export declare const BEFORE_ACTION_METADATA_KEY: MetadataKey<BeforeActionMetadata[]>;
