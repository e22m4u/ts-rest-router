import { format } from '@e22m4u/js-format';
/**
 * Create error.
 *
 * @param {Function} errorCtor
 * @param {string} message
 * @param {*[]|undefined} args
 * @returns {object}
 */
export function createError(errorCtor, message, ...args) {
    const interpolatedMessage = format(message, ...args);
    return new errorCtor(interpolatedMessage);
}
