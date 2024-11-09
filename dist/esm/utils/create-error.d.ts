import { Constructor } from '../types.js';
/**
 * Create error.
 *
 * @param {Function} errorCtor
 * @param {string} message
 * @param {*[]|undefined} args
 * @returns {object}
 */
export declare function createError<T>(errorCtor: Constructor<T>, message: string, ...args: unknown[]): T;
