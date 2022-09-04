import { ZodSchema } from 'zod';
import { ErrorTypes } from '../erros/catalog';
import IModel from '../models/interfaces/IModel';

export interface IService<T> {
  create(obj:T):Promise<T>,
  readOne(_id:string):Promise<T>,
  // safeParse?(obj: T): SafeParseReturnType<T, T> | undefined
}

export default abstract class Service<T> implements IService<T> {
  protected _repository: IModel<T>;
  protected _schema: ZodSchema<T>;
  constructor(_repository: IModel<T>, schema: ZodSchema<T>) {
    this._repository = _repository;
    this._schema = schema;
  }

  async create(obj: T): Promise<T> {
    const isValid = this._schema.safeParse(obj);
    if (!isValid.success) {
      throw isValid.error;
    }
    return this._repository.create(obj);
  }

  async readOne(_id: string): Promise<T> {
    const result = await this._repository.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}