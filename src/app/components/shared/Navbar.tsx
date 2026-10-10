
import { Suspense } from "react";
import CategoryNavLinks, {
  type Category,
} from "@/app/components/shared/headerItems/CategoryNavLinks";

const Navbar = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  const categories: Category[] = await response.json();

  return (
    <nav className="mx-auto max-w-7xl px-4 py-4 lg:px-8 lg:py-6">
      <Suspense
        fallback={
          <p className="text-sm text-gray-500">
            ক্যাটাগরি লোড হচ্ছে...
          </p>
        }
      >
        <CategoryNavLinks categories={categories} />
      </Suspense>
    </nav>
  );
};

export default Navbar;
