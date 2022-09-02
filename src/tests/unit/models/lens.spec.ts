import chai, { expect } from "chai"
import chaiAsPromised from 'chai-as-promised'
import { Model, Types } from "mongoose"
import * as sinon from 'sinon'
import ILens from "../../../models/interfaces/ILens"
import Lens from "../../../models/Lens"

chai.use(chaiAsPromised)

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

describe('Lens Model', () => {
  const lensModel = new Lens()
  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(lensMockWithId)
    sinon.stub(Model, 'findOne').resolves(lensMockWithId)
  })
  afterEach(() => {
    sinon.restore()
  })

  describe('#create', () => {
    describe('when creating a new lens with success', () => {
      it('should return the created lens with related "_id"', async () => {
        const lens = await lensModel.create(lensRequestMock)
        expect(lens).to.be.equal(lensMockWithId)
      })
    })
  })

  describe('#readOne', () => {
    describe('when the lens if found', () => {
      it('should return the found lens with related "_id"', async () => {
        const lens = await lensModel.readOne(_id)
        expect(lens).to.be.equal(lensMockWithId)
      })
    })

    describe('when an invalid "_id" is provided', () => {
      it('should return an error', () => {
        return expect(lensModel.readOne('invalid_id'))
          .to.be.rejectedWith(Error, 'InvalidMongoId')
      })
    })
  })
})