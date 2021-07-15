import express from 'express';

const indexRouter = express.Router();

import profesorRouter from './profesor';
import alumnoRouter from './alumno';
import { testEnvironmentVariable } from '../settings';

indexRouter.use(profesorRouter)
indexRouter.use(alumnoRouter)
indexRouter.get('/', function(req, res, next) {
    return res.status(200).json({ message: testEnvironmentVariable });
});
export default indexRouter;