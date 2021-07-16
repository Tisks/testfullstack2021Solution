import express from 'express';
import {getStudent, addStudent, updateStudent, deleteStudent,studentList} from '../controllers';

const alumnoRouter = express.Router();
alumnoRouter.get('/lista_alumnos',studentList);

alumnoRouter.get('/alumno/:student_id',getStudent);
alumnoRouter.put('/alumno/:student_id',updateStudent);
alumnoRouter.delete('/alumno/:student_id',deleteStudent);

alumnoRouter.post('/alumno',addStudent);

export default alumnoRouter;