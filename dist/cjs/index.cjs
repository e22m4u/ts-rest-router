"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  AFTER_ACTION_METADATA_KEY: () => AFTER_ACTION_METADATA_KEY,
  AfterActionReflector: () => AfterActionReflector,
  BEFORE_ACTION_METADATA_KEY: () => BEFORE_ACTION_METADATA_KEY,
  BeforeActionReflector: () => BeforeActionReflector,
  ControllerRegistry: () => ControllerRegistry,
  NotAControllerError: () => NotAControllerError,
  REQUEST_CONTEXT_METADATA_KEY: () => REQUEST_CONTEXT_METADATA_KEY,
  REQUEST_DATA_METADATA_KEY: () => REQUEST_DATA_METADATA_KEY,
  REST_ACTIONS_METADATA_KEY: () => REST_ACTIONS_METADATA_KEY,
  REST_CONTROLLER_METADATA_KEY: () => REST_CONTROLLER_METADATA_KEY,
  RequestContextReflector: () => RequestContextReflector,
  RequestDataReflector: () => RequestDataReflector,
  RequestDataSource: () => RequestDataSource,
  RestActionReflector: () => RestActionReflector,
  RestControllerReflector: () => RestControllerReflector,
  RestRouter: () => RestRouter,
  afterAction: () => afterAction,
  beforeAction: () => beforeAction,
  capitalize: () => capitalize,
  createError: () => createError,
  deleteAction: () => deleteAction,
  getAction: () => getAction,
  httpRequest: () => httpRequest,
  httpResponse: () => httpResponse,
  patchAction: () => patchAction,
  postAction: () => postAction,
  putAction: () => putAction,
  requestBody: () => requestBody,
  requestContext: () => requestContext,
  requestCookie: () => requestCookie,
  requestCookies: () => requestCookies,
  requestData: () => requestData,
  requestField: () => requestField,
  requestHeader: () => requestHeader,
  requestHeaders: () => requestHeaders,
  requestParam: () => requestParam,
  requestParams: () => requestParams,
  requestQueries: () => requestQueries,
  requestQuery: () => requestQuery,
  restAction: () => restAction,
  restController: () => restController,
  toCamelCase: () => toCamelCase
});
module.exports = __toCommonJS(index_exports);

// dist/esm/utils/capitalize.js
function capitalize(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
__name(capitalize, "capitalize");

// dist/esm/utils/create-error.js
var import_js_format = require("@e22m4u/js-format");
function createError(errorCtor, message, ...args) {
  const interpolatedMessage = (0, import_js_format.format)(message, ...args);
  return new errorCtor(interpolatedMessage);
}
__name(createError, "createError");

// dist/esm/utils/to-camel-case.js
function toCamelCase(input) {
  return input.replace(/(^\w|[A-Z]|\b\w)/g, (c) => c.toUpperCase()).replace(/\W+/g, "").replace(/(^\w)/g, (c) => c.toLowerCase());
}
__name(toCamelCase, "toCamelCase");

// dist/esm/rest-router.js
var import_js_trie_router3 = require("@e22m4u/js-trie-router");

// dist/esm/debuggable-service.js
var import_js_service = require("@e22m4u/js-service");
var import_js_debug = require("@e22m4u/js-debug");
var _DebuggableService = class _DebuggableService extends import_js_service.Service {
  /**
   * Debug.
   */
  debug;
  /**
   * Возвращает функцию-отладчик с сегментом пространства имен
   * указанного в параметре метода.
   *
   * @param method
   * @protected
   */
  getDebuggerFor(method) {
    return this.debug.withHash().withNs(method.name);
  }
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container) {
    super(container);
    const serviceName = toCamelCase(this.constructor.name);
    this.debug = (0, import_js_debug.createDebugger)("tsRestRouter", serviceName);
    const debug = this.debug.withNs("constructor").withHash();
    debug("Service created.");
  }
};
__name(_DebuggableService, "DebuggableService");
var DebuggableService = _DebuggableService;

// dist/esm/controller-registry.js
var import_js_format3 = require("@e22m4u/js-format");
var import_js_trie_router2 = require("@e22m4u/js-trie-router");
var import_ts_data_schema2 = require("@e22m4u/ts-data-schema");
var import_ts_data_schema3 = require("@e22m4u/ts-data-schema");

// dist/esm/errors/not-a-controller-error.js
var import_js_format2 = require("@e22m4u/js-format");
var _NotAControllerError = class _NotAControllerError extends import_js_format2.Errorf {
  /**
   * Constructor.
   *
   * @param value
   */
  constructor(value) {
    super("%v is not a controller, do use @restController decorator on it.", value);
  }
};
__name(_NotAControllerError, "NotAControllerError");
var NotAControllerError = _NotAControllerError;

// dist/esm/decorators/rest-action/rest-action-metadata.js
var import_ts_reflector = require("@e22m4u/ts-reflector");
var REST_ACTIONS_METADATA_KEY = new import_ts_reflector.MetadataKey("restActionsMetadataKey");

// dist/esm/decorators/rest-action/rest-action-reflector.js
var import_ts_reflector2 = require("@e22m4u/ts-reflector");
var _RestActionReflector = class _RestActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    const oldMap = import_ts_reflector2.Reflector.getOwnMetadata(REST_ACTIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    import_ts_reflector2.Reflector.defineMetadata(REST_ACTIONS_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector2.Reflector.getOwnMetadata(REST_ACTIONS_METADATA_KEY, target);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RestActionReflector, "RestActionReflector");
var RestActionReflector = _RestActionReflector;

// dist/esm/decorators/rest-action/rest-action-decorator.js
var import_js_trie_router = require("@e22m4u/js-trie-router");
var import_ts_reflector3 = require("@e22m4u/ts-reflector");
var import_ts_reflector4 = require("@e22m4u/ts-reflector");
function restAction(options) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector4.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType !== import_ts_reflector3.DecoratorTargetType.INSTANCE_METHOD)
      throw new Error("@restAction decorator is only supported on an instance method.");
    RestActionReflector.setMetadata({ ...options, propertyKey }, target.constructor, propertyKey);
  };
}
__name(restAction, "restAction");
function getAction(pathOrOptions, options) {
  let path = typeof pathOrOptions === "string" ? pathOrOptions : "";
  options = typeof pathOrOptions === "object" ? pathOrOptions : options;
  if (typeof options === "object" && !path && options.path != null)
    path = options.path;
  return restAction({ ...options, path, method: import_js_trie_router.HttpMethod.GET });
}
__name(getAction, "getAction");
function postAction(pathOrOptions, options) {
  let path = typeof pathOrOptions === "string" ? pathOrOptions : "";
  options = typeof pathOrOptions === "object" ? pathOrOptions : options;
  if (typeof options === "object" && !path && options.path != null)
    path = options.path;
  return restAction({ ...options, path, method: import_js_trie_router.HttpMethod.POST });
}
__name(postAction, "postAction");
function putAction(pathOrOptions, options) {
  let path = typeof pathOrOptions === "string" ? pathOrOptions : "";
  options = typeof pathOrOptions === "object" ? pathOrOptions : options;
  if (typeof options === "object" && !path && options.path != null)
    path = options.path;
  return restAction({ ...options, path, method: import_js_trie_router.HttpMethod.PUT });
}
__name(putAction, "putAction");
function patchAction(pathOrOptions, options) {
  let path = typeof pathOrOptions === "string" ? pathOrOptions : "";
  options = typeof pathOrOptions === "object" ? pathOrOptions : options;
  if (typeof options === "object" && !path && options.path != null)
    path = options.path;
  return restAction({ ...options, path, method: import_js_trie_router.HttpMethod.PATCH });
}
__name(patchAction, "patchAction");
function deleteAction(pathOrOptions, options) {
  let path = typeof pathOrOptions === "string" ? pathOrOptions : "";
  options = typeof pathOrOptions === "object" ? pathOrOptions : options;
  if (typeof options === "object" && !path && options.path != null)
    path = options.path;
  return restAction({ ...options, path, method: import_js_trie_router.HttpMethod.DELETE });
}
__name(deleteAction, "deleteAction");

// dist/esm/decorators/request-data/request-data-metadata.js
var import_ts_reflector5 = require("@e22m4u/ts-reflector");
var RequestDataSource;
(function(RequestDataSource2) {
  RequestDataSource2["PARAMS"] = "params";
  RequestDataSource2["QUERY"] = "query";
  RequestDataSource2["HEADERS"] = "headers";
  RequestDataSource2["COOKIE"] = "cookie";
  RequestDataSource2["BODY"] = "body";
})(RequestDataSource || (RequestDataSource = {}));
var REQUEST_DATA_METADATA_KEY = new import_ts_reflector5.MetadataKey("requestDataMetadataKey");

// dist/esm/decorators/request-data/request-data-decorator.js
var import_ts_data_schema = require("@e22m4u/ts-data-schema");
var import_ts_reflector7 = require("@e22m4u/ts-reflector");
var import_ts_reflector8 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/request-data/request-data-reflector.js
var import_ts_reflector6 = require("@e22m4u/ts-reflector");
var _RequestDataReflector = class _RequestDataReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param index
   * @param propertyKey
   */
  static setMetadata(metadata, target, index, propertyKey) {
    const oldMap = import_ts_reflector6.Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
    const newMap = new Map(oldMap);
    newMap.set(index, metadata);
    import_ts_reflector6.Reflector.defineMetadata(REQUEST_DATA_METADATA_KEY, newMap, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector6.Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RequestDataReflector, "RequestDataReflector");
var RequestDataReflector = _RequestDataReflector;

// dist/esm/decorators/request-data/request-data-decorator.js
function requestData(options) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector8.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector7.DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
      throw new Error("@requestData decorator is only supported on an instance method parameter.");
    RequestDataReflector.setMetadata(options, target.constructor, indexOrDescriptor, propertyKey);
  };
}
__name(requestData, "requestData");
function createRequestDataDecoratorWithSource(source) {
  return function() {
    const schema = { type: import_ts_data_schema.DataType.OBJECT };
    return requestData({ schema, source });
  };
}
__name(createRequestDataDecoratorWithSource, "createRequestDataDecoratorWithSource");
function createRequestDataPropertyDecoratorWithSource(source) {
  return function(propertyKey, schemaOrType) {
    const properties = {};
    const rootSchema = { type: import_ts_data_schema.DataType.OBJECT };
    if (typeof schemaOrType === "object") {
      properties[propertyKey] = schemaOrType;
      rootSchema.properties = properties;
    } else if (typeof schemaOrType === "string") {
      properties[propertyKey] = { type: schemaOrType };
      rootSchema.properties = properties;
    }
    return requestData({
      source,
      schema: rootSchema,
      property: propertyKey
    });
  };
}
__name(createRequestDataPropertyDecoratorWithSource, "createRequestDataPropertyDecoratorWithSource");
var requestParams = createRequestDataDecoratorWithSource(RequestDataSource.PARAMS);
var requestParam = createRequestDataPropertyDecoratorWithSource(RequestDataSource.PARAMS);
var requestQueries = createRequestDataDecoratorWithSource(RequestDataSource.QUERY);
var requestQuery = createRequestDataPropertyDecoratorWithSource(RequestDataSource.QUERY);
var requestHeaders = createRequestDataDecoratorWithSource(RequestDataSource.HEADERS);
var requestHeader = createRequestDataPropertyDecoratorWithSource(RequestDataSource.HEADERS);
var requestCookies = createRequestDataDecoratorWithSource(RequestDataSource.COOKIE);
var requestCookie = createRequestDataPropertyDecoratorWithSource(RequestDataSource.COOKIE);
var requestField = createRequestDataPropertyDecoratorWithSource(RequestDataSource.BODY);
function requestBody(schemaOrType) {
  let schema;
  if (typeof schemaOrType === "object") {
    schema = schemaOrType;
  } else if (typeof schemaOrType === "string") {
    schema = { type: schemaOrType };
  } else {
    schema = { type: import_ts_data_schema.DataType.ANY };
  }
  return requestData({ schema, source: RequestDataSource.BODY });
}
__name(requestBody, "requestBody");

// dist/esm/decorators/after-action/after-action-metadata.js
var import_ts_reflector9 = require("@e22m4u/ts-reflector");
var AFTER_ACTION_METADATA_KEY = new import_ts_reflector9.MetadataKey("afterActionMetadataKey");

// dist/esm/decorators/after-action/after-action-reflector.js
var import_ts_reflector10 = require("@e22m4u/ts-reflector");
var _AfterActionReflector = class _AfterActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(metadata, target, propertyKey) {
    const oldArray = import_ts_reflector10.Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, target, propertyKey) ?? [];
    const newArray = [metadata, ...oldArray];
    import_ts_reflector10.Reflector.defineMetadata(AFTER_ACTION_METADATA_KEY, newArray, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector10.Reflector.getOwnMetadata(AFTER_ACTION_METADATA_KEY, target, propertyKey);
    return metadata ?? [];
  }
};
__name(_AfterActionReflector, "AfterActionReflector");
var AfterActionReflector = _AfterActionReflector;

// dist/esm/decorators/after-action/after-action-decorator.js
var import_ts_reflector11 = require("@e22m4u/ts-reflector");
var import_ts_reflector12 = require("@e22m4u/ts-reflector");
function afterAction(middleware) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector12.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType === import_ts_reflector11.DecoratorTargetType.CONSTRUCTOR) {
      AfterActionReflector.addMetadata({ middleware }, target);
    } else if (decoratorType === import_ts_reflector11.DecoratorTargetType.INSTANCE_METHOD) {
      AfterActionReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
    } else {
      throw new Error("@afterAction decorator is only supported on a class or an instance method.");
    }
  };
}
__name(afterAction, "afterAction");

// dist/esm/decorators/before-action/before-action-metadata.js
var import_ts_reflector13 = require("@e22m4u/ts-reflector");
var BEFORE_ACTION_METADATA_KEY = new import_ts_reflector13.MetadataKey("beforeActionMetadataKey");

// dist/esm/decorators/before-action/before-action-reflector.js
var import_ts_reflector14 = require("@e22m4u/ts-reflector");
var _BeforeActionReflector = class _BeforeActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(metadata, target, propertyKey) {
    const oldArray = import_ts_reflector14.Reflector.getOwnMetadata(BEFORE_ACTION_METADATA_KEY, target, propertyKey) ?? [];
    const newArray = [metadata, ...oldArray];
    import_ts_reflector14.Reflector.defineMetadata(BEFORE_ACTION_METADATA_KEY, newArray, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector14.Reflector.getOwnMetadata(BEFORE_ACTION_METADATA_KEY, target, propertyKey);
    return metadata ?? [];
  }
};
__name(_BeforeActionReflector, "BeforeActionReflector");
var BeforeActionReflector = _BeforeActionReflector;

// dist/esm/decorators/before-action/before-action-decorator.js
var import_ts_reflector15 = require("@e22m4u/ts-reflector");
var import_ts_reflector16 = require("@e22m4u/ts-reflector");
function beforeAction(middleware) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector16.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType === import_ts_reflector15.DecoratorTargetType.CONSTRUCTOR) {
      BeforeActionReflector.addMetadata({ middleware }, target);
    } else if (decoratorType === import_ts_reflector15.DecoratorTargetType.INSTANCE_METHOD) {
      BeforeActionReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
    } else {
      throw new Error("@beforeAction decorator is only supported on a class or an instance method.");
    }
  };
}
__name(beforeAction, "beforeAction");

// dist/esm/decorators/rest-controller/rest-controller-metadata.js
var import_ts_reflector17 = require("@e22m4u/ts-reflector");
var REST_CONTROLLER_METADATA_KEY = new import_ts_reflector17.MetadataKey("restControllerMetadataKey");

// dist/esm/decorators/rest-controller/rest-controller-decorator.js
var import_ts_reflector19 = require("@e22m4u/ts-reflector");
var import_ts_reflector20 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/rest-controller/rest-controller-reflector.js
var import_ts_reflector18 = require("@e22m4u/ts-reflector");
var _RestControllerReflector = class _RestControllerReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata, target) {
    return import_ts_reflector18.Reflector.defineMetadata(REST_CONTROLLER_METADATA_KEY, metadata, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    return import_ts_reflector18.Reflector.getOwnMetadata(REST_CONTROLLER_METADATA_KEY, target);
  }
};
__name(_RestControllerReflector, "RestControllerReflector");
var RestControllerReflector = _RestControllerReflector;

// dist/esm/decorators/rest-controller/rest-controller-decorator.js
function restController(pathOrOptions, options) {
  return function(target) {
    const decoratorType = (0, import_ts_reflector20.getDecoratorTargetType)(target);
    if (decoratorType !== import_ts_reflector19.DecoratorTargetType.CONSTRUCTOR)
      throw new Error("@restController decorator is only supported on a class.");
    if (typeof pathOrOptions === "string") {
      if (!options) {
        options = { path: pathOrOptions };
      } else {
        options.path = pathOrOptions;
      }
    } else if (typeof pathOrOptions === "object") {
      options = pathOrOptions;
    }
    RestControllerReflector.setMetadata({ ...options, className: target.name }, target);
  };
}
__name(restController, "restController");

// dist/esm/decorators/request-context/request-context-metadata.js
var import_ts_reflector21 = require("@e22m4u/ts-reflector");
var REQUEST_CONTEXT_METADATA_KEY = new import_ts_reflector21.MetadataKey("requestContextMetadataKey");

// dist/esm/decorators/request-context/request-context-decorator.js
var import_ts_reflector23 = require("@e22m4u/ts-reflector");
var import_ts_reflector24 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/request-context/request-context-reflector.js
var import_ts_reflector22 = require("@e22m4u/ts-reflector");
var _RequestContextReflector = class _RequestContextReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param index
   * @param propertyKey
   */
  static setMetadata(metadata, target, index, propertyKey) {
    const oldMap = import_ts_reflector22.Reflector.getOwnMetadata(REQUEST_CONTEXT_METADATA_KEY, target, propertyKey);
    const newMap = new Map(oldMap);
    newMap.set(index, metadata);
    import_ts_reflector22.Reflector.defineMetadata(REQUEST_CONTEXT_METADATA_KEY, newMap, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector22.Reflector.getOwnMetadata(REQUEST_CONTEXT_METADATA_KEY, target, propertyKey);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RequestContextReflector, "RequestContextReflector");
var RequestContextReflector = _RequestContextReflector;

// dist/esm/decorators/request-context/request-context-decorator.js
function requestContext(propertyName) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector24.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector23.DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
      throw new Error("@requestContext decorator is only supported on an instance method parameter.");
    RequestContextReflector.setMetadata({ property: propertyName }, target.constructor, indexOrDescriptor, propertyKey);
  };
}
__name(requestContext, "requestContext");
function httpRequest() {
  return requestContext("req");
}
__name(httpRequest, "httpRequest");
function httpResponse() {
  return requestContext("res");
}
__name(httpResponse, "httpResponse");

// dist/esm/controller-registry.js
var _ControllerRegistry = class _ControllerRegistry extends DebuggableService {
  /**
   * Controllers.
   */
  controllers = /* @__PURE__ */ new Set();
  /**
   * Add controller.
   *
   * @param ctor
   * @param options
   */
  addController(ctor, options) {
    const debug = this.getDebuggerFor(this.addController);
    if (this.hasController(ctor))
      throw new import_js_format3.Errorf("The controller %v is already registered.");
    const controllerMd = RestControllerReflector.getMetadata(ctor);
    if (!controllerMd)
      throw new NotAControllerError(ctor);
    debug("Adding controller %s.", ctor.name);
    let pathPrefix = "";
    pathPrefix += this.getPathPrefixFromControllerRootOptions(options);
    pathPrefix += "/";
    pathPrefix += this.getPathPrefixFromControllerMetadata(ctor);
    pathPrefix = pathPrefix.replace(/\/{2,}/g, "/").replace(/\/$/, "");
    debug("Controller path prefix is %v.", pathPrefix);
    const preHandlers = [
      ...this.getPreHandlersFromControllerRootOptions(options),
      ...this.getPreHandlersFromBeforeMetadata(ctor),
      ...this.getPreHandlersFromControllerMetadata(ctor)
    ];
    debug("Controller has %v pre-handlers.", preHandlers.length);
    const postHandlers = [
      ...this.getPostHandlersFromControllerRootOptions(options),
      ...this.getPostHandlersFromAfterMetadata(ctor),
      ...this.getPostHandlersFromControllerMetadata(ctor)
    ];
    debug("Controller has %v post-handlers.", postHandlers.length);
    const actionsMd = RestActionReflector.getMetadata(ctor);
    debug("%v actions found.", actionsMd.size);
    const router = this.getService(import_js_trie_router2.TrieRouter);
    actionsMd.forEach((actionMd, actionName) => {
      debug("Adding route for %s.%s.", ctor.name, actionName);
      debug("Route path is %v.", actionMd.path);
      const prefixedRoutePath = `${pathPrefix}/${actionMd.path}`.replace(/\/{2,}/g, "/").replace(/\/$/, "");
      debug("Prefixed route path is %v.", prefixedRoutePath);
      const actionPreHandlers = [
        ...preHandlers,
        ...this.getPreHandlersFromBeforeMetadata(ctor, actionName),
        ...this.getPreHandlersFromActionMetadata(ctor, actionName)
      ];
      debug("%v action pre-handlers in total.", actionPreHandlers.length);
      const actionPostHandlers = [
        ...postHandlers,
        ...this.getPostHandlersFromAfterMetadata(ctor, actionName),
        ...this.getPostHandlersFromActionMetadata(ctor, actionName)
      ];
      debug("%v action post-handlers in total.", actionPostHandlers.length);
      const routeHandler = this.createRouteHandler(ctor, actionName);
      router.defineRoute({
        method: actionMd.method,
        path: prefixedRoutePath,
        preHandler: actionPreHandlers,
        handler: routeHandler,
        postHandler: actionPostHandlers
      });
      debug("Route %s %v is added.", actionMd.method.toUpperCase(), prefixedRoutePath);
    });
    this.controllers.add(ctor);
    return this;
  }
  /**
   * Has controller.
   *
   * @param ctor
   */
  hasController(ctor) {
    return this.controllers.has(ctor);
  }
  /**
   * Get path prefix from controller root options.
   *
   * @param options
   */
  getPathPrefixFromControllerRootOptions(options) {
    const debug = this.getDebuggerFor(this.getPathPrefixFromControllerRootOptions);
    debug("Getting path prefix from controller root options.");
    const res = (options == null ? void 0 : options.pathPrefix) || "";
    debug("Controller path prefix is %v.", res);
    return res;
  }
  /**
   * Get path prefix from controller metadata.
   *
   * @param ctor
   */
  getPathPrefixFromControllerMetadata(ctor) {
    const debug = this.getDebuggerFor(this.getPathPrefixFromControllerMetadata);
    debug("Getting path prefix from @restController metadata.");
    debug("Metadata target is %s.", ctor.name);
    const md = RestControllerReflector.getMetadata(ctor);
    if (!md)
      throw new import_js_format3.Errorf("Controller %v has no metadata.", ctor);
    const res = md.path || "";
    debug("Controller path prefix is %v.", res);
    return md.path || "";
  }
  /**
   * Getting pre-handlers from controller root options.
   *
   * @param options
   */
  getPreHandlersFromControllerRootOptions(options) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromControllerRootOptions);
    debug("Getting pre-handlers from controller root options.");
    let res = [];
    if (options == null ? void 0 : options.before)
      res = Array.isArray(options.before) ? options.before : [options.before];
    debug("%v pre-handlers found.", res.length);
    return res;
  }
  /**
   * Getting post-handlers from controller root options.
   *
   * @param options
   */
  getPostHandlersFromControllerRootOptions(options) {
    const debug = this.getDebuggerFor(this.getPostHandlersFromControllerRootOptions);
    debug("Getting post-handlers from controller root options.");
    let res = [];
    if (options == null ? void 0 : options.after)
      res = Array.isArray(options.after) ? options.after : [options.after];
    debug("%v post-handlers found.", res.length);
    return res;
  }
  /**
   * Get pre-handlers from before metadata.
   *
   * @param ctor
   * @param actionName
   */
  getPreHandlersFromBeforeMetadata(ctor, actionName) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromBeforeMetadata);
    debug("Getting pre-handlers from @before metadata.");
    if (actionName) {
      debug("Target is %s.%s.", ctor.name, actionName);
    } else {
      debug("Target is %s.", ctor.name);
    }
    let preHandlers = [];
    const mdArray = BeforeActionReflector.getMetadata(ctor, actionName);
    mdArray.forEach((md) => {
      if (Array.isArray(md.middleware)) {
        preHandlers = [...preHandlers, ...md.middleware];
      } else {
        preHandlers.push(md.middleware);
      }
    });
    if (mdArray.length) {
      debug("%v pre-handlers found.", mdArray.length);
    } else {
      debug("No pre-handlers found.");
    }
    return preHandlers;
  }
  /**
   * Get post-handlers from after metadata.
   *
   * @param ctor
   * @param actionName
   */
  getPostHandlersFromAfterMetadata(ctor, actionName) {
    const debug = this.getDebuggerFor(this.getPostHandlersFromAfterMetadata);
    debug("Getting post-handlers from @after metadata.");
    if (actionName) {
      debug("Target is %s.%s.", ctor.name, actionName);
    } else {
      debug("Target is %s.", ctor.name);
    }
    let res = [];
    const mdArray = AfterActionReflector.getMetadata(ctor, actionName);
    mdArray.forEach((md) => {
      if (Array.isArray(md.middleware)) {
        res = [...res, ...md.middleware];
      } else {
        res.push(md.middleware);
      }
    });
    if (mdArray.length) {
      debug("%v post-handlers found.", mdArray.length);
    } else {
      debug("No post-handlers found.");
    }
    return res;
  }
  /**
   * Get pre-handlers from controller metadata.
   *
   * @param ctor
   */
  getPreHandlersFromControllerMetadata(ctor) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromControllerMetadata);
    debug("Getting pre-handlers from @restController metadata.");
    debug("Target is %s.", ctor.name);
    const md = RestControllerReflector.getMetadata(ctor);
    if (!md)
      throw new import_js_format3.Errorf("Controller %v has no metadata.", ctor);
    let res = [];
    if (md.before)
      res = Array.isArray(md.before) ? md.before : [md.before];
    debug("%v pre-handlers found.", res.length);
    return res;
  }
  /**
   * Get post-handlers from controller metadata.
   *
   * @param ctor
   */
  getPostHandlersFromControllerMetadata(ctor) {
    const debug = this.getDebuggerFor(this.getPostHandlersFromControllerMetadata);
    debug("Getting post-handlers from @restController metadata.");
    const md = RestControllerReflector.getMetadata(ctor);
    if (!md)
      throw new import_js_format3.Errorf("Controller %v has no metadata.", ctor);
    let res = [];
    if (md.after)
      res = Array.isArray(md.after) ? md.after : [md.after];
    debug("%v post-handlers found.", res.length);
    return res;
  }
  /**
   * Get pre-handlers from action metadata.
   *
   * @param ctor
   * @param actionName
   */
  getPreHandlersFromActionMetadata(ctor, actionName) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromActionMetadata);
    debug("Getting pre-handlers from @action metadata.");
    const actionsMd = RestActionReflector.getMetadata(ctor);
    const actionMd = actionsMd.get(actionName);
    if (!actionMd)
      throw new import_js_format3.Errorf("Action %s.%s has no metadata.", ctor.name, actionName);
    let res = [];
    if (actionMd.before)
      res = Array.isArray(actionMd.before) ? actionMd.before : [actionMd.before];
    debug("%v pre-handlers found.", res.length);
    return res;
  }
  /**
   * Get post-handlers from action metadata.
   *
   * @param ctor
   * @param actionName
   */
  getPostHandlersFromActionMetadata(ctor, actionName) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromActionMetadata);
    debug("Getting post-handlers from @action metadata.");
    const actionsMd = RestActionReflector.getMetadata(ctor);
    const actionMd = actionsMd.get(actionName);
    if (!actionMd)
      throw new import_js_format3.Errorf("Action %s.%s has no metadata.", ctor.name, actionName);
    let res = [];
    if (actionMd.after)
      res = Array.isArray(actionMd.after) ? actionMd.after : [actionMd.after];
    debug("%v pre-handlers found.", res.length);
    return res;
  }
  /**
   * Create route handler.
   *
   * @param controllerCtor
   * @param actionName
   * @protected
   */
  createRouteHandler(controllerCtor, actionName) {
    const debug = this.getDebuggerFor(this.createRouteHandler);
    debug("Creating route handler for %s.%s.", controllerCtor.name, actionName);
    const requestContextMetadataMap = RequestContextReflector.getMetadata(controllerCtor, actionName);
    const requestDataMetadataMap = RequestDataReflector.getMetadata(controllerCtor, actionName);
    const argsNumber = controllerCtor.prototype[actionName].length;
    const dataTypeCaster = this.getService(import_ts_data_schema3.DataTypeCaster);
    const dataValidator = this.getService(import_ts_data_schema2.DataValidator);
    return (requestContext2) => {
      debug("Executing route handler for %s.%s.", controllerCtor.name, actionName);
      const args = Array(argsNumber).fill(void 0).map((_, index) => {
        const requestContextMd = requestContextMetadataMap.get(index);
        if (requestContextMd != null) {
          debug("Argument %v has request context metadata.", index);
          if (requestContextMd.property == null) {
            debug("Request context property is not specified.");
            debug("Argument %v is set to %v.", index, requestContext2);
            return requestContext2;
          }
          const propName = requestContextMd.property;
          const propValue = requestContext2[propName];
          debug("Request context property is %v.", propName);
          debug("Argument %v is set to %v.", index, propValue);
          return propValue;
        } else {
          debug("No RequestContextMetadata specified for %v argument.", index);
        }
        const requestDataMd = requestDataMetadataMap.get(index);
        if (requestDataMd != null) {
          debug("Argument %v has request data metadata.", index);
          let data;
          switch (requestDataMd.source) {
            case RequestDataSource.PARAMS:
              data = requestContext2.params;
              break;
            case RequestDataSource.QUERY:
              data = requestContext2.query;
              break;
            case RequestDataSource.HEADERS:
              data = requestContext2.headers;
              break;
            case RequestDataSource.COOKIE:
              data = requestContext2.cookie;
              break;
            case RequestDataSource.BODY:
              data = requestContext2.body;
              break;
          }
          debug("Request data source is %v.", requestDataMd.source);
          if (requestDataMd.schema) {
            data = dataTypeCaster.cast(data, requestDataMd.schema, {
              noTypeCastError: true,
              sourcePath: requestDataMd.source
            });
            debug("Data type casting is passed.");
            dataValidator.validate(data, requestDataMd.schema, requestDataMd.source);
            debug("Data validation is passed.");
          }
          if (requestDataMd.property == null) {
            debug("Request data property is not specified.");
            debug("Argument %v is set to %v.", index, data);
            return data;
          }
          const dataAsObject = data;
          const propName = requestDataMd.property;
          const propValue = dataAsObject[propName];
          debug("Request data property is %v.", propName);
          debug("Argument %v is set to %v.", index, propValue);
          return propValue;
        } else {
          debug("No RequestDataMetadata specified for %v argument.", index);
        }
      });
      const controller = this.getService(controllerCtor);
      return controller[actionName](...args);
    };
  }
};
__name(_ControllerRegistry, "ControllerRegistry");
var ControllerRegistry = _ControllerRegistry;

// dist/esm/rest-router.js
var _RestRouter = class _RestRouter extends DebuggableService {
  /**
   * Request listener.
   */
  get requestListener() {
    return this.getService(import_js_trie_router3.TrieRouter).requestListener;
  }
  /**
   * Add controller.
   *
   * @param ctor
   * @param options
   */
  addController(ctor, options) {
    this.getService(ControllerRegistry).addController(ctor, options);
    return this;
  }
};
__name(_RestRouter, "RestRouter");
var RestRouter = _RestRouter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AFTER_ACTION_METADATA_KEY,
  AfterActionReflector,
  BEFORE_ACTION_METADATA_KEY,
  BeforeActionReflector,
  ControllerRegistry,
  NotAControllerError,
  REQUEST_CONTEXT_METADATA_KEY,
  REQUEST_DATA_METADATA_KEY,
  REST_ACTIONS_METADATA_KEY,
  REST_CONTROLLER_METADATA_KEY,
  RequestContextReflector,
  RequestDataReflector,
  RequestDataSource,
  RestActionReflector,
  RestControllerReflector,
  RestRouter,
  afterAction,
  beforeAction,
  capitalize,
  createError,
  deleteAction,
  getAction,
  httpRequest,
  httpResponse,
  patchAction,
  postAction,
  putAction,
  requestBody,
  requestContext,
  requestCookie,
  requestCookies,
  requestData,
  requestField,
  requestHeader,
  requestHeaders,
  requestParam,
  requestParams,
  requestQueries,
  requestQuery,
  restAction,
  restController,
  toCamelCase
});
