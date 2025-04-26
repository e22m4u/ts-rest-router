import { MetadataKey } from '@e22m4u/ts-reflector';
import { DataSchema } from '@e22m4u/ts-data-schema';
/**
 * Request data source.
 */
export declare enum RequestDataSource {
    PARAMS = "params",
    QUERY = "query",
    HEADERS = "headers",
    COOKIE = "cookie",
    BODY = "body"
}
/**
 * Request data metadata.
 */
export type RequestDataMetadata = {
    source: RequestDataSource;
    schema?: DataSchema;
    property?: string;
};
/**
 * Request data metadata map.
 */
export type RequestDataMetadataMap = Map<number, RequestDataMetadata>;
/**
 * Request data metadata key.
 */
export declare const REQUEST_DATA_METADATA_KEY: MetadataKey<RequestDataMetadataMap>;
