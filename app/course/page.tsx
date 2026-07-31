import type { Metadata } from 'next';
import { CourseExperience } from '@/components/site/course-experience';
import { getFeaturedCourse } from '@/lib/content-api';
import { testimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: 'نوجوانوں کے لیے کیریئر رہنمائی کورس',
  description: 'پاکستانی نوجوانوں کے لیے اردو میں کیریئر انتخاب، مہارتوں، نوکری اور کاروبار کا عملی کورس۔',
  alternates: {
    canonical: 'https://shama.pk/course',
  },
  openGraph: {
    title: 'نوجوانوں کے لیے کیریئر رہنمائی کورس | شمع.pk',
    description: 'پاکستانی نوجوانوں کے لیے اردو میں کیریئر انتخاب، مہارتوں، نوکری اور کاروبار کا عملی کورس۔',
    url: 'https://shama.pk/course',
    locale: 'ur_PK',
    type: 'website',
  },
};

export default async function CoursePage() {
  const c = await getFeaturedCourse();

  return <CourseExperience course={c} testimonials={testimonials} />;
}
