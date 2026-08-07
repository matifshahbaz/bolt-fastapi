'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/components/site/auth-provider';

export function AuthenticatedContent({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-lg text-muted-foreground">رسائی کی تصدیق ہو رہی ہے...</p>
      </div>
    );
  }

  return children;
}