import { Prototype } from '../../types.js';
import { RequestDataMetadata } from './request-data-metadata.js';
import { DataSchemaDecoratorInput } from '../../data-schema-types.js';
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
export declare const requestParams: (schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestParam: (propertyKey: string, schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestQueries: (schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestQuery: (propertyKey: string, schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestHeaders: (schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestHeader: (propertyKey: string, schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestCookies: (schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestCookie: (propertyKey: string, schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestBody: (schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
export declare const requestField: (propertyKey: string, schemaInput?: DataSchemaDecoratorInput) => (target: Prototype<object>, propertyKey: string, index: number) => void;
