import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DataType} from '@e22m4u/ts-data-schema';
import {DataSchema} from '@e22m4u/ts-data-schema';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {ResponseBodyReflector} from './response-body-reflector.js';

/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export function responseBody<T extends object>(
  schemaOrType?: DataSchema | DataType,
) {
  return function (
    target: Prototype<T>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const decoratorType = getDecoratorTargetType(
      target,
      propertyKey,
      descriptor,
    );
    if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
      throw new Error(
        '@responseBody decorator is only supported on an instance method.',
      );
    let schema: DataSchema | undefined;
    if (typeof schemaOrType === 'object') {
      schema = schemaOrType;
    } else if (typeof schemaOrType === 'string') {
      schema = {type: schemaOrType};
    }
    ResponseBodyReflector.setMetadata(
      schema ? {schema} : {},
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
