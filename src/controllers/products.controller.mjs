import { Product } from '../models/product.model.mjs'

export const productsController = {
  getAll: async (_, reply) => {
    try {
      const products = await Product.find()

      reply.send(products)
    } catch (error) {
      reply.status(500).send(error)
    }
  },

  getByCode: async (request, reply) => {
    try {
      const { code } = request.params

      const product = await Product.findOne({ code })

      reply.send(product)
    } catch (error) {
      reply.status(500).send(error)
    }
  },

  update: async (request, reply) => {
    try {
      const { code } = request.params

      const body = request.body

      const product = await Product.findOneAndUpdate({ code }, body)

      reply.send(product)
    } catch (error) {
      reply.status(500).send(error)
    }
  },

  delete: async (request, reply) => {
    try {
      const { code } = request.params

      await Product.deleteOne({ code })

      reply.status(203).send(`Product (${code}) deleted`)
    } catch (error) {
      reply.status(500).send(error)
    }
  },
}

