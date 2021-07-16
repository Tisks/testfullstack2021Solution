import express from 'express';

const indexRouter = express.Router();

import profesorRouter from './profesor';
import alumnoRouter from './alumno';
import ramoRouter from './ramo';
import notaRouter from './nota';
import cursoRouter from './curso';
import pruebaRouter from './prueba';
import alumnoCursoRouter from './alumno_curso';
import profesorRamoRouter from './profesor_ramo';
import { testEnvironmentVariable } from '../settings';

indexRouter.use(profesorRouter)
indexRouter.use(alumnoRouter)
indexRouter.use(ramoRouter)
indexRouter.use(notaRouter)
indexRouter.use(cursoRouter)
indexRouter.use(pruebaRouter)
indexRouter.use(alumnoCursoRouter)
indexRouter.use(profesorRamoRouter)
indexRouter.get('/', function(req, res, next) {
    console.log('entre')
    return res.status(200).json({ message: testEnvironmentVariable });
});
export default indexRouter;