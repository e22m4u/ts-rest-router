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
  AFTER_METADATA_KEY: () => AFTER_METADATA_KEY,
  ActionReflector: () => ActionReflector,
  AfterReflector: () => AfterReflector,
  BEFORE_METADATA_KEY: () => BEFORE_METADATA_KEY,
  BeforeReflector: () => BeforeReflector,
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
  after: () => after,
  before: () => before,
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
var import_util = require("util");
var import_debug = __toESM(require("debug"), 1);
var import_js_format2 = require("@e22m4u/js-format");
function colorizeString(input) {
  const c = Number(import_debug.default["selectColor"](input));
  const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
  return `${colorCode};1m${input}\x1B[0m`;
}
__name(colorizeString, "colorizeString");
function createDebugger(name) {
  const debuggerName = `tsRestRouter:${name}`;
  const debug = (0, import_debug.default)(debuggerName);
  return function(messageOrData, ...args) {
    let prefix = "";
    if (typeof this === "string") {
      const isDebugUsesColors = debug.useColors;
      prefix = isDebugUsesColors ? colorizeString(`[${this}] `) : `[${this}] `;
    }
    if (typeof messageOrData === "string") {
      const interpolatedMessage = (0, import_js_format2.format)(messageOrData, ...args);
      return debug(prefix + interpolatedMessage);
    }
    const inspectOptions = {
      showHidden: false,
      depth: null,
      colors: true,
      compact: false
    };
    const multiString = (0, import_util.inspect)(messageOrData, inspectOptions);
    const rows = multiString.split("\n");
    const colorizedDebuggerName = colorizeString(debuggerName);
    [...args, ...rows].forEach((v) => console.log(`  ${colorizedDebuggerName} ${prefix}${v}`));
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
    this.debug.bind("constructor")("Service created.");
  }
};
__name(_DebuggableService, "DebuggableService");
var DebuggableService = _DebuggableService;

// dist/esm/controller-registry.js
var import_js_format4 = require("@e22m4u/js-format");
var import_js_trie_router2 = require("@e22m4u/js-trie-router");
var import_ts_data_schema2 = require("@e22m4u/ts-data-schema");

// dist/esm/decorators/after/after-metadata.js
var import_ts_reflector = require("@e22m4u/ts-reflector");
var AFTER_METADATA_KEY = new import_ts_reflector.MetadataKey("afterMetadataKey");

// dist/esm/decorators/after/after-reflector.js
var import_ts_reflector2 = require("@e22m4u/ts-reflector");
var _AfterReflector = class _AfterReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(metadata, target, propertyKey) {
    const oldArray = import_ts_reflector2.Reflector.getOwnMetadata(AFTER_METADATA_KEY, target, propertyKey) ?? [];
    const newArray = [metadata, ...oldArray];
    import_ts_reflector2.Reflector.defineMetadata(AFTER_METADATA_KEY, newArray, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector2.Reflector.getOwnMetadata(AFTER_METADATA_KEY, target, propertyKey);
    return metadata ?? [];
  }
};
__name(_AfterReflector, "AfterReflector");
var AfterReflector = _AfterReflector;

// dist/esm/decorators/after/after-decorator.js
var import_ts_reflector3 = require("@e22m4u/ts-reflector");
var import_ts_reflector4 = require("@e22m4u/ts-reflector");
function after(middleware) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector4.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType === import_ts_reflector3.DecoratorTargetType.CONSTRUCTOR) {
      AfterReflector.addMetadata({ middleware }, target);
    } else if (decoratorType === import_ts_reflector3.DecoratorTargetType.INSTANCE_METHOD) {
      AfterReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
    } else {
      throw new Error("@after decorator is only supported on a class or an instance method.");
    }
  };
}
__name(after, "after");

// dist/esm/decorators/before/before-metadata.js
var import_ts_reflector5 = require("@e22m4u/ts-reflector");
var BEFORE_METADATA_KEY = new import_ts_reflector5.MetadataKey("beforeMetadataKey");

// dist/esm/decorators/before/before-reflector.js
var import_ts_reflector6 = require("@e22m4u/ts-reflector");
var _BeforeReflector = class _BeforeReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static addMetadata(metadata, target, propertyKey) {
    const oldArray = import_ts_reflector6.Reflector.getOwnMetadata(BEFORE_METADATA_KEY, target, propertyKey) ?? [];
    const newArray = [metadata, ...oldArray];
    import_ts_reflector6.Reflector.defineMetadata(BEFORE_METADATA_KEY, newArray, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector6.Reflector.getOwnMetadata(BEFORE_METADATA_KEY, target, propertyKey);
    return metadata ?? [];
  }
};
__name(_BeforeReflector, "BeforeReflector");
var BeforeReflector = _BeforeReflector;

// dist/esm/decorators/before/before-decorator.js
var import_ts_reflector7 = require("@e22m4u/ts-reflector");
var import_ts_reflector8 = require("@e22m4u/ts-reflector");
function before(middleware) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector8.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType === import_ts_reflector7.DecoratorTargetType.CONSTRUCTOR) {
      BeforeReflector.addMetadata({ middleware }, target);
    } else if (decoratorType === import_ts_reflector7.DecoratorTargetType.INSTANCE_METHOD) {
      BeforeReflector.addMetadata({ propertyKey, middleware }, target.constructor, propertyKey);
    } else {
      throw new Error("@before decorator is only supported on a class or an instance method.");
    }
  };
}
__name(before, "before");

// dist/esm/decorators/action/action-metadata.js
var import_ts_reflector9 = require("@e22m4u/ts-reflector");
var ACTIONS_METADATA_KEY = new import_ts_reflector9.MetadataKey("actionsMetadataKey");

// dist/esm/decorators/action/action-reflector.js
var import_ts_reflector10 = require("@e22m4u/ts-reflector");
var _ActionReflector = class _ActionReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    const oldMap = import_ts_reflector10.Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    import_ts_reflector10.Reflector.defineMetadata(ACTIONS_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector10.Reflector.getOwnMetadata(ACTIONS_METADATA_KEY, target);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_ActionReflector, "ActionReflector");
var ActionReflector = _ActionReflector;

// dist/esm/decorators/action/action-decorator.js
var import_js_trie_router = require("@e22m4u/js-trie-router");
var import_ts_reflector11 = require("@e22m4u/ts-reflector");
var import_ts_reflector12 = require("@e22m4u/ts-reflector");
function action(options) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector12.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType !== import_ts_reflector11.DecoratorTargetType.INSTANCE_METHOD)
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
var import_ts_reflector13 = require("@e22m4u/ts-reflector");
var CONTROLLER_METADATA_KEY = new import_ts_reflector13.MetadataKey("controllerMetadataKey");

// dist/esm/decorators/controller/controller-decorator.js
var import_ts_reflector15 = require("@e22m4u/ts-reflector");
var import_ts_reflector16 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/controller/controller-reflector.js
var import_ts_reflector14 = require("@e22m4u/ts-reflector");
var _ControllerReflector = class _ControllerReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata, target) {
    return import_ts_reflector14.Reflector.defineMetadata(CONTROLLER_METADATA_KEY, metadata, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    return import_ts_reflector14.Reflector.getOwnMetadata(CONTROLLER_METADATA_KEY, target);
  }
};
__name(_ControllerReflector, "ControllerReflector");
var ControllerReflector = _ControllerReflector;

// dist/esm/decorators/controller/controller-decorator.js
function controller(pathOrOptions, options) {
  return function(target) {
    const decoratorType = (0, import_ts_reflector16.getDecoratorTargetType)(target);
    if (decoratorType !== import_ts_reflector15.DecoratorTargetType.CONSTRUCTOR)
      throw new Error("@controller decorator is only supported on a class.");
    if (typeof pathOrOptions === "string") {
      if (!options) {
        options = { path: pathOrOptions };
      } else {
        options.path = pathOrOptions;
      }
    } else if (typeof pathOrOptions === "object") {
      options = pathOrOptions;
    }
    ControllerReflector.setMetadata({ ...options, className: target.name }, target);
  };
}
__name(controller, "controller");

// dist/esm/decorators/request-data/request-data-metadata.js
var import_ts_reflector17 = require("@e22m4u/ts-reflector");
var RequestDataSource;
(function(RequestDataSource2) {
  RequestDataSource2["PARAMS"] = "params";
  RequestDataSource2["QUERY"] = "query";
  RequestDataSource2["HEADERS"] = "headers";
  RequestDataSource2["COOKIE"] = "cookie";
  RequestDataSource2["BODY"] = "body";
})(RequestDataSource || (RequestDataSource = {}));
var REQUEST_DATA_METADATA_KEY = new import_ts_reflector17.MetadataKey("requestDataMetadataKey");

// dist/esm/decorators/request-data/request-data-decorator.js
var import_ts_data_schema = require("@e22m4u/ts-data-schema");
var import_ts_reflector19 = require("@e22m4u/ts-reflector");
var import_ts_reflector20 = require("@e22m4u/ts-reflector");

// dist/esm/decorators/request-data/request-data-reflector.js
var import_ts_reflector18 = require("@e22m4u/ts-reflector");
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
    const oldMap = import_ts_reflector18.Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
    const newMap = new Map(oldMap);
    newMap.set(index, metadata);
    import_ts_reflector18.Reflector.defineMetadata(REQUEST_DATA_METADATA_KEY, newMap, target, propertyKey);
  }
  /**
   * Get metadata.
   *
   * @param target
   * @param propertyKey
   */
  static getMetadata(target, propertyKey) {
    const metadata = import_ts_reflector18.Reflector.getOwnMetadata(REQUEST_DATA_METADATA_KEY, target, propertyKey);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RequestDataReflector, "RequestDataReflector");
var RequestDataReflector = _RequestDataReflector;

// dist/esm/decorators/request-data/request-data-decorator.js
function requestData(options) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector20.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector19.DecoratorTargetType.INSTANCE_METHOD_PARAMETER)
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
var params = createRequestDataDecoratorWithSource(RequestDataSource.PARAMS);
var param = createRequestDataPropertyDecoratorWithSource(RequestDataSource.PARAMS);
var queries = createRequestDataDecoratorWithSource(RequestDataSource.QUERY);
var query = createRequestDataPropertyDecoratorWithSource(RequestDataSource.QUERY);
var headers = createRequestDataDecoratorWithSource(RequestDataSource.HEADERS);
var header = createRequestDataPropertyDecoratorWithSource(RequestDataSource.HEADERS);
var cookies = createRequestDataDecoratorWithSource(RequestDataSource.COOKIE);
var cookie = createRequestDataPropertyDecoratorWithSource(RequestDataSource.COOKIE);
var bodyParam = createRequestDataPropertyDecoratorWithSource(RequestDataSource.BODY);
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
function request() {
  return requestContext("req");
}
__name(request, "request");
function response() {
  return requestContext("res");
}
__name(response, "response");

// dist/esm/controller-registry.js
var import_ts_data_schema3 = require("@e22m4u/ts-data-schema");

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
    const debug = this.debug.bind(this.addController.name);
    if (this.hasController(ctor))
      throw new import_js_format4.Errorf("The controller %v is already registered.");
    const controllerMd = ControllerReflector.getMetadata(ctor);
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
    const actionsMd = ActionReflector.getMetadata(ctor);
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
    const debug = this.debug.bind(this.getPathPrefixFromControllerRootOptions.name);
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
    const debug = this.debug.bind(this.getPathPrefixFromControllerMetadata.name);
    debug("Getting path prefix from @controller metadata.");
    debug("Metadata target is %s.", ctor.name);
    const md = ControllerReflector.getMetadata(ctor);
    if (!md)
      throw new import_js_format4.Errorf("Controller %v has no metadata.", ctor);
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
    const debug = this.debug.bind(this.getPreHandlersFromControllerRootOptions.name);
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
    const debug = this.debug.bind(this.getPostHandlersFromControllerRootOptions.name);
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
    const debug = this.debug.bind(this.getPreHandlersFromBeforeMetadata.name);
    debug("Getting pre-handlers from @before metadata.");
    if (actionName) {
      debug("Target is %s.%s.", ctor.name, actionName);
    } else {
      debug("Target is %s.", ctor.name);
    }
    let preHandlers = [];
    const mdArray = BeforeReflector.getMetadata(ctor, actionName);
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
    const debug = this.debug.bind(this.getPostHandlersFromAfterMetadata.name);
    debug("Getting post-handlers from @after metadata.");
    if (actionName) {
      debug("Target is %s.%s.", ctor.name, actionName);
    } else {
      debug("Target is %s.", ctor.name);
    }
    let res = [];
    const mdArray = AfterReflector.getMetadata(ctor, actionName);
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
    const debug = this.debug.bind(this.getPreHandlersFromControllerMetadata.name);
    debug("Getting pre-handlers from @controller metadata.");
    debug("Target is %s.", ctor.name);
    const md = ControllerReflector.getMetadata(ctor);
    if (!md)
      throw new import_js_format4.Errorf("Controller %v has no metadata.", ctor);
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
    const debug = this.debug.bind(this.getPostHandlersFromControllerMetadata.name);
    debug("Getting post-handlers from @controller metadata.");
    const md = ControllerReflector.getMetadata(ctor);
    if (!md)
      throw new import_js_format4.Errorf("Controller %v has no metadata.", ctor);
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
    const debug = this.debug.bind(this.getPreHandlersFromActionMetadata.name);
    debug("Getting pre-handlers from @action metadata.");
    const actionsMd = ActionReflector.getMetadata(ctor);
    const actionMd = actionsMd.get(actionName);
    if (!actionMd)
      throw new import_js_format4.Errorf("Action %s.%s has no metadata.", ctor.name, actionName);
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
    const debug = this.debug.bind(this.getPreHandlersFromActionMetadata.name);
    debug("Getting post-handlers from @action metadata.");
    const actionsMd = ActionReflector.getMetadata(ctor);
    const actionMd = actionsMd.get(actionName);
    if (!actionMd)
      throw new import_js_format4.Errorf("Action %s.%s has no metadata.", ctor.name, actionName);
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
    const debug = this.debug.bind(this.createRouteHandler.name);
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
  AFTER_METADATA_KEY,
  ActionReflector,
  AfterReflector,
  BEFORE_METADATA_KEY,
  BeforeReflector,
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
  after,
  before,
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
