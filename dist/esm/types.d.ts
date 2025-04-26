/**
 * Function type that excludes
 * class and constructor types.
 */
export type Callable<T = unknown> = (...args: any[]) => T;
/**
 * Callable type with the "new" operator
 * that allows class and constructor types.
 */
export interface Constructor<T = unknown> {
    new (...args: any[]): T;
}
/**
 * Object prototype that excludes
 * function and scalar values.
 */
export type Prototype<T = unknown> = T & object & {
    bind?: never;
} & {
    call?: never;
} & {
    prototype?: object;
};
/**
 * A part of the Flatten type.
 */
export type Identity<T> = T;
/**
 * Makes T more human-readable.
 */
export type Flatten<T> = Identity<{
    [k in keyof T]: T[k];
}>;
/**
 * Remove null and undefined from T.
 */
export type NoUndef<T> = Exclude<T, null | undefined>;
/**
 * Object type with open properties.
 */
export type AnyObject = {
    [property: PropertyKey]: any;
};
