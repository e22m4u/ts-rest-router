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
 * Request data decorator.
 *
 * @param metadata
 */
export function requestData<T extends object>(metadata: RequestDataMetadata) {
  return function (
    target: Prototype<T>,
    propertyKey: string,
    indexOrDescriptor: number,
  ) {
    const decoratorType = getDecoratorTargetType(
      target,
      propertyKey,
      indexOrDescriptor,
    );
    if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
      throw new Error(
        '@requestData decorator is only supported ' +
          'on an instance method parameter.',
      );
    RequestDataReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      indexOrDescriptor,
      propertyKey,
    );
  };
}

/**
 * Create data decorator.
 *
 * @param source
 */
function createDataDecorator(source: RequestDataSource) {
  return function() {
    const schema = {type: DataType.OBJECT};
    return requestData({schema, source});
  }
}

/**
 * Create property decorator.
 *
 * @param source
 */
function createPropertyDecorator(source: RequestDataSource) {
  return function(propertyKey: string, schemaOrType?: DataSchema | DataType) {
    const properties = {} as NoUndef<DataSchema['properties']>;
    const rootSchema: DataSchema = {type: DataType.OBJECT};
    if (typeof schemaOrType === 'object') {
      properties[propertyKey] = schemaOrType;
      rootSchema.properties = properties;
    } else if (typeof schemaOrType === 'string') {
      properties[propertyKey] = {type: schemaOrType};
      rootSchema.properties = properties;
    }
    return requestData({
      source: source,
      schema: rootSchema,
      property: propertyKey,
    });
  }
}

/**
 * Decorator aliases.
 */
export const params = createDataDecorator(RequestDataSource.PARAMS);
export const param = createPropertyDecorator(RequestDataSource.PARAMS);
export const queries = createDataDecorator(RequestDataSource.QUERY);
export const query = createPropertyDecorator(RequestDataSource.QUERY);
export const headers = createDataDecorator(RequestDataSource.HEADERS);
export const header = createPropertyDecorator(RequestDataSource.HEADERS);
export const cookies = createDataDecorator(RequestDataSource.COOKIE);
export const cookie = createPropertyDecorator(RequestDataSource.COOKIE);
export const bodyParam = createPropertyDecorator(RequestDataSource.BODY);

/**
 * Request body decorator.
 *
 * @param schemaOrType
 */
export function body(schemaOrType?: DataSchema | DataType) {
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
