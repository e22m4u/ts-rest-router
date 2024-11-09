import { Prototype } from '../../types.js';
import { DataType } from '@e22m4u/ts-data-schema';
import { DataSchema } from '@e22m4u/ts-data-schema';
import { RequestDataMetadata } from './request-data-metadata.js';
/**
 * Request data decorator.
 *
 * @param metadata
 */
export declare function requestData<T extends object>(metadata: RequestDataMetadata): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * Decorator aliases.
 */
export declare const params: () => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const param: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const queries: () => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const query: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const headers: () => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const header: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const cookies: () => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const cookie: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
export declare const bodyParam: (propertyKey: string, schemaOrType?: DataSchema | DataType) => (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
/**
 * Request body decorator.
 *
 * @param schemaOrType
 */
export declare function body(schemaOrType?: DataSchema | DataType): (target: Prototype<object>, propertyKey: string, indexOrDescriptor: number) => void;
