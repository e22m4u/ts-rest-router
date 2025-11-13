import {DataType} from '@e22m4u/ts-data-schema';
import {DataSchema} from '@e22m4u/ts-data-schema';
import {ServiceContainer} from '@e22m4u/js-service';

/**
 * Data schema factory.
 */
export type DataSchemaFactory = (container: ServiceContainer) => DataSchema;

/**
 * Data schema or factory.
 */
export type DataSchemaOrFactory = DataSchema | DataSchemaFactory;

/**
 * Data schema decorator input.
 */
export type DataSchemaDecoratorInput = DataSchemaOrFactory | DataType;
