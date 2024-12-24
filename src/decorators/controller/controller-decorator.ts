import {Flatten} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {ControllerMetadata} from './controller-metadata.js';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {ControllerReflector} from './controller-reflector.js';

/**
 * Controller options.
 */
export type ControllerOptions = Flatten<Omit<ControllerMetadata, 'className'>>;

/**
 * Controller decorator.
 *
 * @param options
 */
export function controller<T extends object>(options?: ControllerOptions) {
  return function (target: Constructor<T>) {
    const decoratorType = getDecoratorTargetType(target);
    if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
      throw new Error('@controller decorator is only supported on a class.');
    ControllerReflector.setMetadata(
      {...options, className: target.name},
      target,
    );
  };
}
