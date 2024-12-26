# @e22m4u/ts-rest-router

*[English](./README.md) | Русский*

Реализация REST маршрутизатора на основе контроллеров для TypeScript.

#### Основные возможности

- Декларативное определение маршрутов через декораторы.
- Типизированные параметры запросов (body, query, params).
- Поддержка middleware до и после обработки запроса.
- Валидация входящих данных.
- Поддержка всех HTTP методов (GET, POST, PUT, DELETE и т.д.).

## Установка

```bash
npm install @e22m4u/ts-rest-router
```

#### Поддержка декораторов

Для включения поддержки декораторов, добавьте указанные
ниже опции в файл `tsconfig.json` вашего проекта.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Базовое использование

Создание контроллера и методов

```ts
import {get} from '@e22m4u/ts-rest-router';
import {post} from '@e22m4u/ts-rest-router';
import {DataType} from '@e22m4u/ts-rest-router';
import {controller} from '@e22m4u/ts-rest-router';

@controller('/users')           // путь контроллера
class UserController {          // класс контроллера
  @post('/login')               // метод POST /users/login
  async login(
    @bodyParam('username', {    // параметр тела запроса "username"
      type: DataType.STRING,    // тип параметра допускает только строки
      required: true,           // параметр является обязательным
    })
    username: string,
    @bodyParam('password', {    // параметр тела запроса "password"
      type: DataType.STRING,    // тип параметра допускает только строки
      required: true,           // параметр является обязательным
    )
    password: string,
  ) {
    return {                    // если метод возвращает объект,
      id: '123',                // то результат будет представлен как
      firstName: 'John',        // "Content-Type: application/json"
      lastName: 'Doe',
    };
  }
}
```

Регистрация контроллеров и запуск сервера

```ts
import http from 'http';
import {RestRouter} from '@e22m4u/ts-rest-router';

// создание роутера и регистрация контроллеров
const router = new RestRouter();
router.registerController(UserController);
router.registerController(ProductController);

// создание сервера и регистрация обработчика запросов
const server = new http.Server();
server.on('request', router.requestListener);

// запуск сервера
server.listen('8080', '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:8080`);
});
```

## Декораторы

Контроллер и методы

- `@controller` - определяет класс как контроллер
- `@action` - базовый декоратор для методов
- `@get` - GET запросы
- `@post` - POST запросы
- `@put` - PUT запросы
- `@patch` - PATCH запросы
- `@del` - DELETE запросы

Параметры запроса

- `@param` - один параметр URL
- `@params` - все параметры URL как объект
- `@query` - один query параметр
- `@queries` - все query параметры как объект
- `@body` - тело запроса
- `@bodyParam` - конкретное поле из тела запроса
- `@header` - один заголовок
- `@headers` - все заголовки как объект
- `@cookie` - одна cookie
- `@cookies` - все cookies как объект
- `@requestContext` - доступ к контексту запроса
- `@requestData` - универсальный декоратор для доступа к данным запроса

#### `@controller(options?: ControllerOptions)`

Определение контроллера.

```ts
@controller()
class UserController {
  // методы контроллера
}
```

Определение пути контроллера.

```ts
@controller('/users')  // путь контроллера
class UserController {
  // методы контроллера
}
```

Дополнительные параметры декоратора.

```ts
@controller({
  path: '/api'               // путь контроллера
  before: [authMiddleware],  // middleware до обработки запроса
  after: [loggerMiddleware], // middleware после обработки запроса
})
class UserController {
  // методы контроллера
}
```

#### `@get(path: string, options?: ActionOptions)`

Определение метода GET.

```ts
@controller('/users')  // путь контроллера
class UserController { // класс контроллера
  @get('/whoAmI')      // маршрут GET /users/whoAmI
  async whoAmI() {
    return {           // если метод возвращает объект,
      name: 'John',    // то результат будет представлен
      surname: 'Doe',  // как "Content-Type: application/json"
    };
  }
}
```

Дополнительные параметры декоратора.

```ts
@controller('/users')          // путь контроллера
class UserController {         // класс контроллера
  @get('/whoAmI', {            // маршрут GET /users/whoAmI
    before: [authMiddleware],  // middleware до обработки запроса
    after: [loggerMiddleware], // middleware после обработки запроса
  })
  async whoAmI() {
    return {
      name: 'John',
      surname: 'Doe',
    };
  }
}
```

#### `@requestContext(propertyName?: string)`

Доступ к контексту запроса.

```ts
import {RequestContext} from '@e22m4u/js-trie-router';

@controller('/users')          // путь контроллера
class UserController {         // класс контроллера
  @get('/:id')                 // маршрут GET /users/:id
  findById(
    @requestContext()          // включениее контекста запроса
    ctx: RequestContext,       // в качестве параметра метода
  ) {
    console.log(ctx.req);      // IncomingMessage
    console.log(ctx.res);      // ServerResponse
    console.log(ctx.params);   // {id: 10}
    console.log(ctx.query);    // {include: 'city'}
    console.log(ctx.headers);  // {cookie: 'foo=bar; baz=qux;'}
    console.log(ctx.cookie);   // {foo: 'bar', baz: 'qux'}
    console.log(ctx.method);   // "GET"
    console.log(ctx.path);     // "/users/10?include=city"
    console.log(ctx.pathname); // "/users/10"
    // ...
  }
}
```

Доступ к свойствам контекста.

```ts
import {ServerResponse} from 'http';
import {IncomingMessage} from 'http';

@controller('/users')      // путь контроллера
class UserController {     // класс контроллера
  @get('/:id')             // маршрут GET /users/:id
  findById(
    @requestContext('req') // декоратор контекста запроса
    req: IncomingMessage,  // включающий свойство "req"
    @requestContext('res') // декоратор контекста запроса
    res: ServerResponse,   // включающий свойство "res"
  ) {
    console.log(req);      // IncomingMessage
    console.log(res);      // ServerResponse
  }
}
```

Свойства контекста:

- `container: ServiceContainer` экземпляр [сервис-контейнера](https://npmjs.com/package/@e22m4u/js-service)
- `req: IncomingMessage` нативный поток входящего запроса
- `res: ServerResponse` нативный поток ответа сервера
- `params: ParsedParams` объект ключ-значение с параметрами пути
- `query: ParsedQuery` объект ключ-значение с параметрами строки запроса
- `headers: ParsedHeaders` объект ключ-значение с заголовками запроса 
- `cookie: ParsedCookie` объект ключ-значение разобранного заголовка `cookie`
- `method: string` метод запроса в верхнем регистре, например `GET`, `POST` и т.д.
- `path: string` путь включающий строку запроса, например `/myPath?foo=bar`
- `pathname: string` путь запроса, например `/myMath`
- `body: unknown` тело запроса

## Отладка

Установка переменной `DEBUG` включает вывод логов.

```bash
DEBUG=tsRestRouter* npm run test
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
