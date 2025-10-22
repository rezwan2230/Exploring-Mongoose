import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (courseData: TCourse) => {
  if (await Course.isCourseExist(courseData.courseId)) {
    throw new Error('Course is already exists!!');
  }
  const result = await Course.create(courseData);
  return result;
};

const getAllCourseIntoDB = async () => {
  const result = await Course.find({});
  return result;
};

const getSingleCourseIntoDB = async (courseId: string) => {
  const result = await Course.findOne({ courseId });
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseIntoDB,
  getSingleCourseIntoDB,
};
