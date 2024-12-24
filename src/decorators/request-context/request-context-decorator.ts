import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {RequestContext} from '@e22m4u/js-trie-router';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {RequestContextReflector} from './request-context-reflector.js';

/**
 * Request context decorator.
 *
 * @param property
 */
export function requestContext<T extends object>(
  property?: keyof RequestContext,
) {
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
        '@requestContext decorator is only supported ' +
          'on an instance method parameter.',
      );
    RequestContextReflector.setMetadata(
      {property},
      target.constructor as Constructor<T>,
      indexOrDescriptor,
      propertyKey,
    );
  };
}

/**
 * Request decorator.
 */
export function request() {
  return requestContext('req');
}

/**
 * Response decorator.
 */
export function response() {
  return requestContext('res');
}
