import {AnyObject} from './types.js';
import {Constructor} from './types.js';
import {Errorf} from '@e22m4u/js-format';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {RouteHandler} from '@e22m4u/js-trie-router';
import {DataValidator} from '@e22m4u/ts-data-schema';
import {DataTypeCaster} from '@e22m4u/ts-data-schema';
import {NotAControllerError} from './errors/index.js';
import {RequestContext} from '@e22m4u/js-trie-router';
import {RoutePreHandler} from '@e22m4u/js-trie-router';
import {RoutePostHandler} from '@e22m4u/js-trie-router';
import {RequestDataSource} from './decorators/index.js';
import {DebuggableService} from './debuggable-service.js';
import {RestActionReflector} from './decorators/index.js';
import {RequestDataReflector} from './decorators/index.js';
import {AfterActionReflector} from './decorators/index.js';
import {DefaultValuesApplier} from '@e22m4u/ts-data-schema';
import {BeforeActionReflector} from './decorators/index.js';
import {RestControllerReflector} from './decorators/index.js';
import {RequestContextReflector} from './decorators/index.js';

/**
 * Controller root options.
 */
export type ControllerRootOptions = {
  pathPrefix?: string;
  before?: RoutePreHandler | RoutePreHandler[];
  after?: RoutePostHandler | RoutePostHandler[];
};

/**
 * В данном Map ключом является контроллер, а значением
 * его опции верхнего уровня, которые могут отсутствовать,
 * если пользователь их не определил.
 */
export type ControllerRootOptionsMap = Map<
  Constructor<object>,
  ControllerRootOptions | undefined
>;

/**
 * Controller registry.
 */
export class ControllerRegistry extends DebuggableService {
  /**
   * Controller map.
   */
  controllerMap: ControllerRootOptionsMap = new Map();

  /**
   * Add controller.
   *
   * @param ctor
   * @param options
   */
  addController<T extends object>(
    ctor: Constructor<T>,
    options?: ControllerRootOptions,
  ): this {
    const debug = this.getDebuggerFor(this.addController);
    // проверка повторной регистрации помогает
    // заметить ошибку в коде, который использует
    // интерфейс данного сервиса
    if (this.hasController(ctor))
      throw new Errorf('The controller %v is already registered.');
    // так как контроллером может быть любой
    // класс, выполняется проверка на наличие
    // метаданных применяемых декоратором
    const controllerMd = RestControllerReflector.getMetadata(ctor);
    if (!controllerMd) throw new NotAControllerError(ctor);
    debug('Adding controller %s.', ctor.name);
    // определение префикса применяемого
    // к маршрутам контроллера
    let pathPrefix = '';
    pathPrefix += this.getPathPrefixFromControllerRootOptions(options);
    pathPrefix += '/';
    pathPrefix += this.getPathPrefixFromControllerMetadata(ctor);
    pathPrefix = pathPrefix.replace(/\/{2,}/g, '/').replace(/\/$/, '');
    debug('Controller path prefix is %v.', pathPrefix);
    // подготовка pre-обработчиков
    const preHandlers = [
      ...this.getPreHandlersFromControllerRootOptions(options),
      ...this.getPreHandlersFromBeforeMetadata(ctor),
      ...this.getPreHandlersFromControllerMetadata(ctor),
    ];
    debug('Controller has %v pre-handlers.', preHandlers.length);
    // подготовка post-обработчиков
    const postHandlers = [
      ...this.getPostHandlersFromControllerRootOptions(options),
      ...this.getPostHandlersFromAfterMetadata(ctor),
      ...this.getPostHandlersFromControllerMetadata(ctor),
    ];
    debug('Controller has %v post-handlers.', postHandlers.length);
    // обход всех операций контроллера
    // для определения маршрутов
    const actionsMd = RestActionReflector.getMetadata(ctor);
    debug('%v actions found.', actionsMd.size);
    const router = this.getService(TrieRouter);
    actionsMd.forEach((actionMd, actionName) => {
      debug('Adding route for %s.%s.', ctor.name, actionName);
      // подготовка пути маршрута с префиксом
      debug('Route path is %v.', actionMd.path);
      const prefixedRoutePath = `${pathPrefix}/${actionMd.path}`
        .replace(/\/{2,}/g, '/')
        .replace(/\/$/, '');
      debug('Prefixed route path is %v.', prefixedRoutePath);
      // подготовка pre-обработчиков операции
      const actionPreHandlers = [
        ...preHandlers,
        ...this.getPreHandlersFromBeforeMetadata(ctor, actionName),
        ...this.getPreHandlersFromActionMetadata(ctor, actionName),
      ];
      debug('%v action pre-handlers in total.', actionPreHandlers.length);
      // подготовка post-обработчиков операции
      const actionPostHandlers = [
        ...postHandlers,
        ...this.getPostHandlersFromAfterMetadata(ctor, actionName),
        ...this.getPostHandlersFromActionMetadata(ctor, actionName),
      ];
      debug('%v action post-handlers in total.', actionPostHandlers.length);
      // подготовка обработчика маршрута
      const routeHandler = this.createRouteHandler(ctor, actionName);
      router.defineRoute({
        method: actionMd.method,
        path: prefixedRoutePath,
        preHandler: actionPreHandlers,
        handler: routeHandler,
        postHandler: actionPostHandlers,
      });
      debug(
        'Route %s %v is added.',
        actionMd.method.toUpperCase(),
        prefixedRoutePath,
      );
    });
    this.controllerMap.set(ctor, options);
    return this;
  }

  /**
   * Has controller.
   *
   * @param ctor
   */
  hasController<T extends object>(ctor: Constructor<T>) {
    return this.controllerMap.has(ctor);
  }

  /**
   * Get path prefix from controller root options.
   *
   * @param options
   */
  protected getPathPrefixFromControllerRootOptions(
    options?: ControllerRootOptions,
  ) {
    const debug = this.getDebuggerFor(
      this.getPathPrefixFromControllerRootOptions,
    );
    debug('Getting path prefix from controller root options.');
    const res = options?.pathPrefix || '';
    debug('Controller path prefix is %v.', res);
    return res;
  }

  /**
   * Get path prefix from controller metadata.
   *
   * @param ctor
   */
  protected getPathPrefixFromControllerMetadata<T>(ctor: Constructor<T>) {
    const debug = this.getDebuggerFor(this.getPathPrefixFromControllerMetadata);
    debug('Getting path prefix from @restController metadata.');
    debug('Metadata target is %s.', ctor.name);
    const md = RestControllerReflector.getMetadata(ctor);
    if (!md) throw new Errorf('Controller %v has no metadata.', ctor);
    const res = md.path || '';
    debug('Controller path prefix is %v.', res);
    return md.path || '';
  }

  /**
   * Getting pre-handlers from controller root options.
   *
   * @param options
   */
  protected getPreHandlersFromControllerRootOptions(
    options?: ControllerRootOptions,
  ) {
    const debug = this.getDebuggerFor(
      this.getPreHandlersFromControllerRootOptions,
    );
    debug('Getting pre-handlers from controller root options.');
    let res: RoutePreHandler[] = [];
    if (options?.before)
      res = Array.isArray(options.before) ? options.before : [options.before];
    debug('%v pre-handlers found.', res.length);
    return res;
  }

  /**
   * Getting post-handlers from controller root options.
   *
   * @param options
   */
  protected getPostHandlersFromControllerRootOptions(
    options?: ControllerRootOptions,
  ) {
    const debug = this.getDebuggerFor(
      this.getPostHandlersFromControllerRootOptions,
    );
    debug('Getting post-handlers from controller root options.');
    let res: RoutePostHandler[] = [];
    if (options?.after)
      res = Array.isArray(options.after) ? options.after : [options.after];
    debug('%v post-handlers found.', res.length);
    return res;
  }

  /**
   * Get pre-handlers from before metadata.
   *
   * @param ctor
   * @param actionName
   */
  protected getPreHandlersFromBeforeMetadata<T>(
    ctor: Constructor<T>,
    actionName?: string,
  ) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromBeforeMetadata);
    debug('Getting pre-handlers from @before metadata.');
    if (actionName) {
      debug('Target is %s.%s.', ctor.name, actionName);
    } else {
      debug('Target is %s.', ctor.name);
    }
    let preHandlers: RoutePreHandler[] = [];
    const mdArray = BeforeActionReflector.getMetadata(ctor, actionName);
    mdArray.forEach(md => {
      if (Array.isArray(md.middleware)) {
        preHandlers = [...preHandlers, ...md.middleware];
      } else {
        preHandlers.push(md.middleware);
      }
    });
    if (mdArray.length) {
      debug('%v pre-handlers found.', mdArray.length);
    } else {
      debug('No pre-handlers found.');
    }
    return preHandlers;
  }

  /**
   * Get post-handlers from after metadata.
   *
   * @param ctor
   * @param actionName
   */
  protected getPostHandlersFromAfterMetadata<T>(
    ctor: Constructor<T>,
    actionName?: string,
  ) {
    const debug = this.getDebuggerFor(this.getPostHandlersFromAfterMetadata);
    debug('Getting post-handlers from @after metadata.');
    if (actionName) {
      debug('Target is %s.%s.', ctor.name, actionName);
    } else {
      debug('Target is %s.', ctor.name);
    }
    let res: RoutePostHandler[] = [];
    const mdArray = AfterActionReflector.getMetadata(ctor, actionName);
    mdArray.forEach(md => {
      if (Array.isArray(md.middleware)) {
        res = [...res, ...md.middleware];
      } else {
        res.push(md.middleware);
      }
    });
    if (mdArray.length) {
      debug('%v post-handlers found.', mdArray.length);
    } else {
      debug('No post-handlers found.');
    }
    return res;
  }

  /**
   * Get pre-handlers from controller metadata.
   *
   * @param ctor
   */
  protected getPreHandlersFromControllerMetadata<T>(ctor: Constructor<T>) {
    const debug = this.getDebuggerFor(
      this.getPreHandlersFromControllerMetadata,
    );
    debug('Getting pre-handlers from @restController metadata.');
    debug('Target is %s.', ctor.name);
    const md = RestControllerReflector.getMetadata(ctor);
    if (!md) throw new Errorf('Controller %v has no metadata.', ctor);
    let res: RoutePreHandler[] = [];
    if (md.before) res = Array.isArray(md.before) ? md.before : [md.before];
    debug('%v pre-handlers found.', res.length);
    return res;
  }

  /**
   * Get post-handlers from controller metadata.
   *
   * @param ctor
   */
  protected getPostHandlersFromControllerMetadata<T>(ctor: Constructor<T>) {
    const debug = this.getDebuggerFor(
      this.getPostHandlersFromControllerMetadata,
    );
    debug('Getting post-handlers from @restController metadata.');
    const md = RestControllerReflector.getMetadata(ctor);
    if (!md) throw new Errorf('Controller %v has no metadata.', ctor);
    let res: RoutePostHandler[] = [];
    if (md.after) res = Array.isArray(md.after) ? md.after : [md.after];
    debug('%v post-handlers found.', res.length);
    return res;
  }

  /**
   * Get pre-handlers from action metadata.
   *
   * @param ctor
   * @param actionName
   */
  protected getPreHandlersFromActionMetadata<T>(
    ctor: Constructor<T>,
    actionName: string,
  ) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromActionMetadata);
    debug('Getting pre-handlers from @action metadata.');
    const actionsMd = RestActionReflector.getMetadata(ctor);
    const actionMd = actionsMd.get(actionName);
    if (!actionMd)
      throw new Errorf('Action %s.%s has no metadata.', ctor.name, actionName);
    let res: RoutePreHandler[] = [];
    if (actionMd.before)
      res = Array.isArray(actionMd.before)
        ? actionMd.before
        : [actionMd.before];
    debug('%v pre-handlers found.', res.length);
    return res;
  }

  /**
   * Get post-handlers from action metadata.
   *
   * @param ctor
   * @param actionName
   */
  protected getPostHandlersFromActionMetadata<T>(
    ctor: Constructor<T>,
    actionName: string,
  ) {
    const debug = this.getDebuggerFor(this.getPreHandlersFromActionMetadata);
    debug('Getting post-handlers from @action metadata.');
    const actionsMd = RestActionReflector.getMetadata(ctor);
    const actionMd = actionsMd.get(actionName);
    if (!actionMd)
      throw new Errorf('Action %s.%s has no metadata.', ctor.name, actionName);
    let res: RoutePostHandler[] = [];
    if (actionMd.after)
      res = Array.isArray(actionMd.after) ? actionMd.after : [actionMd.after];
    debug('%v pre-handlers found.', res.length);
    return res;
  }

  /**
   * Create route handler.
   *
   * @param controllerCtor
   * @param actionName
   * @protected
   */
  protected createRouteHandler<T extends object>(
    controllerCtor: Constructor<T>,
    actionName: string,
  ): RouteHandler {
    const debug = this.getDebuggerFor(this.createRouteHandler);
    debug('Creating route handler for %s.%s.', controllerCtor.name, actionName);
    const requestContextMetadataMap = RequestContextReflector.getMetadata(
      controllerCtor,
      actionName,
    );
    const requestDataMetadataMap = RequestDataReflector.getMetadata(
      controllerCtor,
      actionName,
    );
    const argsNumber = controllerCtor.prototype[actionName].length;
    const defaultsApplier = this.getService(DefaultValuesApplier);
    const dataTypeCaster = this.getService(DataTypeCaster);
    const dataValidator = this.getService(DataValidator);
    return (requestContext: RequestContext) => {
      debug(
        'Executing route handler for %s.%s.',
        controllerCtor.name,
        actionName,
      );
      const args = Array(argsNumber)
        .fill(undefined)
        .map((_, index) => {
          // заполнение аргументов операции
          // значениями из контекста запроса
          const requestContextMd = requestContextMetadataMap.get(index);
          if (requestContextMd != null) {
            debug('Argument %v has request context metadata.', index);
            // если свойство контекста не определено,
            // то используем весь объект контекста
            // в качестве значения текущего аргумента
            if (requestContextMd.property == null) {
              debug('Request context property is not specified.');
              debug('Argument %v is set to %v.', index, requestContext);
              return requestContext;
            }
            // если свойство контекста определено,
            // то используем значение этого свойства
            // в качестве текущего аргумента
            const propName = requestContextMd.property;
            const propValue = requestContext[propName];
            debug('Request context property is %v.', propName);
            debug('Argument %v is set to %v.', index, propValue);
            return propValue;
          } else {
            debug(
              'No RequestContextMetadata specified for %v argument.',
              index,
            );
          }
          // заполнение аргументов операции
          // значениями из данных запроса
          const requestDataMd = requestDataMetadataMap.get(index);
          if (requestDataMd != null) {
            debug('Argument %v has request data metadata.', index);
            // получение данных
            // согласно источнику
            let data: unknown;
            switch (requestDataMd.source) {
              case RequestDataSource.PARAMS:
                data = requestContext.params;
                break;
              case RequestDataSource.QUERY:
                data = requestContext.query;
                break;
              case RequestDataSource.HEADERS:
                data = requestContext.headers;
                break;
              case RequestDataSource.COOKIE:
                data = requestContext.cookie;
                break;
              case RequestDataSource.BODY:
                data = requestContext.body;
                break;
            }
            debug('Request data source is %v.', requestDataMd.source);
            // при наличии схемы данных применяются значения
            // по умолчанию, выполняется конвертация входящего
            // значения и валидация согласно схеме
            if (requestDataMd.schema) {
              data = defaultsApplier.applyDefaultValuesIfNeeded(
                data,
                requestDataMd.schema,
                requestDataMd.source,
              );
              debug('Default values applied.');
              data = dataTypeCaster.cast(data, requestDataMd.schema, {
                noTypeCastError: true,
                sourcePath: requestDataMd.source,
              });
              debug('Data type casting applied.');
              dataValidator.validate(
                data,
                requestDataMd.schema,
                requestDataMd.source,
              );
              debug('Data validation passed.');
            }
            // если свойство данных не определено,
            // то используем весь объекта данных
            // в качестве значения текущего аргумента
            if (requestDataMd.property == null) {
              debug('Request data property is not specified.');
              debug('Argument %v is set to %v.', index, data);
              return data;
            }
            // если свойство данных определено,
            // то используем значение этого свойства
            // в качестве текущего аргумента
            const dataAsObject = data as Record<string, unknown>;
            const propName = requestDataMd.property;
            const propValue = dataAsObject[propName];
            debug('Request data property is %v.', propName);
            debug('Argument %v is set to %v.', index, propValue);
            return propValue;
          } else {
            debug('No RequestDataMetadata specified for %v argument.', index);
          }
        });
      // выполнение операции контроллера
      if (requestContext.container.has(controllerCtor))
        throw new Errorf(
          'The controller %v is already registered, which breaks ' +
            'controller isolation per request.',
          controllerCtor.name,
        );
      const controller = requestContext.container.get(controllerCtor);
      return (controller as AnyObject)[actionName](...args);
    };
  }
}
