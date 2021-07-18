import express from 'express';
import {getTest, updateTest, listTest, deleteTest,addTest} from '../controllers';

const pruebaRouter = express.Router();
pruebaRouter.get('/lista_pruebas', listTest);

pruebaRouter.get('/prueba/:test_id',getTest);
pruebaRouter.put('/prueba/:test_id',updateTest);
pruebaRouter.delete('/prueba/:test_id',deleteTest);

pruebaRouter.post('/prueba',addTest);

export default pruebaRouter;