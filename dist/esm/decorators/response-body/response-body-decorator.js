import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { ResponseBodyReflector } from './response-body-reflector.js';
/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export function responseBody(schemaInput) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@responseBody decorator is only supported on an instance method.');
        let schemaOrFactory;
        if (typeof schemaInput === 'function' || typeof schemaInput === 'object') {
            schemaOrFactory = schemaInput;
        }
        else if (typeof schemaInput === 'string') {
            schemaOrFactory = { type: schemaInput };
        }
        ResponseBodyReflector.setMetadata(schemaOrFactory ? { schema: schemaOrFactory } : {}, target.constructor, propertyKey);
    };
}
