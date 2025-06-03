import { DataType } from '@e22m4u/ts-data-schema';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { RequestDataSource } from './request-data-metadata.js';
import { RequestDataReflector } from './request-data-reflector.js';
/**
 * Request data decorator.
 *
 * @param options
 */
export function requestData(options) {
    return function (target, propertyKey, index) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, index);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
            throw new Error('@requestData decorator is only supported ' +
                'on an instance method parameter.');
        RequestDataReflector.setMetadata(options, target.constructor, index, propertyKey);
    };
}
/**
 * Create request data decorator with source.
 *
 * @param source
 */
function createRequestDataDecoratorWithSource(source) {
    return function (schemaOrType) {
        let schema;
        if (typeof schemaOrType === 'object') {
            schema = schemaOrType;
        }
        else if (typeof schemaOrType === 'string') {
            schema = { type: schemaOrType };
        }
        else {
            schema = { type: DataType.ANY };
        }
        return requestData({ schema, source });
    };
}
/**
 * Create request data property decorator with source.
 *
 * @param source
 */
function createRequestDataPropertyDecoratorWithSource(source, defaultType) {
    return function (propertyKey, schemaOrType) {
        const properties = {};
        const rootSchema = { type: DataType.OBJECT };
        if (typeof schemaOrType === 'object') {
            properties[propertyKey] = schemaOrType;
            rootSchema.properties = properties;
        }
        else if (typeof schemaOrType === 'string') {
            properties[propertyKey] = { type: schemaOrType };
            rootSchema.properties = properties;
        }
        else {
            properties[propertyKey] = { type: defaultType };
            rootSchema.properties = properties;
        }
        return requestData({
            source: source,
            schema: rootSchema,
            property: propertyKey,
        });
    };
}
/**
 * Decorator aliases.
 */
export const requestParams = createRequestDataDecoratorWithSource(RequestDataSource.PARAMS);
export const requestParam = createRequestDataPropertyDecoratorWithSource(RequestDataSource.PARAMS, DataType.STRING);
export const requestQueries = createRequestDataDecoratorWithSource(RequestDataSource.QUERY);
export const requestQuery = createRequestDataPropertyDecoratorWithSource(RequestDataSource.QUERY, DataType.STRING);
export const requestHeaders = createRequestDataDecoratorWithSource(RequestDataSource.HEADERS);
export const requestHeader = createRequestDataPropertyDecoratorWithSource(RequestDataSource.HEADERS, DataType.STRING);
export const requestCookies = createRequestDataDecoratorWithSource(RequestDataSource.COOKIE);
export const requestCookie = createRequestDataPropertyDecoratorWithSource(RequestDataSource.COOKIE, DataType.STRING);
export const requestBody = createRequestDataDecoratorWithSource(RequestDataSource.BODY);
export const requestField = createRequestDataPropertyDecoratorWithSource(RequestDataSource.BODY, DataType.ANY);
