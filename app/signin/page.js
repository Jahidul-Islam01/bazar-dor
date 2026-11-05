"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.signIn.email({
          email: email.trim(),
          password,
        });

      if (error) {
        toast.error(
          error.message || "লগইন করা যায়নি"
        );
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগইন করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-[65vh] max-w-[500px] items-center px-4 py-12 sm:px-5">
        <div className="w-full rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-[#1d271f]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-[#667069]">
            আপনার অ্যাকাউন্টে লগইন করুন।
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-4"
          >
            <div>
              <label className="text-sm font-medium text-[#1d271f]">
                ইমেইল
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="আপনার ইমেইল"
                className="mt-2 h-11 w-full rounded-lg border border-[#dbe3db] px-4 text-sm outline-none transition focus:border-[#05893e]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#1d271f]">
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="আপনার পাসওয়ার্ড"
                className="mt-2 h-11 w-full rounded-lg border border-[#dbe3db] px-4 text-sm outline-none transition focus:border-[#05893e]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "লগইন হচ্ছে..."
                : "সাইন ইন"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e1e8e1]" />
            <span className="text-xs text-[#667069]">
              অথবা
            </span>
            <div className="h-px flex-1 bg-[#e1e8e1]" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="h-11 w-full rounded-lg border border-[#dbe3db] text-sm font-semibold text-[#1d271f] transition hover:bg-[#f7faf7]"
            >
              Google দিয়ে লগইন
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="h-11 w-full rounded-lg border border-[#dbe3db] text-sm font-semibold text-[#1d271f] transition hover:bg-[#f7faf7]"
            >
              GitHub দিয়ে লগইন
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#667069]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#05893e]"
            >
              সাইন আপ
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}