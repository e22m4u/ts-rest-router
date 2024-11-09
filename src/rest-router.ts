import {AnyObject} from './types.js';
import {Constructor} from './types.js';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {RouteHandler} from '@e22m4u/js-trie-router';
import {DataValidator} from '@e22m4u/ts-data-schema';
import {RequestContext} from '@e22m4u/js-trie-router';
import {DataTypeCaster} from '@e22m4u/ts-data-schema';
import {ActionReflector} from './decorators/index.js';
import {NotAControllerError} from './errors/index.js';
import {RoutePreHandler} from '@e22m4u/js-trie-router';
import {RoutePostHandler} from '@e22m4u/js-trie-router';
import {RequestDataSource} from './decorators/index.js';
import {DebuggableService} from './debuggable-service.js';
import {ControllerReflector} from './decorators/index.js';
import {RequestDataReflector} from './decorators/index.js';
import {RequestContextReflector} from './decorators/index.js';

/**
 * Controller extra options.
 */
export type ControllerExtraOptions = {
  pathPrefix?: string;
  before?: RoutePreHandler | RoutePreHandler[],
  after?: RoutePostHandler | RoutePostHandler[],
}

/**
 * Rest router.
 */
export class RestRouter extends DebuggableService {
  /**
   * Add controller.
   *
   * @param ctor
   * @param options
   */
  addController<T extends object>(
    ctor: Constructor<T>,
    options?: ControllerExtraOptions,
  ): this {
    const controllerMd = ControllerReflector.getMetadata(ctor);
    if (!controllerMd) throw new NotAControllerError(ctor);
    this.debug('Adding controller %s.', ctor.name);
    // определение префикса применяемого
    // к маршрутам контроллера
    const extraPathPrefix = options?.pathPrefix || '';
    this.debug('Extra path prefix is %v.', extraPathPrefix);
    const controllerPathPrefix = controllerMd.path || '';
    this.debug('Controller path prefix is %v.', controllerPathPrefix);
    const mergedPathPrefix = `${extraPathPrefix}/${controllerPathPrefix}`
      .replace(/\/\//g, '/');
    this.debug('Merged path prefix is %v.', mergedPathPrefix);
    // подготовка дополнительных
    // pre-обработчиков запроса
    let extraPreHandlers: RoutePreHandler[] = [];
    if (options?.before)
      extraPreHandlers = Array.isArray(options?.before)
        ? options.before
        : [options.before];
    this.debug('%v extra pre-handlers found.', extraPreHandlers.length);
    // подготовка дополнительных
    // post-обработчиков запроса
    let extraPostHandlers: RoutePostHandler[] = [];
    if (options?.after)
      extraPostHandlers = Array.isArray(options.after)
        ? options.after
        : [options.after];
    this.debug('%v extra post-handlers found.', extraPostHandlers.length);
    // подготовка pre-обработчиков
    // запроса контроллера
    let ctlPreHandlers: RoutePreHandler[] = [];
    if (controllerMd.before)
      ctlPreHandlers = Array.isArray(controllerMd.before)
        ? controllerMd.before
        : [controllerMd.before];
    this.debug('%v controller pre-handlers found.', ctlPreHandlers.length);
    // подготовка post-обработчиков
    // запроса контроллера
    let ctlPostHandlers: RoutePostHandler[] = [];
    if (controllerMd.after)
      ctlPostHandlers = Array.isArray(controllerMd.after)
        ? controllerMd.after
        : [controllerMd.after];
    this.debug('%v controller post-handlers found.', ctlPostHandlers.length);
    // подготовка объединенного набора
    // pre-обработчиков запроса
    const mergedPreHandlers = [...extraPreHandlers, ...ctlPreHandlers];
    this.debug('%v merged pre-handlers.', mergedPreHandlers.length);
    // подготовка объединенного набора
    // post-обработчиков запроса
    const mergedPostHandlers = [...extraPostHandlers, ...ctlPostHandlers];
    this.debug('%v merged post-handlers.', mergedPostHandlers.length);
    // обход всех операций контроллера
    // для определения маршрутов
    const actionsMd = ActionReflector.getMetadata(ctor);
    this.debug('%v actions found.', actionsMd.size);
    const router = this.getService(TrieRouter);
    actionsMd.forEach((actionMd, actionName) => {
      this.debug('Adding route by %s.%s action.', ctor.name, actionName);
      // подготовка пути маршрута с префиксом
      this.debug('Route path is %v.', actionMd.path);
      const prefixedRoutePath = `${mergedPathPrefix}/${actionMd.path}`
        .replace(/\/\//g, '/');
      this.debug('Prefixed route path is %v.', prefixedRoutePath);
      // подготовка обработчика маршрута
      const routeHandler = this.createRouteHandler(ctor, actionName);
      router.defineRoute({
        method: actionMd.method,
        path: prefixedRoutePath,
        preHandler: mergedPreHandlers,
        handler: routeHandler,
        postHandler: mergedPostHandlers,
      });
      this.debug('Route')
    });
    return this;
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
    this.debug(
      'Creating route handler by %s.%s action.',
      controllerCtor,
      actionName,
    );
    const requestContextMetadataMap = RequestContextReflector.getMetadata(
      controllerCtor,
      actionName,
    );
    const requestDataMetadataMap = RequestDataReflector.getMetadata(
      controllerCtor,
      actionName,
    );
    const argsNumber = controllerCtor.prototype[actionName].length;
    const dataTypeCaster = this.getService(DataTypeCaster);
    const dataValidator = this.getService(DataValidator);
    return (requestContext: RequestContext) => {
      this.debug(
        'Executing route handler of %s.%s action.',
        controllerCtor,
        actionName,
      );
      const args = Array(argsNumber).map((value, index) => {
        if (value != null) return value;
        // заполнение аргументов операции
        // значениями из контекста запроса
        const requestContextMd = requestContextMetadataMap.get(index);
        if (requestContextMd != null) {
          this.debug('Argument %v has request context metadata.', index);
          // если свойство контекста не определено,
          // то используем весь объект контекста
          // в качестве значения текущего аргумента
          if (requestContextMd.property == null) {
            this.debug('Request context property is not specified.');
            this.debug('Argument %v is set to %v.', index, requestContext);
            return requestContext;
          }
          // если свойство контекста определено,
          // то используем значение этого свойства
          // в качестве текущего аргумента
          const propName = requestContextMd.property;
          const propValue = requestContext[propName];
          this.debug('Request context property is %v.', propName);
          this.debug('Argument %v is set to %v.', index, propValue);
          return propValue;
        } else {
          this.debug('No RequestContextMetadata specified for %v argument.', index);
        }
        // заполнение аргументов операции
        // значениями из данных запроса
        const requestDataMd = requestDataMetadataMap.get(index);
        if (requestDataMd != null) {
          this.debug('Argument %v has request data metadata.', index);
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
          this.debug('Request data source is %v.', requestDataMd.source);
          // при наличии схемы данных выполняется
          // их конвертация и валидация
          if (requestDataMd.schema) {
            data = dataTypeCaster.cast(data, requestDataMd.schema, {
              noTypeCastError: true,
              sourcePath: requestDataMd.source,
            });
            this.debug('Data type casting is passed.');
            dataValidator.validate(
              data,
              requestDataMd.schema,
              requestDataMd.source,
            );
            this.debug('Data validation is passed.');
          }
          // если свойство данных не определено,
          // то используем весь объекта данных
          // в качестве значения текущего аргумента
          if (requestDataMd.property == null) {
            this.debug('Request data property is not specified.');
            this.debug('Argument %v is set to %v.', index, data);
            return data;
          }
          // если свойство данных определено,
          // то используем значение этого свойства
          // в качестве текущего аргумента
          const dataAsObject = data as Record<string, unknown>;
          const propName = requestDataMd.property;
          const propValue = dataAsObject[propName];
          this.debug('Request data property is %v.', propName);
          this.debug('Argument %v is set to %v.', index, propValue);
          return propValue;
        } else {
          this.debug('No RequestDataMetadata specified for %v argument.', index);
        }
      });
      // выполнение операции контроллера
      const controller = this.getService(controllerCtor);
      return (controller as AnyObject)[actionName](...args);
    };
  }
}
