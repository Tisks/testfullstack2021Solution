import express from 'express';
import {getTeacher, updateTeacher, deleteTeacher, addTeacher, listTeacher} from '../controllers';

const profesorRouter = express.Router();
profesorRouter.get('/lista_profesores',listTeacher);

profesorRouter.get('/profesor/:teacher_id',getTeacher);
profesorRouter.put('/profesor/:teacher_id',updateTeacher);
profesorRouter.delete('/profesor/:teacher_id',deleteTeacher);

profesorRouter.post('/profesor',addTeacher);


export default profesorRouter;