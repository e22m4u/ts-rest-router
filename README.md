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

Creating a controller and methods.

```ts
import {get} from '@e22m4u/ts-rest-router';
import {post} from '@e22m4u/ts-rest-router';
import {DataType} from '@e22m4u/ts-rest-router';
import {controller} from '@e22m4u/ts-rest-router';

@controller('/users')           // controller path
class UserController {          // controller class
  @post('/login')               // POST /users/login method
  async login(
    @bodyParam('username', {    // "username" is request body parameter
      type: DataType.STRING,    // parameter type allows only strings
      required: true,           // parameter is required
    })
    username: string,
    @bodyParam('password', {    // "password" is request body parameter
      type: DataType.STRING,    // parameter type allows only strings
      required: true,           // parameter is required
    })
    password: string,
  ) {
    return {                    // if method returns an object,
      id: '123',                // the result will be presented as
      firstName: 'John',        // "Content-Type: application/json"
      lastName: 'Doe',
    };
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

Defining a controller.

```ts
@controller()
class UserController {
  // controller methods
}
```

Defining controller path.

```ts
@controller('/users')  // controller path
class UserController {
  // controller methods
}
```

Additional decorator parameters.

```ts
@controller({
  path: '/api'               // controller path
  before: [authMiddleware],  // middleware before request processing
  after: [loggerMiddleware], // middleware after request processing
})
class UserController {
  // controller methods
}
```

#### `@get(path: string, options?: ActionOptions)`

Defining GET method.

```ts
@controller('/users')  // controller path
class UserController { // controller class
  @get('/whoAmI')      // GET /users/whoAmI route
  async whoAmI() {
    return {           // if method returns an object,
      name: 'John',    // the result will be presented
      surname: 'Doe',  // as "Content-Type: application/json"
    };
  }
}
```

Additional decorator parameters.

```ts
@controller('/users')          // controller path
class UserController {         // controller class
  @get('/whoAmI', {            // GET /users/whoAmI route
    before: [authMiddleware],  // middleware before request processing
    after: [loggerMiddleware], // middleware after request processing
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

Access to request context.

```ts
import {RequestContext} from '@e22m4u/js-trie-router';

@controller('/users')          // controller path
class UserController {         // controller class
  @get('/:id')                 // GET /users/:id route
  findById(
    @requestContext()          // including request context
    ctx: RequestContext,       // as method parameter
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

Access to context properties.

```ts
import {ServerResponse} from 'http';
import {IncomingMessage} from 'http';

@controller('/users')      // controller path
class UserController {     // controller class
  @get('/:id')             // GET /users/:id route
  findById(
    @requestContext('req') // request context decorator
    req: IncomingMessage,  // including "req" property
    @requestContext('res') // request context decorator
    res: ServerResponse,   // including "res" property
  ) {
    console.log(req);      // IncomingMessage
    console.log(res);      // ServerResponse
  }
}
```

Context properties:

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