
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProducts from "./CategoryProducts";
import type { Product } from "@/types/productTypes";
import ProductLoading from "@/app/components/LoadingPage";
import type { Category } from "@/types/Category";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor";

// Fetch category and products
const CategoryContent = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [categoryResponse, productsResponse] = await Promise.all([
    fetch(
      `${API_URL}/categories/${encodeURIComponent(slug)}`,
      {
        cache: "force-cache",
      }
    ),

    fetch(
      `${API_URL}/products?category=${encodeURIComponent(slug)}`,
      {
        cache: "force-cache",
      }
    ),
  ]);

  if (categoryResponse.status === 404) {
    notFound();
  }

  if (!categoryResponse.ok || !productsResponse.ok) {
    throw new Error("Failed to fetch category data.");
  }

  const category: Category = await categoryResponse.json();
  const products: Product[] = await productsResponse.json();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <header className="mb-5 rounded-xl border border-gray-200 p-5">
        <h1 className="text-xl font-bold text-gray-900">
          {category.icon} {category.nameBn}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          মোট{" "}
          {new Intl.NumberFormat("bn-BD").format(products.length)}
          টি পণ্য
        </p>
      </header>

      <CategoryProducts products={products} />
    </main>
  );
};



// Page component
const CategoryPage = ({ params }: CategoryPageProps) => {
  return (
    <Suspense fallback={<ProductLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default CategoryPage;
