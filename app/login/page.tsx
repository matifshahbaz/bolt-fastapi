import { AuthForm } from '@/components/site/auth-form';

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-b from-primary/5 to-background py-16">
      <div className="container mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}