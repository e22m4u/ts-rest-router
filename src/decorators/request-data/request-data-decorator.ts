import {NoUndef} from '../../types.js';
import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DataType} from '@e22m4u/js-data-schema';
import {DataSchema} from '@e22m4u/js-data-schema';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {RequestDataSource} from './request-data-metadata.js';
import {RequestDataMetadata} from './request-data-metadata.js';
import {DataSchemaOrFactory} from '../../data-schema-types.js';
import {RequestDataReflector} from './request-data-reflector.js';
import {DataSchemaDecoratorInput} from '../../data-schema-types.js';

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
  return function (schemaInput?: DataSchemaDecoratorInput) {
    let schema: DataSchemaOrFactory;
    if (typeof schemaInput === 'function' || typeof schemaInput === 'object') {
      schema = schemaInput;
    } else if (typeof schemaInput === 'string') {
      schema = {type: schemaInput};
    } else {
      schema = {type: DataType.ANY};
    }
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
  return function (
    propertyKey: string,
    schemaInput?: DataSchemaDecoratorInput,
  ) {
    const rootSchema: DataSchema = {type: DataType.OBJECT};
    const properties = {} as NoUndef<DataSchema['properties']>;
    let schemaOrFactory: DataSchemaOrFactory = rootSchema;
    if (typeof schemaInput === 'function') {
      schemaOrFactory = container => {
        properties[propertyKey] = schemaInput(container);
        rootSchema.properties = properties;
        return rootSchema;
      };
    } else if (typeof schemaInput === 'object') {
      properties[propertyKey] = schemaInput;
      rootSchema.properties = properties;
    } else if (typeof schemaInput === 'string') {
      properties[propertyKey] = {type: schemaInput};
      rootSchema.properties = properties;
    } else {
      properties[propertyKey] = {type: DataType.ANY};
      rootSchema.properties = properties;
    }
    return requestData({
      source: source,
      schema: schemaOrFactory,
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
  RequestDataSource.COOKIES,
);
export const requestCookie = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.COOKIES,
);
export const requestBody = createRequestDataDecoratorWithSource(
  RequestDataSource.BODY,
);
export const requestField = createRequestDataPropertyDecoratorWithSource(
  RequestDataSource.BODY,
);
