import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products/";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

// Product details content
const ProductContent = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/products/${id}`)}`);
  }

  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    cache: "force-cache",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product.");
  }

  const product: Product = await response.json();

  if (!product) {
    notFound();
  }

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

  const unitLabel = product.unit === "kg" ? "কেজি" : product.unit;

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
                প্রতি {unitLabel} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                গতকালের তুলনায়{" "}
                {isUp
                  ? "দাম বেড়েছে"
                  : isDown
                    ? "দাম কমেছে"
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
              className={`mt-1 text-xs font-semibold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatNumber(Math.abs(product.change.pct))}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white/70 p-4 sm:p-5">
          <h2 className="mb-3 font-semibold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {formatNumber(lowestPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">বাজারের সর্বনিম্ন দর</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {formatNumber(highestPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">বাজারের সর্বোচ্চ দর</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatNumber(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">বাজারের গড় দর</p>
            </div>
          </div>

          {/* Market Price Table */}
          <h2 className="mb-3 mt-5 font-semibold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-[#F0F5F0] text-gray-600">
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
                      className="hover:bg-[#F0F5F0]/60"
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

// Loading fallback
const ProductLoading = () => (
  <main className="min-h-screen bg-[#F0F5F0] px-4 py-6">
    <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
    </div>
  </main>
);

// Page component
const ProductPage = ({ params }: ProductPageProps) => {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
};

export default ProductPage;
