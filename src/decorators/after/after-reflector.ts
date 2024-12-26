import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {AfterMetadata} from './after-metadata.js';
import {AFTER_METADATA_KEY} from './after-metadata.js';

/**
 * After reflector.
 */
export class AfterReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(
    metadata: AfterMetadata,
    target: Constructor,
    propertyKey?: string,
  ) {
    const oldArray =
      Reflector.getOwnMetadata(AFTER_METADATA_KEY, target, propertyKey) ?? [];
    const newArray = [metadata, ...oldArray];
    Reflector.defineMetadata(AFTER_METADATA_KEY, newArray, target, propertyKey);
  }

  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(
    target: Constructor,
    propertyKey?: string,
  ): AfterMetadata[] {
    const metadata = Reflector.getOwnMetadata(
      AFTER_METADATA_KEY,
      target,
      propertyKey,
    );
    return metadata ?? [];
  }
}
