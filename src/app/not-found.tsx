import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-zinc-900 text-zinc-100 p-4">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-zinc-400 mb-8">
        The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/" className="px-6 py-3 text-lg font-medium text-white transition-colors duration-200 bg-teal-600 rounded-lg hover:bg-teal-700">
        Return Home
      </Link>
    </div>
  );
}