import { Request, Response } from 'express';

export interface IController {
  configure(request: Request, response: Response): Promise<any>
  stress(request: Request, response: Response): Promise<any>
}