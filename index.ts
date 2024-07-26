import type { INestApplication } from '@nestjs/common'
import { static as static_, type Response } from 'express'
import * as fastify from 'fastify'
import { resolve, join } from 'node:path'

interface Service {
  name: string
  url: string
  swaggerVersion: string
  location: string
}
export function knife4jSetup(app: INestApplication, services: Service[]) {
  const httpAdapter = app.getHttpAdapter().getType()
  if (!['express', 'fastify'].includes(httpAdapter)) {
    throw new Error('http adapter only supported express and fastify')
  }
  if (httpAdapter === 'express') {
    app.use('/', static_(resolve(__dirname, '../public/')))
    app.use('/services.json', (_, res: Response) => {
      res.send(services)
    })
    return
  }
  const fastifyInstance = fastify()
  fastifyInstance.register(require('@fastify/static'), {
    root: join(__dirname, 'public'),
    prefix: '/',
  })
  fastifyInstance.get('/services.json', (_, repl: fastify.FastifyReply) => {
    repl.send(services)
  })
}
