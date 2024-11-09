import { DataType } from '@e22m4u/ts-data-schema';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { RequestDataSource } from './request-data-metadata.js';
import { RequestDataReflector } from './request-data-reflector.js';
/**
 * Request data decorator.
 *
 * @param metadata
 */
export function requestData(metadata) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
            throw new Error('@requestData decorator is only supported ' +
                'on an instance method parameter.');
        RequestDataReflector.setMetadata(metadata, target.constructor, indexOrDescriptor, propertyKey);
    };
}
/**
 * Create data decorator.
 *
 * @param source
 */
function createDataDecorator(source) {
    return function () {
        const schema = { type: DataType.OBJECT };
        return requestData({ schema, source });
    };
}
/**
 * Create property decorator.
 *
 * @param source
 */
function createPropertyDecorator(source) {
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
export const params = createDataDecorator(RequestDataSource.PARAMS);
export const param = createPropertyDecorator(RequestDataSource.PARAMS);
export const queries = createDataDecorator(RequestDataSource.QUERY);
export const query = createPropertyDecorator(RequestDataSource.QUERY);
export const headers = createDataDecorator(RequestDataSource.HEADERS);
export const header = createPropertyDecorator(RequestDataSource.HEADERS);
export const cookies = createDataDecorator(RequestDataSource.COOKIE);
export const cookie = createPropertyDecorator(RequestDataSource.COOKIE);
export const bodyParam = createPropertyDecorator(RequestDataSource.BODY);
/**
 * Request body decorator.
 *
 * @param schemaOrType
 */
export function body(schemaOrType) {
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
    return requestData({ schema, source: RequestDataSource.BODY });
}
