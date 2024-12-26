import { BeforeReflector } from './before-reflector.js';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Before decorator.
 *
 * @param options
 */
export function before(middleware) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
            BeforeReflector.addMetadata({ middleware }, target);
        }
        else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
            BeforeReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
        }
        else {
            throw new Error('@before decorator is only supported on a class or an instance method.');
        }
    };
}
