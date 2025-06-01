import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {ResponseBodyMetadata} from './response-body-metadata.js';
import {ResponseBodyMetadataMap} from './response-body-metadata.js';
import {RESPONSE_BODY_METADATA_KEY} from './response-body-metadata.js';

/**
 * Response body reflector.
 */
export class ResponseBodyReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(
    metadata: ResponseBodyMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getOwnMetadata(RESPONSE_BODY_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    Reflector.defineMetadata(RESPONSE_BODY_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): ResponseBodyMetadataMap {
    const metadata = Reflector.getOwnMetadata(
      RESPONSE_BODY_METADATA_KEY,
      target,
    );
    return metadata ?? new Map();
  }
}
