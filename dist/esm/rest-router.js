import { TrieRouter } from '@e22m4u/js-trie-router';
import { DebuggableService } from './debuggable-service.js';
import { ControllerRegistry } from './controller-registry.js';
/**
 * Rest router.
 */
export class RestRouter extends DebuggableService {
    /**
     * Request listener.
     */
    get requestListener() {
        return this.getService(TrieRouter).requestListener;
    }
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
