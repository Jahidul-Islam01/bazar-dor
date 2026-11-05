import Image from "next/image";

import { getBanglaDate } from "@/lib/helpers";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1152px] px-4 pt-10 sm:px-5 lg:px-4">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_315px] lg:gap-12">
        <div className="max-w-[576px]">
          <div className="inline-flex rounded-lg bg-[#e8f6ed] px-3 py-1">
            <p className="text-sm font-medium text-[#05893e]">
              {getBanglaDate()}
            </p>
          </div>

          <h1 className="mt-3 text-[32px] font-bold leading-[1.25] text-[#1d271f] sm:text-[36px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-[576px] text-[15px] leading-7 text-[#667069] sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস,
            ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-7 inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-6 text-sm font-semibold text-white transition hover:bg-[#047f39]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/assets/bazar-hero.png"
            alt="বাজারের নিত্যপণ্য"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-[315px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}