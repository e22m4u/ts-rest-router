# @e22m4u/ts-rest-router

*[English](./README.md) | Русский*

Реализация REST маршрутизатора на основе контроллеров для TypeScript.

#### Основные возможности

- Декларативное определение маршрутов через декораторы
- Типизированные параметры запросов (body, query, params)
- Поддержка middleware до и после обработки запроса
- Валидация входящих данных
- Поддержка всех HTTP методов (GET, POST, PUT, DELETE и т.д.)

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

Создание контроллера

```ts
import {controller, get, post} from '@e22m4u/ts-rest-router';

@controller()
class UserController {
  @get('/users')
  async getUsers() {
    return { users: [] };
  }

  @post('/users')
  async createUser(@body() userData: UserDTO) {
    return { success: true };
  }
}
```

Работа с параметрами запроса

```ts
@controller()
class ProductController {
  @get('/products/:id')
  async getProduct(
    @param('id') productId: string,
    @query('fields') fields?: string,
    @headers('authorization') auth?: string
  ) {
    // ...
  }
}
```

Middleware и хуки

```ts
@controller({
  path: '/api',
  before: [authMiddleware],
  after: [loggerMiddleware]
})
class ApiController {
  @get('/secure', {
    before: [checkPermissions]
  })
  secureEndpoint() {
    // ...
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

Декоратор для определения класса как REST API контроллера.

```typescript
@controller()
class UserController {
  // методы контроллера
}
```

Дополнительные параметры декоратора.

```typescript
@controller({
  path: '/api'
  before: [authMiddleware],
  after: [loggerMiddleware]
})
class UserController {
  // методы контроллера
}
```

### `@get(path: string, options?: ActionOptions)`

Декоратор для определения метода GET.

```typescript
@controller()
class UserController {
  @get('/users')
  async getUsers() {
    return {users: []};
  }

  @get('/users/:id') 
  getUser(
    @param('id') userId: string
  ) {
    return {user: {id: userId}};
  }
}
```

Дополнительные параметры декоратора.

```typescript
@controller()
class UserController {
  @get('/users', {
    before: [authMiddleware],
    after: [loggerMiddleware]
  })
  async getUsers() {
    return {users: []};
  }
}
```

### `@requestContext(propertyName?: string)`

Декоратор для доступа к контексту запроса.

```typescript
@controller()
class UserController {
  @get('/users')
  getUsers(
    @requestContext('req') req: IncomingMessage,
    @requestContext('res') res: ServerResponse
  ) {
    // Доступ к оригинальным объектам запроса/ответа
  }
}
```

Допустимые свойства:

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
