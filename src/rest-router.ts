import {Constructor} from './types.js';
import {DebuggableService} from './debuggable-service.js';
import {ControllerRegistry} from './controller-registry.js';
import {ControllerRootOptions} from './controller-registry.js';

/**
 * Rest router.
 */
export class RestRouter extends DebuggableService {
  /**
   * Add controller.
   *
   * @param ctor
   * @param options
   */
  addController<T extends object>(
    ctor: Constructor<T>,
    options?: ControllerRootOptions,
  ): this {
    this.getService(ControllerRegistry).addController(ctor, options);
    return this;
  }
}
