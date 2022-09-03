import chai, { expect } from "chai"
import chaiAsPromised from 'chai-as-promised'
import { Model } from "mongoose"
import * as sinon from 'sinon'
import Frame from "../../../models/Frame"
import * as mock from '../mocks'

chai.use(chaiAsPromised)

describe('Lens Model', () => {
  const frameModel = new Frame()
  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(mock.frameMockWithId)
    sinon.stub(Model, 'findOne').resolves(mock.frameMockWithId)
    sinon.stub(Model, 'find').resolves(mock.frameMockArrayWithId)
    sinon.stub(Model, 'findByIdAndDelete').resolves(mock.frameMockWithId)
  })
  afterEach(() => {
    sinon.restore()
  })

  describe('#create', () => {
    describe('when creating a new frame with success', () => {
      it('should return the created frame with related "_id"', async () => {
        const frame = await frameModel.create(mock.frameRequestMock)
        expect(frame).to.be.equal(mock.frameMockWithId)
      })
    })
  })

  describe('#readOne', () => {
    describe('when the frame is found', () => {
      it('should return the found frame with related "_id"', async () => {
        const frame = await frameModel.readOne(mock._id)
        expect(frame).to.be.equal(mock.frameMockWithId)
      })
    })

    describe('when an invalid "_id" is provided', () => {
      it('should return an error', () => {
        return expect(frameModel.readOne('invalid_id'))
          .to.be.rejectedWith(Error, 'InvalidMongoId')
      })
    })
  })

  describe('#read', () => {
    describe('when there are frames on database', () => {
      it('should return an array with frames found', async () => {
        const frames = await frameModel.read()
        expect(frames).to.be.an('array')
        expect(frames).to.be.equal(mock.frameMockArrayWithId)
      })
    })
  })

  describe('#destroy', () => {
    describe('when the lens is found', () => {
      it('should return the deleted document', async () => {
        const lens = await frameModel.destroy(mock._id)
        expect(lens).to.be.equal(mock.frameMockWithId)
      })
    })

    describe('when an invalid "_id" is provided', () => {
      it('should return an error', () => {
        return expect(frameModel.destroy('invalid_id'))
          .to.be.rejectedWith(Error, 'InvalidMongoId')
      })
    })
  })
})