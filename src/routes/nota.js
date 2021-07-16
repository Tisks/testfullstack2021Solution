import express from 'express';
import { addMark, listMark, getMarkUniqueId, getMarkIds, updateMark, deleteMark } from '../controllers';

const notaRouter = express.Router();
notaRouter.get('/lista_notas',listMark);

notaRouter.get('/nota/:mark_id',getMarkUniqueId);
notaRouter.get('/nota/:test_id/:student_course_id',getMarkIds);

notaRouter.put('/nota/:mark_id',updateMark);
notaRouter.delete('/nota/:mark_id',deleteMark);

notaRouter.post('/nota',addMark);

export default notaRouter;