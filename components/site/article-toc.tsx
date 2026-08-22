'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type TocItem = {
  id: string;
  label: string;
  numberLabel?: string;
};

type ArticleTocProps = {
  items: TocItem[];
  className?: string;
};

export function ArticleToc({ items, className }: ArticleTocProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTocClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerOffset = 112;
    const startY = window.scrollY;
    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
    const distance = targetY - startY;

    window.history.pushState(null, '', `#${targetId}`);

    if (reducedMotion || Math.abs(distance) < 12) {
      window.scrollTo(0, targetY);
      return;
    }

    const duration = Math.min(420, Math.max(220, Math.abs(distance) * 0.18));
    const startedAt = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={cn('fixed bottom-4 left-4 right-4 z-40 w-auto max-w-none sm:bottom-8 sm:left-6 sm:right-auto sm:w-[286px] sm:max-w-[calc(100vw-2rem)]', className)}>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          aria-controls="article-toc-links"
          className="flex w-full items-center justify-between border-b border-slate-200 px-5 py-4 text-right"
        >
          <span className="text-base font-semibold tracking-wide text-emerald-700">اس صفحے پر</span>
          {isOpen ? (
            <Minus className="h-4 w-4 text-slate-600" aria-hidden="true" />
          ) : (
            <Plus className="h-4 w-4 text-slate-600" aria-hidden="true" />
          )}
        </button>

        {isOpen ? (
          <nav
            id="article-toc-links"
            className="max-h-[45vh] overflow-y-auto overscroll-contain px-5 py-4 sm:max-h-[65vh]"
            aria-label="Table of contents"
          >
            <ol className="space-y-3">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleTocClick(event, item.id)}
                    className="flex items-start gap-3 text-right text-base leading-relaxed text-black transition-colors hover:text-emerald-700"
                  >
                    {item.numberLabel ? (
                      <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 font-sans text-xs font-bold text-emerald-700">
                        {item.numberLabel}
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
      </div>
    </aside>
  );
}
