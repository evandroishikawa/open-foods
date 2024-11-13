import axios from 'axios'

import { db } from '../lib/db.mjs'
import { processLargeNDJSON } from '../lib/parsers/parserLargeNDJSON.mjs'

import { ImportHistory } from '../models/importHistory.model.mjs'
import { Product } from '../models/product.model.mjs'

export default class CronController {
  static _instance = new CronController()
  static _lastRun = null

  constructor() {
    if (CronController._instance) {
      console.log('Instance already exists')
    }

    CronController._instance = this
  }

  static get lastRun() {
    return this._lastRun
  }

  static setLastRun(value) {
    this._lastRun = value
  }

  static async importProducts() {
    const importHistory = new ImportHistory()

    try {
      console.log('Cron job started: update products')

      await db.connect()

      await importHistory.save()

      const filenames = await getFilenames()

      let total = 0

      for (const filename of filenames) {
        console.log(`Processing ${filename}`)

        const results = await processLargeNDJSON(
          `https://challenges.coode.sh/food/data/json/${filename}`,
          processResult
        )

        total += results.length
      }

      importHistory.recordsCount = total
      importHistory.status = 'success'

      console.log(`Processed ${total} records`)
    } catch (error) {
      console.error('Update products job error:', error)

      importHistory.errors.push({
        message: error.message,
        stack: error.stack,
      })

      importHistory.status = 'failed'
    } finally {
      importHistory.endTime = new Date()

      await importHistory.save()
    }
  }
}

const INDEX_URL = 'https://challenges.coode.sh/food/data/json/index.txt'

const env = process.env.NODE_ENV || 'development'

async function getFilenames() {
  const filenamesResponse = await axios.get(INDEX_URL, {
    responseType: 'arraybuffer'
  })

  const buffer = Buffer.from(filenamesResponse.data)

  const filenames = buffer.toString().trim().split('\n')

  if (env === 'development') return [filenames[0]]

  return filenames
}

async function processResult(result) {
  const product = new Product({
    ...result,
    imported_t: new Date(),
    status: 'draft',
  })

  await product.save()
}
