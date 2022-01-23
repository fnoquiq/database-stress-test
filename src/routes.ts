import { prisma } from './prisma'
import { Request, Response, Router } from 'express'

export default (router: Router): void => {
  router.get('/configure', async (request: Request, response: Response) => {
    try {
      await prisma.test.create({
        data: {
          count: 1
        }
      })
      
      response.json({
        configure: 'ok'
      })
    }catch(err) {
      response.json({
        message: 'error',
        err
      })
    }
  })

  router.get('/stress', async (request: Request, response: Response) => {
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

      await prisma.test.update({
        where: {
          id: testCounter.id
        },
        data: {
          count: testCounter.count + 1
        }
      })
      
      response.json({
        message: 'ok'
      })

    }catch(err) {
      response.json({
        message: 'error',
        err
      })
    }
  })
}