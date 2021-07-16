import express from 'express';
import indexRouter from './routes/index';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.stack });
});
export default app;
