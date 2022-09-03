import chai, { expect } from "chai"
import chaiAsPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import { ZodError } from "zod"
import LensModel from "../../../models/Lens"
import LensService from "../../../services/LensService"
import ILens, { lensZodSchema } from "../../../models/interfaces/ILens"
import * as mock from "../mocks"

chai.use(chaiAsPromised)

describe('Lens Services', () => {
  const lensModel = new LensModel()
  const lensService = new LensService(lensModel, lensZodSchema)

  before(() => {
    sinon.stub(lensModel, 'create').resolves(mock.lensMockWithId)
    sinon.stub(lensModel, 'readOne')
      .onCall(0).resolves(null)
      .onCall(1).resolves(mock.lensMockWithId)
  })

  after(() => sinon.restore())

  describe('#create', () => {
    describe('when the lens request is invalid', () => {
      it ('should throw an ZodError', () => {
        return expect(lensService.create({} as ILens))
          .to.be.rejectedWith(ZodError)        
      })
    })
    describe('when a lens is created with success', () => {
      it('should return the new lens obj', async () => {
        const lens = await lensService.create(mock.lensRequestMock)
        expect(lens).to.be.equal(mock.lensMockWithId)
      })
    })
  })

  describe('#readOne', () => {
    describe('if the lens is not found', () => {
      it('should throw an error', () => {
        return expect(lensService.readOne('not_found_id'))
          .to.be.rejectedWith(Error, 'EntityNotFound')
      })
    })

    describe('when the lens is found', () => {
      it('should return the lens', async () => {
        const lens = await lensService.readOne(mock._id)
        expect(lens).to.be.equal(mock.lensMockWithId)
      })
    })
  })
})