import os from 'os'

import { CronController } from './cron.controller.mjs'

export const healthController = {
  getHealth: async (_, reply) => {
    try {
      const uptime = process.uptime()

      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const usedMemory = totalMemory - freeMemory;
      const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);

      const payload = {
        cronJobLastRun: CronController.lastRun,
        uptime: formatUptime(uptime).formatted,
        memoryUsage: `${memoryUsagePercent}%`
      }

      reply.send(payload)
    } catch (error) {
      reply.status(500).send(error)
    }
  },
}

const formatUptime = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return {
    days,
    hours,
    minutes,
    seconds: remainingSeconds,
    formatted: `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`
  }
}
