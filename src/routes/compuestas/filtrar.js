import express from 'express';
import {getStudent, addStudent, updateStudent, deleteStudent,studentList} from '../controllers';

const filterRouter = express.Router();
filterRouter.get('/lista_alumnos',studentList);

filterRouter.get('/alumno/:student_id',getStudent);
filterRouter.put('/alumno/:student_id',updateStudent);
filterRouter.delete('/alumno/:student_id',deleteStudent);

filterRouter.post('/alumno',addStudent);

export default filterRouter;