// Complete Decrease.tsx
import ProductCard from "@/app/components/shared/ProductCard";
import NotFound from "@/app/not-found";
import type { Product } from "@/types/productTypes";
import { IoTriangle } from "react-icons/io5";

const Decrease = async () => {
  // Fetch products from the API
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products/",
    {
      cache: "force-cache",
    },
  );

  // API Failure Handle
  if (!response.ok) {
    return (
      <NotFound
        title="কোথাও সমস্যা হয়েছে"
        description="ইঞ্জিনিয়ারকে বলুন 'Decrease.tsx' এই ফাইল চেক করতে"
      />
    );
  }

  const products: Product[] = await response.json();

  // Filter and sort products that have decreased in price
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <>
      <h3 className=" mt-18 text-lg font-semibold text-gray-900 flex items-center gap-2">
        <IoTriangle className="rotate-180 text-green-500" /> আজ দাম কমেছে
      </h3>

      <div className="mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decreasedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Decrease;
