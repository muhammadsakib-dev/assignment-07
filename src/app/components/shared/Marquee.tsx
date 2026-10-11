// Complete Marquee.tsx
import Link from "next/link";
import type { MarketTickerProduct } from "@/types/marketTickerTypes";
import { IoTriangle } from "react-icons/io5";
const formatNumber = (value: number) => value.toLocaleString("bn-BD");

const MarketTicker = async () => {
  // Fetch products from the API
  const fetchProducts = async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      throw new Error(
        "কোথাও সমস্যা হয়েছে। ইঞ্জিনিয়ারকে বলুন 'MarketTicker.tsx' এই ফাইল চেক করতে",
      );
    }

    const data: MarketTickerProduct[] = await response.json();

    return data;
  };

  const marqueeData = await fetchProducts();

  return (
    <section className="w-full overflow-hidden border-y border-gray-200 bg-white py-2">
      {/* Marquee */}
      <div className="min-w-0 overflow-hidden">
        <div className="bazardor-track flex w-max">
          {marqueeData.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex min-h-10 shrink-0 items-center gap-2 border-r border-gray-100 px-3 text-xs transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-600 sm:px-4"
            >
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-base"
                aria-hidden="true"
              >
                {product.categoryIcon}
              </span>

              <span className="text-gray-800">{product.nameBn}</span>

              <span className="text-gray-800">
                ৳{formatNumber(product.today)}/{" "}
                {product.unit === "kg"
                  ? "প্রতি কেজি"
                  : product.unit === "litre"
                    ? "প্রতি লিটার"
                    : product.unit === "dozen"
                      ? "প্রতি ডজন"
                      : product.unit === "piece"
                        ? "প্রতি পিস"
                        : product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "rounded-full bg-red-50 px-2 py-1 font-semibold text-red-600"
                    : "rounded-full bg-green-50 px-2 py-1 font-semibold text-green-700"
                }
              >
                {product.change.dir === "up" ? (
                  <IoTriangle className="inline rotate-180" />
                ) : (
                  <IoTriangle className="inline" />
                )}{" "}
                {product.change.pct > 0 ? "+" : ""}
                {product.change.pct}%
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketTicker;
