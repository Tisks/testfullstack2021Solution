import express from 'express';
import {filterFailureMarkStudents} from '../../controllers';

const filtroRouter = express.Router();
filtroRouter.get('/filtro_ramos_promedio_rojo_alumnos',filterFailureMarkStudents);

export default filtroRouter;