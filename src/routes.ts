import { Router } from 'express'

export default (router: Router): void => {
  router.get('/stress', (request, response) => {
    response.json({
      message: 'ok'
    })
  })
}