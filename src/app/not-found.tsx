// ...existing code...// src/app/404.tsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="text-blue-600 hover:underline">Go back home</a>
      </div>
    </div>
  );
}
