import { Job, Worker } from 'bullmq';

import { prisma } from '../config/prisma';
import { config } from 'dotenv-flow'

config({ silent: true })

import { connection } from '../config/redis'

const myWorker = new Worker('stress', async (job: Job)=>{
  try {
    const testCounter = await prisma.test.findFirst({
      where: {
        id: 1
      }
    })

    if (!testCounter) {
      return { error: 'Not found testCounter' }
    }

    const countUpdated = await prisma.test.update({
      where: {
        id: testCounter.id
      },
      data: {
        count: testCounter.count + 1
      }
    })
    
    return { count: countUpdated.count }

  }catch(err) {
    return { message: 'error', err }
  }
}, { connection });

myWorker.on('completed', (job: Job, returnvalue: any) => {
  console.log(`Completed Job ${job.id}: ${returnvalue}`)
});