import { model as createModel, Schema } from 'mongoose';
import ILens from './interfaces/ILens';
import MongoModel from './MongoModel';

const lensMongooseSchema = new Schema<ILens>({
  antiGlare: Boolean,
  blueLightFilter: Boolean,
  degree: Number,
});

export default class Lens extends MongoModel<ILens> {
  constructor(model = createModel<ILens>('Lens', lensMongooseSchema)) {
    super(model);
  }
}