// Complete Component: NotFound.tsx
import Link from "next/link";

const NotFound = ({title, description}: {title: string; description: string}) => {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold mt-22">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        {title || "Page Not Found"}
      </h2>

      <p className="mt-2 text-gray-500">
        {description || "Sorry, this page could not be found."}
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