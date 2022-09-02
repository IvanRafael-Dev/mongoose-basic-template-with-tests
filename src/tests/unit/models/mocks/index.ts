import { Types } from "mongoose"
import IFrame from "../../../../models/interfaces/IFrame"
import ILens from "../../../../models/interfaces/ILens"

const lensRequestMock: ILens = {
  antiGlare: true,
  blueLightFilter: true,
  degree: 0.5
}

const frameRequestMock: IFrame = {
  color: 'red',
  material: 'wood'
}

const _id = new Types.ObjectId() as unknown as string

const lensMockWithId: ILens & { _id: string } = {
  _id,
  ...lensRequestMock
}

const frameMockWithId: IFrame & { _id: string } = {
  _id,
  ...frameRequestMock
}

export {
  lensRequestMock,
  frameRequestMock,
  frameMockWithId,
  lensMockWithId,
  _id,
}