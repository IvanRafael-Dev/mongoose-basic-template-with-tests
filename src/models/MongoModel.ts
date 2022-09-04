import { isValidObjectId, Model } from 'mongoose';
import { ErrorTypes } from '../erros/catalog';
import IModel from './interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;
  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(body: T): Promise<T> {
    return this._model.create({ ...body });
  }

  async read(): Promise<T[] | null> {
    return this._model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    return this._model.findOne({ _id });
  }

  async destroy(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    return this._model.findByIdAndDelete({ _id });
  }
}