"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import PriceTicker from "@/components/PriceTicker";
import { getBanglaDate } from "@/lib/helpers";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "à¦šà¦¾à¦²", icon: "ðŸš", slug: "chal" },
  { name: "à¦¡à¦¾à¦²", icon: "ðŸ«˜", slug: "dal" },
  { name: "à¦¤à§‡à¦²", icon: "ðŸ›¢ï¸", slug: "tel" },
  { name: "à¦¸à¦¬à¦œà¦¿", icon: "ðŸ¥¬", slug: "sobji" },
  { name: "à¦®à¦¾à¦›", icon: "ðŸŸ", slug: "mach" },
  { name: "à¦®à¦¾à¦‚à¦¸", icon: "ðŸ—", slug: "mangsho" },
  {
    name: "à¦¡à¦¿à¦®-à¦¦à§à¦§",
    icon: "ðŸ¥›",
    slug: "dim-dui",
  },
  { name: "à¦®à¦¸à¦²à¦¾", icon: "ðŸŒ¶ï¸", slug: "mosla" },
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
        "à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦²à¦—à¦†à¦‰à¦Ÿ à¦¹à¦¯à¦¼à§‡à¦›à§‡"
      );

      router.push("/");
      router.refresh();
    } catch {
      toast.error(
        "à¦²à¦—à¦†à¦‰à¦Ÿ à¦•à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿"
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
                alt="à¦¬à¦¾à¦œà¦¾à¦° à¦¦à¦°"
                width={44}
                height={44}
                priority
                className="h-11 w-11 object-contain"
              />

              <div>
                <h2 className="text-[22px] font-bold leading-6 text-[#1d271f]">
                  à¦¬à¦¾à¦œà¦¾à¦° à¦¦à¦°
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
                    à¦¸à¦¾à¦‡à¦¨ à¦‡à¦¨
                  </Link>

                  <Link
                    href="/signup"
                    className="flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white transition hover:bg-[#047f39]"
                  >
                    à¦¸à¦¾à¦‡à¦¨ à¦†à¦ª
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
                        "à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦²"}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-[#d03739] transition hover:bg-[#fdecec]"
                  >
                    à¦²à¦—à¦†à¦‰à¦Ÿ
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
