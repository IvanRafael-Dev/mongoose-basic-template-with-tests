import { model as createModel, Schema } from 'mongoose';
import IFrame from './interfaces/IFrame';
import MongoModel from './MongoModel';

const frameMongooseSchema = new Schema<IFrame>({
  color: String,
  material: String,
});

export default class Frame extends MongoModel<IFrame> {
  constructor(model = createModel('Frame', frameMongooseSchema)) {
    super(model);
  }  
}