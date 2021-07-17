import express from 'express';
import {studentCourseList,getStudentCourseUniqueId,getStudentCourseIds,
    addStudentSubject,addStudentCourse,updateStudentCourse,deleteStudentCourse} from '../controllers';
import {checkSubscribedSubject} from '../middleware';
const alumnoCursoRouter = express.Router();
alumnoCursoRouter.get('/lista_alumnos_curso',studentCourseList);


alumnoCursoRouter.get('/alumno_curso/:student_course_id',getStudentCourseUniqueId);
alumnoCursoRouter.get('/alumno_curso/:student_id/:course_id',getStudentCourseIds);

alumnoCursoRouter.put('/alumno_curso/:student_course_id',updateStudentCourse);
alumnoCursoRouter.delete('/alumno_curso/:course_id',deleteStudentCourse);

alumnoCursoRouter.post('/alumno_curso',checkSubscribedSubject,addStudentSubject,addStudentCourse);

export default alumnoCursoRouter;