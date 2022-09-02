import { Types } from "mongoose"
import IFrame from "../../../../models/interfaces/IFrame"
import ILens from "../../../../models/interfaces/ILens"

// types
type Indexable = { _id: string }
type IModelReturns<T> = T & Indexable
type IModelReturnsArray<T> = T[] & Indexable[]

// request mocks
const lensRequestMock: ILens = {
  antiGlare: true,
  blueLightFilter: true,
  degree: 0.5
}

const frameRequestMock: IFrame = {
  color: 'red',
  material: 'wood'
}

// generate _id
const _id = new Types.ObjectId() as unknown as string

// model retuns 

const lensMockWithId: IModelReturns<ILens> = {
  _id,
  ...lensRequestMock
}

const frameMockWithId: IModelReturns<IFrame> = {
  _id,
  ...frameRequestMock
}



const lensMockArrayWithId: IModelReturnsArray<ILens> = [
  {
    _id,
    ...lensRequestMock
  }
]

const frameMockArrayWithId: IModelReturnsArray<IFrame> = [
  {
    _id,
  ...frameRequestMock
  }
]

export {
  lensRequestMock,
  frameRequestMock,
  _id,
  frameMockWithId,
  lensMockWithId,
  lensMockArrayWithId,
  frameMockArrayWithId
}