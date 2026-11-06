"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

import { API_BASE } from "@/lib/helpers";

const categoryInfo = {
  chal: {
    name: "চাল",
    icon: "🍚",
  },
  dal: {
    name: "ডাল",
    icon: "🫘",
  },
  tel: {
    name: "তেল",
    icon: "🛢️",
  },
  sobji: {
    name: "সবজি",
    icon: "🥬",
  },
  mach: {
    name: "মাছ",
    icon: "🐟",
  },
  mangsho: {
    name: "মাংস",
    icon: "🍗",
  },
  "dim-dui": {
    name: "ডিম-দুধ",
    icon: "🥛",
  },
  mosla: {
    name: "মসলা",
    icon: "🌶️",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("default");

  const category = categoryInfo[slug];

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE}/products`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load products"
          );
        }

        const data = await response.json();

        const productList = Array.isArray(data)
          ? data
          : data.products ||
            data.data ||
            [];

        const filteredProducts =
          productList.filter(
            (product) =>
              product.category === slug
          );

        setProducts(filteredProducts);
      } catch {
        setError(
          "পণ্যের তথ্য লোড করা যায়নি।"
        );
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      getProducts();
    } else {
      setLoading(false);
    }
  }, [slug, category]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "low-high") {
      return list.sort(
        (a, b) =>
          Number(a.today || 0) -
          Number(b.today || 0)
      );
    }

    if (sort === "high-low") {
      return list.sort(
        (a, b) =>
          Number(b.today || 0) -
          Number(a.today || 0)
      );
    }

    return list;
  }, [products, sort]);

  if (!category) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
          <div className="text-5xl">
            🛒
          </div>

          <p className="mt-5 font-semibold text-[#05893e]">
            404
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#1d271f]">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm text-[#667069]">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[65vh] max-w-[1152px] px-4 py-10 sm:px-5 lg:px-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {category.icon}
              </span>

              <h1 className="text-3xl font-bold text-[#1d271f]">
                {category.name}
              </h1>
            </div>

            <p className="mt-2 text-sm text-[#667069]">
              {category.name} ক্যাটাগরির আজকের বাজারদর
            </p>
          </div>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="h-11 rounded-lg border border-[#dbe3db] bg-white px-4 text-sm font-medium text-[#1d271f] outline-none focus:border-[#05893e]"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low-high">
              দাম: কম থেকে বেশি
            </option>

            <option value="high-low">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </div>

        <section className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <ProductSkeleton
                  key={index}
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#f0d2d2] bg-[#fff7f7] px-5 py-10 text-center">
              <p className="font-medium text-[#d03739]">
                {error}
              </p>
            </div>
          ) : sortedProducts.length >
            0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </div>
          ) : (
            <div className="py-14 text-center">
              <p className="text-[#667069]">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}