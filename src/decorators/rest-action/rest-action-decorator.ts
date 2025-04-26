import {Flatten, PartialBy} from '../../types.js';
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
 */
type RestActionDecorator = ReturnType<typeof restAction>;

/**
 * Rest action decorator factory.
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
export type RestActionAliasOptions = Flatten<
  PartialBy<Omit<RestActionOptions, 'method'>, 'path'>
>;

/**
 * Get action decorator.
 */
export function getAction(): RestActionDecorator;
export function getAction(path: string): RestActionDecorator;
export function getAction(options: RestActionAliasOptions): RestActionDecorator;
export function getAction(
  path: string,
  options: RestActionAliasOptions,
): RestActionDecorator;
export function getAction(
  pathOrOptions?: string | RestActionAliasOptions,
  options?: RestActionAliasOptions,
) {
  let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
  options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
  if (typeof options === 'object' && !path && options.path != null)
    path = options.path;
  return restAction({...options, path, method: HttpMethod.GET});
}

/**
 * Post action decorator.
 */
export function postAction(): RestActionDecorator;
export function postAction(path: string): RestActionDecorator;
export function postAction(
  options: RestActionAliasOptions,
): RestActionDecorator;
export function postAction(
  path: string,
  options: RestActionAliasOptions,
): RestActionDecorator;
export function postAction(
  pathOrOptions?: string | RestActionAliasOptions,
  options?: RestActionAliasOptions,
) {
  let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
  options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
  if (typeof options === 'object' && !path && options.path != null)
    path = options.path;
  return restAction({...options, path, method: HttpMethod.POST});
}

/**
 * Put action decorator.
 */
export function putAction(): RestActionDecorator;
export function putAction(path: string): RestActionDecorator;
export function putAction(options: RestActionAliasOptions): RestActionDecorator;
export function putAction(
  path: string,
  options: RestActionAliasOptions,
): RestActionDecorator;
export function putAction(
  pathOrOptions?: string | RestActionAliasOptions,
  options?: RestActionAliasOptions,
) {
  let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
  options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
  if (typeof options === 'object' && !path && options.path != null)
    path = options.path;
  return restAction({...options, path, method: HttpMethod.PUT});
}

/**
 * Patch action decorator.
 */
export function patchAction(): RestActionDecorator;
export function patchAction(path: string): RestActionDecorator;
export function patchAction(
  options: RestActionAliasOptions,
): RestActionDecorator;
export function patchAction(
  path: string,
  options: RestActionAliasOptions,
): RestActionDecorator;
export function patchAction(
  pathOrOptions?: string | RestActionAliasOptions,
  options?: RestActionAliasOptions,
) {
  let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
  options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
  if (typeof options === 'object' && !path && options.path != null)
    path = options.path;
  return restAction({...options, path, method: HttpMethod.PATCH});
}

/**
 * Delete action decorator.
 */
export function deleteAction(): RestActionDecorator;
export function deleteAction(path: string): RestActionDecorator;
export function deleteAction(
  options: RestActionAliasOptions,
): RestActionDecorator;
export function deleteAction(
  path: string,
  options: RestActionAliasOptions,
): RestActionDecorator;
export function deleteAction(
  pathOrOptions?: string | RestActionAliasOptions,
  options?: RestActionAliasOptions,
) {
  let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
  options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
  if (typeof options === 'object' && !path && options.path != null)
    path = options.path;
  return restAction({...options, path, method: HttpMethod.DELETE});
}
