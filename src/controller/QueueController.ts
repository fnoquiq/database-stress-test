import { Request, Response } from 'express'
import { Queue } from 'bullmq'
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