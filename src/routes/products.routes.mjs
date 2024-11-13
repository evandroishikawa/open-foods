import { productsController } from '../controllers/products.controller.mjs'

export const productsRoutes = (fastify) => {
  fastify.get('/', productsController.getAll)

  fastify.get('/:code', productsController.getByCode)

  fastify.put('/:code', productsController.update)

  fastify.delete('/:code', productsController.delete)
}
