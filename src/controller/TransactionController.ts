import { prisma } from '../config/prisma';
import { Request, Response } from 'express-serve-static-core';
import { IController } from './IController';

export class TransactionController implements IController {
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
      const count = await prisma.$transaction(async (prisma) => {
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
          return countUpdated.count
        }catch (err) {
          console.log(err)
        }
      })
      
      
      response.json({
        count
      })

    }catch(err) {
      response.json({
        message: 'error',
        err
      })
    }
  }
}