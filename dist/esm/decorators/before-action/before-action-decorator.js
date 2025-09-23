import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { BeforeActionReflector } from './before-action-reflector.js';
/**
 * Before action decorator.
 *
 * @param hook
 */
export function beforeAction(hook) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
            BeforeActionReflector.addMetadata({ hook }, target);
        }
        else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
            BeforeActionReflector.addMetadata({ propertyKey, hook }, target.constructor, propertyKey);
        }
        else {
            throw new Error('@beforeAction decorator is only supported on a class or an instance method.');
        }
    };
}
