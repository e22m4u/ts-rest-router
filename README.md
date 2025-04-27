# @e22m4u/ts-rest-router

REST маршрутизатор на основе контроллеров для TypeScript.

#### Основные возможности

- Декларативное определение маршрутов через декораторы.
- Типизированные параметры запросов (body, query, params).
- Поддержка middleware до и после обработки запроса.
- Валидация входящих данных.
- Поддержка всех HTTP методов (GET, POST, PUT, PATCH и DELETE).

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

Создание контроллера и методов.

```ts
import {DataType} from '@e22m4u/ts-rest-router';
import {getAction} from '@e22m4u/ts-rest-router';
import {postAction} from '@e22m4u/ts-rest-router';
import {requestField} from '@e22m4u/ts-rest-router';
import {restController} from '@e22m4u/ts-rest-router';

// объявление контроллера
// и базового пути /users
@restController('users')
class UserController {
  // объявление метода POST /users/login
  // (использует базовый путь контроллера)
  @postAction('login')
  async login(
    // инъекция значений указанных полей
    // извлеизвлекаемых из тела запроса
    @requestField('username') username?: string,
    @requestField('password') password?: string,
  ) {
    // так как метод возвращает объект,
    // результат будет представлен как
    // "Content-Type: application/json"
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };
  }
}
```

Регистрация контроллеров и запуск сервера.

```ts
import http from 'http';
import {RestRouter} from '@e22m4u/ts-rest-router';

// создание маршрутизатора и регистрация контроллеров
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

## Валидация

Указанные ниже декораторы используются для инъекции соответствующих параметров
запроса в качестве аргументов метода контроллера. Каждый из указанных декораторов
имеет параметр `schemaOrType`, в котором определяется тип ожидаемого значения
или схема для проверки данных.

- `@requestParam(name: string, schemaOrType?: DataSchema | DataType)`  
  *- извлечение URL параметра по названию;*
- `@requestQuery(name: string, schemaOrType?: DataSchema | DataType)`  
  *- извлечение query параметра по названию;*
- `@requestBody(schemaOrType?: DataSchema | DataType)`  
  *- извлечение тела запроса;*
- `@requestField(name: string, schemaOrType?: DataSchema | DataType)`  
  *- извлечение свойства из тела запроса;*
- `@requestHeader(name: string, schemaOrType?: DataSchema | DataType)`  
  *- извлечение заголовка запроса по названию;*
- `@requestCookie(name: string, schemaOrType?: DataSchema | DataType)`  
  *- извлечение cookie запроса по названию;*

Проверка входящих данных выполняется встроенным модулем
[@e22m4u/ts-data-schema](https://www.npmjs.com/package/@e22m4u/ts-data-schema)
(не требует установки). Ниже приводятся константы для определения допустимых
типов извлекаемого значения.

- `DataType.ANY` - принимает любой тип
- `DataType.STRING` - строковые значения
- `DataType.NUMBER` - числовые значения
- `DataType.BOOLEAN` - логические значения
- `DataType.ARRAY` - массивы
- `DataType.OBJECT` - объекты (не экземпляры)

Для определения дополнительных условий, используется объект `DataSchema`,
с помощью которого можно определить структуру ожидаемого объекта, допустимые
элементы массива, функции-валидаторы и другие ограничения входящих данных.

```ts
type DataSchema = {
  type: DataType;
  items?: DataSchema;
  properties?: {[key: string]: DataSchema};
  required?: boolean;
  validate?: CallableValidator | CallableValidator[];
  default?: unknown;
}
```

Пример проверки передаваемого объекта методом POST:

```ts
import {DataType} from '@e22m4u/ts-rest-router';
import {getAction} from '@e22m4u/ts-rest-router';
import {postAction} from '@e22m4u/ts-rest-router';
import {requestField} from '@e22m4u/ts-rest-router';
import {restController} from '@e22m4u/ts-rest-router';

@restController('users')
class UserController {
  @postAction()                        // POST /users
  async create(
    @requestBody({                     // декоратор тела запроса
      type: DataType.OBJECT,           // в теле запроса ожидается объект
      properties: {
        name: {                        // схема свойства "name"
          type: DataType.STRING,       // свойство должно содержать строку
          required: true,              // свойство не может содержать undefined или null
          validate: v => v.length > 2, // проверка длины значения
        },
        age: {                         // схема свойства "age"
          type: DataType.NUMBER,       // свойство должно являться числом
        }
      },
    })
    body: {name: string, age?: number},
  ) {
    return {
      id: 1,
      name: body.name,
      age: body.age,
    };
  }
}
```

## Декораторы

Контроллер и методы:

- `@restController` - определяет класс как контроллер;
- `@restAction` - базовый декоратор для методов;
- `@getAction` - метод GET;
- `@postAction` - метод POST;
- `@putAction` - метод PUT;
- `@patchAction` - метод PATCH;
- `@deleteAction` - метод DELETE;

Хуки запроса:

- `@beforeAction` - middleware перед обработкой запроса;
- `@afterAction` - middleware после обработки запроса;

Параметры запроса:

- `@requestParam` - определенный URL параметр;
- `@requestParams` - все параметры URL как объект;
- `@requestQuery` - определенный query параметр;
- `@requestQueries` - все query параметры как объект;
- `@requestBody` - тело запроса;
- `@requestField` - поле в теле запроса;
- `@requestHeader` - определенный заголовок запроса;
- `@requestHeaders` - все заголовки запроса как объект;
- `@requestCookie` - определенный cookie запроса;
- `@requestCookies` - все cookies запроса как объект;
- `@requestContext` - доступ к контексту запроса;
- `@requestData` - доступ к данным запроса;
- `@httpRequest` - экземпляр `IncomingMessage`;
- `@httpResponse` - экземпляр `ServerResponse`;

#### `@restController(options?: ControllerOptions)`

Определение контроллера.

```ts
@restController()
class UserController {
  // методы контроллера
}
```

Определение пути контроллера.

```ts
@restController('/users')  // путь контроллера
class UserController {
  // методы контроллера
}
```

Дополнительные параметры декоратора.

```ts
@restController({
  path: '/api',              // путь контроллера
  before: [authMiddleware],  // middleware до обработки запроса
  after: [loggerMiddleware], // middleware после обработки запроса
})
class UserController {
  // методы контроллера
}
```

#### `@getAction(path: string, options?: ActionOptions)`

Определение метода GET.

```ts
@restController('/users') // путь контроллера
class UserController {    // класс контроллера
  @getAction('/whoAmI')   // маршрут GET /users/whoAmI
  async whoAmI() {
    return {              // если метод возвращает объект,
      name: 'John',       // то результат будет представлен
      surname: 'Doe',     // как "Content-Type: application/json"
    };
  }
}
```

Дополнительные параметры декоратора.

```ts
@restController('/users')      // путь контроллера
class UserController {         // класс контроллера
  @getAction('/whoAmI', {      // маршрут GET /users/whoAmI
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

@restController('/users')      // путь контроллера
class UserController {         // класс контроллера
  @getAction('/:id')           // маршрут GET /users/:id
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

@restController('/users')  // путь контроллера
class UserController {     // класс контроллера
  @getAction('/:id')       // маршрут GET /users/:id
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
