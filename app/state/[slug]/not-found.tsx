import Link from "next/link";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Sorry, the page you are looking for doesn’t exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
