import express from 'express';
import {getSubject, updateSubject, deleteSubject,addSubject, listSubject} from '../controllers';

const ramoRouter = express.Router();
ramoRouter.get('/lista_ramos',listSubject);
ramoRouter.get('/ramo/:subject_id',getSubject);
ramoRouter.put('/ramo/:subject_id',updateSubject);
ramoRouter.delete('/ramo/:subject_id',deleteSubject);


ramoRouter.post('/ramo',addSubject);

export default ramoRouter;