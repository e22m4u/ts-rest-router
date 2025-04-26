import { HttpMethod } from '@e22m4u/js-trie-router';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { RestActionReflector } from './rest-action-reflector.js';
/**
 * Rest action decorator factory.
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
export function getAction(pathOrOptions, options) {
    let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
    options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
    if (typeof options === 'object' && !path && options.path != null)
        path = options.path;
    return restAction({ ...options, path, method: HttpMethod.GET });
}
export function postAction(pathOrOptions, options) {
    let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
    options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
    if (typeof options === 'object' && !path && options.path != null)
        path = options.path;
    return restAction({ ...options, path, method: HttpMethod.POST });
}
export function putAction(pathOrOptions, options) {
    let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
    options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
    if (typeof options === 'object' && !path && options.path != null)
        path = options.path;
    return restAction({ ...options, path, method: HttpMethod.PUT });
}
export function patchAction(pathOrOptions, options) {
    let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
    options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
    if (typeof options === 'object' && !path && options.path != null)
        path = options.path;
    return restAction({ ...options, path, method: HttpMethod.PATCH });
}
export function deleteAction(pathOrOptions, options) {
    let path = typeof pathOrOptions === 'string' ? pathOrOptions : '';
    options = typeof pathOrOptions === 'object' ? pathOrOptions : options;
    if (typeof options === 'object' && !path && options.path != null)
        path = options.path;
    return restAction({ ...options, path, method: HttpMethod.DELETE });
}
