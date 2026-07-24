import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/data';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <div className="card-hover overflow-hidden rounded-2xl border bg-card shadow-sm h-full">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground">
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-nastaliq text-foreground mb-2 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-base text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-base text-muted-foreground pt-4 border-t">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
