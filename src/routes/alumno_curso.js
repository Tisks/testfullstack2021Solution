import express from 'express';
import {studentCourseList,getStudentCourseUniqueId,getStudentCourseIds,
    addStudentSubject,addStudentCourse,updateStudentCourse,deleteStudentCourse,deleteStudentSubject} from '../controllers';
import {checkSubscribedSubject,getStudentSubjectId} from '../middleware';
const alumnoCursoRouter = express.Router();
alumnoCursoRouter.get('/lista_alumnos_cursos',studentCourseList);


alumnoCursoRouter.get('/alumno_curso/:student_course_id',getStudentCourseUniqueId);
alumnoCursoRouter.get('/alumno_curso/:student_id/:course_id',getStudentCourseIds);

alumnoCursoRouter.put('/alumno_curso/:student_course_id',updateStudentCourse);
alumnoCursoRouter.delete('/alumno_curso/:student_course_id',getStudentSubjectId,deleteStudentSubject,deleteStudentCourse);

alumnoCursoRouter.post('/alumno_curso',checkSubscribedSubject,addStudentSubject,addStudentCourse);

export default alumnoCursoRouter;