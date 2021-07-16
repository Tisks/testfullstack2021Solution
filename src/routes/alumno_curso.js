import express from 'express';
import {} from '../controllers';

const alumnoCursoRouter = express.Router();
alumnoCursoRouter.get('/alumno');
alumnoCursoRouter.post('/alumno');

export default alumnoCursoRouter;