import { isValidObjectId, Model } from 'mongoose';
import IModel from './interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;
  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(body: T): Promise<T> {
    return this._model.create({ ...body });
  }

  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error('InvalidMongoId');
    }
    return this._model.findOne({ _id });
  } 
}