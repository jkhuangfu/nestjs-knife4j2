## Description

The provided code sets up Knife4j for enhancing Swagger/OpenAPI documentation in a NestJS application, supporting both Express and Fastify HTTP adapters. Thanks to [@xiaoymin](https://github.com/xiaoymin) for providing the WebUI.

## Usage

```shell
npm install nestjs-knife4j2
 # if you want to use fastify, you nedd run  npm install @fastify/static
```

| @fastify/static version | Fastify version |
| ----------------------- | --------------- |
| `^8.x`                  | `^5.x`          |
| `^7.x`                  | `^4.x`          |
| `^5.x`                  | `^3.x`          |
| `^2.x`                  | `^2.x`          |
| `^1.x`                  | `^1.x`          |

## in main.ts

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { knife4jSetup } from 'nestjs-knife4j2'

// add this code if you want to use fastify
import fastifyStatic from '@fastify/static'

async function bootstrap() {
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // if you want to use express, you can use the following code
  knife4jSetup(app, [
    {
      name: '2.0 version',
      url: `/api-json`,
      swaggerVersion: '2.0',
      location: `/api-json`,
    },
  ])
  // if you want to use fastify, you can use the following code and you must import @fastify/static
  knife4jSetup(
    app,
    [
      {
        name: '2.0 version',
        url: `/api-json`,
        swaggerVersion: '2.0',
        location: `/api-json`,
      },
    ],
    fastifyStatic,
  )

  await app.listen(3000)
}
```

then you can browse on [http://127.0.0.1:3000/doc.html](http://127.0.0.1:3000/doc.html)


# Changelog

## [1.0.7] - 2025-07-17

### Fixed

- 修复 bug [issues/2](https://github.com/jkhuangfu/nestjs-knife4j2/issues/2)
