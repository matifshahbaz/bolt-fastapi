import { DashboardShell } from '@/components/site/dashboard-shell';

export default function DashboardPage() {
  return (
    <div className="bg-secondary/20 py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <DashboardShell />
      </div>
    </div>
  );
}