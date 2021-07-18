import express from 'express';
import {listGeneralMarkStudents} from '../../controllers';

const listaRouter = express.Router();
listaRouter.get('/lista_promedio_general_alumnos',listGeneralMarkStudents);

export default listaRouter;