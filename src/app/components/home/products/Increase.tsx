// Complete Decrease.tsx
import ProductCard from "@/app/components/shared/ProductCard";
import NotFound from "@/app/not-found";
import type { Product } from "@/types/productTypes";
import { IoTriangle } from "react-icons/io5";

const Increase = async () => {
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
        description="ইঞ্জিনিয়ারকে বলুন 'Increase.tsx' এই ফাইল চেক করতে"
      />
    );
  }

  const products: Product[] = await response.json();

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <>
      <h3 className=" mt-8 text-lg font-semibold text-gray-900 flex items-center gap-2">
        <IoTriangle className="text-red-500" /> আজ দাম বেড়েছে
      </h3>

      <div className="mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increasedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Increase;
