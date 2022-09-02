# Mongoose basic template example

## Configuration

- npm install mongoose
- add mongoose connection
```ts
import 'dotenv/config';
import mongoose from 'mongoose';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || 'mongodb://root:example@localhost:27017/glassesStore?authSource=admin',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
```

## Zod type models

```ts
import { z } from 'zod';

const schema = z.object({
  key1: z.number(),
  key2: z.boolean(),
  key3: z.boolean(),
});

type ISchema = z.infer<typeof schema>;

export default ISchema;
export { schema };
```

## Generic Model interface

```ts
export default interface IModel<T> {
  create(body: T): Promise<T>;
  readOne(_id: string): Promise<T | null>;
```

## Generic Abstract Class MongoModel

```ts
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
```

## Models extending MongoModel

```ts
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
```