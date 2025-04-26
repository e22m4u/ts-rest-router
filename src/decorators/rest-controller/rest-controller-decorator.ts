import {Flatten} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {RestControllerMetadata} from './rest-controller-metadata.js';
import {RestControllerReflector} from './rest-controller-reflector.js';

/**
 * Rest controller options.
 */
export type RestControllerOptions = Flatten<
  Omit<RestControllerMetadata, 'className'>
>;

/**
 * Rest controller decorator.
 *
 * @param pathOrOptions
 * @param options
 */
export function restController<T extends object>(
  pathOrOptions?: string | RestControllerOptions,
  options?: RestControllerOptions,
) {
  return function (target: Constructor<T>) {
    const decoratorType = getDecoratorTargetType(target);
    if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
      throw new Error(
        '@restController decorator is only supported on a class.',
      );
    // если первый аргумент является строкой,
    // то значение используется в качестве
    // базового пути контроллера
    if (typeof pathOrOptions === 'string') {
      // если второй аргумент не определен,
      // то создается новый объект опций,
      // который включает базовый путь
      if (!options) {
        options = {path: pathOrOptions};
      }
      // если второй аргумент определен,
      // то базовый путь из первого аргумента
      // передается в объект опций декоратора
      else {
        options.path = pathOrOptions;
      }
    }
    // если первый аргумент является объектом,
    // то его значение используется в качестве
    // объекта опций декоратора, а второй
    // аргумент игнорируется
    else if (typeof pathOrOptions === 'object') {
      options = pathOrOptions;
    }
    RestControllerReflector.setMetadata(
      {...options, className: target.name},
      target,
    );
  };
}
