"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const [name, setName] = useState("");
  const [updating, setUpdating] =
    useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রথমে লগইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    try {
      setUpdating(true);

      const { error } =
        await authClient.updateUser({
          name: name.trim(),
        });

      if (error) {
        toast.error(
          error.message ||
            "তথ্য আপডেট করা যায়নি"
        );
        return;
      }

      toast.success(
        "তথ্য সফলভাবে আপডেট হয়েছে"
      );

      router.push("/profile");
      router.refresh();
    } catch {
      toast.error(
        "তথ্য আপডেট করা যায়নি"
      );
    } finally {
      setUpdating(false);
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

      <main className="mx-auto min-h-[65vh] max-w-[600px] px-4 py-12 sm:px-5">
        <div className="rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-[#1d271f]">
            তথ্য আপডেট করুন
          </h1>

          <p className="mt-2 text-sm text-[#667069]">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7"
          >
            <label className="text-sm font-medium text-[#1d271f]">
              নাম
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="mt-2 h-11 w-full rounded-lg border border-[#dbe3db] px-4 text-sm outline-none transition focus:border-[#05893e]"
              placeholder="আপনার নাম"
            />

            <button
              type="submit"
              disabled={updating}
              className="mt-6 h-11 w-full rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating
                ? "আপডেট হচ্ছে..."
                : "আপডেট করুন"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}