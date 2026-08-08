'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type TocItem = {
  id: string;
  label: string;
};

type ArticleTocProps = {
  items: TocItem[];
  className?: string;
};

export function ArticleToc({ items, className }: ArticleTocProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={cn('w-full', className)}>
      <div className="flex items-end gap-0">
        <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm xl:w-[250px]">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between px-5 py-4 text-right"
          >
            <span className="text-sm font-semibold tracking-wide text-emerald-700">اس صفحے پر</span>
            {isOpen ? (
              <Minus className="h-4 w-4 text-slate-600" />
            ) : (
              <Plus className="h-4 w-4 text-slate-600" />
            )}
          </button>

          {isOpen ? (
            <nav
              className="max-h-[65vh] overflow-y-auto overscroll-contain border-t border-slate-200 px-5 py-4"
              aria-label="Table of contents"
            >
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-base leading-relaxed text-black transition-colors hover:text-emerald-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
        <span className="hidden h-px w-12 bg-slate-300 xl:block" aria-hidden="true" />
      </div>
    </aside>
  );
}
