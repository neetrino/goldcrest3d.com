import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="text-center space-y-4">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          Sign-in error
        </h1>
        <p className="text-neutral-600">
          Something went wrong while signing in. Please try again.
        </p>
        <Link
          href="/signin"
          className="inline-block py-2 px-4 bg-neutral-800 text-white rounded-md hover:bg-neutral-700"
        >
          Back to sign-in
        </Link>
      </div>
    </main>
  );
}
