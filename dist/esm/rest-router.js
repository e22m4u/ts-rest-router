import { DebuggableService } from './debuggable-service.js';
import { ControllerRegistry } from './controller-registry.js';
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
    addController(ctor, options) {
        this.getService(ControllerRegistry).addController(ctor, options);
        return this;
    }
}
