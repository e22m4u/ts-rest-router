import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { AfterActionReflector } from './after-action-reflector.js';
/**
 * After action decorator.
 *
 * @param middleware
 */
export function afterAction(middleware) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
            AfterActionReflector.addMetadata({ middleware }, target);
        }
        else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
            AfterActionReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
        }
        else {
            throw new Error('@afterAction decorator is only supported on a class or an instance method.');
        }
    };
}
