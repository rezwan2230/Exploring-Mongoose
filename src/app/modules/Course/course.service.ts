import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (courseData: TCourse) => {
  if (await Course.isCourseExist(courseData.courseId)) {
    throw new Error('Course is already exists!!');
  }
  const result = await Course.create(courseData);
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
};
