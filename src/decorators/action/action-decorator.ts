import {Flatten} from '../../types.js';
import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {ActionMetadata} from './action-metadata.js';
import {ActionReflector} from './action-reflector.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * Action options.
 */
export type ActionOptions = Flatten<Omit<ActionMetadata, 'propertyKey'>>;

/**
 * Action decorator.
 *
 * @param options
 */
export function action<T extends object>(options: ActionOptions) {
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
        '@action decorator is only supported on an instance method.',
      );
    const metadata = {
      ...options,
      propertyKey,
    } as ActionMetadata;
    ActionReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}

/**
 * Get decorator.
 *
 * @param options
 */
export const get = (options: Omit<ActionOptions, 'method'>) => action({
  ...options,
  method: HttpMethod.GET,
});

/**
 * Post decorator.
 *
 * @param options
 */
export const post = (options: Omit<ActionOptions, 'method'>) => action({
  ...options,
  method: HttpMethod.POST,
});

/**
 * Put decorator.
 *
 * @param options
 */
export const put = (options: Omit<ActionOptions, 'method'>) => action({
  ...options,
  method: HttpMethod.PUT,
});

/**
 * Patch decorator.
 *
 * @param options
 */
export const patch = (options: Omit<ActionOptions, 'method'>) => action({
  ...options,
  method: HttpMethod.PATCH,
});

/**
 * Del decorator.
 *
 * @param options
 */
export const del = (options: Omit<ActionOptions, 'method'>) => action({
  ...options,
  method: HttpMethod.DELETE,
});