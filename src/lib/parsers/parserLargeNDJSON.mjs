import axios from 'axios'
import split2 from 'split2'
import { Transform } from 'stream'
import zlib from 'zlib'

export async function processLargeNDJSON(url, processFn) {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
      decompress: false,
    })

    const gunzip = zlib.createGunzip()

    const processLine = new Transform({
      objectMode: true,
      transform(line, encoding, callback) {
        try {
          if (line) {
            const parsedLine = JSON.parse(line)

            this.push(parsedLine)
          }

          callback()
        } catch (error) {
          callback(error)
        }
      }
    })

    return new Promise((resolve) => {
      const result = []

      response.data
        .pipe(gunzip)
        .pipe(split2())
        .pipe(processLine)
        .on('data', async (data) => {
          result.push(data)

          if (processFn) await processFn(data)
        })
        .on('end', () => {
          resolve(result)
        })
    })
  } catch (error) {
    console.error('Error processing large NDJSON:', error)

    throw error
  }
}
