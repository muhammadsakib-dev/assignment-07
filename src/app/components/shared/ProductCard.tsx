
import Link from "next/link";

export interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) {
    throw new Error(
      "ProductCard requires a product prop. Check how ProductCard is used."
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const changePercentage = product.change?.pct ?? 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-xl bg-white p-5"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-3xl">
          {product.image}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.nameBn}
          </h3>

          <p className="text-sm text-gray-600">
            {product.unit === "kg"
              ? "প্রতি কেজি"
              : product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">আজকের দাম</p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-xl font-semibold text-gray-900">
            {formatNumber(product.today)} টাকা
          </p>

          <span
            className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${
              isUp
                ? "bg-[#F0F5F0] text-red-600"
                : isDown
                  ? "bg-[#F0F5F0] text-green-600"
                  : "bg-[#F0F5F0] text-gray-600"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
            {formatNumber(Math.abs(changePercentage))}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
