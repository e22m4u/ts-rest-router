import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { BeforeActionReflector } from './before-action-reflector.js';
/**
 * Before action decorator.
 *
 * @param middleware
 */
export function beforeAction(middleware) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
            BeforeActionReflector.addMetadata({ middleware }, target);
        }
        else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
            BeforeActionReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
        }
        else {
            throw new Error('@beforeAction decorator is only supported on a class or an instance method.');
        }
    };
}
