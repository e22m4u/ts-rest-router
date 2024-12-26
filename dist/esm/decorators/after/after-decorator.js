import { AfterReflector } from './after-reflector.js';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * After decorator.
 *
 * @param options
 */
export function after(middleware) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType === DecoratorTargetType.CONSTRUCTOR) {
            AfterReflector.addMetadata({ middleware }, target);
        }
        else if (decoratorType === DecoratorTargetType.INSTANCE_METHOD) {
            AfterReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
        }
        else {
            throw new Error('@after decorator is only supported on a class or an instance method.');
        }
    };
}
