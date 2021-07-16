import express from 'express';
import {} from '../controllers';

const cursoRouter = express.Router();
cursoRouter.get('/alumno');
cursoRouter.post('/alumno');

export default cursoRouter;