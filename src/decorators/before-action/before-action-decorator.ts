import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {BeforeActionMetadata} from './before-action-metadata.js';
import {BeforeActionReflector} from './before-action-reflector.js';

/**
 * Before action decorator.
 *
 * @param middleware
 */
export function beforeAction<T extends object>(
  middleware: BeforeActionMetadata['middleware'],
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
      BeforeActionReflector.addMetadata({middleware}, target as Constructor<T>);
    } else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
      BeforeActionReflector.addMetadata(
        {propertyKey, middleware},
        target.constructor as Constructor<T>,
        propertyKey,
      );
    } else {
      throw new Error(
        '@beforeAction decorator is only supported on a class or an instance method.',
      );
    }
  };
}
