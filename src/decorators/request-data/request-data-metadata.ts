import {MetadataKey} from '@e22m4u/ts-reflector';
import {DataSchemaOrFactory} from '../../data-schema-types.js';

/**
 * Request data source.
 */
export enum RequestDataSource {
  PARAMS = 'params',
  QUERY = 'query',
  HEADERS = 'headers',
  COOKIES = 'cookies',
  BODY = 'body',
}

/**
 * Request data metadata.
 */
export type RequestDataMetadata = {
  source: RequestDataSource;
  schema?: DataSchemaOrFactory;
  property?: string;
};

/**
 * Request data metadata map.
 */
export type RequestDataMetadataMap = Map<number, RequestDataMetadata>;

/**
 * Request data metadata key.
 */
export const REQUEST_DATA_METADATA_KEY =
  new MetadataKey<RequestDataMetadataMap>('requestDataMetadataKey');
