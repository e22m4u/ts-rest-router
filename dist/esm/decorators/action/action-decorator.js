import { HttpMethod } from '@e22m4u/js-trie-router';
import { ActionReflector } from './action-reflector.js';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Action decorator.
 *
 * @param options
 */
export function action(options) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@action decorator is only supported on an instance method.');
        ActionReflector.setMetadata({ ...options, propertyKey }, target.constructor, propertyKey);
    };
}
/**
 * Get decorator.
 *
 * @param path
 * @param options
 */
export const get = (path, options) => {
    return action({ ...options, path, method: HttpMethod.GET });
};
/**
 * Post decorator.
 *
 * @param path
 * @param options
 */
export const post = (path, options) => {
    return action({ ...options, path, method: HttpMethod.POST });
};
/**
 * Put decorator.
 *
 * @param path
 * @param options
 */
export const put = (path, options) => {
    return action({ ...options, path, method: HttpMethod.PUT });
};
/**
 * Patch decorator.
 *
 * @param path
 * @param options
 */
export const patch = (path, options) => {
    return action({ ...options, path, method: HttpMethod.PATCH });
};
/**
 * Del decorator.
 *
 * @param path
 * @param options
 */
export const del = (path, options) => {
    return action({ ...options, path, method: HttpMethod.DELETE });
};
