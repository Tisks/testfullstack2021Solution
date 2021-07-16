import express from 'express';
import {getSubject, updateSubject, updateSubject, deleteSubject,addSubject, subjectList} from '../controllers';

const ramoRouter = express.Router();
ramoRouter.get('/lista_ramos',subjectList);
ramoRouter.get('/ramo/:subject_id',getSubject);
ramoRouter.put('/ramo/:subject_id',updateSubject);
ramoRouter.delete('/ramo/:subject_id',deleteSubject);


ramoRouter.post('/ramo',addSubject);

export default ramoRouter;