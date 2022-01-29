import { Router } from 'express'
import { countController } from '../controller/ControllerFactory'

export default (router: Router): void => {
  router.get('/configure', countController.configure)

  router.get('/stress', countController.stress)
}