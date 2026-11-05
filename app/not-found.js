import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafcfa] px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f6ed] text-4xl">
          🛒
        </div>

        <p className="mt-6 text-sm font-semibold text-[#05893e]">
          404
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#1d271f]">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#667069]">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39]"
        >
          <Home size={17} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}