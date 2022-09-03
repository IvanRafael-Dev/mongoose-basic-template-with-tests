import chai, { expect } from "chai"
import chaiAsPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import { ZodError } from "zod"
import FrameModel from "../../../models/Frame"
import IFrame, { frameZodSchema } from "../../../models/interfaces/IFrame"
import FrameService from "../../../services/FrameService"
import * as mock from "../mocks"

chai.use(chaiAsPromised)

describe('Frame Services', () => {
  const frameModel = new FrameModel()
  const frameService = new FrameService(frameModel, frameZodSchema)

  before(() => {
    sinon.stub(frameModel, 'create').resolves(mock.frameMockWithId)
    sinon.stub(frameModel, 'readOne')
      .onCall(0).resolves(null)
      .onCall(1).resolves(mock.frameMockWithId)
  })

  after(() => sinon.restore())

  describe('#create', () => {
    describe('when the frame request is invalid', () => {
      it ('should throw an ZodError', () => {
        return expect(frameService.create({} as IFrame))
          .to.be.rejectedWith(ZodError)        
      })
    })
    describe('when a frame is created with success', () => {
      it('should return the new frame obj', async () => {
        const frame = await frameService.create(mock.frameRequestMock)
        expect(frame).to.be.equal(mock.frameMockWithId)
      })
    })
  })

  describe('#readOne', () => {
    describe('if the frame is not found', () => {
      it('should throw an error', () => {
        return expect(frameService.readOne('not_found_id'))
          .to.be.rejectedWith(Error, 'EntityNotFound')
      })
    })

    describe('when the frame is found', () => {
      it('should return the frame', async () => {
        const frame = await frameService.readOne(mock._id)
        expect(frame).to.be.equal(mock.frameMockWithId)
      })
    })
  })
})