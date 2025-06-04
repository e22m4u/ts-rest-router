import {NoUndef} from '../../types.js';
import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DataType} from '@e22m4u/ts-data-schema';
import {DataSchema} from '@e22m4u/ts-data-schema';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {RequestDataSource} from './request-data-metadata.js';
import {RequestDataMetadata} from './request-data-metadata.js';
import {RequestDataReflector} from './request-data-reflector.js';

/**
 * Request data options.
 */
export type RequestDataOptions = RequestDataMetadata;

/**
 * Request data decorator.
 *
 * @param options
 */
export function requestData<T extends object>(options: RequestDataOptions) {
  return function (target: Prototype<T>, propertyKey: string, index: number) {
    const decoratorType = getDecoratorTargetType(target, propertyKey, index);
    if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
      throw new Error(
        '@requestData decorator is only supported ' +
          'on an instance method parameter.',
      );
    RequestDataReflector.setMetadata(
      options,
      target.constructor as Constructor<T>,
      index,
      propertyKey,
    );
  };
}

/**
 * Create request data decorator with source.
 *
 * @param source
 * @param defaultType
 */
function createRequestDataDecoratorWithSource(
  source: RequestDataSource,
  defaultType: DataType,
) {
  return function (schemaOrType?: DataSchema | DataType) {
    let schema: DataSchema;
    if (typeof schemaOrType === 'object') {
      schema = schemaOrType;
    } else if (typeof schemaOrType === 'string') {
      schema = {type: schemaOrType};
    } else {
      schema = {type: defaultType};
    }
    return requestData({schema, source});
  };
}

/**
 * Create request data property decorator with source.
 *
 * @param source
 * @param defaultType
 */
function createRequestDataPropertyDecoratorWithSource(
  source: RequestDataSource,
  defaultType: DataType,
) {
  return function (propertyKey: string, schemaOrType?: DataSchema | DataType) {
    const properties = {} as NoUndef<DataSchema['properties']>;
    const rootSchema: DataSchema = {type: DataType.OBJECT};
    if (typeof schemaOrType === 'object') {
      properties[propertyKey] = schemaOrType;
      rootSchema.properties = properties;
    } else if (typeof schemaOrType === 'string') {
      properties[propertyKey] = {type: schemaOrType};
      rootSchema.properties = properties;
    } else {
      properties[propertyKey] = {type: defaultType};
      rootSchema.properties = properties;
    }
    return requestData({
      source: source,
      schema: rootSchema,
      property: propertyKey,
    });
  };
}

/**
 * Decorator aliases.
 */
export const requestParams = createRequestDataDecoratorWithSource(
  RequestDataSource.PARAMS,
  DataType.OBJECT,
);
export const requestParam = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.PARAMS,
  DataType.STRING,
);
export const requestQueries = createRequestDataDecoratorWithSource(
  RequestDataSource.QUERY,
  DataType.OBJECT,
);
export const requestQuery = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.QUERY,
  DataType.STRING,
);
export const requestHeaders = createRequestDataDecoratorWithSource(
  RequestDataSource.HEADERS,
  DataType.OBJECT,
);
export const requestHeader = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.HEADERS,
  DataType.STRING,
);
export const requestCookies = createRequestDataDecoratorWithSource(
  RequestDataSource.COOKIE,
  DataType.OBJECT,
);
export const requestCookie = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.COOKIE,
  DataType.STRING,
);
export const requestBody = createRequestDataDecoratorWithSource(
  RequestDataSource.BODY,
  DataType.OBJECT,
);
export const requestField = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.BODY,
  DataType.ANY,
);
