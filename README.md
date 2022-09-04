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

## Generic Abstract Class Service
```ts
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
```

## Generic Abstract Class Controller
```ts
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
```