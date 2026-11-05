"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রথমে লগইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("সফলভাবে লগআউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করা যায়নি");
    }
  };

  if (isPending) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] items-center justify-center">
          <p className="text-sm text-[#667069]">
            লোড হচ্ছে...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[65vh] max-w-[700px] px-4 py-12 sm:px-5">
        <div className="rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f6ed] text-3xl font-bold text-[#05893e]">
            {session.user?.name
              ?.charAt(0)
              ?.toUpperCase() || "U"}
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#1d271f]">
            {session.user?.name || "User"}
          </h1>

          <p className="mt-1 text-sm text-[#667069]">
            {session.user?.email}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/profile/update"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39]"
            >
              তথ্য আপডেট করুন
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#d03739] px-5 text-sm font-semibold text-[#d03739] transition hover:bg-[#fff5f5]"
            >
              লগআউট
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}