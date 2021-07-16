import express from 'express';
import {listCourse,getCourse,addCourse,updateCourse,deleteCourse} from '../controllers';

const cursoRouter = express.Router();
cursoRouter.get('/lista_cursos', listCourse);


cursoRouter.get('/curso/:course_id',getCourse);
cursoRouter.put('/curso/:course_id',updateCourse);
cursoRouter.delete('/curso/:course_id',deleteCourse);

cursoRouter.post('/curso', addCourse);

export default cursoRouter;