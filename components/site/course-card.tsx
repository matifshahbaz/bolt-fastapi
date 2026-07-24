import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, BookOpen, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/data';

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href="/course" className="block group">
      <div className="card-hover overflow-hidden rounded-2xl border bg-card shadow-sm">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.coverImage}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-accent text-accent-foreground">
              {course.level}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-nastaliq text-foreground mb-2 line-clamp-2 leading-relaxed">
            {course.title}
          </h3>
          <p className="text-base text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-base text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-base font-semibold text-foreground">
              {course.rating}
            </span>
            <span className="text-base text-muted-foreground">
              ({course.reviewCount.toLocaleString()} جائزے)
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-base text-muted-foreground pt-4 border-t">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.lessons} سبق
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              {course.language}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
