import express from 'express';
import {} from '../controllers';

const pruebaRouter = express.Router();
pruebaRouter.get('/lista_pruebas');
pruebaRouter.post('/prueba');

export default pruebaRouter;