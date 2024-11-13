import mongoose from 'mongoose'

class Database {
  constructor() {
    this.connection = null
  }

  async connect() {
    if (this.connection) {
      console.log('Database already connected')

      return this.connection
    }

    try {
      const connection = await mongoose.connect(process.env.MONGODB_URI)

      this.connection = connection

      console.log('Database connected')

      return this.connection
    } catch (error) {
      console.error('Database connection error:', error)

      throw error
    }
  }

  getConnection() {
    return this.connection
  }
}

export const db = new Database()
