import { CountController } from './../controller/CountController'
import { Router } from 'express'
import { IController } from '../controller/IController'
import { TransactionController } from '../controller/TransactionController'
import { TransactionAtomicController } from '../controller/TransactionAtomicController'
import { QueueController } from '../controller/QueueController'

let countController: IController

console.log(`CONTROLLER INJECTION TYPE: ${process.env.CONTROLLER_INJECTION}`)

if (process.env.CONTROLLER_INJECTION === 'TRANSACTIONS') {
  countController = new TransactionController()
} else if (process.env.CONTROLLER_INJECTION === 'ATOMIC_TRANSACTIONS') {
  countController = new TransactionAtomicController()
} else if (process.env.CONTROLLER_INJECTION === 'QUEUE') {
  countController = new QueueController()
} else {
  countController = new CountController()
}

export default (router: Router): void => {
  router.get('/configure', countController.configure)

  router.get('/stress', countController.stress)
}