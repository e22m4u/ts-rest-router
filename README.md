# @e22m4u/ts-rest-router

**REST-маршрутизатор на основе контроллеров и TypeScript декораторов.**

Модуль `@e22m4u/ts-rest-router` позволяет создавать структурированное
и масштабируемое REST API. В его основе лежит декларативный подход
с использованием TypeScript декораторов для определения маршрутов,
обработки входящих данных и управления жизненным циклом запроса.

### Особенности

- **Декларативная маршрутизация**  
  Определение маршрутов непосредственно над методами контроллера с помощью
  декораторов (`@getAction`, `@postAction` и т.д.).
- **Типобезопасная обработка данных**  
  Автоматическое извлечение, преобразование и валидация данных из `body`,
  `query`, `params`, `headers` и `cookie` с привязкой к типизированным
  аргументам методов.
- **Встроенная валидация**  
  Использование схем данных из `@e22m4u/ts-data-schema` для описания сложных
  правил проверки.
- **Middleware (хуки)**  
  Поддержка промежуточных обработчиков (`@beforeAction`, `@afterAction`)
  на уровне контроллера и отдельных методов.
- **Изоляция запросов**  
  Обработка каждого запроса в отдельном DI-контейнере, что гарантирует
  отсутствие конфликтов состояний и повышает надежность приложения.
- **Гибкая архитектура**  
  Основан на `@e22m4u/js-trie-router` для маршрутизации и `@e22m4u/js-service`
  для внедрения зависимостей.

## Содержание

- [Установка](#установка)
- [Быстрый старт: Пример сервера](#быстрый-старт-пример-сервера)
- [Обработка данных запроса](#обработка-данных-запроса)
  - [URL-параметры (`@requestParam`)](#url-параметры-requestparam)
  - [Query-параметры (`@requestQuery`)](#query-параметры-requestquery)
  - [Тело запроса (`@requestBody`, `@requestField`)](#тело-запроса-requestbody-requestfield)
  - [Заголовки и Cookies](#заголовки-и-cookies)
  - [Контекст запроса (`@requestContext`)](#контекст-запроса-requestcontext)
- [Валидация и схемы данных](#валидация-и-схемы-данных)
- [Middleware (хуки)](#middleware-хуки)
- [Архитектура: Жизненный цикл контроллера и DI](#архитектура-жизненный-цикл-контроллера-и-di)
- [Отладка](#отладка)
- [Тесты](#тесты)
- [Полный список декораторов](#полный-список-декораторов)
- [Лицензия](#лицензия)

## Установка

```bash
npm install @e22m4u/ts-rest-router
```

**Поддержка декораторов**

Для включения поддержки декораторов, добавьте указанные ниже опции в файл `tsconfig.json` вашего проекта.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Быстрый старт: Пример сервера

Пример создания простого сервера для управления списком пользователей.

**`user.controller.ts`**

```ts
import {
  restController,
  getAction,
  postAction,
  requestBody,
  DataType,
} from '@e22m4u/ts-rest-router';

// Временное хранилище данных
const users = [
  {id: 1, name: 'John Doe'},
];

// 1. Декоратор @restController определяет класс как контроллер
//    и устанавливает базовый путь для всех его маршрутов.
@restController('users')
export class UserController {
  // 2. Декоратор @getAction создает маршрут для GET-запросов.
  //    Полный путь: GET /users
  @getAction()
  getAllUsers() {
    // Результат автоматически сериализуется в JSON
    return users;
  }

  // 3. Декоратор @postAction создает маршрут для POST-запросов.
  //    Полный путь: POST /users
  @postAction()
  createUser(
    // 4. Декоратор @requestBody извлекает тело запроса,
    //    проверяет его по схеме и передает в аргумент `newUser`.
    @requestBody({
      type: DataType.OBJECT,
      properties: {
        name: {
          type: DataType.STRING,
          required: true
        },
      },
    })
    newUser: {name: string},
  ) {
    const user = {id: users.length + 1, ...newUser};
    users.push(user);
    // Возвращаемый объект будет отправлен клиенту как JSON.
    return user;
  }
}
```

**`index.ts`**

```ts
import http from 'http';
import {UserController} from './user.controller';
import {RestRouter} from '@e22m4u/ts-rest-router';

async function bootstrap() {
  // Создание экземпляра роутера
  const router = new RestRouter();
  // Регистрация контроллера
  router.addController(UserController);

  // Создание HTTP-сервера с обработчиком запросов из роутера
  const server = http.createServer(router.requestListener);

  // Запуск сервера
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Try GET http://localhost:3000/users');
    console.log(
      'Try POST http://localhost:3000/users with body {"name": "Jane Doe"}'
    );
  });
}

bootstrap();
```

## Обработка данных запроса

Модуль предоставляет удобные и типобезопасные механизмы для доступа
к данным входящего запроса.

### URL-параметры (`@requestParam`)

Используются для извлечения динамических частей URL (например, `:id`).

```ts
import {getAction, requestParam, DataType} from '@e22m4u/ts-rest-router';

@restController('articles')
class ArticleController {
  // Маршрут: GET /articles/42
  @getAction(':id')
  getArticleById(
    // Извлечение параметра 'id' с проверкой на соответствие
    // типу "number"
    @requestParam('id', DataType.NUMBER) id: number,
  ) {
    // Если id не является числом, фреймворк вернет ошибку
    // 400 Bad Request
    return {articleId: id, content: '...'};
  }
}
```

**Декораторы:**

- `@requestParam(name, schema)` - извлечение одного параметра;
- `@requestParams(schema)` - извлечение всех URL-параметров в виде объекта;

### Query-параметры (`@requestQuery`)

Применяются для извлечения параметров из строки запроса
(например, `?sort=desc`).

```ts
import {getAction, requestQuery, DataType} from '@e22m4u/ts-rest-router';

@restController('products')
class ProductController {
  // Маршрут: GET /products/search?q=phone&limit=10
  @getAction('search')
  searchProducts(
    @requestQuery('q', {
      type: DataType.STRING,
      required: true,
    })
    searchTerm: string,
    @requestQuery('limit', {
      type: DataType.NUMBER,
      default: 20,
    })
    limit: number,
  ) {
    // searchTerm будет 'phone', limit будет 10.
    // При отсутствии 'q' будет ошибка. При отсутствии 'limit'
    // будет использовано значение по умолчанию 20.
    return {results: [], query: {searchTerm, limit}};
  }
}
```

**Декораторы:**

- `@requestQuery(name, schema)` - извлечение одного query-параметра;
- `@requestQueries(schema)` - извлечение всех query-параметров в виде объекта;

### Тело запроса (`@requestBody`, `@requestField`)

Для работы с данными, отправленными в теле POST, PUT, PATCH запросов.

```ts
import {
  postAction,
  requestBody,
  requestField,
  DataType,
} from '@e22m4u/ts-rest-router';

@restController('users')
class UserController {
  // Пример с @requestBody: получение и валидация всего тела запроса
  @postAction()
  createUser(
    @requestBody({
      type: DataType.OBJECT,
      properties: {
        username: {
          type: DataType.STRING,
          required: true,
        },
        email: {
          type: DataType.STRING,
          required: true,
        },
      },
    })
    body: {username: string; email: string},
  ) {
    return {id: 1, ...body};
  }

  // Пример с @requestField: получение только одного поля из тела
  @postAction('login')
  login(
    @requestField('username', DataType.STRING) username: string,
    @requestField('password', DataType.STRING) password: string,
  ) {
    // ... логика аутентификации
    return {token: 'jwt-token'};
  }
}
```

**Декораторы:**

- `@requestBody(schema)` - извлечение тела запроса;
- `@requestField(name, schema)` - извлечение поля из тела запроса;

### Заголовки и Cookies

Работа с заголовками и cookies осуществляется аналогичным образом:

- `@requestHeader(name, schema)` / `@requestHeaders(schema)`
- `@requestCookie(name, schema)` / `@requestCookies(schema)`

### Контекст запроса (`@requestContext`)

Для доступа к "сырым" объектам запроса/ответа Node.js или другим частям
контекста используются следующие декораторы:

- `@requestContext()` - инъекция всего объекта `RequestContext`;
- `@requestContext('req')` - инъекция нативного `IncomingMessage`;
- `@requestContext('res')` - инъекция нативного `ServerResponse`;
- `@requestContext('container')` - инъекция DI-контейнера запроса;
- **Алиасы:** `@httpRequest()`, `@httpResponse()`, `@requestContainer()`;

```ts
import {getAction, requestContext} from '@e22m4u/ts-rest-router';
import {RequestContext} from '@e22m4u/js-trie-router';

@restController('system')
class SystemController {
  @getAction('ip')
  getClientIp(
    @requestContext()
    ctx: RequestContext,
  ) {
    // ctx.req - это нативный объект IncomingMessage
    const ip = ctx.req.socket.remoteAddress;
    return {ip};
  }
}
```

## Валидация и схемы данных

Модуль интегрирован с
[@e22m4u/ts-data-schema](https://www.npmjs.com/package/@e22m4u/ts-data-schema)
для гибкой проверки данных. Это дает возможность определять типы данных
и сложные правила.

**Базовые типы `DataType`:**

- `DataType.ANY`
- `DataType.STRING`
- `DataType.NUMBER`
- `DataType.BOOLEAN`
- `DataType.ARRAY`
- `DataType.OBJECT`

Для более сложных проверок используется объект `DataSchema`:

```ts
type DataSchema = {
  type: DataType; // Обязательное поле
  required?: boolean; // Значение не может быть null или undefined
  default?: unknown; // Значение по умолчанию, если `required: false`
  items?: DataSchema; // Схема для элементов массива (для type: DataType.ARRAY)
  properties?: {[key: string]: DataSchema}; // Схема для свойств объекта
  validate?: (value: any) => boolean | string; // Пользовательская функция
}
```

**Пример сложной валидации:**

```ts
import {postAction, requestBody, DataType} from '@e22m4u/ts-rest-router';

@restController('orders')
class OrderController {
  @postAction()
  createOrder(
    @requestBody({
      type: DataType.OBJECT,
      properties: {
        userId: {
          type: DataType.NUMBER,
          required: true,
        },
        products: {
          type: DataType.ARRAY,
          required: true,
          // Описание схемы для каждого элемента массива:
          items: {
            type: DataType.OBJECT,
            properties: {
              id: {
                type: DataType.NUMBER,
                required: true
              },
              quantity: {
                type: DataType.NUMBER,
                required: true,
                // Валидатор: количество должно быть больше 0
                validate: (qty) => qty > 0 || 'Quantity must be positive',
              },
            },
          },
        },
      },
    })
    orderData: { /* ... */ },
  ) {
    // ...
  }
}
```

## Middleware (хуки)

Middleware (или "хуки") - это функции, выполняющиеся до (`@beforeAction`)
или после (`@afterAction`) основного метода контроллера. Они предназначены
для сквозной логики, такой как аутентификация, логирование или кэширование.

Применение middleware возможно как ко всему контроллеру, так и к отдельному
методу.

```ts
import {RequestContext} from '@e22m4u/js-trie-router';
import createError from 'http-errors';

// Middleware для проверки аутентификации
async function authMiddleware(ctx: RequestContext) {
  const token = ctx.headers.authorization;
  if (!token || !isValidToken(token)) {
    // Выброс ошибки прерывает выполнение и отправляет клиенту
    // соответствующий HTTP-статус.
    throw createError(401, 'Unauthorized');
  }
}

// Middleware для логирования
async function loggerMiddleware(ctx: RequestContext, data: any) {
  console.log(`Response for ${ctx.pathname}:`, data);
  // @afterAction может модифицировать ответ
  return {...data, timestamp: new Date()};
}

@restController('profile')
@beforeAction(authMiddleware) // Применение ко всем методам
class ProfileController {
  @getAction('me')
  @afterAction(loggerMiddleware) // Применение только к этому методу
  getMyProfile() {
    return {id: 1, name: 'Current User'};
  }

  @getAction('settings')
  getMySettings() {
    return {theme: 'dark'};
  }
}
```

## Архитектура: Жизненный цикл контроллера и DI

Понимание архитектурных принципов `ts-rest-router` является ключом
к созданию надежных и масштабируемых приложений. Модуль построен на
базе библиотеки `@e22m4u/js-service`, реализующей паттерн
Service Locator / Dependency Injection.

#### Принцип №1: Изоляция запросов

Для **каждого** входящего HTTP-запроса создается **новый, изолированный
экземпляр контроллера**. Этот фундаментальный принцип гарантирует, что
состояние одного запроса (например, данные аутентифицированного
пользователя) никогда не будет разделено с другим, одновременно
обрабатываемым запросом. Это устраняет целый класс потенциальных
ошибок, связанных с состоянием гонки.

#### Принцип №2: Request-Scoped Service Container

Каждый экземпляр контроллера создается с помощью своего собственного
DI-контейнера, который существует только в рамках одного запроса. Чтобы
контроллер мог взаимодействовать с другими сервисами (например, с сервисом
для работы с базой данных), его класс должен наследоваться от базового
класса `Service`. Это дает доступ к методу `this.getService()` для
получения зависимостей.

**Практический пример с сервисом аутентификации:**

**Шаг 1: Создание Middleware для подготовки сервиса**

Middleware - идеальное место для подготовки сервисов, специфичных для
запроса. В этом примере происходит создание экземпляра `AuthService`,
выполнение аутентификации и его регистрация в контейнере запроса.

```ts
// src/auth.middleware.ts
import {AuthService} from './auth.service';
import {RequestContext} from '@e22m4u/js-trie-router';

export async function authMiddleware(context: RequestContext) {
  const requestContainer = context.container;
  // Создание сервиса с передачей ему контейнера запроса
  const authService = new AuthService(requestContainer);
  // Регистрация созданного экземпляра в контейнере.
  // Теперь любой другой сервис в рамках этого запроса
  // сможет получить этот конкретный экземпляр.
  requestContainer.set(AuthService, authService);
  // Выполнение логики аутентификации
  await authService.authenticate(context.headers.authorization);
}
```

**Шаг 2: Создание `AuthService`**

`AuthService` наследуется от `Service`, что позволяет ему запрашивать другие
зависимости (например, `this.getService(DatabaseService)`).

```ts
// src/auth.service.ts
import {Service} from '@e22m4u/js-service';

export class AuthService extends Service {
  public currentUser?: {id: number; name: string;};

  async authenticate(token?: string) {
    // Логика проверки токена и поиска пользователя в БД...
    if (token === 'valid-token') {
      this.currentUser = { id: 1, name: 'John Doe' };
    }
  }
}
```

**Шаг 3: Использование сервиса в контроллере**

Контроллер унаследованный от `Service`, теперь может получить
доступ к предварительно настроенному экземпляру `AuthService`
через `this.getService()`.

```ts
// src/profile.controller.ts
import createError from 'http-errors';
import {Service} from '@e22m4u/js-service';
import {AuthService} from './auth.service';
import {authMiddleware} from './auth.middleware';
import {
  getAction,
  restController,
  beforeAction,
} from '@e22m4u/ts-rest-router';

@restController('profile')
@beforeAction(authMiddleware)
export class ProfileController extends Service {
  @getAction('me')
  getProfile() {
    // Получение request-scoped экземпляра AuthService,
    // который был создан и зарегистрирован в middleware.
    const authService = this.getService(AuthService);

    if (!authService.currentUser)
      throw createError(401, 'Unauthorized');
      
    return authService.currentUser;
  }
}
```

Таким образом, DI-контейнер запроса выступает в роли моста между
middleware и контроллером, позволяя безопасно передавать состояние,
изолированное в рамках одного HTTP-запроса.

## Отладка

Включение вывода отладочных логов в консоль осуществляется
установкой переменной окружения `DEBUG`:

```bash
DEBUG=tsRestRouter* npm start
```

## Тесты

Запуск тестов выполняется командой:

```bash
npm run test
```

## Полный список декораторов

#### Контроллер и методы:

- `@restController(options)` - определение класса как контроллера;
- `@getAction(path, options)` - метод GET;
- `@postAction(path, options)` - метод POST;
- `@putAction(path, options)` - метод PUT;
- `@patchAction(path, options)` - метод PATCH;
- `@deleteAction(path, options)` - метод DELETE;
- `@restAction(options)` - базовый декоратор для определения метода;

#### Middleware (хуки):

- `@beforeAction(middleware)` - выполнение перед методом;
- `@afterAction(middleware)` - выполнение после метода;

#### Параметры запроса:

- `@requestParam(name, schema)` - URL-параметр;
- `@requestParams(schema)` - все URL-параметры;
- `@requestQuery(name, schema)` - query-параметр;
- `@requestQueries(schema)` - все query-параметры;
- `@requestBody(schema)` - тело запроса;
- `@requestField(name, schema)` - поле из тела запроса;
- `@requestHeader(name, schema)` - заголовок запроса;
- `@requestHeaders(schema)` - все заголовки;
- `@requestCookie(name, schema)` - cookie;
- `@requestCookies(schema)` - все cookies;
- `@requestData(options)` - базовый декоратор для доступа к данным;

#### Контекст:

- `@requestContext(property)` - доступ к `RequestContext` или его свойствам;
- `@requestContainer()` - DI-контейнер запроса;
- `@httpRequest()` - экземпляр `IncomingMessage`;
- `@httpResponse()` - экземпляр `ServerResponse`;

## Лицензия

MIT