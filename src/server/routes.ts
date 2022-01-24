import { CountController } from './../controller/CountController'
import { Router } from 'express'

const countController = new CountController()

export default (router: Router): void => {
  router.get('/configure', countController.configure)

  router.get('/stress', countController.stress)
}