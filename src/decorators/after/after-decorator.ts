import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {AfterMetadata} from './after-metadata.js';
import {AfterReflector} from './after-reflector.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * After decorator.
 *
 * @param options
 */
export function after<T extends object>(
  middleware: AfterMetadata['middleware'],
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
      AfterReflector.addMetadata({middleware}, target as Constructor<T>);
    } else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
      AfterReflector.addMetadata(
        {propertyKey, middleware},
        target.constructor as Constructor<T>,
        propertyKey,
      );
    } else {
      throw new Error(
        '@after decorator is only supported on a class or an instance method.',
      );
    }
  };
}
