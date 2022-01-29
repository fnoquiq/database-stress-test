import { Request, Response } from 'express'
import { Job, Queue, QueueEvents, Worker } from 'bullmq';
import { prisma } from '../config/prisma'
import { connection } from '../config/redis'

const myQueue = new Queue('stress', { connection });

export class QueueController {
  async configure(request: Request, response: Response) {
    console.log('Request: /configure')
    try {
      await prisma.test.create({
        data: {
          count: 1
        }
      })
      
      return response.json({
        configure: 'configured'
      })
    }catch(err) {
      response.json({
        message: 'error',
        err
      })
    }
  }

  async stress(request: Request, response: Response) {
    const ret = myQueue.add('stress', {increment: 1})
    
    return response.json(ret)
  }
}

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

const queueEvents = new QueueEvents('stress');

queueEvents.on('completed', (arg) => {
  console.log('completed', arg.returnvalue)
  myQueue.getJobCounts('wait', 'completed', 'failed').then(res => console.log(`Queue status: [Wait: ${res.wait}] [Completed: ${res.completed}] [Failed: ${res.failed}]`))
});