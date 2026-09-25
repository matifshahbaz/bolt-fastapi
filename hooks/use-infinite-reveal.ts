'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveals `totalCount` items a page at a time as the user scrolls near the end of the list,
 * instead of rendering everything at once (a real cost once a result set runs into the
 * hundreds/thousands). `resetKey` should change whenever the underlying filtered list changes
 * (e.g. a stringified combination of active filters) so pagination restarts from the top.
 */
export function useInfiniteReveal(totalCount: number, pageSize: number, resetKey: unknown) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, pageSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((count) => Math.min(count + pageSize, totalCount));
        }
      },
      { rootMargin: '800px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [totalCount, pageSize, visibleCount]);

  return { visibleCount, sentinelRef };
}
