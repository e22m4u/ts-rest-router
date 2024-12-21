# @e22m4u/ts-rest-router

*English | [Русский](./README-ru.md)*

Controllers-based REST router implementation for TypeScript.

#### Key Features

- Declarative route definition using decorators.
- Typed request parameters (body, query, params).
- Pre and post request middleware support.
- Input data validation.
- Support for all HTTP methods (GET, POST, PUT, DELETE, etc.).

## Installation

```bash
npm install @e22m4u/ts-rest-router
```

#### Decorators support

To enable decorators support add the following
options to your `tsconfig.json` file.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Basic Usage

Creating a controller.

```ts
import {controller, get, post} from '@e22m4u/ts-rest-router';

@controller()
class UserController {
  @get('/users')
  async getUsers() {
    return { users: [] };
  }

  @post('/users')
  async createUser(
    @body() userData: UserDTO,
  ) {
    return { success: true };
  }
}
```

Request parameters.

```ts
@controller()
class ProductController {
  @get('/products/:id')
  async getProduct(
    @param('id') productId: string,
    @query('fields') fields?: string,
    @headers('authorization') auth?: string,
  ) {
    // ...
  }
}
```

Middleware and hooks.

```ts
@controller({
  path: '/api',
  before: [authMiddleware],
  after: [loggerMiddleware],
})
class ApiController {
  @get('/secure', {
    before: [checkPermissions],
  })
  secureEndpoint() {
    // ...
  }
}
```

Registering controllers and starting the server.

```ts
import http from 'http';
import {RestRouter} from '@e22m4u/ts-rest-router';

// create router and register controllers
const router = new RestRouter();
router.registerController(UserController);
router.registerController(ProductController);

// create server and register request handler
const server = new http.Server();
server.on('request', router.requestListener);

// start server
server.listen('8080', '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:8080`);
});
```

## Decorators

Controller and methods:

- `@controller` - defines a class as a controller
- `@action` - base decorator for methods
- `@get` - GET requests
- `@post` - POST requests
- `@put` - PUT requests
- `@patch` - PATCH requests
- `@del` - DELETE requests

Request parameters:

- `@param` - single URL parameter
- `@params` - all URL parameters as an object
- `@query` - single query parameter
- `@queries` - all query parameters as an object
- `@body` - request body
- `@bodyParam` - specific field from request body
- `@header` - single header
- `@headers` - all headers as an object
- `@cookie` - single cookie
- `@cookies` - all cookies as an object
- `@requestContext` - access to request context
- `@requestData` - universal decorator for accessing request data

#### `@controller(options?: ControllerOptions)`

Decorator for defining a class as a REST API controller.

```ts
@controller()
class UserController {
  // controller methods
}
```

Additional decorator parameters.

```ts
@controller({
  path: '/api'
  before: [authMiddleware],
  after: [loggerMiddleware],
})
class UserController {
  // controller methods
}
```

### `@get(path: string, options?: ActionOptions)`

Decorator for defining GET method.

```ts
@controller()
class UserController {
  @get('/users')
  async getUsers() {
    return {users: []};
  }

  @get('/users/:id') 
  getUser(
    @param('id') userId: string,
  ) {
    return {user: {id: userId}};
  }
}
```

Additional decorator parameters.

```ts
@controller()
class UserController {
  @get('/users', {
    before: [authMiddleware],
    after: [loggerMiddleware],
  })
  async getUsers() {
    return {users: []};
  }
}
```

### `@requestContext(propertyName?: string)`

Decorator for accessing request context.

```ts
import {IncomingMessage, ServerResponse} from 'http';

@controller()
class UserController {
  @get('/users')
  getUsers(
    @requestContext('req') req: IncomingMessage,
    @requestContext('res') res: ServerResponse,
  ) {
    // Access to original request/response objects
  }
}
```

Available properties:

- `container: ServiceContainer` instance of [service container](https://npmjs.com/package/@e22m4u/js-service)
- `req: IncomingMessage` native incoming request stream
- `res: ServerResponse` native server response stream
- `params: ParsedParams` key-value object with path parameters
- `query: ParsedQuery` key-value object with query string parameters
- `headers: ParsedHeaders` key-value object with request headers
- `cookie: ParsedCookie` key-value object of parsed `cookie` header
- `method: string` request method in uppercase, e.g. `GET`, `POST`, etc.
- `path: string` path including query string, e.g. `/myPath?foo=bar`
- `pathname: string` request path, e.g. `/myMath`
- `body: unknown` request body

## Debugging

Set the `DEBUG` variable to enable log output.

```bash
DEBUG=tsRestRouter* npm run test
```

## Tests

```bash
npm run test
```

## License

MIT
