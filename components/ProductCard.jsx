import Link from "next/link";

import {
  formatBanglaPrice,
  toBanglaNumber,
} from "@/lib/helpers";

export default function ProductCard({
  product,
}) {
  const direction =
    product?.change?.dir || "flat";

  const percentage =
    Number(product?.change?.pct) || 0;

  let changeText = "— ০%";
  let changeClass =
    "bg-[#f0f2f0] text-[#667069]";

  if (direction === "up") {
    changeText = `▲ ${toBanglaNumber(
      Math.abs(percentage)
    )}%`;

    changeClass =
      "bg-[#e8f6ed] text-[#05893e]";
  }

  if (direction === "down") {
    changeText = `▼ ${toBanglaNumber(
      Math.abs(percentage)
    )}%`;

    changeClass =
      "bg-[#fdecec] text-[#d03739]";
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex min-h-[138px] items-center gap-4 rounded-2xl border border-[#e1e8e1] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#05893e]/40 hover:shadow-sm"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
        {product.image ||
          product.categoryIcon ||
          "🛒"}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-[#1d271f]">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-[#667069]">
          {product.unit}
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-[#667069]">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-lg font-bold text-[#1d271f]">
              {formatBanglaPrice(
                product.today
              )}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${changeClass}`}
          >
            {changeText}
          </span>
        </div>
      </div>
    </Link>
  );
}