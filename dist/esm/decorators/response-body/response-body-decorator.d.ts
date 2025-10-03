import { Prototype } from '../../types.js';
import { DataSchemaInput } from '../../data-schema-types.js';
/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export declare function responseBody<T extends object>(schemaInput?: DataSchemaInput): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
