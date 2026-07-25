import { CourseExperience } from '@/components/site/course-experience';
import { getFeaturedCourse } from '@/lib/content-api';
import { testimonials } from '@/lib/data';

export default async function CoursePage() {
  const c = await getFeaturedCourse();

  return <CourseExperience course={c} testimonials={testimonials} />;
}
