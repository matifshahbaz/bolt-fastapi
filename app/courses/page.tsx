import type { Metadata } from 'next';
import { CourseCard } from '@/components/site/course-card';
import { getCourses } from '@/lib/content-api';

export const metadata: Metadata = {
  title: 'کورسز',
  description: 'شمع.pk کے آن لائن کیریئر اور مہارتوں کے کورسز۔',
  alternates: { canonical: 'https://shama.pk/courses' },
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-foreground md:text-4xl lg:text-5xl">
            کورسز
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            اپنے کیریئر اور مہارتوں کے لیے عملی آن لائن کورسز
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
