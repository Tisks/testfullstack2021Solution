import express from 'express';
import {} from '../controllers';

const profesorRouter = express.Router();
profesorRouter.get('/profesor');
profesorRouter.post('/profesor');

export default profesorRouter;