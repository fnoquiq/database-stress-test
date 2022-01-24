import { Request, Response } from 'express';

import { prisma } from '../config/prisma';
import { IController } from './IController';

export class CountController implements IController{
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
    console.log('Request: /stress')
    try {
      const testCounter = await prisma.test.findFirst({
        where: {
          id: 1
        }
      })

      if (!testCounter) {
        return response.json({
          error: 'Not found testCounter'
        })
      }

      const countUpdated = await prisma.test.update({
        where: {
          id: testCounter.id
        },
        data: {
          count: testCounter.count + 1
        }
      })
      
      response.json({
        count: countUpdated.count
      })

    }catch(err) {
      response.json({
        message: 'error',
        err
      })
    }
  }
}