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
 */
function createRequestDataDecoratorWithSource(source: RequestDataSource) {
  return function () {
    const schema = {type: DataType.OBJECT};
    return requestData({schema, source});
  };
}

/**
 * Create request data property decorator with source.
 *
 * @param source
 */
function createRequestDataPropertyDecoratorWithSource(
  source: RequestDataSource,
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
      properties[propertyKey] = {type: DataType.ANY};
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
);
export const requestParam = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.PARAMS,
);
export const requestQueries = createRequestDataDecoratorWithSource(
  RequestDataSource.QUERY,
);
export const requestQuery = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.QUERY,
);
export const requestHeaders = createRequestDataDecoratorWithSource(
  RequestDataSource.HEADERS,
);
export const requestHeader = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.HEADERS,
);
export const requestCookies = createRequestDataDecoratorWithSource(
  RequestDataSource.COOKIE,
);
export const requestCookie = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.COOKIE,
);
export const requestField = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.BODY,
);

/**
 * Request body decorator.
 *
 * @param schemaOrType
 */
export function requestBody(schemaOrType?: DataSchema | DataType) {
  let schema: DataSchema;
  if (typeof schemaOrType === 'object') {
    schema = schemaOrType;
  } else if (typeof schemaOrType === 'string') {
    schema = {type: schemaOrType};
  } else {
    schema = {type: DataType.ANY};
  }
  return requestData({schema, source: RequestDataSource.BODY});
}
