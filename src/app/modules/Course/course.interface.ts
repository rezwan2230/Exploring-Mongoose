import { Model } from 'mongoose';

export type TSocialLinks = {
  facebook?: string | undefined;
  linkedin?: string | undefined;
  github?: string | undefined;
  youtube?: string | undefined;
};

export type TInstructor = {
  instructorId: string;
  name: string;
  email: string;
  profileImg?: string | undefined;
  socialLinks?: TSocialLinks | undefined;
  totalCourses?: number | undefined;
  rating?: number | undefined;
};

export type TQuiz = {
  question: string;
  correctAnswer: string;
};

export type TLesson = {
  lessonTitle: string;
  videoUrl: string;
  duration?: string | undefined;
  isPreviewFree: boolean;
  quiz?: TQuiz | undefined;
};

export type TCourse = {
  courseId: string;
  title: string;
  instructor: TInstructor;
  description: string;
  category: 'web' | 'AI' | 'Data Science' | 'etc.';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  discount?: number | undefined;
  price: number;
  rating?: number | undefined;
  lessons: TLesson;
  studentEnrolled: number;
  isFree: boolean;
  isDeleted: boolean;
};

export interface CourseModel extends Model<TCourse> {
  isCourseExist(courseId: string): Promise<TCourse | null>;
}
