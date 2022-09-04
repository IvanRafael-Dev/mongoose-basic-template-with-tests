import { Request, Response } from 'express';
import { IService } from '../services/Service';

export interface GenRequest<T> extends Request {
  body: T
}

export interface IController<T> {
  create (req: GenRequest<T>, res: Response<T>): Promise<Response<T>>
  readOne (req: Request, res: Response<T>): Promise<Response>
}

export default abstract class Controller<T> implements IController<T> {
  protected _service: IService<T>;
  constructor(service: IService<T>) {
    this._service = service;
  }

  async create(req: GenRequest<T>, res: Response<T>): Promise<Response<T>> {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }

  async readOne(req: Request, res: Response<T>): Promise<Response<T>> {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }
}