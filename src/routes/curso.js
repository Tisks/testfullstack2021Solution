import express from 'express';
import {addCourse, courseList} from '../controllers';

const cursoRouter = express.Router();
cursoRouter.get('/lista_cursos', courseList);
cursoRouter.post('/curso', addCourse);

export default cursoRouter;