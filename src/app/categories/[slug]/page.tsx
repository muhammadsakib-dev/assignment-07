// complete Categories -- Page.tsx
import { Suspense } from "react";
import CategoryProducts from "./CategoryProducts";
import ProductLoading from "@/app/components/LoadingPage";
import type { Product } from "@/types/productTypes";
import NotFound from "@/app/not-found";
interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

type CategoryProduct = Product & {
  categoryNameBn: string;
  categoryIcon: string;
};

async function CategoryContent({ params }: CategoryPageProps) {

  const { slug } = await params;

  // Fetch products based on the category slug
  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return (
      <NotFound
        title="কোথাও সমস্যা হয়েছে"
        description="ইঞ্জিনিয়ারকে বলুন 'category-page.tsx' এই ফাইল চেক করতে"
      />
    );
  }

  const products: CategoryProduct[] = await response.json();
  const category = products[0];

  if (!category) {
    return <NotFound title="কোথাও সমস্যা হয়েছে" description="ইঞ্জিনিয়ারকে বলুন 'category-page.tsx' এই ফাইল চেক করতে" />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <header className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
        <h1 className="text-xl font-bold text-gray-900">
          {category.categoryIcon} {category.categoryNameBn}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
           {new Intl.NumberFormat("bn-BD").format(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </header>

      <CategoryProducts products={products} />
    </main>
  );
}


// Main Category Page Component + Use Suspense for loading state
export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
