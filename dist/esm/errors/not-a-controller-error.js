import { Errorf } from '@e22m4u/js-format';
/**
 * Not a controller error.
 */
export class NotAControllerError extends Errorf {
    /**
     * Constructor.
     *
     * @param value
     */
    constructor(value) {
        super('%v is not a controller, do use @restController decorator on it.', value);
    }
}
