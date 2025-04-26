import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {AfterActionMetadata} from './after-action-metadata.js';
import {AfterActionReflector} from './after-action-reflector.js';

/**
 * After action decorator.
 *
 * @param middleware
 */
export function afterAction<T extends object>(
  middleware: AfterActionMetadata['middleware'],
) {
  return function (
    target: Constructor<T> | Prototype<T>,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) {
    const decoratorType = getDecoratorTargetType(
      target,
      propertyKey,
      descriptor,
    );
    if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
      AfterActionReflector.addMetadata({middleware}, target as Constructor<T>);
    } else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
      AfterActionReflector.addMetadata(
        {propertyKey, middleware},
        target.constructor as Constructor<T>,
        propertyKey,
      );
    } else {
      throw new Error(
        '@afterAction decorator is only supported on a class or an instance method.',
      );
    }
  };
}
