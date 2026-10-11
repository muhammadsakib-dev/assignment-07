// Complete Component: ProductCard.tsx
import Link from "next/link";
import type { ProductCardProps } from "@/types/productTypes";
import NotFound from "@/app/not-found";
import { IoTriangle } from "react-icons/io5";
// Format number in Bangla locale
export const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const ProductCard = ({ product }: ProductCardProps) => {
  // Check if product is undefined or null
  if (!product) {
    return (
      <NotFound
        title="কোথাও সমস্যা হয়েছে"
        description="ইঞ্জিনিয়ারকে বলুন 'ProductCard ও 'Product' এই দুটি ফাইল চেক করতে"
      />
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  // it's my extra code, I added this to avoid error when product.change is undefined
  const changePercentage = product.change?.pct ?? 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="rounded-xl bg-white px-6 py-3 shadow-md transition hover:shadow-2xl"
    >
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {product.image}
        </div>

        {/* Product Name & Unit */}
        <div>
          <h3 className="font-semibold">{product.nameBn}</h3>

          <p className="text-sm text-gray-600">
            {product.unit === "kg"
              ? "প্রতি কেজি"
              : product.unit === "litre"
                ? "প্রতি লিটার"
                : product.unit === "dozen"
                  ? "প্রতি ডজন"
                  : product.unit === "piece"
                    ? "প্রতি পিস"
                    : product.unit}
          </p>
        </div>
      </div>

      {/* Today's Price */}
      <div className="mt-3">
        <p className="text-sm text-gray-600">আজকের দাম</p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-gray-900">
            {formatNumber(product.today)} টাকা
          </p>

          {/* Price Change */}
          <span
            className={`flex items-center gap-1 shrink-0 rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold ${
              isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-600"
                  : "text-gray-600"
            }`}
          >
            {/* Change Indicator */}
            {isUp ? (
              <IoTriangle />
            ) : isDown ? (
              <IoTriangle className="rotate-180" />
            ) : (
              "—"
            )}{" "}
            {formatNumber(Math.abs(changePercentage))}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
