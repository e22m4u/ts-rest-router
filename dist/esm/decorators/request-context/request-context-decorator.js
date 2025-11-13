import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { RequestContextReflector } from './request-context-reflector.js';
/**
 * Request context decorator.
 *
 * @param propertyName
 */
export function requestContext(propertyName) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
            throw new Error('@requestContext decorator is only supported ' +
                'on an instance method parameter.');
        RequestContextReflector.setMetadata({ property: propertyName }, target.constructor, indexOrDescriptor, propertyKey);
    };
}
/**
 * HttpRequest decorator.
 */
export function httpRequest() {
    return requestContext('request');
}
/**
 * HttpResponse decorator.
 */
export function httpResponse() {
    return requestContext('response');
}
/**
 * RequestContainer decorator.
 */
export function requestContainer() {
    return requestContext('container');
}
