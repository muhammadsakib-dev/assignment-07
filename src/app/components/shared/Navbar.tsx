
import CategoryNavLinks, {
  type Category,
} from "@/app/components/shared/headerItems/CategoryNavLinks";

const API_URLS = [
  "https://api.abcz.workers.dev/api/bazardor/categories",
  "https://api.abcz.workers.dev/api/bazardor",
];

const Navbar = async () => {
  let categories: Category[] | null = null;
  const errors: string[] = [];

  for (const url of API_URLS) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        errors.push(`${url}: HTTP ${response.status}`);
        continue;
      }

      const data: unknown = await response.json();

      // Supports either an array or { categories: [...] }
      if (Array.isArray(data)) {
        categories = data as Category[];
      } else if (
        data !== null &&
        typeof data === "object" &&
        "categories" in data &&
        Array.isArray(data.categories)
      ) {
        categories = data.categories as Category[];
      } else {
        errors.push(`${url}: Unexpected response format`);
        continue;
      }

      break;
    } catch (error) {
      errors.push(
        `${url}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  if (categories === null) {
    console.error("Categories API errors:", errors);
    throw new Error(
      `Failed to fetch categories from all API endpoints. ${errors.join("; ")}`
    );
  }

  return (
    <nav className="mx-auto max-w-7xl px-4 py-4 lg:px-8 lg:py-6">
      <CategoryNavLinks categories={categories} />
    </nav>
  );
};

export default Navbar;
