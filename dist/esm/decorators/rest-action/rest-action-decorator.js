import { HttpMethod } from '@e22m4u/js-trie-router';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { RestActionReflector } from './rest-action-reflector.js';
/**
 * Rest action decorator.
 *
 * @param options
 */
export function restAction(options) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@restAction decorator is only supported on an instance method.');
        RestActionReflector.setMetadata({ ...options, propertyKey }, target.constructor, propertyKey);
    };
}
/**
 * Get action decorator.
 *
 * @param path
 * @param options
 */
export const getAction = (path, options) => {
    return restAction({ ...options, path, method: HttpMethod.GET });
};
/**
 * Post action decorator.
 *
 * @param path
 * @param options
 */
export const postAction = (path, options) => {
    return restAction({ ...options, path, method: HttpMethod.POST });
};
/**
 * Put action decorator.
 *
 * @param path
 * @param options
 */
export const putAction = (path, options) => {
    return restAction({ ...options, path, method: HttpMethod.PUT });
};
/**
 * Patch action decorator.
 *
 * @param path
 * @param options
 */
export const patchAction = (path, options) => {
    return restAction({ ...options, path, method: HttpMethod.PATCH });
};
/**
 * Delete action decorator.
 *
 * @param path
 * @param options
 */
export const deleteAction = (path, options) => {
    return restAction({ ...options, path, method: HttpMethod.DELETE });
};
