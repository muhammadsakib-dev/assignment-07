// complete Product Page: products/[slug]/page.tsx
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import ProductLoading from "@/app/components/LoadingPage";
import { IoTriangle } from "react-icons/io5";
import type {
  ProductDetails,
  ProductPageProps,
} from "@/types/productDetailsTypes";

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

// Format numbers in Bangla
const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

// Product details
const ProductContent = async ({ params }: ProductPageProps) => {
  // Get product slug from params
  const { slug } = await params;

  // Check user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/products/${slug}`)}`);
  }

  // Fetch product details
  const response = await fetch(`${API_URL}/${encodeURIComponent(slug)}`, {
    cache: "force-cache",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product.");
  }

  const product: ProductDetails = await response.json();

  if (!product) {
    notFound();
  }

  // Calculate market prices
  const markets = product.markets ?? [];

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length,
      )
    : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  // Calculate price change from yesterday
  const changePct = Math.abs(product.change.pct);

  const changeAmount = isUp
    ? (product.today * changePct) / (100 + changePct)
    : isDown && changePct < 100
      ? (product.today * changePct) / (100 - changePct)
      : 0;

  const unitLabel =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "litre"
        ? "লিটার"
        : product.unit === "dozen"
          ? "ডজন"
          : product.unit === "piece"
            ? "পিস"
            : product.unit;

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/categories/${product.category}`}
            className="hover:text-gray-900"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-900">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/70 p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl sm:size-16">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitLabel} · {product.nameBn}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                গতকালের তুলনায়{" "}
                {changePct === 0
                  ? "দামের পরিবর্তন হয়নি"
                  : isUp
                    ? `দাম বেড়েছে ${formatNumber(changeAmount)} টাকা`
                    : isDown
                      ? `দাম কমেছে ${formatNumber(changeAmount)} টাকা`
                      : "দামের পরিবর্তন হয়নি"}
                ।
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#F0F5F0] px-3 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="text-xl font-bold text-gray-900">
              {formatNumber(product.today)}
            </p>

            <p className="text-xs text-gray-500">টাকা / {unitLabel}</p>

            <p
              className={`mt-1 flex items-center justify-center gap-1 text-xs font-semibold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? (
                <IoTriangle className="rotate-180" />
              ) : isDown ? (
                <IoTriangle />
              ) : (
                "—"
              )}{" "}
              {formatNumber(changePct)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white/70 p-4 sm:p-5">
          <h2 className="mb-3 font-semibold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {formatNumber(lowestPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Highest Price */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {formatNumber(highestPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatNumber(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unitLabel}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* Market Price Table */}
          <h2 className="mb-3 mt-5 font-semibold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-140 text-left text-sm">
                <thead className="bg-gray-200 text-black">
                  <tr>
                    <th className="px-3 py-3 font-medium">বাজার</th>
                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বোচ্চ
                    </th>
                    <th className="px-3 py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className="hover:bg-gray-100"
                    >
                      <td className="whitespace-nowrap px-3 py-3">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-right">
                        {formatNumber(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-right">
                        {formatNumber(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-right font-medium">
                        {formatNumber((market.min + market.max) / 2)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

// Page component
const ProductPage = ({ params }: ProductPageProps) => (
  <Suspense fallback={<ProductLoading />}>
    <ProductContent params={params} />
  </Suspense>
);

export default ProductPage;
