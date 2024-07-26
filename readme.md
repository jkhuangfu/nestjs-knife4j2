## Usage

```shell
npm install nestjs-knife4j2
```

in main.ts

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
      name: '2.X版本',
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
