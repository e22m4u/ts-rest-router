import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { AfterActionReflector } from './after-action-reflector.js';
/**
 * After action decorator.
 *
 * @param hook
 */
export function afterAction(hook) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
            AfterActionReflector.addMetadata({ hook }, target);
        }
        else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
            AfterActionReflector.addMetadata({ propertyKey, hook }, target.constructor, propertyKey);
        }
        else {
            throw new Error('@afterAction decorator is only supported on a class or an instance method.');
        }
    };
}
