import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {ControllerMetadata} from './controller-metadata.js';
import {CONTROLLER_METADATA_KEY} from './controller-metadata.js';

/**
 * Controller reflector.
 */
export class ControllerReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata: ControllerMetadata, target: Constructor) {
    return Reflector.defineMetadata(CONTROLLER_METADATA_KEY, metadata, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): ControllerMetadata | undefined {
    return Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, target);
  }
}
