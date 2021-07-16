import express from 'express';
import {} from '../controllers';

const alumnoRouter = express.Router();
alumnoRouter.get('/alumno');
alumnoRouter.post('/alumno');

export default alumnoRouter;