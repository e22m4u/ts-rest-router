"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  ACTIONS_METADATA_KEY: () => ACTIONS_METADATA_KEY,
  ActionReflector: () => ActionReflector,
  CONTROLLER_METADATA_KEY: () => CONTROLLER_METADATA_KEY,
  ControllerReflector: () => ControllerReflector,
  ControllerRegistry: () => ControllerRegistry,
  NotAControllerError: () => NotAControllerError,
  REQUEST_CONTEXT_METADATA_KEY: () => REQUEST_CONTEXT_METADATA_KEY,
  REQUEST_DATA_METADATA_KEY: () => REQUEST_DATA_METADATA_KEY,
  RequestContextReflector: () => RequestContextReflector,
  RequestDataReflector: () => RequestDataReflector,
  RequestDataSource: () => RequestDataSource,
  RestRouter: () => RestRouter,
  action: () => action,
  body: () => body,
  bodyParam: () => bodyParam,
  capitalize: () => capitalize,
  controller: () => controller,
  cookie: () => cookie,
  cookies: () => cookies,
  createDebugger: () => createDebugger,
  createError: () => createError,
  del: () => del,
  get: () => get,
  header: () => header,
  headers: () => headers,
  param: () => param,
  params: () => params,
  patch: () => patch,
  post: () => post,
  put: () => put,
  queries: () => queries,
  query: () => query,
  request: () => request,
  requestContext: () => requestContext,
  requestData: () => requestData,
  response: () => response,
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

// dist/esm/utils/create-debugger.js
var import_debug = __toESM(require("debug"), 1);
var import_js_format2 = require("@e22m4u/js-format");
function createDebugger(name) {
  const debug = (0, import_debug.default)(`tsRestRouter:${name}`);
  return function(message, ...args) {
    const interpolatedMessage = (0, import_js_format2.format)(message, ...args);
    return debug(interpolatedMessage);
  };
}
__name(createDebugger, "createDebugger");

// dist/esm/rest-router.js
var import_js_trie_router3 = require("@e22m4u/js-trie-router");

// dist/esm/debuggable-service.js
var import_js_service = require("@e22m4u/js-service");
var _DebuggableService = class _DebuggableService extends import_js_service.Service {
  /**
   * Debug.
   */
  debug;
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container) {
    super(container);
    const serviceName = toCamelCase(this.constructor.name);
    this.debug = createDebugger(serviceName);
    this.debug("%v is created.", this.constructor);
  }
};
__name(_DebuggableService, "DebuggableService");
var DebuggableService = _DebuggableService;

// dist/esm/controller-registry.js
var import_js_format4 = require("@e22m4u/js-format");
var import_js_trie_router2 = require("@e22m4u/js-trie-router");
var import_ts_data_schema2 = require("@e22m4u/ts-data-schema");
var import_ts_data_schema3 = require("@e22m4u/ts-data-schema");

// dist/esm/decorators/action/action-metadata.js
var import_ts_reflector = require("@e22m4u/ts-reflector");
var ACTIONS_METADATA_KEY = new import_ts_reflector.MetadataKey("actionsMetadataKey");

// dist/esm/decorators/action/action-reflector.js
var import_ts_reflector2 = require("@e22m4u/ts-reflector");
var _ActionReflector = class _ActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    const oldMap = import_ts_reflector2.Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    import_ts_reflector2.Reflector.defineMetadata(ACTIONS_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector2.Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, target);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_ActionReflector, "ActionReflector");
var ActionReflector = _ActionReflector;

// dist/esm/decorators/action/action-decorator.js
var import_js_trie_router = require("@e22m4u/js-trie-router");
var import_ts_reflector3 = require("@e22m4u/ts-reflector");
var import_ts_reflector4 = require("@e22m4u/ts-reflector");
function action(options) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector4.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType !== import_ts_reflector3.DecoratorTargetType.INSTANCE_METHOD)
      throw new Error("@action decorator is only supported on an instance method.");
    ActionReflector.setMetadata({ ...options, propertyKey }, target.constructor, propertyKey);
  };
}
__name(action, "action");
var get = /* @__PURE__ */ __name((path, options) => {
  return action({ ...options, path, method: import_js_trie_router.HttpMethod.GET });
}, "get");
var post = /* @__PURE__ */ __name((path, options) => {
  return action({ ...options, path, method: import_js_trie_router.HttpMethod.POST });
}, "post");
var put = /* @__PURE__ */ __name((path, options) => {
  return action({ ...options, path, method: import_js_trie_router.HttpMethod.PUT });
}, "put");
var patch = /* @__PURE__ */ __name((path, options) => {
  return action({ ...options, path, method: import_js_trie_router.HttpMethod.PATCH });
}, "patch");
var del = /* @__PURE__ */ __name((path, options) => {
  return action({ ...options, path, method: import_js_trie_router.HttpMethod.DELETE });
}, "del");

// dist/esm/decorators/controller/controller-metadata.js
var import_ts_reflector5 = require("@e22m4u/ts-reflector");
var CONTROLLER_METADATA_KEY = new import_ts_reflector5.MetadataKey("controllerMetadataKey");

// dist/esm/decorators/controller/controller-decorator.js
var import_ts_reflector7 = require("@e22m4u/ts-reflector");
var import_ts_reflector8 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/controller/controller-reflector.js
var import_ts_reflector6 = require("@e22m4u/ts-reflector");
var _ControllerReflector = class _ControllerReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata, target) {
    return import_ts_reflector6.Reflector.defineMetadata(CONTROLLER_METADATA_KEY, metadata, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    return import_ts_reflector6.Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, target);
  }
};
__name(_ControllerReflector, "ControllerReflector");
var ControllerReflector = _ControllerReflector;

// dist/esm/decorators/controller/controller-decorator.js
function controller(options) {
  return function(target) {
    const decoratorType = (0, import_ts_reflector8.getDecoratorTargetType)(target);
    if (decoratorType !== import_ts_reflector7.DecoratorTargetType.CONSTRUCTOR)
      throw new Error("@controller decorator is only supported on a class.");
    ControllerReflector.setMetadata({ ...options, className: target.name }, target);
  };
}
__name(controller, "controller");

// dist/esm/decorators/request-data/request-data-metadata.js
var import_ts_reflector9 = require("@e22m4u/ts-reflector");
var RequestDataSource;
(function(RequestDataSource2) {
  RequestDataSource2["PARAMS"] = "params";
  RequestDataSource2["QUERY"] = "query";
  RequestDataSource2["HEADERS"] = "headers";
  RequestDataSource2["COOKIE"] = "cookie";
  RequestDataSource2["BODY"] = "body";
})(RequestDataSource || (RequestDataSource = {}));
var REQUEST_DATA_METADATA_KEY = new import_ts_reflector9.MetadataKey("requestDataMetadataKey");

// dist/esm/decorators/request-data/request-data-decorator.js
var import_ts_data_schema = require("@e22m4u/ts-data-schema");
var import_ts_reflector11 = require("@e22m4u/ts-reflector");
var import_ts_reflector12 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/request-data/request-data-reflector.js
var import_ts_reflector10 = require("@e22m4u/ts-reflector");
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
    const oldMap = import_ts_reflector10.Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
    const newMap = new Map(oldMap);
    newMap.set(index, metadata);
    import_ts_reflector10.Reflector.defineMetadata(REQUEST_DATA_METADATA_KEY, newMap, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector10.Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RequestDataReflector, "RequestDataReflector");
var RequestDataReflector = _RequestDataReflector;

// dist/esm/decorators/request-data/request-data-decorator.js
function requestData(options) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector12.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector11.DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
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
function createRequestPropertyDecoratorWithSource(source) {
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
__name(createRequestPropertyDecoratorWithSource, "createRequestPropertyDecoratorWithSource");
var params = createRequestDataDecoratorWithSource(RequestDataSource.PARAMS);
var param = createRequestPropertyDecoratorWithSource(RequestDataSource.PARAMS);
var queries = createRequestDataDecoratorWithSource(RequestDataSource.QUERY);
var query = createRequestPropertyDecoratorWithSource(RequestDataSource.QUERY);
var headers = createRequestDataDecoratorWithSource(RequestDataSource.HEADERS);
var header = createRequestPropertyDecoratorWithSource(RequestDataSource.HEADERS);
var cookies = createRequestDataDecoratorWithSource(RequestDataSource.COOKIE);
var cookie = createRequestPropertyDecoratorWithSource(RequestDataSource.COOKIE);
var bodyParam = createRequestPropertyDecoratorWithSource(RequestDataSource.BODY);
function body(schemaOrType) {
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
__name(body, "body");

// dist/esm/decorators/request-context/request-context-metadata.js
var import_ts_reflector13 = require("@e22m4u/ts-reflector");
var REQUEST_CONTEXT_METADATA_KEY = new import_ts_reflector13.MetadataKey("requestContextMetadataKey");

// dist/esm/decorators/request-context/request-context-decorator.js
var import_ts_reflector15 = require("@e22m4u/ts-reflector");
var import_ts_reflector16 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/request-context/request-context-reflector.js
var import_ts_reflector14 = require("@e22m4u/ts-reflector");
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
    const oldMap = import_ts_reflector14.Reflector.getOwnMetadata(REQUEST_CONTEXT_METADATA_KEY, target, propertyKey);
    const newMap = new Map(oldMap);
    newMap.set(index, metadata);
    import_ts_reflector14.Reflector.defineMetadata(REQUEST_CONTEXT_METADATA_KEY, newMap, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector14.Reflector.getOwnMetadata(REQUEST_CONTEXT_METADATA_KEY, target, propertyKey);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RequestContextReflector, "RequestContextReflector");
var RequestContextReflector = _RequestContextReflector;

// dist/esm/decorators/request-context/request-context-decorator.js
function requestContext(property) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector16.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector15.DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
      throw new Error("@requestContext decorator is only supported on an instance method parameter.");
    RequestContextReflector.setMetadata({ property }, target.constructor, indexOrDescriptor, propertyKey);
  };
}
__name(requestContext, "requestContext");
function request() {
  return requestContext("req");
}
__name(request, "request");
function response() {
  return requestContext("res");
}
__name(response, "response");

// dist/esm/errors/not-a-controller-error.js
var import_js_format3 = require("@e22m4u/js-format");
var _NotAControllerError = class _NotAControllerError extends import_js_format3.Errorf {
  /**
   * Constructor.
   *
   * @param value
   */
  constructor(value) {
    super("%v is not a controller, do use @controller decorator on it.", value);
  }
};
__name(_NotAControllerError, "NotAControllerError");
var NotAControllerError = _NotAControllerError;

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
    if (this.hasController(ctor))
      throw new import_js_format4.Errorf("The controller %v is already registered.");
    const controllerMd = ControllerReflector.getMetadata(ctor);
    if (!controllerMd)
      throw new NotAControllerError(ctor);
    this.debug("Adding controller %s.", ctor.name);
    const pathPrefix = this.getPathPrefixByControllerMetadata(controllerMd, options);
    this.debug("Path prefix is %v.", pathPrefix);
    const preHandlers = this.getPreHandlersByControllerMetadata(controllerMd, options);
    this.debug("%v total pre-handlers found.", preHandlers.length);
    const postHandlers = this.getPostHandlersByControllerMetadata(controllerMd, options);
    this.debug("%v total post-handlers found.", postHandlers.length);
    const actionsMd = ActionReflector.getMetadata(ctor);
    this.debug("%v actions found.", actionsMd.size);
    const router = this.getService(import_js_trie_router2.TrieRouter);
    actionsMd.forEach((actionMd, actionName) => {
      this.debug("Adding route for %s.%s.", ctor.name, actionName);
      this.debug("Route path is %v.", actionMd.path);
      const prefixedRoutePath = `${pathPrefix}/${actionMd.path}`.replace(/\/\//g, "/");
      this.debug("Prefixed route path is %v.", prefixedRoutePath);
      const actionPreHandlers = Array.isArray(actionMd.before) ? actionMd.before : actionMd.before ? [actionMd.before] : [];
      this.debug("%v action pre-handlers found.", actionPreHandlers.length);
      const mergedPreHandlers = [...preHandlers, ...actionPreHandlers];
      const actionPostHandlers = Array.isArray(actionMd.after) ? actionMd.after : actionMd.after ? [actionMd.after] : [];
      this.debug("%v action post-handlers found.", actionPostHandlers.length);
      const mergedPostHandlers = [...postHandlers, ...actionPostHandlers];
      const routeHandler = this.createRouteHandler(ctor, actionName);
      router.defineRoute({
        method: actionMd.method,
        path: prefixedRoutePath,
        preHandler: mergedPreHandlers,
        handler: routeHandler,
        postHandler: mergedPostHandlers
      });
      this.debug("Route %s %v is added.", actionMd.method.toUpperCase(), prefixedRoutePath);
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
   * Get path prefix by controller metadata.
   *
   * @param controllerMd
   * @param options
   */
  getPathPrefixByControllerMetadata(controllerMd, options) {
    const rootPathPrefix = (options == null ? void 0 : options.pathPrefix) || "";
    this.debug("Root path prefix is %v.", rootPathPrefix);
    const controllerPathPrefix = controllerMd.path || "";
    this.debug("Controller path prefix is %v.", controllerPathPrefix);
    const mergedPathPrefix = `/${rootPathPrefix}/${controllerPathPrefix}`.replace(/\/\//g, "/").replace(/\/$/, "");
    this.debug("Merged path prefix is %v.", mergedPathPrefix);
    return mergedPathPrefix;
  }
  /**
   * Get pre-handlers by controller metadata.
   *
   * @param controllerMd
   * @param options
   */
  getPreHandlersByControllerMetadata(controllerMd, options) {
    let rootPreHandlers = [];
    if (options == null ? void 0 : options.before)
      rootPreHandlers = Array.isArray(options == null ? void 0 : options.before) ? options.before : [options.before];
    this.debug("%v root pre-handlers found.", rootPreHandlers.length);
    let ctlPreHandlers = [];
    if (controllerMd.before)
      ctlPreHandlers = Array.isArray(controllerMd.before) ? controllerMd.before : [controllerMd.before];
    this.debug("%v controller pre-handlers found.", ctlPreHandlers.length);
    const mergedPreHandlers = [...rootPreHandlers, ...ctlPreHandlers];
    this.debug("%v merged pre-handlers.", mergedPreHandlers.length);
    return mergedPreHandlers;
  }
  /**
   * Get post-handlers by controller metadata.
   *
   * @param controllerMd
   * @param options
   */
  getPostHandlersByControllerMetadata(controllerMd, options) {
    let rootPostHandlers = [];
    if (options == null ? void 0 : options.after)
      rootPostHandlers = Array.isArray(options.after) ? options.after : [options.after];
    this.debug("%v root post-handlers found.", rootPostHandlers.length);
    let ctlPostHandlers = [];
    if (controllerMd.after)
      ctlPostHandlers = Array.isArray(controllerMd.after) ? controllerMd.after : [controllerMd.after];
    this.debug("%v controller post-handlers found.", ctlPostHandlers.length);
    const mergedPostHandlers = [...rootPostHandlers, ...ctlPostHandlers];
    this.debug("%v merged post-handlers.", mergedPostHandlers.length);
    return mergedPostHandlers;
  }
  /**
   * Create route handler.
   *
   * @param controllerCtor
   * @param actionName
   * @protected
   */
  createRouteHandler(controllerCtor, actionName) {
    this.debug("Creating route handler for %s.%s.", controllerCtor.name, actionName);
    const requestContextMetadataMap = RequestContextReflector.getMetadata(controllerCtor, actionName);
    const requestDataMetadataMap = RequestDataReflector.getMetadata(controllerCtor, actionName);
    const argsNumber = controllerCtor.prototype[actionName].length;
    const dataTypeCaster = this.getService(import_ts_data_schema3.DataTypeCaster);
    const dataValidator = this.getService(import_ts_data_schema2.DataValidator);
    return (requestContext2) => {
      this.debug("Executing route handler for %s.%s.", controllerCtor.name, actionName);
      const args = Array(argsNumber).fill(void 0).map((_, index) => {
        const requestContextMd = requestContextMetadataMap.get(index);
        if (requestContextMd != null) {
          this.debug("Argument %v has request context metadata.", index);
          if (requestContextMd.property == null) {
            this.debug("Request context property is not specified.");
            this.debug("Argument %v is set to %v.", index, requestContext2);
            return requestContext2;
          }
          const propName = requestContextMd.property;
          const propValue = requestContext2[propName];
          this.debug("Request context property is %v.", propName);
          this.debug("Argument %v is set to %v.", index, propValue);
          return propValue;
        } else {
          this.debug("No RequestContextMetadata specified for %v argument.", index);
        }
        const requestDataMd = requestDataMetadataMap.get(index);
        if (requestDataMd != null) {
          this.debug("Argument %v has request data metadata.", index);
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
          this.debug("Request data source is %v.", requestDataMd.source);
          if (requestDataMd.schema) {
            data = dataTypeCaster.cast(data, requestDataMd.schema, {
              noTypeCastError: true,
              sourcePath: requestDataMd.source
            });
            this.debug("Data type casting is passed.");
            dataValidator.validate(data, requestDataMd.schema, requestDataMd.source);
            this.debug("Data validation is passed.");
          }
          if (requestDataMd.property == null) {
            this.debug("Request data property is not specified.");
            this.debug("Argument %v is set to %v.", index, data);
            return data;
          }
          const dataAsObject = data;
          const propName = requestDataMd.property;
          const propValue = dataAsObject[propName];
          this.debug("Request data property is %v.", propName);
          this.debug("Argument %v is set to %v.", index, propValue);
          return propValue;
        } else {
          this.debug("No RequestDataMetadata specified for %v argument.", index);
        }
      });
      const controller2 = this.getService(controllerCtor);
      return controller2[actionName](...args);
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
  ACTIONS_METADATA_KEY,
  ActionReflector,
  CONTROLLER_METADATA_KEY,
  ControllerReflector,
  ControllerRegistry,
  NotAControllerError,
  REQUEST_CONTEXT_METADATA_KEY,
  REQUEST_DATA_METADATA_KEY,
  RequestContextReflector,
  RequestDataReflector,
  RequestDataSource,
  RestRouter,
  action,
  body,
  bodyParam,
  capitalize,
  controller,
  cookie,
  cookies,
  createDebugger,
  createError,
  del,
  get,
  header,
  headers,
  param,
  params,
  patch,
  post,
  put,
  queries,
  query,
  request,
  requestContext,
  requestData,
  response,
  toCamelCase
});
