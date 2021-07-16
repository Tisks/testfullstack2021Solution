import express from 'express';
import {addTeacherSubject,teacherSubjectList} from '../controllers';

const profesorRamoRouter = express.Router();
profesorRamoRouter.get('/lista_profesor_ramo_relacion',teacherSubjectList);
profesorRamoRouter.post('/profesor_ramo_relacion',addTeacherSubject);

export default profesorRamoRouter;