import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {ActionMetadata} from './action-metadata.js';
import {ActionMetadataMap} from './action-metadata.js';
import {ACTIONS_METADATA_KEY} from './action-metadata.js';

/**
 * Action reflector.
 */
export class ActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(
    metadata: ActionMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    Reflector.defineMetadata(ACTIONS_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): ActionMetadataMap {
    const metadata = Reflector.getOwnMetadata(
      ACTIONS_METADATA_KEY,
      target,
    );
    return metadata ?? new Map();
  }
}
