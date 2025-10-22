import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.post('/create-course', CourseController.createCourse);

router.get('/', CourseController.getAllCourse);

router.get('/:courseId', CourseController.getSingleCourse);

router.delete('/:courseId', CourseController.deleteSingleCourse);

export const CourseRouter = router;
