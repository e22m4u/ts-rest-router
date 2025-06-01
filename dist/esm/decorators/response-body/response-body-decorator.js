import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { ResponseBodyReflector } from './response-body-reflector.js';
/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export function responseBody(schemaOrType) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@responseBody decorator is only supported on an instance method.');
        let schema;
        if (typeof schemaOrType === 'object') {
            schema = schemaOrType;
        }
        else if (typeof schemaOrType === 'string') {
            schema = { type: schemaOrType };
        }
        ResponseBodyReflector.setMetadata(schema ? { schema } : {}, target.constructor, propertyKey);
    };
}
