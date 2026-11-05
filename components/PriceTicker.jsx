"use client";

import { useEffect, useState } from "react";

import {
  API_BASE,
  toBanglaNumber,
} from "@/lib/helpers";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          `${API_BASE}/products`
        );

        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error(
          "Ticker load failed:",
          error
        );
      }
    }

    loadProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  const tickerItems = [
    ...products,
    ...products,
  ];

  return (
    <div className="overflow-hidden border-y border-[#e1e8e1] bg-[#f0f5f0]">
      <div className="ticker-track">
        {tickerItems.map(
          (product, index) => {
            const direction =
              product.change?.dir ||
              "flat";

            const percentage =
              Number(
                product.change?.pct
              ) || 0;

            return (
              <div
                key={`${product.id}-${index}`}
                className="flex shrink-0 items-center gap-2 border-r border-[#d8e2d8] px-6 py-2 text-sm"
              >
                <span className="text-lg">
                  {product.image ||
                    product.categoryIcon ||
                    "🛒"}
                </span>

                <span className="font-semibold text-[#1d271f]">
                  {product.nameBn}
                </span>

                <span className="text-[#667069]">
                  {toBanglaNumber(
                    product.today
                  )}{" "}
                  টাকা/{product.unit}
                </span>

                {direction === "up" && (
                  <span className="font-semibold text-[#05893e]">
                    ▲{" "}
                    {toBanglaNumber(
                      Math.abs(
                        percentage
                      )
                    )}
                    %
                  </span>
                )}

                {direction ===
                  "down" && (
                  <span className="font-semibold text-[#d03739]">
                    ▼{" "}
                    {toBanglaNumber(
                      Math.abs(
                        percentage
                      )
                    )}
                    %
                  </span>
                )}

                {direction ===
                  "flat" && (
                  <span className="font-semibold text-[#667069]">
                    — ০%
                  </span>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}