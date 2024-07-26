import type { INestApplication } from '@nestjs/common'
import { resolve, join } from 'node:path'

interface Service {
  name: string
  url: string
  swaggerVersion: string
  location: string
}
export async function knife4jSetup(app: INestApplication, services: Service[]) {
  const httpAdapter = app.getHttpAdapter().getType()
  if (!['express', 'fastify'].includes(httpAdapter)) {
    throw new Error('http adapter only supported express and fastify')
  }
  if (httpAdapter === 'express') {
    let expressStatic: any
    try {
      expressStatic = await import('express').then((mod) => mod.static)
    } catch (error) {
      throw new Error('Express is not installed')
    }
    app.use('/', expressStatic(resolve(__dirname, '../public/')))
    app.use('/services.json', (_, res: any) => {
      res.send(services)
    })
    return
  }
  const fastifyInstance = app.getHttpAdapter().getInstance()
  fastifyInstance.register(require('@fastify/static'), {
    root: join(__dirname, '../public'),
    prefix: '/',
  })
  fastifyInstance.get('/services.json', (_, repl: any) => {
    repl.send(services)
  })
}
