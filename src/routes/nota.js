import express from 'express';
import {} from '../controllers';

const notaRouter = express.Router();
notaRouter.get('/alumno');
notaRouter.post('/alumno');

export default notaRouter;