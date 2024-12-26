import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {BeforeMetadata} from './before-metadata.js';
import {BeforeReflector} from './before-reflector.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * Before decorator.
 *
 * @param options
 */
export function before<T extends object>(
  middleware: BeforeMetadata['middleware'],
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
      BeforeReflector.addMetadata({middleware}, target as Constructor<T>);
    } else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
      BeforeReflector.addMetadata(
        {propertyKey, middleware},
        target.constructor as Constructor<T>,
        propertyKey,
      );
    } else {
      throw new Error(
        '@before decorator is only supported on a class or an instance method.',
      );
    }
  };
}
