## Description

The provided code sets up Knife4j for enhancing Swagger/OpenAPI documentation in a NestJS application, supporting both Express and Fastify HTTP adapters. Thanks to [@xiaoymin](https://github.com/xiaoymin) provided the WebUI.

## Usage

```shell
npm install nestjs-knife4j2
```

## in main.ts

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { knife4jSetup } from 'nestjs-knife4j2'


async function bootstrap(){
  ...

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  knife4jSetup(app, [
    {
      name: '2.0 version',
      url: `/api-json`,
      swaggerVersion: '2.0',
      location: `/api-json`,
    },
  ])
  await app.listen(3000)
  ...
}

```

then you can browse on [http://127.0.0.1:3000/doc.html](http://127.0.0.1:3000/doc.html)
