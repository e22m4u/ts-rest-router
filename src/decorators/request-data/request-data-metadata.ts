import {DataSchema} from '@e22m4u/ts-data-schema';
import {MetadataKey} from '@e22m4u/ts-reflector';

/**
 * Request data source.
 */
export enum RequestDataSource {
  PARAMS = 'params',
  QUERY = 'query',
  HEADERS = 'headers',
  COOKIE = 'cookie',
  BODY = 'body',
}

/**
 * Request data metadata.
 */
export type RequestDataMetadata = {
  source: RequestDataSource;
  schema?: DataSchema;
  property?: string;
  [option: string]: unknown | undefined;
}

/**
 * Request data metadata map.
 */
export type RequestDataMetadataMap = Map<number, RequestDataMetadata>;

/**
 * Request data metadata key.
 */
export const REQUEST_DATA_METADATA_KEY =
  new MetadataKey<RequestDataMetadataMap>('requestDataMetadataKey');
