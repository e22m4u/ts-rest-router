# @e22m4u/ts-rest-router

*[English](./README.md) | Русский*

Реализация REST маршрутизатора на основе контроллеров для TypeScript.

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
