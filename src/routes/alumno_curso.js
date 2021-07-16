import express from 'express';
import {studentCourseList,getStudentCourseUniqueId,getStudentCourseIds,addStudentCourse,updateStudentCourse,deleteStudentCourse} from '../controllers';

const alumnoCursoRouter = express.Router();
alumnoCursoRouter.get('/lista_alumno_curso',studentCourseList);


alumnoCursoRouter.get('/alumno_curso/:student_course_id',getStudentCourseUniqueId);
alumnoCursoRouter.get('/alumno_curso/:student_id/:course_id',getStudentCourseIds);

alumnoCursoRouter.put('/alumno_curso/:student_course_id',updateStudentCourse);
alumnoCursoRouter.delete('/alumno_curso/:course_id',deleteStudentCourse);

alumnoCursoRouter.post('/alumno_curso',addStudentCourse);

export default alumnoCursoRouter;