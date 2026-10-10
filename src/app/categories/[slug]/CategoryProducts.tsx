
"use client";

import { useState } from "react";
import ProductCard, {
  type Product,
} from "@/app/components/shared/ProductCard";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "price-low" | "price-high" | "change";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const CategoryProducts = ({
  products,
}: CategoryProductsProps) => {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case "price-low":
        return a.today - b.today;

      case "price-high":
        return b.today - a.today;

      case "change":
        return Math.abs(b.change.pct) - Math.abs(a.change.pct);

      default:
        return 0;
    }
  });

  return (
    <>
      <div className="mt-5 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white/70 p-3">
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
          <option value="change">পরিবর্তন: বেশি আগে</option>
        </select>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        মোট {formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </>
  );
};

export default CategoryProducts;
