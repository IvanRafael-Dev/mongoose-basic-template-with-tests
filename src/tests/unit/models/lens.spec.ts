import chai, { expect } from "chai"
import chaiAsPromised from 'chai-as-promised'
import { Model, Types } from "mongoose"
import * as sinon from 'sinon'
import Lens from "../../../models/Lens"
import * as mock from './mocks'

chai.use(chaiAsPromised)

describe('Lens Model', () => {
  const lensModel = new Lens()
  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(mock.lensMockWithId)
    sinon.stub(Model, 'findOne').resolves(mock.lensMockWithId)
  })
  afterEach(() => {
    sinon.restore()
  })

  describe('#create', () => {
    describe('when creating a new lens with success', () => {
      it('should return the created lens with related "_id"', async () => {
        const lens = await lensModel.create(mock.lensRequestMock)
        expect(lens).to.be.equal(mock.lensMockWithId)
      })
    })
  })

  describe('#readOne', () => {
    describe('when the lens if found', () => {
      it('should return the found lens with related "_id"', async () => {
        const lens = await lensModel.readOne(mock._id)
        expect(lens).to.be.equal(mock.lensMockWithId)
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