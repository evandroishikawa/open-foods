import { healthController } from '../controllers/health.controller.mjs'

export const healthRoutes = (fastify) => {
  fastify.get('/', healthController.getHealth)
}
