import { Types } from "mongoose"
import ILens from "../../../../models/interfaces/ILens"

const lensRequestMock: ILens = {
  antiGlare: true,
  blueLightFilter: true,
  degree: 0.5
}

const _id = new Types.ObjectId() as unknown as string

const lensMockWithId: ILens & { _id: string } = {
  _id,
  ...lensRequestMock
}

export {
  lensRequestMock,
  lensMockWithId,
  _id,
}