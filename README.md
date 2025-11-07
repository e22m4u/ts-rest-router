# @e22m4u/ts-rest-router

![npm version](https://badge.fury.io/js/@e22m4u%2Fts-rest-router.svg)
![license](https://img.shields.io/badge/license-mit-blue.svg)

REST-маршрутизатор на основе контроллеров и TypeScript декораторов.

Данный модуль позволяет создавать структурированное и масштабируемое REST API.
В его основе лежит декларативный подход с использованием TypeScript декораторов
для определения маршрутов, обработки входящих данных и управления жизненным
циклом запроса.

**Особенности**

- **Декларативная маршрутизация**  
  Определение маршрутов непосредственно над методами контроллера с помощью
  декораторов (`@getAction`, `@postAction` и т.д.).

- **Типобезопасная обработка данных**  
  Автоматическое извлечение, преобразование и валидация данных из `body`,
  `query`, `params`, `headers` и `cookie` с привязкой к типизированным
  аргументам методов.

- **Встроенная валидация**  
  Использование схем данных из
  [@e22m4u/js-data-schema](https://www.npmjs.com/package/@e22m4u/js-data-schema)
  для описания сложных правил проверки.

- **Хуки (перехват запроса)**  
  Поддержка хуков для выполнения сквозной логики (например, аутентификация
  или логирование) на уровне контроллера и отдельных методов.

- **Изоляция запросов**  
  Обработка каждого запроса в отдельном DI-контейнере, что гарантирует
  отсутствие конфликтов состояний и повышает надежность приложения.

- **Производительность и гибкая архитектура**  
  Основан на
  [@e22m4u/js-trie-router](https://www.npmjs.com/package/@e22m4u/js-trie-router)
  для маршрутизации на базе _префиксного дерева_ и
  [@e22m4u/js-service](https://www.npmjs.com/package/@e22m4u/js-service)
  для внедрения зависимостей.

## Содержание

- [Установка](#установка)
- [Базовый пример](#базовый-пример)
- [Обработка данных запроса](#обработка-данных-запроса)
  - [URL-параметры](#url-параметры)
  - [Query-параметры](#query-параметры)
  - [Тело запроса](#тело-запроса)
  - [Заголовки](#заголовки)
  - [Cookies](#cookies)
  - [Контекст запроса](#контекст-запроса)
- [Валидация данных](#валидация-данных)
- [Хуки](#хуки)
- [Архитектура](#архитектура)
- [Производительность](#производительность)
- [Декораторы](#декораторы)
- [Отладка](#отладка)
- [Тесты](#тесты)
- [Лицензия](#лицензия)

## Установка

```bash
npm install @e22m4u/ts-rest-router
```

**Поддержка декораторов**

Для включения поддержки декораторов, добавьте указанные ниже опции в файл
`tsconfig.json` вашего проекта.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Базовый пример

Пример создания простого сервера для управления списком пользователей.

**`user.controller.ts`**

```ts
import {
  DataType,
  getAction,
  postAction,
  requestBody,
  restController,
} from '@e22m4u/ts-rest-router';

// временное хранилище данных
const users = [{id: 1, name: 'John Doe'}];

// декоратор @restController определяет класс как контроллер
// и устанавливает базовый путь для всех его маршрутов
@restController('users')
export class UserController {
  // декоратор @getAction создает маршрут для GET-запросов,
  // полный путь: GET /users
  @getAction()
  getAllUsers() {
    // результат автоматически сериализуется в JSON
    return users;
  }

  // декоратор @postAction создает маршрут для POST-запросов,
  // полный путь: POST /users
  @postAction()
  createUser(
    // декоратор @requestBody извлекает тело запроса,
    // проверяет его по схеме и передает в аргумент `newUser`
    @requestBody({
      type: DataType.OBJECT,
      properties: {
        name: {
          type: DataType.STRING,
          required: true,
        },
      },
    })
    newUser: {name: string},
  ) {
    const user = {id: users.length + 1, ...newUser};
    users.push(user);
    // возвращаемый объект будет отправлен клиенту как JSON
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
  // создание экземпляра роутера
  const router = new RestRouter();
  // регистрация контроллера
  router.addController(UserController);
  // создание HTTP-сервера с обработчиком запросов из роутера
  const server = http.createServer(router.requestListener);

  // запуск сервера
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Try GET http://localhost:3000/users');
    console.log(
      'Try POST http://localhost:3000/users with body {"name": "Jane Doe"}',
    );
  });
}

bootstrap();
```

## Обработка данных запроса

Модуль предоставляет TypeScript декораторы для инъекции данных входящего
запроса через аргументы метода контроллера.

### URL-параметры

Используются для извлечения динамических частей URL (например, `:id`).  

Декораторы:

- `@requestParam(name, schema)`  
  \- извлечение одного параметра;

- `@requestParams(schema)`  
  \- извлечение всех URL-параметров в виде объекта;

Пример:

```ts
import {
  DataType,
  getAction,
  requestParam,
  restController,
} from '@e22m4u/ts-rest-router';

@restController('articles')
class ArticleController {
  // GET /articles/42
  @getAction(':id')
  getArticleById(
    // извлечение параметра 'id' с проверкой
    // на соответствие типу "number"
    @requestParam('id', DataType.NUMBER) id: number,
  ) {
    // если id не является числом,
    // то выбрасывается ошибка 400 Bad Request
    return {articleId: id, content: '...'};
  }
}
```

### Query-параметры

Применяются для извлечения параметров из строки запроса
(например, `?sort=desc`).  

Декораторы:

- `@requestQuery(name, schema)`  
  \- извлечение одного query-параметра;

- `@requestQueries(schema)`  
  \- извлечение всех query-параметров в виде объекта;

Пример:

```ts
import {
  DataType,
  getAction,
  requestQuery,
  restController,
} from '@e22m4u/ts-rest-router';

@restController('products')
class ProductController {
  // GET /products/search?q=phone&limit=10
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
    // searchTerm будет 'phone', limit будет 10;
    // при отсутствии 'q' будет ошибка;
    // при отсутствии 'limit' будет использовано значение по умолчанию 20;
    return {results: [], query: {searchTerm, limit}};
  }
}
```

**Именование Query-декораторов**

Разделение на декораторы в единственном `@requestQuery` и множественном
`@requestQueries` числе - это осознанное архитектурное решение, направленное
на консистентность API. Тот же принцип применяется для работы с URL-параметрами,
заголовками и cookies. Декоратор в единственном числе используется для точечного
извлечения и валидации отдельных значений, в то время как множественное число
служит для получения всех данных в виде единого объекта.

### Тело запроса

Для работы с данными, отправленными в теле POST, PUT, PATCH запросов.

Декораторы:

- `@requestBody(schema)`  
  \- извлечение тела запроса;

- `@requestField(name, schema)`  
  \- извлечение отдельного поля из тела запроса;

Пример:

```ts
import {
  DataType,
  postAction,
  requestBody,
  requestField,
  restController,
} from '@e22m4u/ts-rest-router';

@restController('users')
class UserController {
  // пример с @requestBody: получение и валидация всего тела запроса
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
    body: {
      username: string;
      email: string;
    },
  ) {
    return {id: 1, ...body};
  }

  // пример с @requestField: получение только одного поля из тела
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

### Заголовки

Для извлечения HTTP-заголовков из запроса.

Декораторы:

- `@requestHeader(name, schema)`  
  \- извлечение отдельного заголовка;

- `@requestHeaders(schema)`  
  \- извлечение всех заголовков;

Пример:

```ts
import {
  DataType,
  getAction,
  requestHeader,
} from '@e22m4u/ts-rest-router';

@restController('content')
class ContentController {
  // GET /content
  @getAction()
  getContentForLanguage(
    // извлечение заголовка 'Accept-Language'
    // со значением по умолчанию 'en'
    @requestHeader('Accept-Language', {
      type: DataType.STRING,
      default: 'en',
    })
    lang: string,
  ) {
    // lang будет 'en', если заголовок отсутствует,
    // или будет содержать значение заголовка, например 'ru-RU'
    return {content: `Content in ${lang} language`};
  }
}
```

### Cookies

Используется извлечения разобранного заголовка Cookies из входящего запроса.

Декораторы:

- `@requestCookie(name, schema)`  
  \- извлечение отдельного Cookie;

- `@requestCookies(schema)`  
  \- извлечение всех Cookies;

Пример:

```ts
import {
  DataType,
  getAction,
  requestCookie,
} from '@e22m4u/ts-rest-router';

@restController('session')
class SessionController {
  // GET /session/info
  @getAction('info')
  getSessionInfo(
    // извлечение cookie с именем 'sessionId'
    // и проверка, что значение является строкой
    @requestCookie('sessionId', {
      type: DataType.STRING,
      required: true,
    })
    sessionId: string,
  ) {
    // если cookie 'sessionId' отсутствует,
    // будет выброшена ошибка 400 Bad Request
    return {sessionId, info: 'User session data...'};
  }
}
```

### Контекст запроса

Для доступа к "сырым" объектам запроса/ответа Node.js или другим частям
контекста используются следующие декораторы:

- `@requestContext()` - инъекция всего объекта `RequestContext`;
- `@requestContext('req')` - инъекция нативного `IncomingMessage`;
- `@requestContext('res')` - инъекция нативного `ServerResponse`;
- `@requestContext('container')` - инъекция DI-контейнера запроса;
- Псевдонимы: `@httpRequest()`, `@httpResponse()`, `@requestContainer()`;

```ts
import {
  getAction,
  requestContext,
  RequestContext,
} from '@e22m4u/ts-rest-router';

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

## Валидация данных

Модуль интегрирован с
[@e22m4u/js-data-schema](https://www.npmjs.com/package/@e22m4u/js-data-schema)
для гибкой проверки данных. Это дает возможность определять типы данных
и сложные правила.

Базовые типы:

- `DataType.ANY`
- `DataType.STRING`
- `DataType.NUMBER`
- `DataType.BOOLEAN`
- `DataType.ARRAY`
- `DataType.OBJECT`

Для более сложных проверок используется объект схемы:

```ts
type DataSchema = {
  type: DataType; // обязательное поле
  required?: boolean; // значение не может быть null или undefined
  default?: unknown; // значение по умолчанию, если `required: false`
  items?: DataSchema; // схема для элементов массива (для type: DataType.ARRAY)
  properties?: {[key: string]: DataSchema}; // схема для свойств объекта
  validate?: (value: any) => boolean | string; // пользовательская функция
};
```

Пример сложной валидации:

```ts
import {
  DataType,
  postAction,
  requestBody,
} from '@e22m4u/ts-rest-router';

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
          // описание схемы для каждого элемента массива
          items: {
            type: DataType.OBJECT,
            properties: {
              id: {
                type: DataType.NUMBER,
                required: true,
              },
              quantity: {
                type: DataType.NUMBER,
                required: true,
                // валидатор: количество должно быть больше 0
                validate: qty => qty > 0 || 'Quantity must be positive',
              },
            },
          },
        },
      },
    })
    orderData: {
      /* ... */
    },
  ) {
    // ...
  }
}
```

## Хуки

Функции, выполняющиеся до или после основного метода контроллера именуются
«Хуками». Они предназначены для сквозной логики, такой как аутентификация,
логирование или модификация ответа. Применение хуков возможно как ко всему
контроллеру, так и к отдельному методу.

Декораторы:

- `@beforeAction(preHandler)` - выполняется перед методом контроллера;
- `@afterAction(postHandler)` - выполняется после метода контроллера;

Пример:

```ts
import createError from 'http-errors';
import {RequestContext} from '@e22m4u/ts-rest-router';

// хук для проверки аутентификации
async function authHook(ctx: RequestContext) {
  const token = ctx.headers.authorization;
  if (!token /* || !isValidToken(token) */) {
    // выброс ошибки прерывает выполнение и отправляет
    // клиенту соответствующий HTTP-статус
    throw createError(401, 'Unauthorized');
  }
}

// хук для логирования и модификации ответа
async function loggerHook(ctx: RequestContext, data: any) {
  console.log(`Response for ${ctx.pathname}:`, data);
  // хуки @afterAction могут модифицировать ответ
  return {...data, timestamp: new Date()};
}

@beforeAction(authHook) // применение ко всем методам контроллера
@restController('profile')
class ProfileController {
  @getAction('me')
  @afterAction(loggerHook) // применение только к этому методу
  getMyProfile() {
    return {id: 1, name: 'Current User'};
  }

  @getAction('settings')
  getMySettings() {
    return {theme: 'dark'};
  }
}
```

## Архитектура

Понимание архитектурных принципов `ts-rest-router` является ключом
к созданию надежных и масштабируемых приложений. Модуль построен на
базе библиотеки `@e22m4u/js-service`, реализующей паттерн
Service Locator / Dependency Injection.

#### Изоляция запросов

Для каждого входящего HTTP-запроса создается новый, изолированный
экземпляр контроллера. Этот фундаментальный принцип гарантирует, что
состояние одного запроса (например, данные аутентифицированного
пользователя) никогда не будет разделено с другим, одновременно
обрабатываемым запросом. Это устраняет целый класс потенциальных
ошибок, связанных с состоянием гонки.

#### Внедрение зависимостей

Каждый экземпляр контроллера создается с помощью своего собственного
DI-контейнера, который существует только в рамках одного запроса. Чтобы
контроллер мог взаимодействовать с другими сервисами (например, с сервисом
для работы с базой данных), его класс должен наследоваться от базового
класса `Service`. Это дает доступ к методу `this.getService()` для
получения зависимостей.

**Практический пример с сервисом аутентификации:**

1\. Создание хука для подготовки сервиса.

С помощью хука можно подготовить сервис, специфичный для каждого запроса.
В данном примере хук `@beforeAction` создает экземпляр `AuthService`,
выполняет аутентификацию и регистрирует его в контейнере запроса.

```ts
// src/auth.hook.ts
import {AuthService} from './auth.service';
import {RequestContext} from '@e22m4u/ts-rest-router';

export async function authHook(context: RequestContext) {
  const requestContainer = context.container;
  // создание сервиса с передачей ему контейнера запроса
  const authService = new AuthService(requestContainer);
  // регистрация созданного экземпляра в контейнере
  // (теперь любой другой сервис в рамках текущего
  // запроса сможет получить данный экземпляр)
  requestContainer.set(AuthService, authService);
  // выполнение логики аутентификации
  await authService.authenticate(context.headers.authorization);
}
```

2\. Создание `AuthService`.

`AuthService` наследуется от `Service`, что позволяет ему запрашивать другие
зависимости (например, `this.getService(DatabaseService)`).

```ts
// src/auth.service.ts
import {Service} from '@e22m4u/js-service';

export class AuthService extends Service {
  public currentUser?: {id: number; name: string};

  async authenticate(token?: string) {
    // логика проверки токена и поиска
    // пользователя в базе данных...
    if (token === 'valid-token') {
      this.currentUser = {id: 1, name: 'John Doe'};
    }
  }
}
```

3\. Использование сервиса в контроллере.

Контроллер, унаследованный от `Service`, теперь может получить
доступ к предварительно настроенному экземпляру `AuthService`
через `this.getService()`.

```ts
// src/profile.controller.ts
import {authHook} from './auth.hook';
import createError from 'http-errors';
import {Service} from '@e22m4u/js-service';
import {AuthService} from './auth.service';
import {getAction, beforeAction, restController} from '@e22m4u/ts-rest-router';

@beforeAction(authHook)
@restController('profile')
export class ProfileController extends Service {
  @getAction('me')
  getProfile() {
    // получение request-scoped экземпляра AuthService,
    // который был создан и зарегистрирован в хуке
    const authService = this.getService(AuthService);

    if (!authService.currentUser) {
      throw createError(401, 'Unauthorized');
    }

    return authService.currentUser;
  }
}
```

Таким образом, DI-контейнер запроса выступает в роли моста между хуками
и контроллером, позволяя безопасно передавать состояние, изолированное
в рамках одного HTTP-запроса.

## Производительность

В основе данного модуля лежит
[@e22m4u/js-trie-router](https://www.npmjs.com/package/@e22m4u/js-trie-router),
который использует структуру данных
*префиксного дерева ([Trie](https://en.wikipedia.org/wiki/Trie))*
для хранения маршрутов и их сопоставления. Такое архитектурное решение
обеспечивает высокую производительность, особенно в приложениях
с большим количеством маршрутов.

#### Как это работает?

Вместо хранения маршрутов в виде плоского списка, префиксное дерево
организует их в древовидную структуру. Каждый маршрут, например
`GET /users/:id/posts`, разбивается на сегменты (`GET`, `users`, `:id`,
`posts`), где каждый сегмент становится узлом в дереве.

Когда поступает новый запрос, например `GET /users/123/posts`,
маршрутизатор не перебирает все существующие маршруты. Вместо этого
он последовательно спускается по дереву:

1. Находит корневой узел для метода `GET`.
2. От него переходит к дочернему узлу `users`.
3. Далее, не найдя статического узла `123`, он ищет динамический
   узел (`:id`) и сопоставляет его, сохраняя `123` как значение
   параметра `id`.
4. Наконец, он переходит к узлу `posts` и находит совпадение.

#### Преимущества

- **Эффективный поиск O[k]**  
  Самое главное преимущество - скорость поиска. Вместо того чтобы
  перебирать массив из `N` маршрутов и проверять каждый с помощью
  регулярного выражения (сложность `O(N)`), префиксное дерево
  находит совпадение за время, пропорциональное количеству сегментов
  `k` в URL-пути (сложность `O(k)`). Это означает, что производительность
  поиска **не падает** с ростом общего числа маршрутов в приложении.

- **Быстрая обработка 404 (ранний выход)**  
  Если приходит запрос на несуществующий путь, например
  `/users/123/comments`, поиск по дереву прекратится сразу после
  того, как маршрутизатор не найдет дочерний узел `comments`
  у узла `:id`. Ему не нужно проверять остальные сотни маршрутов,
  чтобы убедиться, что совпадений нет. Это делает обработку
  ненайденных маршрутов (404) почти мгновенной.

- **Оптимизация для статических и динамических маршрутов**  
  При поиске маршрутизатор всегда отдает приоритет статическим
  сегментам перед динамическими. Маршрут `/users/me` всегда будет
  найден раньше и быстрее, чем `/users/:id` при запросе `/users/me`,
  поскольку не требуется проверка на соответствие шаблону.

## Декораторы

#### Контроллер и методы:

- `@restController(options)` - определение класса как контроллера;
- `@getAction(path, options)` - метод GET;
- `@postAction(path, options)` - метод POST;
- `@putAction(path, options)` - метод PUT;
- `@patchAction(path, options)` - метод PATCH;
- `@deleteAction(path, options)` - метод DELETE;
- `@restAction(options)` - базовый декоратор для определения метода;

#### Хуки:

- `@beforeAction(hook)` - выполнение перед методом;
- `@afterAction(hook)` - выполнение после метода;

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

## Лицензия

MIT
