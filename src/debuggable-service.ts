import {ServiceContainer} from '@e22m4u/js-service';
import {DebuggableService as BaseDebuggableService} from '@e22m4u/js-service';

/**
 * Base debuggable service.
 */
export class DebuggableService extends BaseDebuggableService {
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container?: ServiceContainer) {
    super(container, {
      namespace: 'tsRestRouter',
      noEnvironmentNamespace: true,
    });
  }
}
