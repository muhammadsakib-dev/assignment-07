// complete CategoryProducts.tsx
"use client";

import { useState } from "react";
import type { Product } from "@/types/productTypes";
import ProductCard from "@/app/components/shared/ProductCard";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "price-low" | "price-high";

// To Bangla Number Format
const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);


export default function CategoryProducts({
  products,
}: CategoryProductsProps) {

  // Sort state + Function Management
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") return a.today - b.today;
    if (sort === "price-high") return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mt-5 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white p-3">

        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as SortOption)
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        মোট {formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </>
  );
}
