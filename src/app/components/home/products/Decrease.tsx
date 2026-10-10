
import ProductCard, {
  type Product,
} from "@/app/components/shared/ProductCard";

const Decrease = async () => {
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

  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <>
      <h3 className="mx-auto mt-15 max-w-7xl text-lg font-semibold text-gray-900">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </h3>

      <div className="mx-auto mt-5 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decreasedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default Decrease;
