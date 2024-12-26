/**
 * Debugger.
 */
export type Debugger = (messageOrData: string | unknown, ...args: any[]) => void;
/**
 * Create debugger.
 *
 * Base usage:
 * ```ts
 * const debug = createDebugger('myService');
 * debug('Service created.');
 * // ujut:myService Service created.
 * ```
 *
 * Nested namespaces:
 * ```ts
 * const debug1 = debug.bind('namespace1');
 * const debug2 = debug.bind('namespace2');
 * debug1('Application started');    // ujut:myService [namespace1] Application started
 * debug2('Connection established'); // ujut:myService [namespace2] Connection established
 * ```
 *
 * Value inspection:
 * ```ts
 * debug({foo: 'lorem', bar: 'ipsum'})
 * // ujut:myService {
 * // ujut:myService   "foo": "lorem",
 * // ujut:myService   "bar": "ipsum"
 * // ujut:myService }
 * ```
 *
 * Titled inspection output:
 * ```ts
 * debug({foo: 'lorem', bar: 'ipsum'}, 'My awesome output:')
 * // ujut:myService My awesome output:
 * // ujut:myService {
 * // ujut:myService   "foo": "lorem",
 * // ujut:myService   "bar": "ipsum"
 * // ujut:myService }
 * ```
 *
 * @param name
 */
export declare function createDebugger(name: string): Debugger;
