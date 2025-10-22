import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { CourseRouter } from './app/modules/Course/course.route';

app.use(express.json());
app.use(cors());

app.use('/api/v1/course', CourseRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
