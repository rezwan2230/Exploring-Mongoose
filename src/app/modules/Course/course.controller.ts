import { Request, Response } from 'express';
import courseValidationSchema from './course.validation';
import { CourseServices } from './course.service';
import { TCourse } from './course.interface';

const createCourse = async (req: Request, res: Response) => {
  try {
    const { course } = req.body;
    const zodData = courseValidationSchema.parse(course) as TCourse;
    const result = await CourseServices.createCourseIntoDB(zodData);
    res.status(200).json({
      success: true,
      messaage: 'Course create successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create course',
      error: error,
    });
  }
};

const getAllCourse = async (req: Request, res: Response) => {
  try {
    const result = await CourseServices.getAllCourseIntoDB();
    res.status(200).json({
      success: true,
      messaage: 'Courses retrive successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messaage: 'Failed to retrive course',
      error: error,
    });
  }
};

const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const result = await CourseServices.getSingleCourseIntoDB(courseId!);
    res.status(200).json({
      success: true,
      messaage: 'Single Course retrive successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messaage: 'Failed to retrive course',
      error: error,
    });
  }
};

const deleteSingleCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const result = await CourseServices.deleteSingleCourseIntoDB(courseId!);
    res.status(200).json({
      success: true,
      message: 'Course delete successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, Course can't be deleted",
      data: error,
    });
  }
};

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteSingleCourse,
};
