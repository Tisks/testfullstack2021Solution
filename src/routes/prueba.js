import express from 'express';
import {getTest, updateTest, listTest, deleteTest,addTest} from '../controllers';

const pruebaRouter = express.Router();
pruebaRouter.get('/lista_pruebas', listTest);

pruebaRouter.get('/test/:test_id',getTest);
pruebaRouter.put('/test/:test_id',updateTest);
pruebaRouter.delete('/test/:test_id',deleteTest);

pruebaRouter.post('/prueba',addTest);

export default pruebaRouter;