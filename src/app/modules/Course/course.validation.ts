import { z } from 'zod';

// SocialLinks validation
const socialLinksValidationSchema = z.object({
  facebook: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  github: z.string().trim().optional(),
  youtube: z.string().trim().optional(),
});

// Instructor validation
const instructorValidationSchema = z.object({
  instructorId: z.string().trim().nonempty('Instructor ID is required'),
  name: z.string().trim().nonempty('Instructor name is required'),
  email: z
    .string()
    .trim()
    .nonempty('Instructor email is required')
    .email('Invalid email format'),
  profileImg: z.string().trim().optional(),
  socialLinks: socialLinksValidationSchema.optional(),
  totalCourses: z.number().optional(),
  rating: z
    .number()
    .min(0, 'Rating must be >= 0')
    .max(5, 'Rating must be <= 5')
    .optional(),
});

// Quiz validation
const quizValidationSchema = z.object({
  question: z.string().trim().nonempty('Quiz question is required'),
  correctAnswer: z.string().trim().nonempty('Correct answer is required'),
});

// Lesson validation
const lessonValidationSchema = z.object({
  lessonTitle: z.string().trim().nonempty('Lesson title is required'),
  videoUrl: z
    .string()
    .trim()
    .nonempty('Video URL is required')
    .url('Invalid URL format'),
  duration: z.string().trim().optional(),
  isPreviewFree: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'Specify if preview is free or not',
  }),
  quiz: quizValidationSchema.optional(),
});

// Course validation
const courseValidationSchema = z.object({
  courseId: z.string().trim().nonempty('Course ID is required'),
  title: z.string().trim().nonempty('Course title is required'),
  instructor: instructorValidationSchema,
  description: z.string().trim().nonempty('Course description is required'),
  category: z.enum(['web', 'AI', 'Data Science', 'etc.']),
  duration: z.string().trim().nonempty('Course duration is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.string().trim().nonempty('Language is required'),
  discount: z.number().optional(),
  price: z
    .number()
    .positive('Price must be greater than 0')
    .refine((val) => val !== undefined, {
      message: 'Course price is required',
    }),
  rating: z.number().min(0).max(5).optional(),
  lessons: lessonValidationSchema,
  studentEnrolled: z.number().optional(),
  isFree: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export default courseValidationSchema;
