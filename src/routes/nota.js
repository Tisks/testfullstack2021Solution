import express from 'express';
import {} from '../controllers';

const notaRouter = express.Router();
notaRouter.get('/lista_notas');
notaRouter.post('/nota');

export default notaRouter;