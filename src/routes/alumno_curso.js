import express from 'express';
import {} from '../controllers';

const alumnoCursoRouter = express.Router();
alumnoCursoRouter.get('/lista_alumno_curso_relacion');
alumnoCursoRouter.post('/alumno_curso_relacion');

export default alumnoCursoRouter;