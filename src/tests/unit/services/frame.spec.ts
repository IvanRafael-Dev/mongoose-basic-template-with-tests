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
  })

  after(() => sinon.restore())

  describe('#create', () => {
    describe('when the frame request is invalid', () => {
      it ('should throw an ZodError', async () => {
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
})