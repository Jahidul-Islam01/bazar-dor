"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import PriceTicker from "@/components/PriceTicker";
import { getBanglaDate } from "@/lib/helpers";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "চাল", icon: "🍚", slug: "chal" },
  { name: "ডাল", icon: "🫘", slug: "dal" },
  { name: "তেল", icon: "🛢️", slug: "tel" },
  { name: "সবজি", icon: "🥬", slug: "sobji" },
  { name: "মাছ", icon: "🐟", slug: "mach" },
  { name: "মাংস", icon: "🍗", slug: "mangsho" },
  {
    name: "ডিম-দুধ",
    icon: "🥛",
    slug: "dim-dui",
  },
  { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success(
        "সফলভাবে লগআউট হয়েছে"
      );

      router.push("/");
      router.refresh();
    } catch {
      toast.error(
        "লগআউট করা যায়নি"
      );
    }
  };

  return (
    <>
      <header className="bg-white">
        <div className="border-b border-[#e1e8e1]">
          <div className="mx-auto flex min-h-[68px] max-w-[1152px] items-center justify-between gap-4 px-4 sm:px-5 lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Image
                src="/assets/logo-icon.png"
                alt="বাজার দর"
                width={44}
                height={44}
                priority
                className="h-11 w-11 object-contain"
              />

              <div>
                <h2 className="text-[22px] font-bold leading-6 text-[#1d271f]">
                  বাজার দর
                </h2>

                <p className="mt-0.5 hidden text-xs text-[#667069] sm:block">
                  {getBanglaDate()}
                </p>
              </div>
            </Link>

            {/* AUTH AREA */}
            <div className="flex items-center gap-2">
              {!isPending && !session && (
                <>
                  <Link
                    href="/signin"
                    className="flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-[#1d271f] transition hover:bg-[#f0f5f0]"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    className="flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white transition hover:bg-[#047f39]"
                  >
                    সাইন আপ
                  </Link>
                </>
              )}

              {!isPending && session && (
                <>
                  <Link
                    href="/profile"
                    className="flex h-10 items-center gap-2 rounded-lg bg-[#f0f5f0] px-4 text-sm font-semibold text-[#1d271f] transition hover:bg-[#e8f6ed]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f6ed] text-sm font-bold text-[#05893e]">
                      {session.user?.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "U"}
                    </span>

                    <span className="hidden sm:inline">
                      {session.user?.name ||
                        "প্রোফাইল"}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-[#d03739] transition hover:bg-[#fdecec]"
                  >
                    লগআউট
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-[#e1e8e1]">
          <nav className="mx-auto max-w-[1152px] overflow-x-auto px-4 sm:px-5 lg:px-4">
            <div className="flex min-w-max items-center justify-center gap-1 py-2">
              {categories.map(
                (category) => {
                  const href =
                    `/category/${category.slug}`;

                  const active =
                    pathname === href;

                  return (
                    <Link
                      key={
                        category.slug
                      }
                      href={href}
                      className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition ${
                        active
                          ? "bg-[#05893e] text-white"
                          : "text-[#1d271f] hover:bg-[#f0f5f0]"
                      }`}
                    >
                      <span>
                        {category.icon}
                      </span>

                      <span>
                        {category.name}
                      </span>
                    </Link>
                  );
                }
              )}
            </div>
          </nav>
        </div>
      </header>

      <PriceTicker />
    </>
  );
}