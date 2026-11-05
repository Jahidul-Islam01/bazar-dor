"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

import {
  API_BASE,
  getProductChange,
  toBanglaNumber,
} from "@/lib/helpers";

export default function Home() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE}/products`
        );

        if (!response.ok) {
          throw new Error(
            "Products could not be loaded"
          );
        }

        const data =
          await response.json();

        setProducts(
          Array.isArray(data) ? data : []
        );
      } catch {
        setError(
          "পণ্যের তথ্য লোড করা যায়নি।"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const priceRisers = useMemo(() => {
    return [...products]
      .filter(
        (product) =>
          product.change?.dir === "up"
      )
      .sort(
        (a, b) =>
          getProductChange(b) -
          getProductChange(a)
      )
      .slice(0, 6);
  }, [products]);

  const priceFallers = useMemo(() => {
    return [...products]
      .filter(
        (product) =>
          product.change?.dir ===
          "down"
      )
      .sort(
        (a, b) =>
          getProductChange(a) -
          getProductChange(b)
      )
      .slice(0, 6);
  }, [products]);

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* PRICE UP */}
        <section className="mx-auto max-w-[1152px] px-4 pt-14 sm:px-5 lg:px-4">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#1d271f]">
              আজ দাম বেড়েছে
            </h2>

            <span className="font-bold text-[#05893e]">
              ▲
            </span>
          </div>

          {loading ? (
            <SkeletonGrid />
          ) : (
            <ProductGrid
              products={priceRisers}
            />
          )}
        </section>

        {/* PRICE DOWN */}
        <section className="mx-auto max-w-[1152px] px-4 pt-14 sm:px-5 lg:px-4">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#1d271f]">
              আজ দাম কমেছে
            </h2>

            <span className="font-bold text-[#d03739]">
              ▼
            </span>
          </div>

          {loading ? (
            <SkeletonGrid />
          ) : (
            <ProductGrid
              products={priceFallers}
            />
          )}
        </section>

        {/* ALL PRODUCTS */}
        <section
          id="সব-পণ্য"
          className="mx-auto max-w-[1152px] scroll-mt-8 px-4 pt-14 sm:px-5 lg:px-4"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1d271f]">
              সব পণ্য
            </h2>

            {!loading && !error && (
              <p className="mt-1 text-sm text-[#667069]">
                মোট{" "}
                {toBanglaNumber(
                  products.length
                )}
                টি পণ্য দেখানো হচ্ছে
              </p>
            )}
          </div>

          {loading && (
            <SkeletonGrid count={9} />
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-[#f2d1d1] bg-[#fff8f8] px-5 py-10 text-center text-sm font-medium text-[#d03739]">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            products.length > 0 && (
              <ProductGrid
                products={products}
              />
            )}

          {!loading &&
            !error &&
            products.length === 0 && (
              <p className="py-10 text-center text-[#667069]">
                কোনো পণ্য পাওয়া যায়নি।
              </p>
            )}
        </section>
      </main>

      <Footer />
    </>
  );
}

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-[#667069]">
        কোনো পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

function SkeletonGrid({
  count = 6,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <ProductSkeleton
          key={index}
        />
      ))}
    </div>
  );
}