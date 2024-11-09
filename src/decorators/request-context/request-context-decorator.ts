import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {RequestContext} from '@e22m4u/js-trie-router';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {RequestContextReflector} from './request-context-reflector.js';
import {RequestContextMetadata} from './request-context-metadata.js';

/**
 * Request context decorator.
 *
 * @param propertyOrMetadata
 */
export function requestContext<T extends object>(
  propertyOrMetadata?: keyof RequestContext | RequestContextMetadata,
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
    const metadata =
      typeof propertyOrMetadata !== 'object'
        ? {property: propertyOrMetadata}
        : propertyOrMetadata;
    RequestContextReflector.setMetadata(
      metadata,
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
