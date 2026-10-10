
import ProductCard, {
  type Product,
} from "@/app/components/shared/ProductCard";

const Products = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products/",
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const products: Product[] = await response.json();

  return (
    <>
      <h2 className="mx-auto mt-15 max-w-7xl text-lg font-semibold text-gray-900">
        সকল পণ্য
      </h2>

      <p className="mx-auto max-w-7xl text-sm text-gray-600">
        মোট {new Intl.NumberFormat("bn-BD").format(products.length)}
        টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mx-auto mb-15 mt-5 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
