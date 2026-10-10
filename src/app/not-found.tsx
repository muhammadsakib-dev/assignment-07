import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-500">
        Sorry, this page could not be found.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;