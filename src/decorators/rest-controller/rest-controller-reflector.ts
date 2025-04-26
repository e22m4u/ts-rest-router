import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {RestControllerMetadata} from './rest-controller-metadata.js';
import {REST_CONTROLLER_METADATA_KEY} from './rest-controller-metadata.js';

/**
 * Rest controller reflector.
 */
export class RestControllerReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata: RestControllerMetadata, target: Constructor) {
    return Reflector.defineMetadata(
      REST_CONTROLLER_METADATA_KEY,
      metadata,
      target,
    );
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): RestControllerMetadata | undefined {
    return Reflector.getOwnMetadata(REST_CONTROLLER_METADATA_KEY, target);
  }
}
