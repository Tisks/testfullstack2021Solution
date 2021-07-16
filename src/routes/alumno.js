import express from 'express';
import {addStudent, studentList} from '../controllers';

const alumnoRouter = express.Router();
alumnoRouter.get('/lista_alumnos',studentList);
alumnoRouter.post('/alumno',addStudent);

export default alumnoRouter;