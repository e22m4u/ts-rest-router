import {Flatten} from '../../types.js';
import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {HttpMethod} from '@e22m4u/js-trie-router';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {RestActionMetadata} from './rest-action-metadata.js';
import {RestActionReflector} from './rest-action-reflector.js';

/**
 * Rest action options.
 */
export type RestActionOptions = Flatten<
  Omit<RestActionMetadata, 'propertyKey'>
>;

/**
 * Rest action decorator.
 *
 * @param options
 */
export function restAction<T extends object>(options: RestActionOptions) {
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
        '@restAction decorator is only supported on an instance method.',
      );
    RestActionReflector.setMetadata(
      {...options, propertyKey},
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}

/**
 * Rest action method options.
 */
export type RestActionMethodOptions = Flatten<
  Omit<RestActionOptions, 'method' | 'path'>
>;

/**
 * Get action decorator.
 *
 * @param path
 * @param options
 */
export const getAction = (path: string, options?: RestActionMethodOptions) => {
  return restAction({...options, path, method: HttpMethod.GET});
};

/**
 * Post action decorator.
 *
 * @param path
 * @param options
 */
export const postAction = (path: string, options?: RestActionMethodOptions) => {
  return restAction({...options, path, method: HttpMethod.POST});
};

/**
 * Put action decorator.
 *
 * @param path
 * @param options
 */
export const putAction = (path: string, options?: RestActionMethodOptions) => {
  return restAction({...options, path, method: HttpMethod.PUT});
};

/**
 * Patch action decorator.
 *
 * @param path
 * @param options
 */
export const patchAction = (
  path: string,
  options?: RestActionMethodOptions,
) => {
  return restAction({...options, path, method: HttpMethod.PATCH});
};

/**
 * Delete action decorator.
 *
 * @param path
 * @param options
 */
export const deleteAction = (
  path: string,
  options?: RestActionMethodOptions,
) => {
  return restAction({...options, path, method: HttpMethod.DELETE});
};
