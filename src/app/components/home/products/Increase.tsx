
import ProductCard, {
  type Product,
} from "@/app/components/shared/ProductCard";

const Increase = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const products: Product[] = await response.json();

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <>
      <h3 className="mx-auto max-w-7xl text-lg font-semibold text-gray-900">
        <span className="text-red-500">▲</span> আজ দাম বেড়েছে
      </h3>

      <div className="mx-auto mt-5 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increasedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default Increase;
