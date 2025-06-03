import { Prototype } from '../../types.js';
import { DataType } from '@e22m4u/ts-data-schema';
import { DataSchema } from '@e22m4u/ts-data-schema';
import { RequestDataMetadata } from './request-data-metadata.js';
/**
 * Request data options.
 */
export type RequestDataOptions = RequestDataMetadata;
/**
 * Request data decorator.
 *
 * @param options
 */
export declare function requestData<T extends object>(options: RequestDataOptions): (target: Prototype<T>, propertyKey: string, index: number) => void;
/**
 * Decorator aliases.
 */
export declare const requestParams: (schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestParam: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestQueries: (schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestQuery: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestHeaders: (schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestHeader: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestCookies: (schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestCookie: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestBody: (schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestField: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, index: number) => void;
