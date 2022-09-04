import { Response } from 'express'
import chai, { expect } from "chai"
import chaiAsPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import { ZodError } from "zod"
import { GenRequest } from "../../../controllers/Controller"
import FrameController from "../../../controllers/FrameController"
import FrameModel from "../../../models/Frame"
import IFrame, { frameZodSchema } from "../../../models/interfaces/IFrame"
import FrameService from "../../../services/FrameService"
import * as mock from "../mocks"

chai.use(chaiAsPromised)

describe('Frame Controller', () => {
  const frameModel = new FrameModel()
  const frameService = new FrameService(frameModel, frameZodSchema)
  const frameController = new FrameController(frameService)

  const req = {} as GenRequest<IFrame>
  const res = {} as Response<IFrame>

  beforeEach(() => {
    sinon.stub(frameService, 'create')
      .onCall(0).resolves(mock.frameMockWithId)
      .onCall(1).throws(new ZodError([]))
    sinon.stub(frameService, 'readOne')
      .onCall(0).resolves(mock.frameMockWithId)
      .onCall(1).throws(new ZodError([]))

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  })

  afterEach(() => sinon.restore())

  describe('#create', () => {
    describe('when a frame is created successfully', () => {
      req.body = mock.frameRequestMock
      it('should return an status 201', async () => {
        await frameController.create(req, res)
        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
        expect((res.json as sinon.SinonStub).calledWith(mock.frameMockWithId)).to.be.true
      })
    })

    describe('when a there is an error in request body', () => {
      it('should throw an Error', async () => {
        req.body = {} as any
        try {
          await frameController.create(req, res)
        } catch (error) {
          expect(error).to.be.instanceOf(ZodError)
        }
      })
    })
  })

  describe('#readOne', () => {
    describe('when the frame is found', () => {
      it('should return the frame object', async () => {
        req.params = { id: mock._id }
        await frameController.readOne(req, res)
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      })
    })
  })
})