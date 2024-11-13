import dotenv from 'dotenv'
import Fastify from 'fastify'
import cron from 'node-cron'

import { CronController } from './controllers/cron.controller.mjs'

import { db } from './lib/db.mjs'

import { productsRoutes } from './routes/products.routes.mjs'
import { healthRoutes } from './routes/health.routes.mjs'

dotenv.config()

await db.connect()

const fastify = Fastify({ logger: true })

fastify.register(healthRoutes)

fastify.register(productsRoutes, { prefix: '/products' })

fastify.listen({ port: process.env.PORT || 3000 }, (error, address) => {
  if (error) {
    fastify.log.error(error)

    process.exit(1)
  }

  fastify.log.info(`Server listening at ${address}`)
})

cron.schedule('0 * * * *', () => {
  CronController
    .importProducts()
    .then(() => console.log('Produtos atualizados'))
    .catch((error) => console.log('Erro ao atualizar produtos:', error))
})
