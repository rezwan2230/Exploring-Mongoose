import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  CourseModel,
  TCourse,
  TInstructor,
  TLesson,
  TSocialLinks,
} from './course.interface';
import config from '../../config';

const socialLinksSchema = new Schema<TSocialLinks>({
  facebook: { type: String, trim: true, unique: true },
  linkedin: { type: String, trim: true, unique: true },
  github: { type: String, trim: true, unique: true },
  youtube: { type: String, trim: true, unique: true },
});

const instructorSchema = new Schema<TInstructor>({
  instructorId: {
    type: String,
    unique: true,
    required: [true, 'Instructor ID is required'],
  },
  name: { type: String, required: [true, 'Title is required'], trim: true },
  email: {
    type: String,
    required: [true, 'Instructor email is required'],
    unique: true,
    trim: true,
  },
  profileImg: { type: String, trim: true },
  socialLinks: socialLinksSchema,
  totalCourses: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5 },
});

const quizSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Quiz question is required'],
    trim: true,
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    trim: true,
  },
});

const lessonSchema = new Schema<TLesson>({
  lessonTitle: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required'],
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
  },
  isPreviewFree: {
    type: Boolean,
    required: [true, 'Specify if preview is free or not'],
  },
  quiz: quizSchema,
});

const courseSchema = new Schema<TCourse, CourseModel>({
  courseId: {
    type: String,
    required: [true, 'Course ID is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters'],
    maxlength: [20, 'Password cannot exceed 20 characters'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
  },
  instructor: instructorSchema,
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['web', 'AI', 'Data Science', 'etc.'],
    required: [true, 'Course category is required'],
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required'],
    trim: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Course level is required'],
  },
  language: {
    type: String,
    trim: true,
    required: [true, 'Course language is required'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  lessons: lessonSchema,
  studentEnrolled: {
    type: Number,
    default: 0,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

courseSchema.statics.isCourseExist = async function (courseId: string) {
  const isExist = await Course.findOne({ courseId });
  return isExist;
};

courseSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

courseSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const Course = model<TCourse, CourseModel>('course', courseSchema);
