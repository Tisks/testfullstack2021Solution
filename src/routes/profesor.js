import express from 'express';
import {addTeacher, teacherList} from '../controllers';

const profesorRouter = express.Router();
profesorRouter.get('/lista_profesores',teacherList);
profesorRouter.post('/profesor',addTeacher);

export default profesorRouter;