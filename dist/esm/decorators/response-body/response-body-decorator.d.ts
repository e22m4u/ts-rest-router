import { Prototype } from '../../types.js';
import { DataType } from '@e22m4u/ts-data-schema';
import { DataSchema } from '@e22m4u/ts-data-schema';
/**
 * Response body decorator.
 *
 * @param schemaOrType
 */
export declare function responseBody<T extends object>(schemaOrType?: DataSchema | DataType): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
