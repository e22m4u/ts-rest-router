import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { RequestContextReflector } from './request-context-reflector.js';
/**
 * Request context decorator.
 *
 * @param propertyOrMetadata
 */
export function requestContext(propertyOrMetadata) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
            throw new Error('@requestContext decorator is only supported ' +
                'on an instance method parameter.');
        const metadata = typeof propertyOrMetadata !== 'object'
            ? { property: propertyOrMetadata }
            : propertyOrMetadata;
        RequestContextReflector.setMetadata(metadata, target.constructor, indexOrDescriptor, propertyKey);
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
