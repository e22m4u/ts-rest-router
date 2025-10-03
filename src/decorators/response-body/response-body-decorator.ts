import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {DataSchemaInput} from '../../data-schema-types.js';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {DataSchemaOrFactory} from '../../data-schema-types.js';
import {ResponseBodyReflector} from './response-body-reflector.js';

/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export function responseBody<T extends object>(schemaInput?: DataSchemaInput) {
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
    let schemaOrFactory: DataSchemaOrFactory | undefined;
    if (typeof schemaInput === 'function' || typeof schemaInput === 'object') {
      schemaOrFactory = schemaInput;
    } else if (typeof schemaInput === 'string') {
      schemaOrFactory = {type: schemaInput};
    }
    ResponseBodyReflector.setMetadata(
      schemaOrFactory ? {schema: schemaOrFactory} : {},
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
