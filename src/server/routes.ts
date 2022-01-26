import { CountController } from './../controller/CountController'
import { Router } from 'express'
import { IController } from '../controller/IController'
import { TransactionController } from '../controller/TransactionController'

let countController: IController

if (process.env.IS_ENABLED_TRANSACTIONS === 'true') {
  console.log('Transactions ON')
  countController = new TransactionController()
} else {
  console.log('Transactions OFF')
  countController = new CountController()
}

export default (router: Router): void => {
  router.get('/configure', countController.configure)

  router.get('/stress', countController.stress)
}