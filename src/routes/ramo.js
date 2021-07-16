import express from 'express';
import {addSubject, subjectList} from '../controllers';

const ramoRouter = express.Router();
ramoRouter.get('/lista_ramos',subjectList);
ramoRouter.post('/ramo',addSubject);

export default ramoRouter;