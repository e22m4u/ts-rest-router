import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { ControllerReflector } from './controller-reflector.js';
/**
 * Controller decorator.
 *
 * @param options
 */
export function controller(options) {
    return function (target) {
        const decoratorType = getDecoratorTargetType(target);
        if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
            throw new Error('@controller decorator is only supported on a class.');
        ControllerReflector.setMetadata({ ...options, className: target.name }, target);
    };
}
