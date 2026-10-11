// Component: Navbar
import CategoryNavLinks from "@/app/components/shared/headerItems/CategoryNavLinks";
import type { Category } from "@/types/Category";

const Navbar = async () => {
  // Fetch categories from the API
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories. Status: ${response.status}`);
  }

  const data: Category[] = await response.json();



  return (
    <nav className="mx-auto max-w-7xl px-4 py-4">
      <CategoryNavLinks categories={data} />
    </nav>
  );
};

export default Navbar;
