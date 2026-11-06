"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      toast.error(
        "সব তথ্য পূরণ করুন"
      );
      return;
    }

    if (password.length < 8) {
      toast.error(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
      );
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

      if (error) {
        toast.error(
          error.message ||
            "অ্যাকাউন্ট তৈরি করা যায়নি"
        );
        return;
      }

      toast.success(
        "অ্যাকাউন্ট তৈরি হয়েছে"
      );

      router.push("/signin");
    } catch {
      toast.error(
        "অ্যাকাউন্ট তৈরি করা যায়নি"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp =
    async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    };

  const handleGithubSignUp =
    async () => {
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
            সাইন আপ
          </h1>

          <p className="mt-2 text-sm text-[#667069]">
            নতুন অ্যাকাউন্ট তৈরি করুন।
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-4"
          >
            <div>
              <label className="text-sm font-medium text-[#1d271f]">
                নাম
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                placeholder="আপনার নাম"
                className="mt-2 h-11 w-full rounded-lg border border-[#dbe3db] px-4 text-sm outline-none focus:border-[#05893e]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#1d271f]">
                ইমেইল
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="আপনার ইমেইল"
                className="mt-2 h-11 w-full rounded-lg border border-[#dbe3db] px-4 text-sm outline-none focus:border-[#05893e]"
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
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="mt-2 h-11 w-full rounded-lg border border-[#dbe3db] px-4 text-sm outline-none focus:border-[#05893e]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#05893e] text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "সাইন আপ"}
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
              onClick={
                handleGoogleSignUp
              }
              className="h-11 w-full rounded-lg border border-[#dbe3db] text-sm font-semibold"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={
                handleGithubSignUp
              }
              className="h-11 w-full rounded-lg border border-[#dbe3db] text-sm font-semibold"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#667069]">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#05893e]"
            >
              সাইন ইন
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}