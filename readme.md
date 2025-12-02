## 📢 项目迁移通知 (Project Migration Notice)

> ⚠️ 本项目已停止维护，已迁移至新项目 [nestjs-knife4j-plus](https://github.com/jkhuangfu/nestjs-knife4j-plus)，请使用新项目以获取最新功能和修复。

> ⚠️ This project is no longer maintained and has been migrated to the new project [nestjs-knife4j-plus](https://github.com/jkhuangfu/nestjs-knife4j-plus). Please use the new project to get the latest features and fixes.

## Description

The provided code sets up Knife4j for enhancing Swagger/OpenAPI documentation in a NestJS application, supporting both Express and Fastify HTTP adapters. Thanks to [@xiaoymin](https://github.com/xiaoymin) for providing the WebUI.

[![NPM version](https://img.shields.io/npm/v/nestjs-knife4j2?style=for-the-badge)](https://www.npmjs.com/package/nestjs-knife4j2) [![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE) [![GitHub issues](https://img.shields.io/github/issues/jkhuangfu/nestjs-knife4j2?style=for-the-badge)](https://github.com/jkhuangfu/nestjs-knife4j2/issues)

## 📦 Installation

```bash
# Install the package
npm install nestjs-knife4j2 @nestjs/swagger

# For Fastify adapter, also install:
npm install @fastify/static
```

## 🔄 Compatibility Matrix

| @fastify/static version | Fastify version |
| ----------------------- | --------------- |
| `^8.x`                  | `^5.x`          |
| `^7.x`                  | `^4.x`          |
| `^5.x`                  | `^3.x`          |
| `^2.x`                  | `^2.x`          |
| `^1.x`                  | `^1.x`          |

## 🚀 Usage

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { knife4jSetup } from 'nestjs-knife4j2'

// To use this with Fastify, first install @fastify/static. Please ensure version compatibility.

async function bootstrap() {
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // if you want to use express adapter, you can use the following code
  knife4jSetup(app, [
    {
      name: '2.0 version',
      url: `/api-json`,
    },
  ])

  await app.listen(3000)
}
```

then you can browse on [http://127.0.0.1:3000/doc.html](http://127.0.0.1:3000/doc.html)

## 📈 Changelog

### [1.0.10] - 2025-12-02

#### Updated

- 优化传参&整合对 fastify 的支持

### [1.0.8] - 2025-11-28

#### Updated

- 增加对 openapi 中 operationId 重复的处理
- 删除多余静态资源，减小体积

### [1.0.7] - 2025-07-17

#### Fixed

- 修复 bug [issues/2](https://github.com/jkhuangfu/nestjs-knife4j2/issues/2)
