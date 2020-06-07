import {Router } from 'express';

import ItemsController from './app/controllers/ItemsController'
import PointController from './app/controllers/PointController'

const routes = Router();

routes.get('/items', ItemsController.index)

routes.post('/points', PointController.create)
routes.get('/points/', PointController.index)
routes.get('/points/:id', PointController.show)

export default routes;
