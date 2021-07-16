import express from 'express';
import {} from '../controllers';

const ramoRouter = express.Router();
ramoRouter.get('/alumno');
ramoRouter.post('/alumno');

export default ramoRouter;