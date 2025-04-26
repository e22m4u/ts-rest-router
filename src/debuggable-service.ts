import {Callable} from './types.js';
import {Debugger} from '@e22m4u/js-debug';
import {Service} from '@e22m4u/js-service';
import {toCamelCase} from './utils/index.js';
import {createDebugger} from '@e22m4u/js-debug';
import {ServiceContainer} from '@e22m4u/js-service';

/**
 * Service.
 */
export class DebuggableService extends Service {
  /**
   * Debug.
   */
  debug: Debugger;

  /**
   * Возвращает функцию-отладчик с сегментом пространства имен
   * указанного в параметре метода.
   *
   * @param method
   * @protected
   */
  protected getDebuggerFor(method: Callable) {
    return this.debug.withHash().withNs(method.name);
  }

  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container?: ServiceContainer) {
    super(container);
    const serviceName = toCamelCase(this.constructor.name);
    this.debug = createDebugger('tsRestRouter', serviceName);
    const debug = this.debug.withNs('constructor').withHash();
    debug('Service created.');
  }
}
