import express from 'express';
import {} from '../controllers';

const profesorRamoRouter = express.Router();
profesorRamoRouter.get('/alumno');
profesorRamoRouter.post('/alumno');

export default profesorRamoRouter;