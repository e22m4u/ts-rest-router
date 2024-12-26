import { MetadataKey } from '@e22m4u/ts-reflector';
import { RoutePostHandler } from '@e22m4u/js-trie-router';
/**
 * After metadata.
 */
export type AfterMetadata = {
    propertyKey?: string;
    middleware: RoutePostHandler | RoutePostHandler[];
};
/**
 * After metadata key.
 */
export declare const AFTER_METADATA_KEY: MetadataKey<AfterMetadata[]>;
