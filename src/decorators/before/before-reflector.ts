import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {BeforeMetadata} from './before-metadata.js';
import {BEFORE_METADATA_KEY} from './before-metadata.js';

/**
 * Before reflector.
 */
export class BeforeReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(
    metadata: BeforeMetadata,
    target: Constructor,
    propertyKey?: string,
  ) {
    const oldArray =
      Reflector.getOwnMetadata(BEFORE_METADATA_KEY, target, propertyKey) ?? [];
    const newArray = [metadata, ...oldArray];
    Reflector.defineMetadata(
      BEFORE_METADATA_KEY,
      newArray,
      target,
      propertyKey,
    );
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
  ): BeforeMetadata[] {
    const metadata = Reflector.getOwnMetadata(
      BEFORE_METADATA_KEY,
      target,
      propertyKey,
    );
    return metadata ?? [];
  }
}
