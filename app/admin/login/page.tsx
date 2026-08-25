import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = { title: "Sign in — IMI Admin", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Image src="/imi-logo.png" alt="Information Management Institute" width={804} height={312} className="h-12 w-auto" />
        <h1 className="mt-8 text-2xl font-bold tracking-[-0.01em] text-navy">IMI Admin</h1>
        <p className="font-body mt-2 text-navy-muted">Sign in to view the waitlist.</p>
        <LoginForm />
      </div>
    </main>
  );
}
