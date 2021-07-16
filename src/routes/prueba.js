import express from 'express';
import {} from '../controllers';

const pruebaRouter = express.Router();
pruebaRouter.get('/alumno');
pruebaRouter.post('/alumno');

export default pruebaRouter;