import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, BarChart3, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/data';

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href="/course" className="block group">
      <div className="card-hover overflow-hidden rounded-2xl border bg-card shadow-sm">
        {/* Cover */}
        <div className="relative aspect-[3/2] overflow-hidden bg-white">
          <Image
            src={course.coverImage}
            alt={course.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound className="h-4 w-4" />
            </div>
            <span className="text-base text-muted-foreground">
              {course.instructor.name}
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
