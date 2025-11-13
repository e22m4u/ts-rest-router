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
    return function (schemaInput) {
        let schema;
        if (typeof schemaInput === 'function' || typeof schemaInput === 'object') {
            schema = schemaInput;
        }
        else if (typeof schemaInput === 'string') {
            schema = { type: schemaInput };
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
function createRequestDataPropertyDecoratorWithSource(source) {
    return function (propertyKey, schemaInput) {
        const rootSchema = { type: DataType.OBJECT };
        const properties = {};
        let schemaOrFactory = rootSchema;
        if (typeof schemaInput === 'function') {
            schemaOrFactory = container => {
                properties[propertyKey] = schemaInput(container);
                rootSchema.properties = properties;
                return rootSchema;
            };
        }
        else if (typeof schemaInput === 'object') {
            properties[propertyKey] = schemaInput;
            rootSchema.properties = properties;
        }
        else if (typeof schemaInput === 'string') {
            properties[propertyKey] = { type: schemaInput };
            rootSchema.properties = properties;
        }
        else {
            properties[propertyKey] = { type: DataType.ANY };
            rootSchema.properties = properties;
        }
        return requestData({
            source: source,
            schema: schemaOrFactory,
            property: propertyKey,
        });
    };
}
/**
 * Decorator aliases.
 */
export const requestParams = createRequestDataDecoratorWithSource(RequestDataSource.PARAMS);
export const requestParam = createRequestDataPropertyDecoratorWithSource(RequestDataSource.PARAMS);
export const requestQueries = createRequestDataDecoratorWithSource(RequestDataSource.QUERY);
export const requestQuery = createRequestDataPropertyDecoratorWithSource(RequestDataSource.QUERY);
export const requestHeaders = createRequestDataDecoratorWithSource(RequestDataSource.HEADERS);
export const requestHeader = createRequestDataPropertyDecoratorWithSource(RequestDataSource.HEADERS);
export const requestCookies = createRequestDataDecoratorWithSource(RequestDataSource.COOKIES);
export const requestCookie = createRequestDataPropertyDecoratorWithSource(RequestDataSource.COOKIES);
export const requestBody = createRequestDataDecoratorWithSource(RequestDataSource.BODY);
export const requestField = createRequestDataPropertyDecoratorWithSource(RequestDataSource.BODY);
