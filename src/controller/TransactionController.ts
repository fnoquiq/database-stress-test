import { Request, Response } from 'express-serve-static-core';
import { IController } from './IController';

export class TransactionController implements IController {
  async configure(request: Request, response: Response) {
    return response.json({
      message: 'Not Implemented!'
    })
  }

  async stress(request: Request, response: Response) {
    return response.json({
      message: 'Not Implemented!'
    })
  }
}