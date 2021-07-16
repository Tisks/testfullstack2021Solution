import express from 'express';
import {listTeacherSubject,getTeacherSubjectUniqueId,getTeacherSubjectIds,addTeacherSubject,updateTeacherSubject,deleteTeacherSubject} from '../controllers';

const profesorRamoRouter = express.Router();
profesorRamoRouter.get('/lista_profesores_profesor_ramo',listTeacherSubject);



profesorRamoRouter.get('/profesor_ramo/:teacher_subject_id',getTeacherSubjectUniqueId);
profesorRamoRouter.get('/profesor_ramo/:teacher_id/:subject_id',getTeacherSubjectIds);

profesorRamoRouter.put('/profesor_ramo/:teacher_subject_id',updateTeacherSubject);
profesorRamoRouter.delete('/profesor_ramo/:teacher_id',deleteTeacherSubject);


profesorRamoRouter.post('/profesor_ramo',addTeacherSubject);

export default profesorRamoRouter;