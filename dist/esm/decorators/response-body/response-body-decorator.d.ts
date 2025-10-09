import { Prototype } from '../../types.js';
import { DataSchemaDecoratorInput } from '../../data-schema-types.js';
/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export declare function responseBody<T extends object>(schemaInput?: DataSchemaDecoratorInput): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
