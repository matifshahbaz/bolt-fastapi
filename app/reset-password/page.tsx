import { PasswordResetForm } from '@/components/site/password-reset-form';

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
  return (
    <div className="bg-gradient-to-b from-primary/5 to-background py-16">
      <div className="container mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <PasswordResetForm token={searchParams.token ?? ''} />
      </div>
    </div>
  );
}