import { Prototype } from '../../types.js';
import { DataSchemaInput } from '../../data-schema-types.js';
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
export declare const requestParams: (schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestParam: (propertyKey: string, schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestQueries: (schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestQuery: (propertyKey: string, schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestHeaders: (schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestHeader: (propertyKey: string, schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestCookies: (schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestCookie: (propertyKey: string, schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestBody: (schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestField: (propertyKey: string, schemaInput?: DataSchemaInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
