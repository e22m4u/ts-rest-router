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
    ActionReflector.setMetadata(
      {...options, propertyKey},
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}

/**
 * Action method options.
 */
export type ActionMethodOptions = Flatten<
  Omit<ActionOptions, 'method' | 'path'>
>;

/**
 * Get decorator.
 *
 * @param path
 * @param options
 */
export const get = (path: string, options?: ActionMethodOptions) => {
  return action({...options, path, method: HttpMethod.GET});
};

/**
 * Post decorator.
 *
 * @param path
 * @param options
 */
export const post = (path: string, options?: ActionMethodOptions) => {
  return action({...options, path, method: HttpMethod.POST});
};

/**
 * Put decorator.
 *
 * @param path
 * @param options
 */
export const put = (path: string, options?: ActionMethodOptions) => {
  return action({...options, path, method: HttpMethod.PUT});
};

/**
 * Patch decorator.
 *
 * @param path
 * @param options
 */
export const patch = (path: string, options?: ActionMethodOptions) => {
  return action({...options, path, method: HttpMethod.PATCH});
};

/**
 * Del decorator.
 *
 * @param path
 * @param options
 */
export const del = (path: string, options?: ActionMethodOptions) => {
  return action({...options, path, method: HttpMethod.DELETE});
};
