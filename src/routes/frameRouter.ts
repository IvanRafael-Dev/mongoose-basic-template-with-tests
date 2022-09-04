import { Router } from 'express';
import { frameZodSchema } from '../models/interfaces/IFrame';
import FrameModel from '../models/Frame';
import FrameService from '../services/FrameService';
import FrameController from '../controllers/FrameController';

const frameModel = new FrameModel();
const frameService = new FrameService(frameModel, frameZodSchema);
const frameController = new FrameController(frameService);

const route = Router();

route.post('/frame', (req, res) => frameController.create(req, res));
route.get('/frame/:id', (req, res) => frameController.readOne(req, res));

export default route;