// Complete Products.tsx
import ProductCard from "@/app/components/shared/ProductCard";
import NotFound from "@/app/not-found";
import type { Product } from "@/types/productTypes";

const Products = async () => {
  // Fetch products from the API
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products/",
    {
      cache: "force-cache",
    },
  );

  // API Failure Handle
  if (!response.ok) {
    return (
      <NotFound
        title="কোথাও সমস্যা হয়েছে"
        description="ইঞ্জিনিয়ারকে বলুন 'Products.tsx' এই ফাইল চেক করতে"
      />
    );
  }

  const products: Product[] = await response.json();

  return (
    <div id="products" className="my-18">
      <h2 className="text-xl font-semibold text-gray-900">সব পণ্য</h2>

      <p className=" mt-1 text-sm text-gray-600">
        মোট {new Intl.NumberFormat("bn-BD").format(products.length)} টি পণ্য
        দেখানো হচ্ছে
      </p>

      <div className="mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
