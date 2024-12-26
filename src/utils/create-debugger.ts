import {inspect} from 'util';
import DebugModule from 'debug';
import {AnyObject} from '../types.js';
import {format} from '@e22m4u/js-format';

/**
 * Debugger.
 */
export type Debugger = (
  messageOrData: string | unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => void;

/**
 * Colorize string.
 *
 * @param input
 */
function colorizeString(input: string): string {
  const c = Number(DebugModule['selectColor'](input));
  const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
  return `${colorCode};1m${input}\u001B[0m`;
}

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
export function createDebugger(name: string): Debugger {
  const debuggerName = `tsRestRouter:${name}`;
  // включить вывод логов можно принудительно
  // if (!process.env.DEBUG) DebugModule.enable('ujut*');
  const debug = DebugModule(debuggerName);
  return function (
    this: unknown,
    messageOrData: string | unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) {
    let prefix = '';
    if (typeof this === 'string') {
      const isDebugUsesColors = (debug as AnyObject).useColors;
      prefix = isDebugUsesColors ? colorizeString(`[${this}] `) : `[${this}] `;
    }
    if (typeof messageOrData === 'string') {
      const interpolatedMessage = format(messageOrData, ...args);
      return debug(prefix + interpolatedMessage);
    }
    const inspectOptions = {
      showHidden: false,
      depth: null,
      colors: true,
      compact: false,
    };
    const multiString = inspect(messageOrData, inspectOptions);
    const rows = multiString.split('\n');
    const colorizedDebuggerName = colorizeString(debuggerName);
    [...args, ...rows].forEach(v =>
      console.log(`  ${colorizedDebuggerName} ${prefix}${v}`),
    );
  };
}
