import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {BeforeActionMetadata} from './before-action-metadata.js';
import {BEFORE_ACTION_METADATA_KEY} from './before-action-metadata.js';

/**
 * Before action reflector.
 */
export class BeforeActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(
    metadata: BeforeActionMetadata,
    target: Constructor,
    propertyKey?: string,
  ) {
    const oldArray =
      Reflector.getOwnMetadata(
        BEFORE_ACTION_METADATA_KEY,
        target,
        propertyKey,
      ) ?? [];
    const newArray = [metadata, ...oldArray];
    Reflector.defineMetadata(
      BEFORE_ACTION_METADATA_KEY,
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
  ): BeforeActionMetadata[] {
    const metadata = Reflector.getOwnMetadata(
      BEFORE_ACTION_METADATA_KEY,
      target,
      propertyKey,
    );
    return metadata ?? [];
  }
}
