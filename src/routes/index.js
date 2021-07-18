import express from 'express';

const indexRouter = express.Router();
const path = require('path');

import profesorRouter from './profesor';
import alumnoRouter from './alumno';
import ramoRouter from './ramo';
import notaRouter from './nota';
import cursoRouter from './curso';
import pruebaRouter from './prueba';
import alumnoCursoRouter from './alumno_curso';
import profesorRamoRouter from './profesor_ramo';
import filtroRouter from './compuestas/filtrar';
import listaRouter from './compuestas/listar';

import { testEnvironmentVariable } from '../settings';

indexRouter.use(profesorRouter)
indexRouter.use(alumnoRouter)
indexRouter.use(ramoRouter)
indexRouter.use(notaRouter)
indexRouter.use(cursoRouter)
indexRouter.use(pruebaRouter)
indexRouter.use(alumnoCursoRouter)
indexRouter.use(profesorRamoRouter)
indexRouter.use(filtroRouter)
indexRouter.use(listaRouter)
indexRouter.get('/', function(req, res, next) {
    console.log('entre')
    return res.status(200).json({ message: testEnvironmentVariable });
});
indexRouter.get('/agenda', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/agenda/agenda.html'));
});
export default indexRouter;