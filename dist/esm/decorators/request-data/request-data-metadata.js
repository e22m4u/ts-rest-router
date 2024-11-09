import { MetadataKey } from '@e22m4u/ts-reflector';
/**
 * Request data source.
 */
export var RequestDataSource;
(function (RequestDataSource) {
    RequestDataSource["PARAMS"] = "params";
    RequestDataSource["QUERY"] = "query";
    RequestDataSource["HEADERS"] = "headers";
    RequestDataSource["COOKIE"] = "cookie";
    RequestDataSource["BODY"] = "body";
})(RequestDataSource || (RequestDataSource = {}));
/**
 * Request data metadata key.
 */
export const REQUEST_DATA_METADATA_KEY = new MetadataKey('requestDataMetadataKey');
